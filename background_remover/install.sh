#!/bin/bash

# Background Remover CLI - Скрипт установки
# Автоматическая установка зависимостей и настройка инструмента

set -e  # Остановка при ошибке

echo "🚀 Установка Background Remover CLI"
echo "=================================="

# Проверка Python
if ! command -v python3 &> /dev/null; then
    echo "❌ Python 3 не найден. Установите Python 3.7+ и повторите попытку."
    exit 1
fi

PYTHON_VERSION=$(python3 -c "import sys; print(f'{sys.version_info.major}.{sys.version_info.minor}')")
echo "✅ Python $PYTHON_VERSION найден"

# Проверка pip
if ! command -v pip3 &> /dev/null; then
    echo "❌ pip3 не найден. Установите pip и повторите попытку."
    exit 1
fi

echo "✅ pip3 найден"

# Создание виртуального окружения (опционально)
read -p "🤔 Создать виртуальное окружение? (y/n): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo "📦 Создание виртуального окружения..."
    python3 -m venv venv
    source venv/bin/activate
    echo "✅ Виртуальное окружение активировано"
fi

# Установка зависимостей
echo "📥 Установка зависимостей..."
pip3 install -r requirements.txt

# Установка инструмента
echo "🔧 Установка инструмента..."
pip3 install -e .

# Проверка установки
echo "🧪 Проверка установки..."
if command -v bg-remove &> /dev/null; then
    echo "✅ Инструмент установлен успешно!"
    echo ""
    echo "🎉 Установка завершена!"
    echo ""
    echo "💡 Использование:"
    echo "   bg-remove input.jpg output.png"
    echo "   background-remover --help"
    echo ""
    echo "📚 Документация: README.md"
else
    echo "⚠️  Инструмент не найден в PATH, но может быть запущен напрямую:"
    echo "   python3 background_remover.py input.jpg output.png"
fi

echo ""
echo "🔍 Для тестирования запустите:"
echo "   python3 test_example.py"
