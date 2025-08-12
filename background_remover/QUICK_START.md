# 🚀 Быстрый старт - Background Remover CLI

## Установка (3 способа)

### Способ 1: Автоматическая установка
```bash
cd background_remover
./install.sh
```

### Способ 2: Ручная установка
```bash
cd background_remover
pip install -r requirements.txt
pip install -e .
```

### Способ 3: Прямое использование
```bash
cd background_remover
pip install -r requirements.txt
python background_remover.py input.jpg output.png
```

## Быстрое использование

### Удаление фона с одного изображения
```bash
# Базовое использование
bg-remove photo.jpg result.png

# С лучшим качеством
bg-remove --alpha-matting photo.jpg result.png

# Для портретов людей
bg-remove -m u2net_human_seg portrait.jpg result.png
```

### Обработка папки с изображениями
```bash
# Все изображения в папке
bg-remove photos/ results/

# С рекурсивным обходом подпапок
bg-remove -r photos/ results/
```

### Просмотр всех опций
```bash
bg-remove --help
```

## Тестирование

```bash
python test_example.py
```

## Поддерживаемые форматы

**Входные:** PNG, JPG, JPEG, WEBP, TIFF, BMP  
**Выходные:** PNG, WebP (с прозрачностью)

## Модели AI

- `u2net` - универсальная (по умолчанию)
- `u2netp` - быстрая
- `u2net_human_seg` - для людей
- `isnet-anime` - для аниме
- `silueta` - очень быстрая

## Примеры команд

```bash
# Быстрая обработка
bg-remove -m silueta input.jpg output.png

# Максимальное качество
bg-remove --alpha-matting --foreground-threshold 250 input.jpg output.png

# Обработка в формате WebP
bg-remove -f webp input.jpg output.webp

# Подробный вывод
bg-remove -v input.jpg output.png
```

## Устранение проблем

**Ошибка импорта:** `pip install -r requirements.txt`  
**Медленная работа:** Используйте `-m silueta` или `-m u2netp`  
**Плохое качество:** Включите `--alpha-matting`
