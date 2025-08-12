import tkinter as tk
from tkinter import ttk
import matplotlib.pyplot as plt
from matplotlib.backends.backend_tkagg import FigureCanvasTkAgg, NavigationToolbar2Tk
from matplotlib.figure import Figure
import numpy as np
from typing import Dict, Any, List

class GraphCanvas:
    """Холст для отображения графиков"""
    
    def __init__(self, parent):
        self.parent = parent
        self.figure = None
        self.canvas = None
        self.toolbar = None
        self.ax = None
        
        self._create_widgets()
    
    def _create_widgets(self):
        """Создание виджетов для отображения графика"""
        # Основной фрейм
        self.main_frame = ttk.Frame(self.parent)
        self.main_frame.pack(fill=tk.BOTH, expand=True, padx=10, pady=10)
        
        # Создаем фигуру matplotlib
        self.figure = Figure(figsize=(10, 8), dpi=100)
        self.ax = self.figure.add_subplot(111)
        
        # Создаем холст
        self.canvas = FigureCanvasTkAgg(self.figure, self.main_frame)
        self.canvas.draw()
        self.canvas.get_tk_widget().pack(fill=tk.BOTH, expand=True)
        
        # Создаем панель инструментов
        self.toolbar = NavigationToolbar2Tk(self.canvas, self.main_frame)
        self.toolbar.update()
        
        # Начальная настройка графика
        self._setup_initial_plot()
    
    def _setup_initial_plot(self):
        """Начальная настройка графика"""
        self.ax.set_xlabel('X')
        self.ax.set_ylabel('Y')
        self.ax.set_title('График функции')
        self.ax.grid(True, alpha=0.3)
        self.ax.axhline(y=0, color='k', linestyle='-', alpha=0.3)
        self.ax.axvline(x=0, color='k', linestyle='-', alpha=0.3)
        self.ax.set_xlim(-10, 10)
        self.ax.set_ylim(-10, 10)
        
        # Добавляем текст с инструкциями
        self.ax.text(0.5, 0.5, 'Выберите функцию и нажмите "Построить график"', 
                    transform=self.ax.transAxes, ha='center', va='center',
                    fontsize=12, alpha=0.5)
        
        self.canvas.draw()
    
    def plot_function(self, data: Dict[str, Any]):
        """Построить график функции"""
        if "error" in data:
            self._show_error(data["error"])
            return
        
        # Очищаем график
        self.ax.clear()
        
        # Настраиваем базовые элементы
        self.ax.set_xlabel('X')
        self.ax.set_ylabel('Y')
        self.ax.grid(True, alpha=0.3)
        self.ax.axhline(y=0, color='k', linestyle='-', alpha=0.3)
        self.ax.axvline(x=0, color='k', linestyle='-', alpha=0.3)
        
        # Получаем данные
        x_data = data.get("x", [])
        y_data = data.get("y", [])
        plot_type = data.get("type", "cartesian")
        formula = data.get("formula", "")
        
        if not x_data or not y_data:
            self._show_error("Нет данных для построения графика")
            return
        
        # Строим график в зависимости от типа
        if plot_type == "cartesian":
            self._plot_cartesian(x_data, y_data, formula)
        elif plot_type == "parametric":
            self._plot_parametric(x_data, y_data, formula)
        elif plot_type == "polar":
            self._plot_polar(x_data, y_data, formula)
        else:
            self._plot_cartesian(x_data, y_data, formula)
        
        # Обновляем холст
        self.canvas.draw()
    
    def _plot_cartesian(self, x_data: List[float], y_data: List[float], formula: str):
        """Построение графика в декартовых координатах"""
        self.ax.plot(x_data, y_data, 'b-', linewidth=2, label=formula)
        self.ax.set_title(f'График функции: {formula}')
        
        # Автоматическое масштабирование
        if x_data and y_data:
            x_min, x_max = min(x_data), max(x_data)
            y_min, y_max = min(y_data), max(y_data)
            
            # Добавляем отступы
            x_range = x_max - x_min
            y_range = y_max - y_min
            
            if x_range > 0:
                self.ax.set_xlim(x_min - 0.1 * x_range, x_max + 0.1 * x_range)
            if y_range > 0:
                self.ax.set_ylim(y_min - 0.1 * y_range, y_max + 0.1 * y_range)
        
        self.ax.legend()
    
    def _plot_parametric(self, x_data: List[float], y_data: List[float], formula: str):
        """Построение параметрического графика"""
        self.ax.plot(x_data, y_data, 'r-', linewidth=2, label=formula)
        self.ax.set_title(f'Параметрический график: {formula}')
        
        # Автоматическое масштабирование
        if x_data and y_data:
            x_min, x_max = min(x_data), max(x_data)
            y_min, y_max = min(y_data), max(y_data)
            
            # Добавляем отступы
            x_range = x_max - x_min
            y_range = y_max - y_min
            
            if x_range > 0:
                self.ax.set_xlim(x_min - 0.1 * x_range, x_max + 0.1 * x_range)
            if y_range > 0:
                self.ax.set_ylim(y_min - 0.1 * y_range, y_max + 0.1 * y_range)
        
        self.ax.legend()
    
    def _plot_polar(self, x_data: List[float], y_data: List[float], formula: str):
        """Построение полярного графика"""
        self.ax.plot(x_data, y_data, 'g-', linewidth=2, label=formula)
        self.ax.set_title(f'Полярный график: {formula}')
        
        # Для полярных графиков устанавливаем равные масштабы
        if x_data and y_data:
            x_min, x_max = min(x_data), max(x_data)
            y_min, y_max = min(y_data), max(y_data)
            
            # Находим максимальный радиус
            max_radius = max(abs(x_min), abs(x_max), abs(y_min), abs(y_max))
            
            if max_radius > 0:
                self.ax.set_xlim(-max_radius * 1.1, max_radius * 1.1)
                self.ax.set_ylim(-max_radius * 1.1, max_radius * 1.1)
        
        self.ax.legend()
        
        # Добавляем круги для полярных координат
        max_radius = max(abs(x) for x in x_data) if x_data else 5
        for r in np.linspace(max_radius/4, max_radius, 4):
            circle = plt.Circle((0, 0), r, fill=False, color='gray', alpha=0.3, linestyle='--')
            self.ax.add_patch(circle)
    
    def _show_error(self, error_message: str):
        """Показать сообщение об ошибке"""
        self.ax.clear()
        self.ax.set_xlabel('X')
        self.ax.set_ylabel('Y')
        self.ax.set_title('Ошибка')
        self.ax.grid(True, alpha=0.3)
        self.ax.axhline(y=0, color='k', linestyle='-', alpha=0.3)
        self.ax.axvline(x=0, color='k', linestyle='-', alpha=0.3)
        self.ax.set_xlim(-10, 10)
        self.ax.set_ylim(-10, 10)
        
        # Отображаем сообщение об ошибке
        self.ax.text(0.5, 0.5, f'Ошибка: {error_message}', 
                    transform=self.ax.transAxes, ha='center', va='center',
                    fontsize=12, color='red', alpha=0.7)
        
        self.canvas.draw()
    
    def clear_plot(self):
        """Очистить график"""
        self._setup_initial_plot()
    
    def save_plot(self, filename: str):
        """Сохранить график в файл"""
        if self.figure:
            self.figure.savefig(filename, dpi=300, bbox_inches='tight')
    
    def get_figure(self):
        """Получить фигуру matplotlib"""
        return self.figure
