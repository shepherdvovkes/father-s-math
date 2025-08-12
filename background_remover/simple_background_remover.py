#!/usr/bin/env python3
"""
Упрощенный CLI инструмент для удаления фона с изображений
Использует более стабильные зависимости
"""

import os
import sys
import argparse
from pathlib import Path
from typing import List, Optional
import logging

# Настройка логирования
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

# Поддерживаемые форматы
SUPPORTED_FORMATS = {'.png', '.jpg', '.jpeg', '.webp', '.tiff', '.tif', '.bmp'}

def check_dependencies():
    """Проверка и установка зависимостей"""
    try:
        import PIL
        print("✅ Pillow установлен")
    except ImportError:
        print("❌ Pillow не установлен. Устанавливаем...")
        os.system("pip install Pillow")
    
    try:
        import rembg
        print("✅ rembg установлен")
    except ImportError:
        print("❌ rembg не установлен. Устанавливаем...")
        os.system("pip install rembg")
    
    try:
        import tqdm
        print("✅ tqdm установлен")
    except ImportError:
        print("❌ tqdm не установлен. Устанавливаем...")
        os.system("pip install tqdm")

def remove_background_simple(input_path: str, output_path: str, model: str = "u2net") -> bool:
    """
    Простое удаление фона с изображения
    
    Args:
        input_path: Путь к входному изображению
        output_path: Путь для сохранения результата
        model: Модель для удаления фона
        
    Returns:
        bool: True если успешно, False в противном случае
    """
    try:
        logger.info(f"Обработка: {input_path}")
        
        # Импорт rembg только при необходимости
        from rembg import remove, new_session
        
        # Создание сессии
        session = new_session(model)
        
        # Чтение входного изображения
        with open(input_path, 'rb') as input_file:
            input_data = input_file.read()
        
        # Удаление фона
        output_data = remove(input_data, session=session)
        
        # Сохранение результата
        with open(output_path, 'wb') as output_file:
            output_file.write(output_data)
        
        logger.info(f"Сохранено: {output_path}")
        return True
        
    except Exception as e:
        logger.error(f"Ошибка при обработке {input_path}: {e}")
        return False

def process_directory_simple(input_dir: str, output_dir: str, 
                           recursive: bool = False, model: str = "u2net") -> dict:
    """
    Обработка всех изображений в директории
    
    Args:
        input_dir: Входная директория
        output_dir: Выходная директория
        recursive: Рекурсивный обход поддиректорий
        model: Модель для удаления фона
        
    Returns:
        dict: Статистика обработки
    """
    input_path = Path(input_dir)
    output_path = Path(output_dir)
    
    if not input_path.exists():
        raise FileNotFoundError(f"Директория не найдена: {input_dir}")
    
    # Создание выходной директории
    output_path.mkdir(parents=True, exist_ok=True)
    
    # Поиск всех изображений
    image_files = []
    if recursive:
        pattern = "**/*"
    else:
        pattern = "*"
        
    for file_path in input_path.glob(pattern):
        if file_path.is_file() and file_path.suffix.lower() in SUPPORTED_FORMATS:
            image_files.append(file_path)
    
    if not image_files:
        logger.warning(f"Изображения не найдены в {input_dir}")
        return {"processed": 0, "failed": 0, "total": 0}
    
    logger.info(f"Найдено {len(image_files)} изображений для обработки")
    
    # Обработка изображений
    processed = 0
    failed = 0
    
    try:
        from tqdm import tqdm
        progress_bar = tqdm(image_files, desc="Удаление фона")
    except ImportError:
        progress_bar = image_files
    
    for image_file in progress_bar:
        # Определение относительного пути для сохранения структуры директорий
        if recursive:
            rel_path = image_file.relative_to(input_path)
            output_file = output_path / rel_path.with_suffix('.png')
            output_file.parent.mkdir(parents=True, exist_ok=True)
        else:
            output_file = output_path / f"{image_file.stem}_nobg.png"
        
        if remove_background_simple(str(image_file), str(output_file), model):
            processed += 1
        else:
            failed += 1
    
    return {
        "processed": processed,
        "failed": failed,
        "total": len(image_files)
    }

def main():
    """Основная функция"""
    parser = argparse.ArgumentParser(
        description="CLI инструмент для удаления фона с изображений",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
Примеры использования:
  %(prog)s photo.jpg result.png
  %(prog)s -r photos/ results/
  %(prog)s -m u2net_human_seg portrait.jpg result.png
        """
    )
    
    parser.add_argument('input_path', help='Путь к файлу или директории с изображениями')
    parser.add_argument('output_path', help='Путь для сохранения результата')
    parser.add_argument('-r', '--recursive', action='store_true', 
                       help='Рекурсивный обход поддиректорий')
    parser.add_argument('-m', '--model', default='u2net',
                       choices=['u2net', 'u2netp', 'u2net_human_seg', 'u2net_cloth_seg', 
                               'silueta', 'isnet-general-use', 'isnet-anime'],
                       help='Модель для удаления фона (по умолчанию: u2net)')
    parser.add_argument('-v', '--verbose', action='store_true', help='Подробный вывод')
    parser.add_argument('--check-deps', action='store_true', help='Проверить и установить зависимости')
    
    args = parser.parse_args()
    
    if args.verbose:
        logging.getLogger().setLevel(logging.DEBUG)
    
    if args.check_deps:
        check_dependencies()
        return
    
    input_path = Path(args.input_path)
    output_path = Path(args.output_path)
    
    try:
        if input_path.is_file():
            # Обработка одного файла
            if not input_path.suffix.lower() in SUPPORTED_FORMATS:
                print(f"❌ Неподдерживаемый формат: {input_path.suffix}")
                sys.exit(1)
            
            # Определение выходного файла
            if output_path.is_dir():
                output_file = output_path / f"{input_path.stem}_nobg.png"
            else:
                output_file = output_path.with_suffix('.png')
            
            # Создание директории если нужно
            output_file.parent.mkdir(parents=True, exist_ok=True)
            
            success = remove_background_simple(str(input_path), str(output_file), args.model)
            
            if success:
                print(f"✅ Фон успешно удален: {output_file}")
            else:
                print(f"❌ Ошибка при обработке: {input_path}")
                sys.exit(1)
                
        elif input_path.is_dir():
            # Обработка директории
            if not output_path.exists():
                output_path.mkdir(parents=True, exist_ok=True)
            
            stats = process_directory_simple(
                str(input_path),
                str(output_path),
                recursive=args.recursive,
                model=args.model
            )
            
            print(f"\n📊 Статистика обработки:")
            print(f"   Всего файлов: {stats['total']}")
            print(f"   Обработано: {stats['processed']}")
            print(f"   Ошибок: {stats['failed']}")
            
            if stats['failed'] > 0:
                sys.exit(1)
        else:
            print(f"❌ Путь не существует: {input_path}")
            sys.exit(1)
            
    except Exception as e:
        print(f"❌ Ошибка: {e}")
        sys.exit(1)

if __name__ == '__main__':
    main()
