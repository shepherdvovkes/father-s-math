#!/bin/bash

# Background Remover CLI - Docker запуск
# Быстрый запуск инструмента в Docker контейнере

set -e

echo "🐳 Запуск Background Remover в Docker контейнере"
echo "================================================"

# Проверка Docker
if ! command -v docker &> /dev/null; then
    echo "❌ Docker не найден. Установите Docker и повторите попытку."
    exit 1
fi

# Проверка docker-compose
if ! command -v docker-compose &> /dev/null; then
    echo "❌ docker-compose не найден. Установите docker-compose и повторите попытку."
    exit 1
fi

echo "✅ Docker и docker-compose найдены"

# Создание директории для данных
mkdir -p data/input data/output

# Сборка образа (если нужно)
if [ "$1" = "--build" ] || [ ! "$(docker images -q background-remover:latest 2> /dev/null)" ]; then
    echo "🔨 Сборка Docker образа..."
    docker-compose build
fi

# Если переданы аргументы, запускаем с ними
if [ $# -gt 0 ] && [ "$1" != "--build" ]; then
    echo "🚀 Запуск с аргументами: $@"
    docker-compose run --rm background-remover "$@"
else
    echo "🚀 Запуск интерактивного режима..."
    echo ""
    echo "💡 Примеры использования:"
    echo "   ./run_docker.sh input.jpg output.png"
    echo "   ./run_docker.sh -r input_folder/ output_folder/"
    echo "   ./run_docker.sh -m u2net_human_seg portrait.jpg result.png"
    echo ""
    echo "📁 Файлы для обработки поместите в папку data/input/"
    echo "📁 Результаты будут сохранены в папку data/output/"
    echo ""
    echo "🔍 Для справки запустите: ./run_docker.sh --help"
fi
