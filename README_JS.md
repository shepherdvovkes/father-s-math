# Graph Lab - JavaScript версия

JavaScript реализация Graph Lab, основанная на структуре из `graph_lab.py`. Приложение предоставляет 31 функцию для построения графиков различных типов: декартовых, параметрических, полярных и полигональных.

## 🚀 Возможности

### Типы функций:
- **Декартовы функции (16)**: линейные, квадратичные, тригонометрические, экспоненциальные и другие
- **Параметрические функции (7)**: эллипсы, спирали, фигуры Лиссажу, спирографы
- **Полярные функции (7)**: розы, кардиоиды, спирали, бабочка
- **Полигональные функции (1)**: звезда Давида

### Особенности:
- ✅ 31 функция с предустановленными шаблонами
- ✅ Автоматический выбор оптимальных диапазонов
- ✅ Интерактивное управление параметрами
- ✅ Красивые шаблоны для каждой функции
- ✅ Поддержка различных типов координат
- ✅ Экспорт графиков
- ✅ Масштабирование и навигация

## 📁 Структура проекта

```
lesson1/
├── index.html              # Главная страница
├── styles.css              # Стили
├── demo.js                 # Демонстрационный скрипт
├── js/
│   ├── app.js              # Главное приложение
│   ├── model/
│   │   ├── functionLibrary.js  # Библиотека функций (31 функция)
│   │   ├── calculator.js       # Вычислитель
│   │   └── templates.js        # Шаблоны (совместимость)
│   ├── view/
│   │   ├── graphCanvas.js      # Canvas для графиков
│   │   └── uiPanel.js          # UI панель
│   └── controller/
│       └── mainController.js   # Главный контроллер
└── README_JS.md            # Этот файл
```

## 🎯 Список функций

### Декартовы функции (1-16):
1. **Linear** - y = a*x + b
2. **Quadratic** - y = a*x² + b*x + c
3. **Cubic (odd)** - y = a*x³ + b*x
4. **Quartic (even-symmetric)** - y = a*x⁴ + b*x² + c
5. **Absolute value** - y = a*|x| + b
6. **Exponential** - y = a*exp(b*x) + c
7. **Logarithm** - y = a*ln(b*x + c) + d
8. **Power (|x|^b)** - y = a*|x|^b + c
9. **Sine** - y = a*sin(b*x + c) + d
10. **Cosine sum** - y = a*cos(b*x) + c*cos(d*x)
11. **Damped sine** - y = a*exp(-b*|x|)*sin(c*x)
12. **Gaussian bell** - y = a*exp(-((x-b)²)/(2*c²))
13. **Sinc** - y = a*sin(b*x)/(c*x)
14. **Logistic (sigmoid)** - y = a/(1+exp(-b*(x-c))) + d
15. **Tangent** - y = a*tan(b*x + c) + d
16. **Rational** - y = a*x/(1 + b*x²)

### Параметрические функции (17-23):
17. **Circle** - x=a*cos(t), y=a*sin(t)
18. **Ellipse** - x=a*cos(t), y=b*sin(t)
19. **Lissajous** - x=a*sin(p*t+δ), y=b*sin(q*t)
20. **Hypotrochoid (spiro)** - спирограф
21. **Epicycloid (spiro)** - эпициклоида
22. **Spiral (parametric)** - x=(a+b*t)cos t, y=(a+b*t)sin t
23. **Superellipse** - суперэллипс

### Полярные функции (24-30):
24. **Rose curve** - r = a*cos(k*θ)
25. **Cardioid** - r = a*(1 - cos θ)
26. **Lemniscate of Bernoulli** - r = a*sqrt(cos(2θ))
27. **Logarithmic spiral** - r = a*exp(b*θ)
28. **Hyperbolic spiral** - r = a/θ
29. **Archimedean spiral** - r = a + b*θ
30. **Butterfly (polar)** - бабочка

### Полигональные функции (31):
31. **Hexagram (Star of David)** - звезда Давида

## 🛠️ Использование

### Запуск приложения:
1. Откройте `index.html` в браузере
2. Выберите функцию из выпадающего списка
3. Выберите шаблон параметров
4. Настройте диапазон X при необходимости
5. Нажмите "Построить график"

### Демонстрация:
Откройте консоль браузера (F12) и используйте функции:
```javascript
// Запустить полную демонстрацию
GraphLabDemo.runDemo();

// Демонстрация конкретной функции
GraphLabDemo.demonstrateFunction("Butterfly (polar)", 0);

// Показать все функции по типам
GraphLabDemo.demonstrateByType();

// Тест производительности
GraphLabDemo.performanceTest();
```

## 🔧 Технические детали

### Архитектура:
- **Model**: FunctionLibrary, Calculator, Templates
- **View**: GraphCanvas, UIPanel
- **Controller**: MainController

### Ключевые классы:
- `FunctionLibrary` - содержит все 31 функцию с шаблонами
- `Calculator` - вычисляет точки графиков
- `MainController` - связывает Model и View

### Шаблоны:
Каждая функция имеет 10 предустановленных шаблонов параметров для создания красивых графиков.

## 🎨 Особенности реализации

1. **Совместимость**: Поддерживает как старую, так и новую структуру параметров
2. **Производительность**: Оптимизированные вычисления для каждого типа функции
3. **Точность**: Использование математических констант и функций JavaScript
4. **Гибкость**: Легко добавлять новые функции и шаблоны

## 📊 Примеры использования

```javascript
// Создание экземпляра библиотеки
const functionLibrary = new FunctionLibrary();

// Получение информации о функции
const funcInfo = functionLibrary.getFunctionInfo("Butterfly (polar)");
console.log(funcInfo.formula); // "r = e^{sin θ} - 2 cos(4θ) + sin^5((2θ-π)/24)"

// Получение шаблонов
const templates = functionLibrary.getTemplates("Sine");
console.log(templates.length); // 10

// Вычисление графика
const calculator = new Calculator(functionLibrary);
const result = calculator.calculatePoints("Rose curve", templates[0]);
console.log(result.x.length); // количество точек
```

## 🚀 Запуск

1. Клонируйте репозиторий
2. Откройте `index.html` в браузере
3. Наслаждайтесь построением графиков!

## 📝 Лицензия

Этот проект является JavaScript реализацией оригинального Graph Lab на Python.
