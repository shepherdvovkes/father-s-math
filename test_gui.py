#!/usr/bin/env python3
"""
Простой тест GUI
"""

import tkinter as tk
from tkinter import ttk

def main():
    root = tk.Tk()
    root.title("Тест GUI")
    root.geometry("400x300")
    
    label = ttk.Label(root, text="Привет! GUI работает!")
    label.pack(pady=50)
    
    button = ttk.Button(root, text="Закрыть", command=root.destroy)
    button.pack(pady=20)
    
    print("GUI окно создано")
    root.mainloop()
    print("GUI окно закрыто")

if __name__ == "__main__":
    main()
