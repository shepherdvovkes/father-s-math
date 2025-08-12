# 🐳 Background Remover CLI - Docker версия

**Изолированная среда для удаления фона с изображений без проблем с зависимостями**

## 🚀 Быстрый старт

### Способ 1: Автоматический запуск
```bash
# Сборка и запуск
./run_docker.sh --build

# Обработка файла
./run_docker.sh input.jpg output.png

# Обработка папки
./run_docker.sh -r input_folder/ output_folder/
```

### Способ 2: Прямой Docker
```bash
# Сборка образа
docker build -t background-remover .

# Запуск
./docker_run.sh input.jpg output.png
```

### Способ 3: Docker Compose
```bash
# Сборка
docker-compose build

# Запуск
docker-compose run --rm background-remover input.jpg output.png
```

## 📁 Структура файлов

```
background_remover/
├── Dockerfile              # Конфигурация Docker образа
├── docker-compose.yml      # Docker Compose конфигурация
├── run_docker.sh          # Автоматический запуск
├── docker_run.sh          # Прямой Docker запуск
├── simple_background_remover.py  # Основной скрипт
├── requirements.txt        # Python зависимости
└── data/                  # Папка для файлов
    ├── input/             # Входные файлы
    └── output/            # Выходные файлы
```

## 💻 Примеры использования

### Обработка одного файла
```bash
# Копируем файл в папку data/input/
cp photo.jpg data/input/

# Обрабатываем
./run_docker.sh data/input/photo.jpg data/output/result.png
```

### Обработка папки с изображениями
```bash
# Копируем папку с изображениями
cp -r photos/ data/input/

# Обрабатываем рекурсивно
./run_docker.sh -r data/input/photos/ data/output/
```

### Использование разных моделей
```bash
# Для портретов
./run_docker.sh -m u2net_human_seg portrait.jpg result.png

# Для аниме
./run_docker.sh -m isnet-anime anime.jpg result.png

# Быстрая обработка
./run_docker.sh -m silueta photo.jpg result.png
```

### Подробный вывод
```bash
./run_docker.sh -v input.jpg output.png
```

## 🔧 Настройка

### Изменение размера образа
Отредактируйте `Dockerfile`:
```dockerfile
# Для меньшего размера используйте python:3.11-slim
FROM python:3.11-slim

# Или для максимальной производительности
FROM python:3.11
```

### Добавление дополнительных зависимостей
Добавьте в `Dockerfile`:
```dockerfile
RUN pip install --no-cache-dir additional-package
```

## 📊 Преимущества Docker версии

✅ **Изоляция**: Нет конфликтов с системными зависимостями  
✅ **Портативность**: Работает на любой системе с Docker  
✅ **Воспроизводимость**: Одинаковое поведение везде  
✅ **Простота**: Не нужно устанавливать Python и зависимости  
✅ **Безопасность**: Изолированная среда выполнения  

## 🛠️ Устранение проблем

### Docker не найден
```bash
# Установка Docker на macOS
brew install --cask docker

# Установка Docker на Ubuntu
sudo apt-get install docker.io docker-compose
```

### Недостаточно места
```bash
# Очистка неиспользуемых образов
docker system prune -a

# Очистка кэша сборки
docker builder prune
```

### Проблемы с правами доступа
```bash
# На Linux добавьте пользователя в группу docker
sudo usermod -aG docker $USER
```

### Медленная сборка
```bash
# Используйте кэш pip
docker build --build-arg PIP_CACHE_DIR=/tmp/pip_cache .
```

## 🎯 Сравнение версий

| Характеристика | Локальная версия | Docker версия |
|----------------|------------------|---------------|
| Установка | Сложная | Простая |
| Зависимости | Могут конфликтовать | Изолированы |
| Размер | ~500MB | ~2GB (образ) |
| Производительность | Нативная | Небольшие потери |
| Портативность | Требует настройки | Работает везде |

## 📝 Команды Docker

### Управление образом
```bash
# Сборка
docker build -t background-remover .

# Просмотр образов
docker images

# Удаление образа
docker rmi background-remover
```

### Управление контейнерами
```bash
# Запуск интерактивно
docker run -it background-remover bash

# Просмотр логов
docker logs bg-remover-temp

# Остановка
docker stop bg-remover-temp
```

### Работа с файлами
```bash
# Копирование файлов в контейнер
docker cp local_file.jpg container_name:/data/

# Копирование из контейнера
docker cp container_name:/data/result.png ./
```

## 🚀 Готово к использованию!

Теперь у вас есть стабильный инструмент для удаления фона, который работает в изолированной среде без проблем с зависимостями!
