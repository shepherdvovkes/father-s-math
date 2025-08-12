#!/usr/bin/env python3
"""
Тестовый скрипт для проверки работы графического калькулятора функций
"""

import sys
import os
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from model.function_library import FunctionLibrary
from model.calculator import Calculator

def test_function_library():
    """Тестирование библиотеки функций"""
    print("🧪 Тестирование библиотеки функций...")
    
    library = FunctionLibrary()
    
    # Проверяем количество функций
    functions = library.get_function_names()
    assert len(functions) == 31, f"Ожидалось 31 функция, получено {len(functions)}"
    print(f"✅ Найдено {len(functions)} функций")
    
    # Проверяем несколько функций
    test_functions = ["Парабола", "Синусоида", "Звезда Давида", "Экспоненциальный рост"]
    for func_name in test_functions:
        func_info = library.get_function_info(func_name)
        assert func_info is not None, f"Функция {func_name} не найдена"
        assert "formula" in func_info, f"У функции {func_name} нет формулы"
        assert "function" in func_info, f"У функции {func_name} нет функции"
        assert "params" in func_info, f"У функции {func_name} нет параметров"
        print(f"✅ Функция '{func_name}' корректна")
    
    # Проверяем шаблоны
    templates = library.get_templates("Парабола")
    assert len(templates) == 10, f"Ожидалось 10 шаблонов для параболы, получено {len(templates)}"
    print(f"✅ Найдено {len(templates)} шаблонов для параболы")
    
    print("✅ Библиотека функций работает корректно\n")

def test_calculator():
    """Тестирование калькулятора"""
    print("🧮 Тестирование калькулятора...")
    
    library = FunctionLibrary()
    calculator = Calculator(library)
    
    # Тестируем декартовые координаты
    result = calculator.calculate_points("Парабола", [1, 0, 0], (-5, 5))
    assert "error" not in result, f"Ошибка при вычислении параболы: {result.get('error', '')}"
    assert "x" in result, "Нет координат X в результате"
    assert "y" in result, "Нет координат Y в результате"
    assert len(result["x"]) > 0, "Пустой массив координат X"
    assert len(result["y"]) > 0, "Пустой массив координат Y"
    print("✅ Декартовые координаты работают")
    
    # Тестируем полярные координаты
    result = calculator.calculate_points("Звезда Давида", [4, -2, 6])
    assert "error" not in result, f"Ошибка при вычислении звезды: {result.get('error', '')}"
    assert "x" in result, "Нет координат X в результате"
    assert "y" in result, "Нет координат Y в результате"
    print("✅ Полярные координаты работают")
    
    # Тестируем параметрические координаты
    result = calculator.calculate_points("Эллипс", [2, 1])
    assert "error" not in result, f"Ошибка при вычислении эллипса: {result.get('error', '')}"
    assert "x" in result, "Нет координат X в результате"
    assert "y" in result, "Нет координат Y в результате"
    print("✅ Параметрические координаты работают")
    
    # Тестируем обработку ошибок
    result = calculator.calculate_points("Несуществующая функция", [1, 2, 3])
    assert "error" in result, "Ожидалась ошибка для несуществующей функции"
    print("✅ Обработка ошибок работает")
    
    print("✅ Калькулятор работает корректно\n")

def test_special_cases():
    """Тестирование специальных случаев"""
    print("🎯 Тестирование специальных случаев...")
    
    library = FunctionLibrary()
    calculator = Calculator(library)
    
    # Тестируем функции с разрывами
    result = calculator.calculate_points("Гипербола", [1, 0, 0], (-5, 5))
    assert "error" not in result, f"Ошибка при вычислении гиперболы: {result.get('error', '')}"
    print("✅ Функции с разрывами обрабатываются корректно")
    
    # Тестируем функции с ограниченной областью определения
    result = calculator.calculate_points("Квадратный корень", [1, 0, 0], (-5, 5))
    assert "error" not in result, f"Ошибка при вычислении корня: {result.get('error', '')}"
    print("✅ Функции с ограниченной областью определения обрабатываются корректно")
    
    # Тестируем тригонометрические функции
    result = calculator.calculate_points("Синусоида", [1, 1, 0, 0], (-10, 10))
    assert "error" not in result, f"Ошибка при вычислении синусоиды: {result.get('error', '')}"
    print("✅ Тригонометрические функции работают корректно")
    
    print("✅ Специальные случаи обрабатываются корректно\n")

def test_star_of_david():
    """Специальный тест для Звезды Давида"""
    print("⭐ Специальный тест: Звезда Давида...")
    
    library = FunctionLibrary()
    calculator = Calculator(library)
    
    # Тестируем классическую звезду
    result = calculator.calculate_points("Звезда Давида", [4, -2, 6])
    assert "error" not in result, f"Ошибка при вычислении звезды: {result.get('error', '')}"
    
    # Проверяем, что получили замкнутую фигуру
    x_coords = result["x"]
    y_coords = result["y"]
    
    # Проверяем, что есть точки в разных квадрантах
    has_positive_x = any(x > 0 for x in x_coords)
    has_negative_x = any(x < 0 for x in x_coords)
    has_positive_y = any(y > 0 for y in y_coords)
    has_negative_y = any(y < 0 for y in y_coords)
    
    assert has_positive_x and has_negative_x, "Звезда должна иметь точки с положительными и отрицательными X"
    assert has_positive_y and has_negative_y, "Звезда должна иметь точки с положительными и отрицательными Y"
    
    print("✅ Звезда Давида создается корректно")
    print(f"   Количество точек: {len(x_coords)}")
    print(f"   Диапазон X: [{min(x_coords):.2f}, {max(x_coords):.2f}]")
    print(f"   Диапазон Y: [{min(y_coords):.2f}, {max(y_coords):.2f}]")
    print("✅ Специальный тест пройден\n")

def main():
    """Главная функция тестирования"""
    print("🚀 Запуск тестов графического калькулятора функций")
    print("=" * 60)
    
    try:
        test_function_library()
        test_calculator()
        test_special_cases()
        test_star_of_david()
        
        print("🎉 Все тесты пройдены успешно!")
        print("✅ Программа готова к использованию")
        print("\nДля запуска графического интерфейса выполните:")
        print("   python main.py")
        
    except Exception as e:
        print(f"❌ Ошибка в тестах: {e}")
        sys.exit(1)

if __name__ == "__main__":
    main()
