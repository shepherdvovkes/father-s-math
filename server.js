const https = require('https');
const fs = require('fs');
const path = require('path');
const url = require('url');

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

// Создаем HTTPS сервер
const server = https.createServer(options, (req, res) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
    
    // Парсим URL
    const parsedUrl = url.parse(req.url);
    let pathname = parsedUrl.pathname;
    
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
