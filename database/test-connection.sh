#!/bin/bash

# Скрипт для тестирования подключения к PostgreSQL базе данных
# Совместим с macOS и Debian 12

set -e

echo "🔍 Тестирование подключения к базе данных..."

# Проверяем, что база данных запущена
if ! docker-compose ps postgres | grep -q "Up"; then
    echo "❌ База данных не запущена. Запустите её сначала: ./database/start-db.sh"
    exit 1
fi

echo "✅ База данных запущена"

# Тестируем подключение
echo "🔌 Тестирование подключения..."
if docker-compose exec -T postgres pg_isready -U fathers_math_user -d fathers_math; then
    echo "✅ Подключение успешно"
else
    echo "❌ Ошибка подключения"
    exit 1
fi

# Проверяем таблицы
echo "📊 Проверка структуры базы данных..."
docker-compose exec -T postgres psql -U fathers_math_user -d fathers_math -c "
SELECT 
    table_name,
    (SELECT COUNT(*) FROM information_schema.columns WHERE table_name = t.table_name) as columns_count
FROM information_schema.tables t 
WHERE table_schema = 'public' 
ORDER BY table_name;
"

# Проверяем количество записей
echo "📈 Статистика данных..."
docker-compose exec -T postgres psql -U fathers_math_user -d fathers_math -c "
SELECT 
    'subjects' as table_name, COUNT(*) as count FROM subjects
UNION ALL
SELECT 'topics', COUNT(*) FROM topics
UNION ALL
SELECT 'subtopics', COUNT(*) FROM subtopics
UNION ALL
SELECT 'lessons', COUNT(*) FROM lessons
UNION ALL
SELECT 'tags', COUNT(*) FROM tags
UNION ALL
SELECT 'lesson_tags', COUNT(*) FROM lesson_tags
ORDER BY table_name;
"

echo "✅ Тестирование завершено успешно!"
echo ""
