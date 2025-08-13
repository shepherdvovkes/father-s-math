# PostgreSQL База данных для Father's MATH

Этот каталог содержит конфигурацию и скрипты для PostgreSQL базы данных образовательной платформы.

## 🚀 Быстрый старт

### Требования
- Docker
- Docker Compose

### Запуск базы данных
```bash
./database/start-db.sh
```

### Остановка базы данных
```bash
./database/stop-db.sh
```

## 📊 Структура базы данных

### Таблицы
- **subjects** - Предметы (алгебра, геометрия, тригонометрия, мат. анализ)
- **topics** - Темы внутри предметов
- **subtopics** - Подтемы внутри тем
- **lessons** - Уроки с полной информацией
- **tags** - Теги для категоризации
- **lesson_tags** - Связь уроков и тегов (many-to-many)
- **theory_images** - Изображения для теоретических уроков

### Схема данных
```
subjects (1) → topics (1) → subtopics (1) → lessons (many)
                                    ↓
                              lesson_tags (many) ← tags (many)
                                    ↓
                              theory_images (many)
```

## 🔧 Управление базой данных

### Резервное копирование
```bash
./database/backup-db.sh
```
Создает дамп базы данных в `./database/backups/`

### Восстановление из резервной копии
```bash
./database/restore-db.sh ./database/backups/fathers_math_backup_20241201_120000.sql
```

### Подключение к базе данных
```bash
docker-compose exec postgres psql -U fathers_math_user -d fathers_math
```

### Просмотр логов
```bash
docker-compose logs postgres
```

## 📋 Параметры подключения

- **Host**: localhost
- **Port**: 5432
- **Database**: fathers_math
- **Username**: fathers_math_user
- **Password**: fathers_math_password

## 🐳 Docker команды

### Запуск только базы данных
```bash
docker-compose up -d postgres
```

### Остановка всех сервисов
```bash
docker-compose down
```

### Полное удаление (включая данные)
```bash
docker-compose down -v
```

### Пересборка контейнера
```bash
docker-compose up -d --build postgres
```

## 📁 Структура файлов

```
database/
├── init/
│   ├── 01_create_tables.sql    # Создание таблиц
│   └── 02_insert_initial_data.sql  # Начальные данные
├── backups/                    # Резервные копии
├── start-db.sh                # Запуск БД
├── stop-db.sh                 # Остановка БД
├── backup-db.sh               # Резервное копирование
├── restore-db.sh              # Восстановление
└── README.md                  # Эта документация
```

## 🔄 Миграции

При изменении структуры базы данных:

1. Создайте новый SQL файл в `init/` с номером больше существующих
2. Добавьте команды ALTER TABLE или CREATE TABLE
3. Пересоберите контейнер: `docker-compose up -d --build postgres`

## 🛠️ Устранение неполадок

### База данных не запускается
```bash
# Проверьте логи
docker-compose logs postgres

# Проверьте статус контейнера
docker-compose ps
```

### Порт 5432 занят
```bash
# Найдите процесс, использующий порт
lsof -i :5432

# Остановите локальный PostgreSQL (если есть)
sudo systemctl stop postgresql
```

### Проблемы с правами доступа
```bash
# Сделайте скрипты исполняемыми
chmod +x database/*.sh
```

## 🔒 Безопасность

⚠️ **Важно**: В продакшене измените пароли в `docker-compose.yml`!

```yaml
environment:
  POSTGRES_PASSWORD: ваш_сложный_пароль
```

## 📈 Мониторинг

### Проверка состояния базы данных
```bash
docker-compose exec postgres pg_isready -U fathers_math_user -d fathers_math
```

### Статистика таблиц
```sql
SELECT 
    schemaname,
    tablename,
    attname,
    n_distinct,
    correlation
FROM pg_stats
WHERE schemaname = 'public'
ORDER BY tablename, attname;
```
