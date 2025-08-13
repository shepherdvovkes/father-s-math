#!/bin/bash

# Скрипт для запуска PostgreSQL базы данных
# Совместим с macOS и Debian 12

set -e

echo "🚀 Запуск PostgreSQL базы данных для Father's MATH..."

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

# Останавливаем существующие контейнеры
echo "🛑 Остановка существующих контейнеров..."
docker-compose down 2>/dev/null || true

# Запускаем базу данных
echo "🐘 Запуск PostgreSQL контейнера..."
docker-compose up -d postgres

# Ждем, пока база данных будет готова
echo "⏳ Ожидание готовности базы данных..."
until docker-compose exec -T postgres pg_isready -U fathers_math_user -d fathers_math; do
    echo "   База данных еще не готова, ждем..."
    sleep 2
done

echo "✅ База данных PostgreSQL запущена и готова к работе!"
echo ""
echo "📊 Информация о подключении:"
echo "   Host: localhost"
echo "   Port: 5432"
echo "   Database: fathers_math"
echo "   Username: fathers_math_user"
echo "   Password: fathers_math_password"
echo ""
echo "🔧 Полезные команды:"
echo "   docker-compose logs postgres    # Просмотр логов"
echo "   docker-compose exec postgres psql -U fathers_math_user -d fathers_math  # Подключение к БД"
echo "   docker-compose down             # Остановка базы данных"
echo ""
