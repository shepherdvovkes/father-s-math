#!/bin/bash

# Скрипт для остановки PostgreSQL базы данных
# Совместим с macOS и Debian 12

set -e

echo "🛑 Остановка PostgreSQL базы данных..."

# Останавливаем контейнеры
docker-compose down

echo "✅ База данных остановлена!"
echo ""
echo "💾 Данные сохранены в Docker volume 'postgres_data'"
echo "🔄 Для полного удаления данных выполните: docker-compose down -v"
echo ""
