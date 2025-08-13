#!/bin/bash

# Скрипт для резервного копирования PostgreSQL базы данных
# Совместим с macOS и Debian 12

set -e

# Создаем имя файла с текущей датой и временем
BACKUP_FILE="fathers_math_backup_$(date +%Y%m%d_%H%M%S).sql"
BACKUP_PATH="./database/backups/$BACKUP_FILE"

echo "💾 Создание резервной копии базы данных..."

# Проверяем, что база данных запущена
if ! docker-compose ps postgres | grep -q "Up"; then
    echo "❌ База данных не запущена. Запустите её сначала: ./database/start-db.sh"
    exit 1
fi

# Создаем резервную копию
echo "📦 Создание дампа базы данных..."
docker-compose exec -T postgres pg_dump -U fathers_math_user -d fathers_math > "$BACKUP_PATH"

# Проверяем размер файла
FILE_SIZE=$(du -h "$BACKUP_PATH" | cut -f1)

echo "✅ Резервная копия создана успешно!"
echo "📁 Файл: $BACKUP_PATH"
echo "📊 Размер: $FILE_SIZE"
echo ""
echo "🔧 Полезные команды:"
echo "   docker-compose exec postgres psql -U fathers_math_user -d fathers_math < $BACKUP_PATH  # Восстановление"
echo ""
