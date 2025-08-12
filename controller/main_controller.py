from typing import List, Dict, Tuple
from model.function_library import FunctionLibrary
from model.calculator import Calculator
from view.ui_panel import UIPanel
from view.graph_canvas import GraphCanvas

class MainController:
    """Главный контроллер - связывает Model и View"""
    
    def __init__(self, ui_panel: UIPanel, graph_canvas: GraphCanvas):
        # Инициализируем модель
        self.function_library = FunctionLibrary()
        self.calculator = Calculator(self.function_library)
        
        # Сохраняем ссылки на представления
        self.ui_panel = ui_panel
        self.graph_canvas = graph_canvas
        
        # Текущее состояние
        self.current_function = None
        self.current_template = None
        
        # Инициализируем интерфейс
        self._initialize_ui()
    
    def _initialize_ui(self):
        """Инициализация пользовательского интерфейса"""
        # Получаем список всех функций
        functions = self.function_library.get_function_names()
        
        # Устанавливаем функции в UI
        self.ui_panel.set_functions(functions)
        
        # Выбираем первую функцию по умолчанию
        if functions:
            self.on_function_selected(functions[0])
    
    def on_function_selected(self, function_name: str):
        """Обработчик выбора функции"""
        self.current_function = function_name
        
        # Получаем информацию о функции
        func_info = self.function_library.get_function_info(function_name)
        if not func_info:
            return
        
        # Получаем параметры функции
        param_names = func_info["params"]
        
        # Получаем шаблоны для этой функции
        templates = self.function_library.get_templates(function_name)
        
        # Обновляем UI
        self.ui_panel.set_templates(templates)
        self.ui_panel.update_parameters(param_names)
        
        # Обновляем диапазон X
        x_range = self.calculator.get_default_x_range(function_name)
        if isinstance(x_range, tuple) and len(x_range) == 2:
            self.ui_panel.x_min_entry.delete(0, 'end')
            self.ui_panel.x_min_entry.insert(0, str(x_range[0]))
            self.ui_panel.x_max_entry.delete(0, 'end')
            self.ui_panel.x_max_entry.insert(0, str(x_range[1]))
    
    def on_template_selected(self, template_name: str):
        """Обработчик выбора шаблона"""
        if not self.current_function:
            return
        
        # Получаем шаблоны для текущей функции
        templates = self.function_library.get_templates(self.current_function)
        
        # Находим выбранный шаблон
        selected_template = None
        for template in templates:
            if template["name"] == template_name:
                selected_template = template
                break
        
        if selected_template:
            self.current_template = selected_template
            
            # Обновляем параметры в UI
            param_values = selected_template["params"]
            func_info = self.function_library.get_function_info(self.current_function)
            param_names = func_info["params"]
            
            self.ui_panel.update_parameters(param_names, param_values)
    
    def on_plot_requested(self, params: List[float], x_range: Tuple[float, float]):
        """Обработчик запроса на построение графика"""
        if not self.current_function:
            return
        
        # Вычисляем точки графика
        result = self.calculator.calculate_points(
            self.current_function, 
            params, 
            x_range
        )
        
        # Отображаем график
        self.graph_canvas.plot_function(result)
    
    def get_function_formula(self, function_name: str) -> str:
        """Получить формулу функции"""
        func_info = self.function_library.get_function_info(function_name)
        return func_info.get("formula", "Формула недоступна") if func_info else "Функция не найдена"
    
    def get_function_type(self, function_name: str) -> str:
        """Получить тип функции"""
        func_info = self.function_library.get_function_info(function_name)
        return func_info.get("type", "unknown") if func_info else "unknown"
    
    def get_available_functions(self) -> List[str]:
        """Получить список доступных функций"""
        return self.function_library.get_function_names()
    
    def get_function_templates(self, function_name: str) -> List[Dict]:
        """Получить шаблоны для функции"""
        return self.function_library.get_templates(function_name)
    
    def get_function_parameters(self, function_name: str) -> List[str]:
        """Получить параметры функции"""
        func_info = self.function_library.get_function_info(function_name)
        return func_info.get("params", []) if func_info else []
    
    def calculate_function(self, function_name: str, params: List[float], 
                          x_range: Tuple[float, float] = (-10, 10)) -> Dict:
        """Вычислить функцию и получить точки графика"""
        return self.calculator.calculate_points(function_name, params, x_range)
    
    def save_current_plot(self, filename: str):
        """Сохранить текущий график"""
        self.graph_canvas.save_plot(filename)
    
    def clear_plot(self):
        """Очистить график"""
        self.graph_canvas.clear_plot()
