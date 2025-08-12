#!/usr/bin/env python3
"""
Графический калькулятор функций
Главный файл для запуска приложения
"""

import tkinter as tk
from tkinter import ttk, messagebox
import sys
import os

# Добавляем текущую директорию в путь для импорта
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from view.ui_panel import UIPanel
from view.graph_canvas import GraphCanvas
from controller.main_controller import MainController

class FunctionGraphApp:
    """Главное приложение"""
    
    def __init__(self, root):
        self.root = root
        self.root.title("Графический калькулятор функций")
        self.root.geometry("1400x900")
        
        # Настройка стиля
        self._setup_style()
        
        # Создание главного окна
        self._create_main_window()
        
        # Создание контроллера
        self.controller = MainController(self.ui_panel, self.graph_canvas)
        
        # Устанавливаем контроллер в UI панель
        self.ui_panel.controller = self.controller
        
        # Настройка меню
        self._create_menu()
        
        # Обработчик закрытия окна
        self.root.protocol("WM_DELETE_WINDOW", self._on_closing)
    
    def _setup_style(self):
        """Настройка стиля приложения"""
        style = ttk.Style()
        style.theme_use('clam')  # Используем современную тему
        
        # Настройка цветов
        style.configure('Title.TLabel', font=('Arial', 16, 'bold'))
        style.configure('Info.TLabel', font=('Arial', 10))
        
        # Настройка кнопок
        style.configure('Action.TButton', font=('Arial', 10, 'bold'))
    
    def _create_main_window(self):
        """Создание главного окна"""
        # Главный контейнер
        main_container = ttk.PanedWindow(self.root, orient=tk.HORIZONTAL)
        main_container.pack(fill=tk.BOTH, expand=True, padx=5, pady=5)
        
        # Левая панель (управление)
        left_frame = ttk.Frame(main_container, width=400)
        main_container.add(left_frame, weight=1)
        
        # Правая панель (график)
        right_frame = ttk.Frame(main_container)
        main_container.add(right_frame, weight=3)
        
        # Создание компонентов
        self.ui_panel = UIPanel(left_frame, None)  # Контроллер будет установлен позже
        self.graph_canvas = GraphCanvas(right_frame)
    
    def _create_menu(self):
        """Создание меню приложения"""
        menubar = tk.Menu(self.root)
        self.root.config(menu=menubar)
        
        # Меню "Файл"
        file_menu = tk.Menu(menubar, tearoff=0)
        menubar.add_cascade(label="Файл", menu=file_menu)
        file_menu.add_command(label="Сохранить график...", command=self._save_plot)
        file_menu.add_separator()
        file_menu.add_command(label="Выход", command=self._on_closing)
        
        # Меню "Помощь"
        help_menu = tk.Menu(menubar, tearoff=0)
        menubar.add_cascade(label="Помощь", menu=help_menu)
        help_menu.add_command(label="О программе", command=self._show_about)
        help_menu.add_command(label="Справка", command=self._show_help)
    
    def _save_plot(self):
        """Сохранить текущий график"""
        from tkinter import filedialog
        
        filename = filedialog.asksaveasfilename(
            defaultextension=".png",
            filetypes=[
                ("PNG файлы", "*.png"),
                ("JPEG файлы", "*.jpg"),
                ("PDF файлы", "*.pdf"),
                ("Все файлы", "*.*")
            ],
            title="Сохранить график как..."
        )
        
        if filename:
            try:
                self.controller.save_current_plot(filename)
                messagebox.showinfo("Успех", f"График сохранен в файл:\n{filename}")
            except Exception as e:
                messagebox.showerror("Ошибка", f"Не удалось сохранить график:\n{str(e)}")
    
    def _show_about(self):
        """Показать информацию о программе"""
        about_text = """
Графический калькулятор функций

Версия 1.0

Программа для построения графиков 30 различных математических функций
с возможностью выбора из 10 "красивых" шаблонов для каждой функции.

Архитектура: MVC (Model-View-Controller)

Автор: AI Assistant
        """
        messagebox.showinfo("О программе", about_text)
    
    def _show_help(self):
        """Показать справку"""
        help_text = """
Справка по использованию программы:

1. ВЫБОР ФУНКЦИИ:
   - Выберите функцию из выпадающего списка
   - Просмотрите формулу и описание функции

2. ВЫБОР ШАБЛОНА:
   - Выберите один из 10 "красивых" шаблонов
   - Параметры автоматически заполнятся

3. РУЧНОЙ ВВОД ПАРАМЕТРОВ:
   - Измените значения в полях параметров
   - Используйте десятичные числа (например, 3.14)

4. ДИАПАЗОН X:
   - Укажите минимальное и максимальное значение X
   - Для некоторых функций диапазон автоматически настраивается

5. ПОСТРОЕНИЕ ГРАФИКА:
   - Нажмите кнопку "Построить график"
   - Используйте панель инструментов для масштабирования

6. СОХРАНЕНИЕ:
   - Используйте меню "Файл" -> "Сохранить график..."
   - Поддерживаются форматы PNG, JPEG, PDF

ОСОБЕННОСТИ:
- Поддержка декартовых, параметрических и полярных координат
- Автоматическое масштабирование графиков
- Обработка математических ошибок
- Интерактивная панель инструментов matplotlib
        """
        messagebox.showinfo("Справка", help_text)
    
    def _on_closing(self):
        """Обработчик закрытия приложения"""
        if messagebox.askokcancel("Выход", "Вы уверены, что хотите выйти?"):
            self.root.destroy()
    
    def run(self):
        """Запуск приложения"""
        self.root.mainloop()

def main():
    """Главная функция"""
    try:
        # Создание главного окна
        root = tk.Tk()
        
        # Создание и запуск приложения
        app = FunctionGraphApp(root)
        app.run()
        
    except ImportError as e:
        print(f"Ошибка импорта: {e}")
        print("Убедитесь, что установлены все необходимые зависимости:")
        print("pip install -r requirements.txt")
        sys.exit(1)
    except Exception as e:
        print(f"Неожиданная ошибка: {e}")
        sys.exit(1)

if __name__ == "__main__":
    main()
