# Background Remover CLI

CLI инструмент для удаления фона с изображений с использованием искусственного интеллекта.

## Возможности

- ✅ Поддержка популярных форматов: PNG, JPG, JPEG, WEBP, TIFF, BMP
- ✅ Обработка одного файла или целой директории
- ✅ Рекурсивный обход поддиректорий
- ✅ Множество моделей AI для разных типов изображений
- ✅ Alpha matting для улучшения качества
- ✅ Прогресс-бар и подробная статистика
- ✅ Настраиваемые параметры качества

## Установка

1. Клонируйте репозиторий или скопируйте файлы
2. Установите зависимости:

```bash
pip install -r requirements.txt
```

## Использование

### Базовое использование

```bash
# Удаление фона с одного файла
python background_remover.py input.jpg output.png

# Обработка всех изображений в директории
python background_remover.py input_folder/ output_folder/
```

### Параметры командной строки

```bash
python background_remover.py [OPTIONS] INPUT_PATH OUTPUT_PATH
```

**Обязательные аргументы:**
- `INPUT_PATH` - путь к файлу или директории с изображениями
- `OUTPUT_PATH` - путь для сохранения результата

**Опции:**
- `-r, --recursive` - рекурсивный обход поддиректорий
- `-m, --model` - модель AI (по умолчанию: u2net)
- `--alpha-matting` - использовать alpha matting для лучшего качества
- `--foreground-threshold` - порог для переднего плана (0-255, по умолчанию: 240)
- `--background-threshold` - порог для фона (0-255, по умолчанию: 10)
- `--erode-size` - размер эрозии для alpha matting (по умолчанию: 10)
- `-f, --format` - формат выходного файла (png/webp, по умолчанию: png)
- `-v, --verbose` - подробный вывод

### Доступные модели

- `u2net` - универсальная модель (по умолчанию)
- `u2netp` - легкая версия u2net
- `u2net_human_seg` - специализирована для людей
- `u2net_cloth_seg` - специализирована для одежды
- `silueta` - быстрая модель
- `isnet-general-use` - общее использование
- `isnet-anime` - для аниме/мультфильмов

## Примеры использования

### 1. Удаление фона с одного изображения

```bash
python background_remover.py photo.jpg result.png
```

### 2. Обработка директории с рекурсивным обходом

```bash
python background_remover.py -r photos/ results/
```

### 3. Использование alpha matting для лучшего качества

```bash
python background_remover.py --alpha-matting input.jpg output.png
```

### 4. Выбор специализированной модели

```bash
# Для портретов людей
python background_remover.py -m u2net_human_seg portrait.jpg result.png

# Для аниме
python background_remover.py -m isnet-anime anime.jpg result.png
```

### 5. Настройка параметров alpha matting

```bash
python background_remover.py \
  --alpha-matting \
  --foreground-threshold 250 \
  --background-threshold 5 \
  --erode-size 15 \
  input.jpg output.png
```

### 6. Сохранение в формате WebP

```bash
python background_remover.py -f webp input.jpg output.webp
```

### 7. Подробный вывод с прогрессом

```bash
python background_remover.py -v -r photos/ results/
```

## Структура выходных файлов

### Обработка одного файла
- Вход: `photo.jpg`
- Выход: `photo_nobg.png` (если OUTPUT_PATH - директория)
- Выход: `output.png` (если OUTPUT_PATH - файл)

### Обработка директории
- Вход: `photos/`
- Выход: `results/photo1_nobg.png`, `results/photo2_nobg.png`, ...

### Рекурсивная обработка
- Вход: `photos/folder1/photo.jpg`
- Выход: `results/folder1/photo.png` (сохраняется структура директорий)

## Требования

- Python 3.7+
- Интернет-соединение (для загрузки моделей при первом запуске)
- Минимум 2GB RAM (рекомендуется 4GB+)

## Устранение неполадок

### Ошибка импорта
```
Ошибка импорта: No module named 'rembg'
```
**Решение:** Установите зависимости: `pip install -r requirements.txt`

### Недостаточно памяти
```
RuntimeError: CUDA out of memory
```
**Решение:** Используйте более легкую модель: `-m u2netp` или `-m silueta`

### Медленная обработка
**Решение:** 
- Используйте более легкую модель
- Отключите alpha matting
- Обрабатывайте изображения меньшего размера

### Плохое качество удаления фона
**Решение:**
- Включите alpha matting: `--alpha-matting`
- Попробуйте другую модель
- Настройте пороги: `--foreground-threshold` и `--background-threshold`

## Лицензия

Этот инструмент использует библиотеку `rembg` под лицензией MIT.

## Поддерживаемые форматы

### Входные форматы:
- PNG (.png)
- JPEG (.jpg, .jpeg)
- WebP (.webp)
- TIFF (.tiff, .tif)
- BMP (.bmp)

### Выходные форматы:
- PNG (.png) - с поддержкой прозрачности
- WebP (.webp) - с поддержкой прозрачности

## Производительность

Примерное время обработки на CPU Intel i5:
- Изображение 1920x1080: 5-15 секунд
- Изображение 4K: 20-60 секунд

На GPU время обработки значительно сокращается.
