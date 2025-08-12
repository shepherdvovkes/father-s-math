# Логотипы Father's MATH

Эта папка содержит все логотипы и favicon для образовательной платформы Father's MATH.

## Структура файлов

### Исходные файлы
- `logo1blue.png` (3.3MB) - Основной логотип
- `logo1blue2.png` (4.0MB) - Альтернативный логотип

### Созданные размеры (папка `sizes/`)

#### Favicon (16x16, 32x32, 48x48)
- `favicon-16x16.png` - Основной favicon для браузеров
- `favicon-32x32.png` - Favicon для высокого разрешения
- `favicon-48x48.png` - Favicon для Windows
- `favicon2-16x16.png` - Альтернативный favicon
- `favicon2-32x32.png` - Альтернативный favicon высокого разрешения

#### Логотипы различных размеров
- `logo-64x64.png` - Маленький логотип
- `logo-128x128.png` - Средний логотип
- `logo-256x256.png` - Большой логотип
- `logo-512x512.png` - Очень большой логотип
- `logo2-128x128.png` - Альтернативный средний логотип
- `logo2-256x256.png` - Альтернативный большой логотип

#### Форматы для печати
- `logo.jpg` - JPEG версия основного логотипа
- `logo2.jpg` - JPEG версия альтернативного логотипа

## Использование

### Для веб-сайта
Используйте PNG файлы для веб-страниц:
- 16x16, 32x32 для favicon
- 128x128, 256x256 для логотипов на страницах
- 512x512 для больших баннеров

### Для печати
Используйте JPG файлы для печатных материалов:
- `logo.jpg` для документов
- `logo2.jpg` для альтернативного дизайна

### HTML интеграция
Скопируйте теги из файла `favicon.html` в `<head>` ваших HTML страниц:

```html
<!-- Favicon -->
<link rel="icon" type="image/png" sizes="16x16" href="logo/sizes/favicon-16x16.png">
<link rel="icon" type="image/png" sizes="32x32" href="logo/sizes/favicon-32x32.png">

<!-- Apple Touch Icons -->
<link rel="apple-touch-icon" sizes="128x128" href="logo/sizes/logo-128x128.png">
<link rel="apple-touch-icon" sizes="256x256" href="logo/sizes/logo-256x256.png">
```

## Создание новых размеров

Для создания новых размеров используйте команду `sips`:

```bash
# Создать новый размер
sips -z [ширина] [высота] logo1blue.png --out sizes/новый-файл.png

# Изменить формат
sips -s format jpeg logo1blue.png --out sizes/новый-файл.jpg
```

## Цветовая схема
- Основной цвет: #0066cc (синий)
- Фон: прозрачный (PNG) или белый (JPG)

## Авторские права
Все логотипы являются собственностью Father's MATH образовательной платформы.
