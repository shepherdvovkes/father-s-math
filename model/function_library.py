import numpy as np
from typing import Dict, List, Tuple, Callable, Any
from .templates import get_all_templates

class FunctionLibrary:
    """Библиотека функций - хранит все доступные функции и их шаблоны"""
    
    def __init__(self):
        self.functions = self._initialize_functions()
        self.templates = self._initialize_templates()
    
    def _initialize_functions(self) -> Dict[str, Dict]:
        """Инициализация всех 30 функций"""
        return {
            # Полиномиальные функции
            "Прямая линия": {
                "formula": "y = ax + b",
                "function": lambda x, a, b: a * x + b,
                "params": ["a", "b"],
                "type": "cartesian"
            },
            "Парабола": {
                "formula": "y = ax² + bx + c",
                "function": lambda x, a, b, c: a * x**2 + b * x + c,
                "params": ["a", "b", "c"],
                "type": "cartesian"
            },
            "Кубическая парабола": {
                "formula": "y = ax³ + bx² + cx + d",
                "function": lambda x, a, b, c, d: a * x**3 + b * x**2 + c * x + d,
                "params": ["a", "b", "c", "d"],
                "type": "cartesian"
            },
            "Полином 4-й степени": {
                "formula": "y = ax⁴ + bx³ + cx² + dx + e",
                "function": lambda x, a, b, c, d, e: a * x**4 + b * x**3 + c * x**2 + d * x + e,
                "params": ["a", "b", "c", "d", "e"],
                "type": "cartesian"
            },
            
            # Рациональные функции
            "Гипербола": {
                "formula": "y = a/(x - b) + c",
                "function": lambda x, a, b, c: a / (x - b) + c,
                "params": ["a", "b", "c"],
                "type": "cartesian"
            },
            "Колокол Аньези": {
                "formula": "y = a/(x² + b)",
                "function": lambda x, a, b: a / (x**2 + b),
                "params": ["a", "b"],
                "type": "cartesian"
            },
            
            # Степенные и корневые функции
            "Квадратный корень": {
                "formula": "y = a√(x - h) + k",
                "function": lambda x, a, h, k: a * np.sqrt(x - h) + k,
                "params": ["a", "h", "k"],
                "type": "cartesian"
            },
            "Кубический корень": {
                "formula": "y = a∛(x - h) + k",
                "function": lambda x, a, h, k: a * np.cbrt(x - h) + k,
                "params": ["a", "h", "k"],
                "type": "cartesian"
            },
            "Степенная функция": {
                "formula": "y = ax^b",
                "function": lambda x, a, b: a * x**b,
                "params": ["a", "b"],
                "type": "cartesian"
            },
            
            # Экспоненциальные функции
            "Экспоненциальный рост": {
                "formula": "y = ae^(bx)",
                "function": lambda x, a, b: a * np.exp(b * x),
                "params": ["a", "b"],
                "type": "cartesian"
            },
            "Колокол Гаусса": {
                "formula": "y = ae^(-b(x-c)²)",
                "function": lambda x, a, b, c: a * np.exp(-b * (x - c)**2),
                "params": ["a", "b", "c"],
                "type": "cartesian"
            },
            "Сигмоида": {
                "formula": "y = L/(1 + e^(-k(x-x₀)))",
                "function": lambda x, L, k, x0: L / (1 + np.exp(-k * (x - x0))),
                "params": ["L", "k", "x0"],
                "type": "cartesian"
            },
            
            # Логарифмические функции
            "Логарифмическая": {
                "formula": "y = a log_b(cx + d)",
                "function": lambda x, a, b, c, d: a * np.log(c * x + d) / np.log(b),
                "params": ["a", "b", "c", "d"],
                "type": "cartesian"
            },
            
            # Тригонометрические функции
            "Синусоида": {
                "formula": "y = a sin(bx + c) + d",
                "function": lambda x, a, b, c, d: a * np.sin(b * x + c) + d,
                "params": ["a", "b", "c", "d"],
                "type": "cartesian"
            },
            "Тангенсоида": {
                "formula": "y = a tan(bx)",
                "function": lambda x, a, b: a * np.tan(b * x),
                "params": ["a", "b"],
                "type": "cartesian"
            },
            "Секансоида": {
                "formula": "y = a sec(bx)",
                "function": lambda x, a, b: a / np.cos(b * x),
                "params": ["a", "b"],
                "type": "cartesian"
            },
            "Sinc функция": {
                "formula": "y = a sin(x)/x",
                "function": lambda x, a: a * np.sin(x) / x,
                "params": ["a"],
                "type": "cartesian"
            },
            "Затухающие колебания": {
                "formula": "y = ae^(-bx) cos(cx)",
                "function": lambda x, a, b, c: a * np.exp(-b * x) * np.cos(c * x),
                "params": ["a", "b", "c"],
                "type": "cartesian"
            },
            
            # Модульные и кусочные функции
            "Модуль": {
                "formula": "y = a|x - h| + k",
                "function": lambda x, a, h, k: a * np.abs(x - h) + k,
                "params": ["a", "h", "k"],
                "type": "cartesian"
            },
            "Ступенчатая функция": {
                "formula": "y = a floor(bx)",
                "function": lambda x, a, b: a * np.floor(b * x),
                "params": ["a", "b"],
                "type": "cartesian"
            },
            "Пила": {
                "formula": "y = a(x % b)",
                "function": lambda x, a, b: a * (x % b),
                "params": ["a", "b"],
                "type": "cartesian"
            },
            
            # Параметрические функции
            "Эллипс": {
                "formula": "x = a cos(t), y = b sin(t)",
                "function": lambda t, a, b: (a * np.cos(t), b * np.sin(t)),
                "params": ["a", "b"],
                "type": "parametric"
            },
            "Циклоида": {
                "formula": "x = a(t-sin(t)), y = a(1-cos(t))",
                "function": lambda t, a: (a * (t - np.sin(t)), a * (1 - np.cos(t))),
                "params": ["a"],
                "type": "parametric"
            },
            "Фигуры Лиссажу": {
                "formula": "x = cos(at), y = sin(bt)",
                "function": lambda t, a, b: (np.cos(a * t), np.sin(b * t)),
                "params": ["a", "b"],
                "type": "parametric"
            },
            "Астроида": {
                "formula": "x = a cos³(t), y = a sin³(t)",
                "function": lambda t, a: (a * np.cos(t)**3, a * np.sin(t)**3),
                "params": ["a"],
                "type": "parametric"
            },
            
            # Полярные функции
            "Спираль Архимеда": {
                "formula": "r = aθ",
                "function": lambda theta, a: a * theta,
                "params": ["a"],
                "type": "polar"
            },
            "Роза": {
                "formula": "r = a cos(kθ)",
                "function": lambda theta, a, k: a * np.cos(k * theta),
                "params": ["a", "k"],
                "type": "polar"
            },
            "Кардиоида": {
                "formula": "r = a(1 - cos(θ))",
                "function": lambda theta, a: a * (1 - np.cos(theta)),
                "params": ["a"],
                "type": "polar"
            },
            "Лемниската Бернулли": {
                "formula": "r² = a² cos(2θ)",
                "function": lambda theta, a: a * np.sqrt(np.cos(2 * theta)),
                "params": ["a"],
                "type": "polar"
            },
            "Звезда Давида": {
                "formula": "r = a + b cos(kθ)",
                "function": lambda theta, a, b, k: a + b * np.cos(k * theta),
                "params": ["a", "b", "k"],
                "type": "polar"
            },
            
            # Экзотические функции
            "Гармошка": {
                "formula": "y = a sin(b/x)",
                "function": lambda x, a, b: a * np.sin(b / x),
                "params": ["a", "b"],
                "type": "cartesian"
            }
        }
    
    def _initialize_templates(self) -> Dict[str, List[Dict]]:
        """Инициализация шаблонов для каждой функции"""
        return get_all_templates()
    
    def get_function_names(self) -> List[str]:
        """Получить список всех доступных функций"""
        return list(self.functions.keys())
    
    def get_function_info(self, function_name: str) -> Dict:
        """Получить информацию о функции"""
        return self.functions.get(function_name, {})
    
    def get_templates(self, function_name: str) -> List[Dict]:
        """Получить шаблоны для функции"""
        return self.templates.get(function_name, [])
    
    def get_function(self, function_name: str) -> Callable:
        """Получить функцию по имени"""
        func_info = self.functions.get(function_name)
        return func_info["function"] if func_info else None
