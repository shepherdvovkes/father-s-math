#!/usr/bin/env python3
"""
Простой тестовый скрипт для демонстрации работы Background Remover
"""

import os
import sys
from pathlib import Path

# Добавляем текущую директорию в путь для импорта
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from background_remover import BackgroundRemover

def test_single_image():
    """Тест обработки одного изображения"""
    print("🧪 Тестирование обработки одного изображения...")
    
    # Создаем тестовую директорию
    test_dir = Path("test_output")
    test_dir.mkdir(exist_ok=True)
    
    # Ищем тестовое изображение в родительской директории
    parent_dir = Path(__file__).parent.parent
    test_images = list(parent_dir.glob("*.png")) + list(parent_dir.glob("*.jpg"))
    
    if not test_images:
        print("❌ Тестовые изображения не найдены. Создайте PNG или JPG файл в корневой директории.")
        return False
    
    test_image = test_images[0]
    output_path = test_dir / f"test_output_{test_image.stem}.png"
    
    print(f"📸 Обработка: {test_image}")
    
    # Создаем экземпляр BackgroundRemover
    remover = BackgroundRemover(model_name="u2net")
    
    # Удаляем фон
    success = remover.remove_background(
        str(test_image),
        str(output_path),
        alpha_matting=False  # Отключаем для быстрого теста
    )
    
    if success:
        print(f"✅ Успешно! Результат сохранен: {output_path}")
        return True
    else:
        print("❌ Ошибка при обработке")
        return False

def test_directory_processing():
    """Тест обработки директории"""
    print("\n🧪 Тестирование обработки директории...")
    
    # Создаем тестовую директорию с изображениями
    test_input_dir = Path("test_input")
    test_output_dir = Path("test_output_dir")
    
    test_input_dir.mkdir(exist_ok=True)
    test_output_dir.mkdir(exist_ok=True)
    
    # Копируем тестовые изображения
    parent_dir = Path(__file__).parent.parent
    test_images = list(parent_dir.glob("*.png"))[:2] + list(parent_dir.glob("*.jpg"))[:2]
    
    if not test_images:
        print("❌ Тестовые изображения не найдены.")
        return False
    
    # Копируем изображения в тестовую директорию
    import shutil
    for img in test_images:
        shutil.copy2(img, test_input_dir / img.name)
    
    print(f"📁 Обработка директории: {test_input_dir}")
    
    # Создаем экземпляр BackgroundRemover
    remover = BackgroundRemover(model_name="u2netp")  # Используем легкую модель
    
    # Обрабатываем директорию
    stats = remover.process_directory(
        str(test_input_dir),
        str(test_output_dir),
        recursive=False,
        alpha_matting=False
    )
    
    print(f"📊 Статистика:")
    print(f"   Всего файлов: {stats['total']}")
    print(f"   Обработано: {stats['processed']}")
    print(f"   Ошибок: {stats['failed']}")
    
    return stats['processed'] > 0

def main():
    """Основная функция тестирования"""
    print("🚀 Запуск тестов Background Remover CLI")
    print("=" * 50)
    
    try:
        # Тест 1: Обработка одного изображения
        test1_success = test_single_image()
        
        # Тест 2: Обработка директории
        test2_success = test_directory_processing()
        
        print("\n" + "=" * 50)
        print("📋 Результаты тестирования:")
        print(f"   Тест 1 (один файл): {'✅ УСПЕХ' if test1_success else '❌ ОШИБКА'}")
        print(f"   Тест 2 (директория): {'✅ УСПЕХ' if test2_success else '❌ ОШИБКА'}")
        
        if test1_success and test2_success:
            print("\n🎉 Все тесты прошли успешно!")
            print("💡 Теперь вы можете использовать инструмент:")
            print("   python background_remover.py input.jpg output.png")
        else:
            print("\n⚠️  Некоторые тесты не прошли. Проверьте установку зависимостей.")
            
    except Exception as e:
        print(f"❌ Ошибка при тестировании: {e}")
        print("💡 Убедитесь, что установлены все зависимости:")
        print("   pip install -r requirements.txt")

if __name__ == "__main__":
    main()
