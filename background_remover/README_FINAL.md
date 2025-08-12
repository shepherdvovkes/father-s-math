# 🎨 Background Remover CLI - Полный инструмент

**CLI инструмент для удаления фона с изображений с использованием искусственного интеллекта**

## 📋 Содержание

- [🚀 Быстрый старт](#-быстрый-старт)
- [📦 Установка](#-установка)
- [🐳 Docker версия](#-docker-версия)
- [💻 Использование](#-использование)
- [🤖 Модели AI](#-модели-ai)
- [📁 Структура проекта](#-структура-проекта)
- [🛠️ Устранение проблем](#️-устранение-проблем)

## 🚀 Быстрый старт

### Вариант 1: Docker (рекомендуется)
```bash
# Клонируйте или скачайте файлы
cd background_remover

# Запустите Docker версию
./run_docker.sh --build
./run_docker.sh input.jpg output.png
```

### Вариант 2: Локальная установка
```bash
cd background_remover
./install.sh
bg-remove input.jpg output.png
```

### Вариант 3: Прямое использование
```bash
cd background_remover
pip install -r requirements.txt
python simple_background_remover.py input.jpg output.png
```

## 📦 Установка

### Docker версия (рекомендуется)
```bash
# Автоматическая установка
./run_docker.sh --build

# Или вручную
docker build -t background-remover .
./docker_run.sh input.jpg output.png
```

### Локальная версия
```bash
# Автоматическая установка
./install.sh

# Ручная установка
pip install -r requirements.txt
pip install -e .
```

## 🐳 Docker версия

**Преимущества:**
- ✅ Нет проблем с зависимостями
- ✅ Работает на любой системе
- ✅ Изолированная среда
- ✅ Простая установка

**Использование:**
```bash
# Сборка и запуск
./run_docker.sh --build

# Обработка файла
./run_docker.sh input.jpg output.png

# Обработка папки
./run_docker.sh -r photos/ results/

# Разные модели
./run_docker.sh -m u2net_human_seg portrait.jpg result.png
```

📖 [Подробная документация Docker версии](DOCKER_README.md)

## 💻 Использование

### Базовые команды

```bash
# Удаление фона с одного изображения
bg-remove photo.jpg result.png

# Обработка всех изображений в папке
bg-remove photos/ results/

# Рекурсивная обработка с подпапками
bg-remove -r photos/ results/
```

### Продвинутые команды

```bash
# Максимальное качество с alpha matting
bg-remove --alpha-matting photo.jpg result.png

# Специализированная модель для портретов
bg-remove -m u2net_human_seg portrait.jpg result.png

# Быстрая обработка для аниме
bg-remove -m isnet-anime anime.jpg result.png

# Сохранение в формате WebP
bg-remove -f webp photo.jpg result.webp
```

### Все параметры

```bash
bg-remove [ОПЦИИ] ВХОДНОЙ_ПУТЬ ВЫХОДНОЙ_ПУТЬ

Обязательные аргументы:
  ВХОДНОЙ_ПУТЬ     Путь к файлу или папке с изображениями
  ВЫХОДНОЙ_ПУТЬ    Путь для сохранения результата

Опции:
  -r, --recursive              Рекурсивный обход подпапок
  -m, --model TEXT            Модель AI [u2net/u2netp/u2net_human_seg/u2net_cloth_seg/silueta/isnet-general-use/isnet-anime]
  --alpha-matting             Использовать alpha matting для лучшего качества
  --foreground-threshold INT  Порог для переднего плана (0-255) [по умолчанию: 240]
  --background-threshold INT  Порог для фона (0-255) [по умолчанию: 10]
  --erode-size INT            Размер эрозии для alpha matting [по умолчанию: 10]
  -f, --format TEXT           Формат выходного файла [png/webp] [по умолчанию: png]
  -v, --verbose               Подробный вывод
  --help                      Показать справку
```

## 🤖 Модели AI

| Модель | Описание | Скорость | Качество | Применение |
|--------|----------|----------|----------|------------|
| `u2net` | Универсальная модель | Средняя | Высокое | Общее использование |
| `u2netp` | Легкая версия u2net | Быстрая | Хорошее | Быстрая обработка |
| `u2net_human_seg` | Специализирована для людей | Средняя | Отличное | Портреты, люди |
| `u2net_cloth_seg` | Специализирована для одежды | Средняя | Отличное | Одежда, товары |
| `silueta` | Очень быстрая модель | Очень быстрая | Среднее | Массовая обработка |
| `isnet-general-use` | Общее использование | Средняя | Высокое | Универсальная |
| `isnet-anime` | Для аниме/мультфильмов | Средняя | Отличное | Аниме, мультфильмы |

## 📁 Структура проекта

```
background_remover/
├── 📄 README.md                    # Основная документация
├── 📄 README_RU.md                 # Русская документация
├── 📄 QUICK_START.md               # Быстрый старт
├── 📄 DOCKER_README.md             # Docker документация
├── 📄 README_FINAL.md              # Этот файл
├── 🐳 Dockerfile                   # Docker конфигурация
├── 🐳 docker-compose.yml           # Docker Compose
├── 🐳 run_docker.sh               # Docker запуск
├── 🐳 docker_run.sh               # Прямой Docker
├── 🐍 background_remover.py        # Основной CLI (Click)
├── 🐍 simple_background_remover.py # Упрощенный CLI (argparse)
├── 🐍 test_example.py             # Тестовый скрипт
├── 📦 requirements.txt             # Python зависимости
├── 📦 setup.py                     # Установка пакета
├── 🔧 install.sh                   # Автоматическая установка
└── 📁 data/                        # Папка для файлов
    ├── input/                      # Входные файлы
    └── output/                     # Выходные файлы
```

## 🎯 Примеры использования

### 1. Портрет человека
```bash
bg-remove -m u2net_human_seg --alpha-matting portrait.jpg result.png
```

### 2. Товар для интернет-магазина
```bash
bg-remove --alpha-matting --foreground-threshold 250 product.jpg result.png
```

### 3. Аниме персонаж
```bash
bg-remove -m isnet-anime anime_character.jpg result.png
```

### 4. Быстрая обработка множества файлов
```bash
bg-remove -m silueta -r photos/ results/
```

### 5. Максимальное качество с настройками
```bash
bg-remove \
  --alpha-matting \
  --foreground-threshold 250 \
  --background-threshold 5 \
  --erode-size 15 \
  input.jpg output.png
```

## 📊 Производительность

Примерное время обработки на CPU Intel i5:

| Разрешение | Время обработки |
|------------|----------------|
| 1920x1080  | 5-15 секунд    |
| 4K (3840x2160) | 20-60 секунд |
| 8K (7680x4320) | 60-180 секунд |

**💡 На GPU время обработки сокращается в 3-5 раз!**

## 🤝 Поддерживаемые форматы

### Входные форматы:
- **PNG** (.png) - с поддержкой прозрачности
- **JPEG** (.jpg, .jpeg) - стандартный формат
- **WebP** (.webp) - современный формат
- **TIFF** (.tiff, .tif) - профессиональный формат
- **BMP** (.bmp) - базовый формат

### Выходные форматы:
- **PNG** (.png) - с поддержкой прозрачности
- **WebP** (.webp) - с поддержкой прозрачности

## 🛠️ Устранение проблем

### Docker версия
```bash
# Docker не запущен
# Запустите Docker Desktop или docker daemon

# Проблемы с правами доступа
sudo usermod -aG docker $USER

# Недостаточно места
docker system prune -a
```

### Локальная версия
```bash
# Ошибка импорта
pip install -r requirements.txt

# Недостаточно памяти
bg-remove -m u2netp input.jpg output.png

# Медленная обработка
bg-remove -m silueta input.jpg output.png
```

### Общие проблемы
```bash
# Плохое качество
bg-remove --alpha-matting input.jpg output.png

# Неподдерживаемый формат
# Конвертируйте в PNG/JPG перед обработкой
```

## 🧪 Тестирование

```bash
# Тест локальной версии
python test_example.py

# Тест Docker версии
./run_docker.sh --help
```

## 📚 Документация

- [📖 Основная документация](README.md)
- [🇷🇺 Русская документация](README_RU.md)
- [🚀 Быстрый старт](QUICK_START.md)
- [🐳 Docker документация](DOCKER_README.md)

## 🔧 Требования

### Docker версия
- Docker
- docker-compose (опционально)

### Локальная версия
- Python 3.7+
- 2GB+ RAM
- Интернет для загрузки моделей

## 📄 Лицензия

Этот инструмент использует библиотеку `rembg` под лицензией MIT.

---

## 🎉 Готово!

Теперь у вас есть полнофункциональный инструмент для удаления фона с изображений!

**Выберите подходящий способ использования:**
- 🐳 **Docker** - для стабильной работы без проблем с зависимостями
- 🐍 **Локальная установка** - для максимальной производительности
- 🚀 **Прямое использование** - для быстрого тестирования
