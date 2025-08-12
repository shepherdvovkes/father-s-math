import numpy as np
from typing import List, Tuple, Dict, Any
from .function_library import FunctionLibrary

class Calculator:
    """Вычислитель - выполняет расчеты для построения графиков"""
    
    def __init__(self, function_library: FunctionLibrary):
        self.function_library = function_library
    
    def calculate_points(self, function_name: str, params: List[float], 
                        x_range: Tuple[float, float] = (-10, 10), 
                        points_count: int = 1000) -> Dict[str, Any]:
        """
        Вычисляет точки для построения графика
        
        Args:
            function_name: Название функции
            params: Параметры функции
            x_range: Диапазон значений x (для декартовых координат)
            points_count: Количество точек для вычисления
            
        Returns:
            Словарь с данными для построения графика
        """
        func_info = self.function_library.get_function_info(function_name)
        if not func_info:
            return {"error": f"Функция '{function_name}' не найдена"}
        
        func_type = func_info["type"]
        func = func_info["function"]
        
        try:
            if func_type == "cartesian":
                return self._calculate_cartesian(func, params, x_range, points_count)
            elif func_type == "parametric":
                return self._calculate_parametric(func, params, points_count)
            elif func_type == "polar":
                return self._calculate_polar(func, params, points_count)
            else:
                return {"error": f"Неизвестный тип функции: {func_type}"}
        except Exception as e:
            return {"error": f"Ошибка вычисления: {str(e)}"}
    
    def _calculate_cartesian(self, func, params: List[float], 
                           x_range: Tuple[float, float], points_count: int) -> Dict[str, Any]:
        """Вычисление точек для декартовых координат"""
        x_min, x_max = x_range
        x = np.linspace(x_min, x_max, points_count)
        
        # Обработка особых случаев для функций с разрывами
        y = np.zeros_like(x)
        valid_mask = np.ones_like(x, dtype=bool)
        
        for i, xi in enumerate(x):
            try:
                y[i] = func(xi, *params)
                if not np.isfinite(y[i]):
                    valid_mask[i] = False
            except (ValueError, ZeroDivisionError, RuntimeWarning):
                valid_mask[i] = False
        
        # Фильтруем валидные точки
        x_valid = x[valid_mask]
        y_valid = y[valid_mask]
        
        return {
            "type": "cartesian",
            "x": x_valid.tolist(),
            "y": y_valid.tolist(),
            "x_range": x_range,
            "formula": self._get_formula_string(func, params)
        }
    
    def _calculate_parametric(self, func, params: List[float], points_count: int) -> Dict[str, Any]:
        """Вычисление точек для параметрических функций"""
        t = np.linspace(0, 2*np.pi, points_count)
        
        x = np.zeros_like(t)
        y = np.zeros_like(t)
        valid_mask = np.ones_like(t, dtype=bool)
        
        for i, ti in enumerate(t):
            try:
                result = func(ti, *params)
                if isinstance(result, tuple) and len(result) == 2:
                    x[i], y[i] = result
                else:
                    valid_mask[i] = False
                
                if not (np.isfinite(x[i]) and np.isfinite(y[i])):
                    valid_mask[i] = False
            except (ValueError, ZeroDivisionError, RuntimeWarning):
                valid_mask[i] = False
        
        # Фильтруем валидные точки
        x_valid = x[valid_mask]
        y_valid = y[valid_mask]
        
        return {
            "type": "parametric",
            "x": x_valid.tolist(),
            "y": y_valid.tolist(),
            "t": t[valid_mask].tolist(),
            "formula": self._get_formula_string(func, params)
        }
    
    def _calculate_polar(self, func, params: List[float], points_count: int) -> Dict[str, Any]:
        """Вычисление точек для полярных функций"""
        theta = np.linspace(0, 2*np.pi, points_count)
        
        r = np.zeros_like(theta)
        valid_mask = np.ones_like(theta, dtype=bool)
        
        for i, ti in enumerate(theta):
            try:
                r[i] = func(ti, *params)
                if not np.isfinite(r[i]) or r[i] < 0:
                    valid_mask[i] = False
            except (ValueError, ZeroDivisionError, RuntimeWarning):
                valid_mask[i] = False
        
        # Фильтруем валидные точки
        theta_valid = theta[valid_mask]
        r_valid = r[valid_mask]
        
        # Конвертируем в декартовы координаты для отображения
        x = r_valid * np.cos(theta_valid)
        y = r_valid * np.sin(theta_valid)
        
        return {
            "type": "polar",
            "x": x.tolist(),
            "y": y.tolist(),
            "r": r_valid.tolist(),
            "theta": theta_valid.tolist(),
            "formula": self._get_formula_string(func, params)
        }
    
    def _get_formula_string(self, func, params: List[float]) -> str:
        """Получить строковое представление формулы с подставленными параметрами"""
        # Это упрощенная версия - в реальном приложении можно сделать более сложную
        return f"f(x) с параметрами: {params}"
    
    def get_default_x_range(self, function_name: str) -> Tuple[float, float]:
        """Получить рекомендуемый диапазон x для функции"""
        func_info = self.function_library.get_function_info(function_name)
        if not func_info:
            return (-10, 10)
        
        func_type = func_info["type"]
        
        if func_type == "cartesian":
            # Специальные диапазоны для определенных функций
            if "Гипербола" in function_name:
                return (-10, -0.1), (0.1, 10)  # Исключаем ноль
            elif "Логарифмическая" in function_name:
                return (0.1, 10)  # Только положительные x
            elif "Квадратный корень" in function_name:
                return (0, 10)  # Только неотрицательные x
            else:
                return (-10, 10)
        elif func_type == "parametric":
            return (-5, 5)  # Для параметрических функций
        elif func_type == "polar":
            return (-5, 5)  # Для полярных функций
        else:
            return (-10, 10)
