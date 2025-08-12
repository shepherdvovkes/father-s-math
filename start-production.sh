#!/bin/bash

# Father's MATH Production Startup Script
# Требует sudo для запуска на порту 443

echo "🚀 Запуск Father's MATH в продакшн режиме..."

# Проверяем, что PM2 установлен
if ! command -v pm2 &> /dev/null; then
    echo "❌ PM2 не установлен. Устанавливаем..."
    npm install -g pm2
fi

# Проверяем SSL сертификаты
if [ ! -f "ssl/cert.pem" ] || [ ! -f "ssl/key.pem" ]; then
    echo "🔐 Генерируем SSL сертификаты..."
    mkdir -p ssl
    openssl req -x509 -newkey rsa:4096 -keyout ssl/key.pem -out ssl/cert.pem -days 365 -nodes -subj "/C=RU/ST=Moscow/L=Moscow/O=Father's MATH/OU=Development/CN=localhost"
fi

# Создаем директорию для логов
mkdir -p logs

# Останавливаем предыдущий процесс если он запущен
echo "🛑 Останавливаем предыдущий процесс..."
pm2 delete fathers-math 2>/dev/null || true

# Запускаем приложение через PM2
echo "✅ Запускаем приложение через PM2..."
pm2 start ecosystem.config.js --env production

# Показываем статус
echo "📊 Статус приложения:"
pm2 status

echo ""
echo "🌐 Приложение доступно по адресу: https://localhost:443"
echo "📝 Логи: pm2 logs fathers-math"
echo "📊 Мониторинг: pm2 monit"
echo "🛑 Остановка: pm2 stop fathers-math"
echo "🔄 Перезапуск: pm2 restart fathers-math"
echo ""
echo "⚠️  Внимание: Браузер может показать предупреждение о самоподписанном сертификате."
echo "   Это нормально для разработки. Нажмите 'Продолжить' или 'Дополнительно' -> 'Перейти на сайт'"
