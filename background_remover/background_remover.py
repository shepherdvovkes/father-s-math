#!/usr/bin/env python3
"""
CLI инструмент для удаления фона с изображений
Поддерживает форматы: PNG, JPG, JPEG, WEBP, TIFF, BMP
"""

import os
import sys
import click
from pathlib import Path
from typing import List, Optional
from tqdm import tqdm
import logging

try:
    from rembg import remove, new_session
    from PIL import Image, ImageOps
except ImportError as e:
    print(f"Ошибка импорта: {e}")
    print("Установите зависимости: pip install -r requirements.txt")
    sys.exit(1)

# Настройка логирования
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

# Поддерживаемые форматы
SUPPORTED_FORMATS = {'.png', '.jpg', '.jpeg', '.webp', '.tiff', '.tif', '.bmp'}

class BackgroundRemover:
    """Класс для удаления фона с изображений"""
    
    def __init__(self, model_name: str = "u2net"):
        """
        Инициализация с указанной моделью
        
        Args:
            model_name: Название модели для удаления фона
        """
        self.model_name = model_name
        self.session = None
        
    def _get_session(self):
        """Получение сессии для модели"""
        if self.session is None:
            self.session = new_session(self.model_name)
        return self.session
    
    def remove_background(self, input_path: str, output_path: str, 
                         alpha_matting: bool = False, alpha_matting_foreground_threshold: int = 240,
                         alpha_matting_background_threshold: int = 10, alpha_matting_erode_size: int = 10) -> bool:
        """
        Удаление фона с изображения
        
        Args:
            input_path: Путь к входному изображению
            output_path: Путь для сохранения результата
            alpha_matting: Использовать alpha matting для лучшего качества
            alpha_matting_foreground_threshold: Порог для переднего плана
            alpha_matting_background_threshold: Порог для фона
            alpha_matting_erode_size: Размер эрозии
            
        Returns:
            bool: True если успешно, False в противном случае
        """
        try:
            logger.info(f"Обработка: {input_path}")
            
            # Чтение входного изображения
            with open(input_path, 'rb') as input_file:
                input_data = input_file.read()
            
            # Удаление фона
            output_data = remove(
                input_data,
                session=self._get_session(),
                alpha_matting=alpha_matting,
                alpha_matting_foreground_threshold=alpha_matting_foreground_threshold,
                alpha_matting_background_threshold=alpha_matting_background_threshold,
                alpha_matting_erode_size=alpha_matting_erode_size
            )
            
            # Сохранение результата
            with open(output_path, 'wb') as output_file:
                output_file.write(output_data)
            
            logger.info(f"Сохранено: {output_path}")
            return True
            
        except Exception as e:
            logger.error(f"Ошибка при обработке {input_path}: {e}")
            return False
    
    def process_directory(self, input_dir: str, output_dir: str, 
                         recursive: bool = False, **kwargs) -> dict:
        """
        Обработка всех изображений в директории
        
        Args:
            input_dir: Входная директория
            output_dir: Выходная директория
            recursive: Рекурсивный обход поддиректорий
            **kwargs: Дополнительные параметры для remove_background
            
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
        
        for image_file in tqdm(image_files, desc="Удаление фона"):
            # Определение относительного пути для сохранения структуры директорий
            if recursive:
                rel_path = image_file.relative_to(input_path)
                output_file = output_path / rel_path.with_suffix('.png')
                output_file.parent.mkdir(parents=True, exist_ok=True)
            else:
                output_file = output_path / f"{image_file.stem}_nobg.png"
            
            if self.remove_background(str(image_file), str(output_file), **kwargs):
                processed += 1
            else:
                failed += 1
        
        return {
            "processed": processed,
            "failed": failed,
            "total": len(image_files)
        }

@click.command()
@click.argument('input_path', type=click.Path(exists=True))
@click.argument('output_path', type=click.Path())
@click.option('--recursive', '-r', is_flag=True, help='Рекурсивный обход поддиректорий')
@click.option('--model', '-m', default='u2net', 
              type=click.Choice(['u2net', 'u2netp', 'u2net_human_seg', 'u2net_cloth_seg', 'silueta', 'isnet-general-use', 'isnet-anime']),
              help='Модель для удаления фона')
@click.option('--alpha-matting', is_flag=True, help='Использовать alpha matting для лучшего качества')
@click.option('--foreground-threshold', default=240, type=int, help='Порог для переднего плана (0-255)')
@click.option('--background-threshold', default=10, type=int, help='Порог для фона (0-255)')
@click.option('--erode-size', default=10, type=int, help='Размер эрозии для alpha matting')
@click.option('--format', '-f', default='png', 
              type=click.Choice(['png', 'webp']), help='Формат выходного файла')
@click.option('--verbose', '-v', is_flag=True, help='Подробный вывод')
def main(input_path, output_path, recursive, model, alpha_matting, 
         foreground_threshold, background_threshold, erode_size, format, verbose):
    """
    CLI инструмент для удаления фона с изображений
    
    INPUT_PATH: Путь к файлу или директории с изображениями
    OUTPUT_PATH: Путь для сохранения результата
    """
    if verbose:
        logging.getLogger().setLevel(logging.DEBUG)
    
    # Инициализация инструмента
    remover = BackgroundRemover(model_name=model)
    
    input_path = Path(input_path)
    output_path = Path(output_path)
    
    try:
        if input_path.is_file():
            # Обработка одного файла
            if not input_path.suffix.lower() in SUPPORTED_FORMATS:
                click.echo(f"Неподдерживаемый формат: {input_path.suffix}")
                sys.exit(1)
            
            # Определение выходного файла
            if output_path.is_dir():
                output_file = output_path / f"{input_path.stem}_nobg.{format}"
            else:
                output_file = output_path.with_suffix(f'.{format}')
            
            # Создание директории если нужно
            output_file.parent.mkdir(parents=True, exist_ok=True)
            
            success = remover.remove_background(
                str(input_path),
                str(output_file),
                alpha_matting=alpha_matting,
                alpha_matting_foreground_threshold=foreground_threshold,
                alpha_matting_background_threshold=background_threshold,
                alpha_matting_erode_size=erode_size
            )
            
            if success:
                click.echo(f"✅ Фон успешно удален: {output_file}")
            else:
                click.echo(f"❌ Ошибка при обработке: {input_path}")
                sys.exit(1)
                
        elif input_path.is_dir():
            # Обработка директории
            if not output_path.exists():
                output_path.mkdir(parents=True, exist_ok=True)
            
            stats = remover.process_directory(
                str(input_path),
                str(output_path),
                recursive=recursive,
                alpha_matting=alpha_matting,
                alpha_matting_foreground_threshold=foreground_threshold,
                alpha_matting_background_threshold=background_threshold,
                alpha_matting_erode_size=erode_size
            )
            
            click.echo(f"\n📊 Статистика обработки:")
            click.echo(f"   Всего файлов: {stats['total']}")
            click.echo(f"   Обработано: {stats['processed']}")
            click.echo(f"   Ошибок: {stats['failed']}")
            
            if stats['failed'] > 0:
                sys.exit(1)
        else:
            click.echo(f"❌ Путь не существует: {input_path}")
            sys.exit(1)
            
    except Exception as e:
        click.echo(f"❌ Ошибка: {e}")
        sys.exit(1)

if __name__ == '__main__':
    main()
