import tkinter as tk
from tkinter import ttk, messagebox
from typing import List, Dict, Callable

class UIPanel:
    """Панель управления - интерфейс для выбора функций и параметров"""
    
    def __init__(self, parent, controller):
        self.parent = parent
        self.controller = controller
        self.function_var = tk.StringVar()
        self.template_var = tk.StringVar()
        self.param_entries = []
        self.param_labels = []
        
        self._create_widgets()
        self._setup_bindings()
    
    def _create_widgets(self):
        """Создание элементов интерфейса"""
        # Основной фрейм
        self.main_frame = ttk.Frame(self.parent, padding="10")
        self.main_frame.grid(row=0, column=0, sticky=(tk.W, tk.E, tk.N, tk.S))
        
        # Заголовок
        title_label = ttk.Label(self.main_frame, text="Графический калькулятор функций", 
                               font=("Arial", 16, "bold"))
        title_label.grid(row=0, column=0, columnspan=2, pady=(0, 20))
        
        # Выбор функции
        ttk.Label(self.main_frame, text="Выберите функцию:").grid(row=1, column=0, sticky=tk.W, pady=5)
        self.function_combo = ttk.Combobox(self.main_frame, textvariable=self.function_var, 
                                         state="readonly", width=30)
        self.function_combo.grid(row=1, column=1, sticky=(tk.W, tk.E), pady=5)
        
        # Выбор шаблона
        ttk.Label(self.main_frame, text="Выберите шаблон:").grid(row=2, column=0, sticky=tk.W, pady=5)
        self.template_combo = ttk.Combobox(self.main_frame, textvariable=self.template_var, 
                                         state="readonly", width=30)
        self.template_combo.grid(row=2, column=1, sticky=(tk.W, tk.E), pady=5)
        
        # Фрейм для параметров
        self.params_frame = ttk.LabelFrame(self.main_frame, text="Параметры функции", padding="10")
        self.params_frame.grid(row=3, column=0, columnspan=2, sticky=(tk.W, tk.E), pady=10)
        
        # Диапазон X
        ttk.Label(self.main_frame, text="Диапазон X:").grid(row=4, column=0, sticky=tk.W, pady=5)
        range_frame = ttk.Frame(self.main_frame)
        range_frame.grid(row=4, column=1, sticky=(tk.W, tk.E), pady=5)
        
        ttk.Label(range_frame, text="от").pack(side=tk.LEFT)
        self.x_min_entry = ttk.Entry(range_frame, width=8)
        self.x_min_entry.pack(side=tk.LEFT, padx=5)
        self.x_min_entry.insert(0, "-10")
        
        ttk.Label(range_frame, text="до").pack(side=tk.LEFT, padx=5)
        self.x_max_entry = ttk.Entry(range_frame, width=8)
        self.x_max_entry.pack(side=tk.LEFT, padx=5)
        self.x_max_entry.insert(0, "10")
        
        # Кнопка построения графика
        self.plot_button = ttk.Button(self.main_frame, text="Построить график", 
                                     command=self._on_plot_button_click)
        self.plot_button.grid(row=5, column=0, columnspan=2, pady=20)
        
        # Информационная панель
        self.info_frame = ttk.LabelFrame(self.main_frame, text="Информация", padding="10")
        self.info_frame.grid(row=6, column=0, columnspan=2, sticky=(tk.W, tk.E), pady=10)
        
        self.formula_label = ttk.Label(self.info_frame, text="Выберите функцию для отображения формулы")
        self.formula_label.pack(anchor=tk.W)
        
        self.description_label = ttk.Label(self.info_frame, text="", wraplength=400)
        self.description_label.pack(anchor=tk.W, pady=5)
        
        # Настройка весов для растяжения
        self.main_frame.columnconfigure(1, weight=1)
    
    def _setup_bindings(self):
        """Настройка привязок событий"""
        self.function_combo.bind('<<ComboboxSelected>>', self._on_function_selected)
        self.template_combo.bind('<<ComboboxSelected>>', self._on_template_selected)
    
    def set_functions(self, functions: List[str]):
        """Установить список доступных функций"""
        self.function_combo['values'] = functions
        if functions:
            self.function_combo.set(functions[0])
            self._on_function_selected()
    
    def set_templates(self, templates: List[Dict]):
        """Установить список шаблонов для выбранной функции"""
        template_names = [t["name"] for t in templates]
        self.template_combo['values'] = template_names
        if template_names:
            self.template_combo.set(template_names[0])
            self._on_template_selected()
    
    def _on_function_selected(self, event=None):
        """Обработчик выбора функции"""
        selected_function = self.function_var.get()
        if selected_function and self.controller:
            # Обновляем информацию о функции
            self.controller.on_function_selected(selected_function)
            
            # Обновляем формулу
            formula = self.controller.get_function_formula(selected_function)
            self.formula_label.config(text=f"Формула: {formula}")
            
            # Обновляем описание
            description = self._get_function_description(selected_function)
            self.description_label.config(text=description)
    
    def _on_template_selected(self, event=None):
        """Обработчик выбора шаблона"""
        selected_template = self.template_var.get()
        if selected_template and self.controller:
            self.controller.on_template_selected(selected_template)
    
    def _on_plot_button_click(self):
        """Обработчик нажатия кнопки построения графика"""
        try:
            # Собираем параметры
            params = []
            for entry in self.param_entries:
                value = float(entry.get())
                params.append(value)
            
            # Получаем диапазон X
            x_min = float(self.x_min_entry.get())
            x_max = float(self.x_max_entry.get())
            
            if x_min >= x_max:
                messagebox.showerror("Ошибка", "Минимальное значение X должно быть меньше максимального")
                return
            
            # Вызываем контроллер
            self.controller.on_plot_requested(params, (x_min, x_max))
            
        except ValueError as e:
            messagebox.showerror("Ошибка", f"Неверный формат числа: {str(e)}")
        except Exception as e:
            messagebox.showerror("Ошибка", f"Произошла ошибка: {str(e)}")
    
    def update_parameters(self, param_names: List[str], param_values: List[float] = None):
        """Обновить поля параметров"""
        # Очищаем старые поля
        for widget in self.param_entries + self.param_labels:
            widget.destroy()
        
        self.param_entries = []
        self.param_labels = []
        
        # Создаем новые поля
        for i, param_name in enumerate(param_names):
            # Метка параметра
            label = ttk.Label(self.params_frame, text=f"{param_name}:")
            label.grid(row=i, column=0, sticky=tk.W, padx=(0, 10), pady=2)
            self.param_labels.append(label)
            
            # Поле ввода
            entry = ttk.Entry(self.params_frame, width=10)
            entry.grid(row=i, column=1, sticky=tk.W, pady=2)
            
            # Устанавливаем значение по умолчанию
            if param_values and i < len(param_values):
                entry.insert(0, str(param_values[i]))
            else:
                entry.insert(0, "0")
            
            self.param_entries.append(entry)
    
    def _get_function_description(self, function_name: str) -> str:
        """Получить описание функции"""
        descriptions = {
            "Прямая линия": "Линейная функция y = ax + b. График - прямая линия.",
            "Парабола": "Квадратичная функция y = ax² + bx + c. График - парабола.",
            "Кубическая парабола": "Кубическая функция y = ax³ + bx² + cx + d. Может иметь до двух экстремумов.",
            "Полином 4-й степени": "Полином четвертой степени. Может иметь сложную форму с несколькими экстремумами.",
            "Гипербола": "Рациональная функция y = a/(x - b) + c. Имеет вертикальную асимптоту x = b.",
            "Колокол Аньези": "Функция y = a/(x² + b). Создает симметричный колокол.",
            "Квадратный корень": "Функция y = a√(x - h) + k. Определена только для x ≥ h.",
            "Кубический корень": "Функция y = a∛(x - h) + k. Определена для всех x.",
            "Степенная функция": "Функция y = ax^b. Поведение зависит от степени b.",
            "Экспоненциальный рост": "Функция y = ae^(bx). Экспоненциальный рост или убывание.",
            "Колокол Гаусса": "Функция y = ae^(-b(x-c)²). Создает колоколообразную кривую.",
            "Сигмоида": "S-образная функция роста y = L/(1 + e^(-k(x-x₀))).",
            "Логарифмическая": "Логарифмическая функция y = a log_b(cx + d).",
            "Синусоида": "Тригонометрическая функция y = a sin(bx + c) + d. Периодическая волна.",
            "Тангенсоида": "Функция y = a tan(bx). Имеет вертикальные асимптоты.",
            "Секансоида": "Функция y = a sec(bx) = a/cos(bx).",
            "Sinc функция": "Функция y = a sin(x)/x. Создает затухающую волну.",
            "Затухающие колебания": "Функция y = ae^(-bx) cos(cx). Экспоненциально затухающие колебания.",
            "Модуль": "Функция y = a|x - h| + k. Создает V-образную форму.",
            "Ступенчатая функция": "Функция y = a floor(bx). Создает ступенчатую форму.",
            "Пила": "Функция y = a(x % b). Создает пилообразную форму.",
            "Эллипс": "Параметрическая функция x = a cos(t), y = b sin(t).",
            "Циклоида": "Параметрическая кривая - путь точки на ободе колеса.",
            "Фигуры Лиссажу": "Параметрические фигуры, создаваемые разными частотами.",
            "Астроида": "Параметрическая кривая в форме четырехконечной звезды.",
            "Спираль Архимеда": "Полярная функция r = aθ. Создает спираль.",
            "Роза": "Полярная функция r = a cos(kθ). Создает цветочную форму.",
            "Кардиоида": "Полярная функция r = a(1 - cos(θ)). Форма сердца.",
            "Лемниската Бернулли": "Полярная функция r² = a² cos(2θ). Форма знака бесконечности.",
            "Звезда Давида": "Полярная функция r = a + b cos(kθ). Создает звездообразную форму.",
            "Гармошка": "Функция y = a sin(b/x). Создает учащающиеся колебания."
        }
        return descriptions.get(function_name, "Описание недоступно")
