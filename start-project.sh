#!/bin/bash

# Основной скрипт для запуска проекта Father's MATH
# Запускает базу данных PostgreSQL и веб-сервер
# Совместим с macOS и Debian 12

set -e

echo "🚀 Запуск проекта Father's MATH..."

# Проверяем, установлен ли Docker
if ! command -v docker &> /dev/null; then
    echo "❌ Docker не установлен. Установите Docker сначала."
    echo "📖 Инструкции: https://docs.docker.com/get-docker/"
    exit 1
fi

# Проверяем, установлен ли Docker Compose
if ! command -v docker-compose &> /dev/null; then
    echo "❌ Docker Compose не установлен. Установите Docker Compose сначала."
    echo "📖 Инструкции: https://docs.docker.com/compose/install/"
    exit 1
fi

# Запускаем базу данных
echo "🐘 Запуск PostgreSQL базы данных..."
./database/start-db.sh

# Ждем немного, чтобы база данных полностью инициализировалась
echo "⏳ Ожидание инициализации базы данных..."
sleep 5

# Тестируем подключение к базе данных
echo "🔍 Тестирование подключения к базе данных..."
./database/test-connection.sh

# Запускаем веб-сервер
echo "🌐 Запуск веб-сервера..."
if command -v python3 &> /dev/null; then
    echo "   Используем Python 3"
    python3 -m http.server 8000 &
    SERVER_PID=$!
elif command -v python &> /dev/null; then
    echo "   Используем Python"
    python -m http.server 8000 &
    SERVER_PID=$!
elif command -v node &> /dev/null; then
    echo "   Используем Node.js"
    node server.js &
    SERVER_PID=$!
else
    echo "❌ Не найден подходящий веб-сервер (Python или Node.js)"
    exit 1
fi

echo ""
echo "✅ Проект запущен успешно!"
echo ""
echo "📊 Статус сервисов:"
echo "   🐘 PostgreSQL: http://localhost:5432"
echo "   🌐 Веб-приложение: http://localhost:8000"
echo ""
echo "🔧 Полезные команды:"
echo "   ./database/stop-db.sh     # Остановка базы данных"
echo "   ./database/backup-db.sh   # Резервное копирование"
echo "   kill $SERVER_PID          # Остановка веб-сервера"
echo ""
echo "📖 Документация: ./database/README.md"
echo ""

# Функция для корректного завершения
cleanup() {
    echo ""
    echo "🛑 Остановка проекта..."
    if [ ! -z "$SERVER_PID" ]; then
        kill $SERVER_PID 2>/dev/null || true
    fi
    ./database/stop-db.sh
    echo "✅ Проект остановлен"
    exit 0
}

# Обработка сигналов для корректного завершения
trap cleanup SIGINT SIGTERM

# Ждем завершения
echo "⏳ Проект работает. Нажмите Ctrl+C для остановки..."
wait
