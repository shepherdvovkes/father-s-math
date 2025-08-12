const https = require('https');
const fs = require('fs');
const path = require('path');
const url = require('url');
const http = require('http');

// Загружаем переменные окружения
require('dotenv').config({ path: './.env' });

// Node.js 18+ имеет встроенную поддержку fetch

// SSL сертификаты
const options = {
    key: fs.readFileSync('./ssl/key.pem'),
    cert: fs.readFileSync('./ssl/cert.pem')
};

// MIME типы
const mimeTypes = {
    '.html': 'text/html',
    '.js': 'text/javascript',
    '.css': 'text/css',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.wav': 'audio/wav',
    '.mp4': 'video/mp4',
    '.woff': 'application/font-woff',
    '.ttf': 'application/font-ttf',
    '.eot': 'application/vnd.ms-fontobject',
    '.otf': 'application/font-otf',
    '.wasm': 'application/wasm'
};

// Функция для получения MIME типа
function getMimeType(filePath) {
    const extname = path.extname(filePath).toLowerCase();
    return mimeTypes[extname] || 'application/octet-stream';
}

// Функция для безопасного получения пути к файлу
function getSafePath(requestedPath) {
    // Убираем потенциально опасные символы
    const cleanPath = requestedPath.replace(/\.\./g, '').replace(/\/+/g, '/');
    return path.join(__dirname, cleanPath);
}

// Функция для обработки AI-чата
async function handleAIChatRequest(req, res) {
    try {
        // Устанавливаем заголовки для CORS и потоковой передачи
        res.writeHead(200, {
            'Content-Type': 'text/plain; charset=utf-8',
            'Cache-Control': 'no-cache',
            'Connection': 'keep-alive',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type'
        });

        // Читаем тело запроса
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });

        req.on('end', async () => {
            try {
                const { message, context } = JSON.parse(body);
                
                // Проверяем наличие API ключа
                const apiKey = process.env.OPENAI_API_KEY;
                console.log('API key present:', !!apiKey);
                console.log('API key starts with:', apiKey ? apiKey.substring(0, 10) + '...' : 'none');
                
                if (!apiKey || apiKey === 'your_openai_api_key_here') {
                    res.write('Ошибка: API ключ OpenAI не настроен. Пожалуйста, добавьте ваш API ключ в файл .env\n');
                    res.end();
                    return;
                }

                // Формируем промпт с контекстом урока
                const systemPrompt = `Ты - AI-помощник по математике для учеников 10-го класса. 
Текущий урок: ${context.lessonTitle || 'Не указан'}
Предмет: ${context.currentSubject || 'Не указан'}
Описание урока: ${context.lessonDescription || 'Не указано'}

Твоя задача - помочь ученику понять материал, объяснить сложные концепции простым языком, 
дать пошаговые решения задач и ответить на любые вопросы по математике.

Отвечай на русском языке, будь дружелюбным и терпеливым. 
Если нужно, используй примеры и аналогии для лучшего понимания.`;

                const userPrompt = `Вопрос ученика: ${message}`;

                // Отправляем запрос к OpenAI API
                console.log('Sending request to OpenAI API...');
                const openaiResponse = await fetch('https://api.openai.com/v1/chat/completions', {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${apiKey}`,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        model: 'gpt-3.5-turbo',
                        messages: [
                            { role: 'system', content: systemPrompt },
                            { role: 'user', content: userPrompt }
                        ],
                        stream: true,
                        max_tokens: 1000,
                        temperature: 0.7
                    })
                });
                
                console.log('OpenAI response status:', openaiResponse.status);
                console.log('OpenAI response body type:', typeof openaiResponse.body);
                console.log('OpenAI response body:', openaiResponse.body);
                console.log('getReader available:', typeof openaiResponse.body?.getReader);

                if (!openaiResponse.ok) {
                    throw new Error(`OpenAI API error: ${openaiResponse.status}`);
                }

                // Проверяем, доступен ли getReader
                if (!openaiResponse.body || typeof openaiResponse.body.getReader !== 'function') {
                    throw new Error('Stream reading not supported in this environment');
                }

                const reader = openaiResponse.body.getReader();
                const decoder = new TextDecoder();

                while (true) {
                    const { done, value } = await reader.read();
                    
                    if (done) break;
                    
                    const chunk = decoder.decode(value);
                    const lines = chunk.split('\n');
                    
                    for (const line of lines) {
                        if (line.startsWith('data: ')) {
                            const data = line.slice(6);
                            
                            if (data === '[DONE]') {
                                res.end();
                                return;
                            }
                            
                            try {
                                const parsed = JSON.parse(data);
                                if (parsed.choices && parsed.choices[0] && parsed.choices[0].delta && parsed.choices[0].delta.content) {
                                    res.write(parsed.choices[0].delta.content);
                                }
                            } catch (e) {
                                // Игнорируем ошибки парсинга
                            }
                        }
                    }
                }
                
                res.end();
                
            } catch (error) {
                console.error('Ошибка при обработке AI-запроса:', error);
                res.write(`Ошибка: ${error.message}\n`);
                res.end();
            }
        });

    } catch (error) {
        console.error('Ошибка в handleAIChatRequest:', error);
        res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
        res.write('Внутренняя ошибка сервера\n');
        res.end();
    }
}

// Создаем HTTPS сервер
const server = https.createServer(options, (req, res) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
    
    // Парсим URL
    const parsedUrl = url.parse(req.url);
    let pathname = parsedUrl.pathname;
    
    // Обработка API запросов
    if (pathname === '/api/ai-chat' && req.method === 'POST') {
        handleAIChatRequest(req, res);
        return;
    }
    
    // Обработка корневого пути
    if (pathname === '/') {
        pathname = '/index.html';
    }
    
    // Получаем безопасный путь к файлу
    const filePath = getSafePath(pathname);
    
    // Проверяем, существует ли файл
    fs.access(filePath, fs.constants.F_OK, (err) => {
        if (err) {
            // Файл не найден
            res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
            res.end(`
                <!DOCTYPE html>
                <html>
                <head>
                    <title>404 - Страница не найдена</title>
                    <style>
                        body { 
                            font-family: Arial, sans-serif; 
                            text-align: center; 
                            padding: 50px; 
                            background: #f5f5f5; 
                        }
                        .error { 
                            background: white; 
                            padding: 30px; 
                            border-radius: 10px; 
                            box-shadow: 0 2px 10px rgba(0,0,0,0.1); 
                        }
                        h1 { color: #e74c3c; }
                        a { color: #3498db; text-decoration: none; }
                        a:hover { text-decoration: underline; }
                    </style>
                </head>
                <body>
                    <div class="error">
                        <h1>404 - Страница не найдена</h1>
                        <p>Запрашиваемая страница не существует.</p>
                        <p><a href="/">Вернуться на главную</a></p>
                    </div>
                </body>
                </html>
            `);
            return;
        }
        
        // Читаем файл
        fs.readFile(filePath, (err, data) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/html; charset=utf-8' });
                res.end('500 - Внутренняя ошибка сервера');
                return;
            }
            
            // Устанавливаем заголовки
            const mimeType = getMimeType(filePath);
            res.writeHead(200, { 
                'Content-Type': mimeType + (mimeType.startsWith('text/') ? '; charset=utf-8' : ''),
                'Cache-Control': 'public, max-age=3600' // Кэширование на 1 час
            });
            
            res.end(data);
        });
    });
});

// Запускаем сервер
const PORT = process.env.PORT || 443;
server.listen(PORT, () => {
    console.log(`🚀 Father's MATH сервер запущен на https://localhost:${PORT}`);
    console.log(`📁 Корневая директория: ${__dirname}`);
    console.log(`🔒 HTTPS включен`);
    console.log(`⏰ Время запуска: ${new Date().toISOString()}`);
    console.log(`📊 PM2 Process ID: ${process.pid}`);
});

// Обработка ошибок
server.on('error', (err) => {
    console.error('❌ Ошибка сервера:', err);
});

// Graceful shutdown
process.on('SIGTERM', () => {
    console.log('🛑 Получен сигнал SIGTERM, завершаем работу...');
    server.close(() => {
        console.log('✅ Сервер успешно остановлен');
        process.exit(0);
    });
});

process.on('SIGINT', () => {
    console.log('🛑 Получен сигнал SIGINT, завершаем работу...');
    server.close(() => {
        console.log('✅ Сервер успешно остановлен');
        process.exit(0);
    });
});
