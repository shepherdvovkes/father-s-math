#!/bin/bash

# Простой запуск через Docker
# Использование: ./docker_run.sh input.jpg output.png

IMAGE_NAME="background-remover"
CONTAINER_NAME="bg-remover-temp"

# Проверка Docker
if ! command -v docker &> /dev/null; then
    echo "❌ Docker не найден"
    exit 1
fi

# Сборка образа если не существует
if [ ! "$(docker images -q $IMAGE_NAME 2> /dev/null)" ]; then
    echo "🔨 Сборка Docker образа..."
    docker build -t $IMAGE_NAME .
fi

# Создание директорий
mkdir -p data/input data/output

# Запуск контейнера
echo "🚀 Запуск обработки..."
docker run --rm \
    --name $CONTAINER_NAME \
    -v "$(pwd)/data:/data" \
    -v "$(pwd):/app" \
    $IMAGE_NAME "$@"

echo "✅ Обработка завершена"
