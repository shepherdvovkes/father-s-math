#!/bin/bash

# Скрипт для восстановления PostgreSQL базы данных из резервной копии
# Совместим с macOS и Debian 12

set -e

echo "🔄 Восстановление базы данных из резервной копии..."

# Проверяем аргументы
if [ $# -eq 0 ]; then
    echo "❌ Укажите файл резервной копии:"
    echo "   ./database/restore-db.sh <путь_к_файлу>"
    echo ""
    echo "📁 Доступные резервные копии:"
    ls -la ./database/backups/*.sql 2>/dev/null || echo "   Резервные копии не найдены"
    exit 1
fi

BACKUP_FILE="$1"

# Проверяем существование файла
if [ ! -f "$BACKUP_FILE" ]; then
    echo "❌ Файл '$BACKUP_FILE' не найден!"
    exit 1
fi

# Проверяем, что база данных запущена
if ! docker-compose ps postgres | grep -q "Up"; then
    echo "❌ База данных не запущена. Запустите её сначала: ./database/start-db.sh"
    exit 1
fi

echo "⚠️  ВНИМАНИЕ: Это действие перезапишет все данные в базе!"
echo "📁 Файл для восстановления: $BACKUP_FILE"
echo ""
read -p "Продолжить? (y/N): " -n 1 -r
echo ""

if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "❌ Восстановление отменено."
    exit 1
fi

echo "🔄 Восстановление данных..."
docker-compose exec -T postgres psql -U fathers_math_user -d fathers_math < "$BACKUP_FILE"

echo "✅ База данных восстановлена успешно!"
echo ""
