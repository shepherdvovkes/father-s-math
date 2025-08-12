/**
 * Панель управления - интерфейс для выбора функций и параметров
 */
class UIPanel {
    constructor() {
        this.controller = null;
        this.paramInputs = [];
        this.paramLabels = [];
        this.mathFormulas = new MathFormulas();
        
        this._initializeElements();
        this._setupEventListeners();
    }

    _initializeElements() {
        // Получаем ссылки на элементы DOM
        this.functionSelect = document.getElementById('functionSelect');
        this.templateSelect = document.getElementById('templateSelect');
        this.parametersContainer = document.getElementById('parametersContainer');
        this.xMinInput = document.getElementById('xMin');
        this.xMaxInput = document.getElementById('xMax');
        this.plotButton = document.getElementById('plotButton');
        this.clearButton = document.getElementById('clearButton');
        this.formulaDisplay = document.getElementById('formulaDisplay');
        this.descriptionDisplay = document.getElementById('descriptionDisplay');
        
        // Навигационные кнопки
        this.prevFunctionBtn = document.getElementById('prevFunction');
        this.nextFunctionBtn = document.getElementById('nextFunction');
        this.prevTemplateBtn = document.getElementById('prevTemplate');
        this.nextTemplateBtn = document.getElementById('nextTemplate');
        
        // Состояние навигации
        this.currentFunctionIndex = -1;
        this.currentTemplateIndex = -1;
        this.availableFunctions = [];
        this.availableTemplates = [];
    }

    _setupEventListeners() {
        // Обработчики событий
        this.functionSelect.addEventListener('change', (e) => this._onFunctionSelected(e));
        this.templateSelect.addEventListener('change', (e) => this._onTemplateSelected(e));
        this.plotButton.addEventListener('click', () => this._onPlotButtonClick());
        this.clearButton.addEventListener('click', () => this._onClearButtonClick());
        
        // Навигационные кнопки
        this.prevFunctionBtn.addEventListener('click', () => this._onPrevFunction());
        this.nextFunctionBtn.addEventListener('click', () => this._onNextFunction());
        this.prevTemplateBtn.addEventListener('click', () => this._onPrevTemplate());
        this.nextTemplateBtn.addEventListener('click', () => this._onNextTemplate());
        
        // Клавиатурные сокращения
        document.addEventListener('keydown', (e) => this._handleKeyboardNavigation(e));
    }

    setController(controller) {
        this.controller = controller;
    }

    setFunctions(functions) {
        // Сохраняем список функций для навигации
        this.availableFunctions = functions;
        
        // Очищаем существующие опции
        this.functionSelect.innerHTML = '<option value="">Выберите функцию...</option>';
        
        // Добавляем новые опции
        functions.forEach(functionName => {
            const option = document.createElement('option');
            option.value = functionName;
            option.textContent = functionName;
            this.functionSelect.appendChild(option);
        });

        // НЕ выбираем функцию автоматически
        // if (functions.length > 0) {
        //     this.functionSelect.value = functions[0];
        //     this._onFunctionSelected();
        // }
        
        // Обновляем состояние кнопок
        this._updateNavigationButtons();
    }

    setTemplates(templates) {
        // Сохраняем список шаблонов для навигации
        this.availableTemplates = templates;
        
        // Очищаем существующие опции
        this.templateSelect.innerHTML = '<option value="">Выберите шаблон...</option>';
        
        // Добавляем новые опции
        templates.forEach((template, index) => {
            const option = document.createElement('option');
            option.value = template.name || `Template ${index + 1}`;
            option.textContent = template.name || `Template ${index + 1}`;
            this.templateSelect.appendChild(option);
        });

        // НЕ выбираем шаблон автоматически
        // if (templates.length > 0) {
        //     this.templateSelect.value = templates[0].name || 'Template 1';
        //     this._onTemplateSelected();
        // }
        
        // Обновляем состояние кнопок
        this._updateNavigationButtons();
    }

    updateParameters(paramNames, paramValues = null) {
        // Очищаем старые поля
        this._clearParameterFields();
        
        if (!paramNames || paramNames.length === 0) {
            this._showPlaceholder();
            return;
        }

        // Создаем новые поля
        paramNames.forEach((paramName, index) => {
            const row = document.createElement('div');
            row.className = 'parameter-row';

            // Создаем метку
            const label = document.createElement('label');
            label.textContent = `${paramName}:`;
            this.paramLabels.push(label);

            // Создаем поле ввода
            const input = document.createElement('input');
            input.type = 'number';
            input.className = 'number-input';
            input.step = '0.1';
            
            // Устанавливаем значение по умолчанию
            if (paramValues && index < paramValues.length) {
                input.value = paramValues[index];
            } else {
                input.value = '0';
            }
            
            this.paramInputs.push(input);

            // Добавляем элементы в строку
            row.appendChild(label);
            row.appendChild(input);
            this.parametersContainer.appendChild(row);
        });
    }

    _clearParameterFields() {
        // Удаляем старые поля
        this.paramInputs.forEach(input => {
            if (input.parentNode) {
                input.parentNode.remove();
            }
        });
        this.paramInputs = [];
        this.paramLabels = [];
    }

    _showPlaceholder() {
        this.parametersContainer.innerHTML = '<p class="placeholder">Выберите функцию для отображения параметров</p>';
    }

    _onFunctionSelected(event) {
        const selectedFunction = this.functionSelect.value;
        if (!selectedFunction || !this.controller) return;

        // Обновляем индекс текущей функции
        this._updateFunctionIndex();

        // Обновляем информацию о функции
        this.controller.onFunctionSelected(selectedFunction);
        
        // Обновляем формулу с KaTeX рендерингом
        this._renderMathFormula(selectedFunction);
        
        // Обновляем описание
        const description = this._getFunctionDescription(selectedFunction);
        this.descriptionDisplay.textContent = description;
    }

    _onTemplateSelected(event) {
        const selectedTemplate = this.templateSelect.value;
        if (!selectedTemplate || !this.controller) return;

        // Обновляем индекс текущего шаблона
        this._updateTemplateIndex();

        this.controller.onTemplateSelected(selectedTemplate);
    }

    _onPlotButtonClick() {
        if (!this.controller) return;

        try {
            // Собираем параметры
            const params = [];
            this.paramInputs.forEach(input => {
                const value = parseFloat(input.value);
                if (isNaN(value)) {
                    throw new Error(`Неверное значение параметра: ${input.previousElementSibling.textContent.replace(':', '')}`);
                }
                params.push(value);
            });

            // Получаем диапазон X
            const xMin = parseFloat(this.xMinInput.value);
            const xMax = parseFloat(this.xMaxInput.value);

            if (isNaN(xMin) || isNaN(xMax)) {
                throw new Error('Неверные значения диапазона X');
            }

            if (xMin >= xMax) {
                throw new Error('Минимальное значение X должно быть меньше максимального');
            }

            // Вызываем контроллер
            this.controller.onPlotRequested(params, [xMin, xMax]);

        } catch (error) {
            this._showError(error.message);
        }
    }

    _onClearButtonClick() {
        if (this.controller) {
            this.controller.clearPlot();
        }
    }

    _showError(message) {
        // Создаем временное уведомление об ошибке
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-notification';
        errorDiv.textContent = message;
        errorDiv.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #ef4444;
            color: white;
            padding: 12px 20px;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            z-index: 1000;
            max-width: 300px;
        `;

        document.body.appendChild(errorDiv);

        // Удаляем уведомление через 3 секунды
        setTimeout(() => {
            if (errorDiv.parentNode) {
                errorDiv.parentNode.removeChild(errorDiv);
            }
        }, 3000);
    }

    /**
     * Рендеринг математической формулы с помощью KaTeX
     * @param {string} functionName - название функции
     */
    _renderMathFormula(functionName) {
        try {
            // Получаем LaTeX формулу
            const latexFormula = this.mathFormulas.getFormula(functionName);
            
            // Очищаем контейнер
            this.formulaDisplay.innerHTML = '';
            
            // Создаем элемент для формулы
            const formulaElement = document.createElement('div');
            formulaElement.className = 'math-formula';
            
            // Проверяем, доступна ли KaTeX
            if (typeof katex !== 'undefined' && katex.render) {
                try {
                    // Рендерим формулу с помощью KaTeX
                    katex.render(latexFormula, formulaElement, {
                        displayMode: false,
                        throwOnError: false,
                        errorColor: '#cc0000',
                        macros: {
                            "\\ln": "\\ln",
                            "\\log": "\\log",
                            "\\sin": "\\sin",
                            "\\cos": "\\cos",
                            "\\tan": "\\tan",
                            "\\exp": "\\exp",
                            "\\frac": "\\frac",
                            "\\sqrt": "\\sqrt",
                            "\\theta": "\\theta",
                            "\\pi": "\\pi",
                            "\\delta": "\\delta",
                            "\\left": "\\left",
                            "\\right": "\\right"
                        },
                        strict: false,
                        trust: true
                    });
                    
                    // Проверяем, что рендеринг прошел успешно
                    if (formulaElement.innerHTML.trim() === '') {
                        console.warn('Empty KaTeX rendering result for:', functionName, 'formula:', latexFormula);
                        throw new Error('Empty rendering result');
                    }
                    
                    // Логируем успешный рендеринг для отладки
                    console.log('Successfully rendered formula for:', functionName);
                    
                } catch (error) {
                    console.warn('KaTeX rendering error for', functionName, ':', error);
                    console.warn('Formula was:', latexFormula);
                    // Fallback к обычному тексту
                    formulaElement.textContent = this.mathFormulas.getDisplayFormula(functionName);
                }
            } else {
                // Fallback если KaTeX не загружен
                formulaElement.textContent = this.mathFormulas.getDisplayFormula(functionName);
            }
            
            this.formulaDisplay.appendChild(formulaElement);
            
        } catch (error) {
            console.error('Error rendering math formula:', error);
            // Fallback к простому тексту
            this.formulaDisplay.innerHTML = '<div class="formula-placeholder">Ошибка отображения формулы</div>';
        }
    }

    updateXRange(xRange) {
        if (Array.isArray(xRange) && xRange.length === 2) {
            this.xMinInput.value = xRange[0];
            this.xMaxInput.value = xRange[1];
        }
    }

    _getFunctionDescription(functionName) {
        const descriptions = {
            "Linear": "Линейная функция y = ax + b. График - прямая линия.",
            "Quadratic": "Квадратичная функция y = ax² + bx + c. График - парабола.",
            "Cubic (odd)": "Кубическая функция y = ax³ + bx. Нечетная функция.",
            "Quartic (even-symmetric)": "Полином четвертой степени y = ax⁴ + bx² + c. Четная функция.",
            "Absolute value": "Функция модуля y = a|x| + b. Создает V-образную форму.",
            "Exponential": "Экспоненциальная функция y = ae^(bx) + c. Экспоненциальный рост или убывание.",
            "Logarithm": "Логарифмическая функция y = a ln(bx + c) + d.",
            "Power (|x|^b)": "Степенная функция y = a|x|^b + c. Поведение зависит от степени b.",
            "Sine": "Синусоида y = a sin(bx + c) + d. Периодическая волна.",
            "Cosine sum": "Сумма косинусов y = a cos(bx) + c cos(dx). Сложные колебания.",
            "Damped sine": "Затухающие колебания y = ae^(-b|x|) sin(cx).",
            "Gaussian bell": "Колокол Гаусса y = ae^(-((x-b)²)/(2c²)). Создает колоколообразную кривую.",
            "Sinc": "Sinc функция y = a sin(bx)/(cx). Создает затухающую волну.",
            "Logistic (sigmoid)": "Сигмоида y = a/(1+e^(-b(x-c))) + d. S-образная функция.",
            "Tangent": "Тангенс y = a tan(bx + c) + d. Имеет вертикальные асимптоты.",
            "Rational": "Рациональная функция y = ax/(1 + bx²).",
            "Circle": "Окружность x = a cos(t), y = a sin(t).",
            "Ellipse": "Эллипс x = a cos(t), y = b sin(t).",
            "Lissajous": "Фигуры Лиссажу x = a sin(pt+δ), y = b sin(qt).",
            "Hypotrochoid (spiro)": "Гипотрохоида - спирограф.",
            "Epicycloid (spiro)": "Эпициклоида - эпициклоидальный спирограф.",
            "Spiral (parametric)": "Параметрическая спираль x = (a+bt)cos(t), y = (a+bt)sin(t).",
            "Superellipse": "Суперэллипс - обобщенная форма эллипса.",
            "Rose curve": "Роза r = a cos(kθ). Создает цветочную форму.",
            "Cardioid": "Кардиоида r = a(1 - cos(θ)). Форма сердца.",
            "Lemniscate of Bernoulli": "Лемниската Бернулли r = a√cos(2θ). Форма знака бесконечности.",
            "Logarithmic spiral": "Логарифмическая спираль r = ae^(bθ).",
            "Hyperbolic spiral": "Гиперболическая спираль r = a/θ.",
            "Archimedean spiral": "Спираль Архимеда r = a + bθ.",
            "Butterfly (polar)": "Бабочка - полярная кривая в форме бабочки.",
            "Hexagram (Star of David)": "Звезда Давида - шестиконечная звезда."
        };
        
        return descriptions[functionName] || "Описание недоступно";
    }

    // Методы навигации
    _onPrevFunction() {
        if (this.availableFunctions.length === 0) return;
        
        if (this.currentFunctionIndex <= 0) {
            // Переходим к последней функции
            this.currentFunctionIndex = this.availableFunctions.length - 1;
        } else {
            this.currentFunctionIndex--;
        }
        
        const functionName = this.availableFunctions[this.currentFunctionIndex];
        this.functionSelect.value = functionName;
        this._onFunctionSelected();
        
        // Автоматически выбираем первый шаблон и строим график
        this._autoSelectFirstTemplateAndPlot();
    }

    _onNextFunction() {
        if (this.availableFunctions.length === 0) return;
        
        if (this.currentFunctionIndex >= this.availableFunctions.length - 1) {
            // Переходим к первой функции
            this.currentFunctionIndex = 0;
        } else {
            this.currentFunctionIndex++;
        }
        
        const functionName = this.availableFunctions[this.currentFunctionIndex];
        this.functionSelect.value = functionName;
        this._onFunctionSelected();
        
        // Автоматически выбираем первый шаблон и строим график
        this._autoSelectFirstTemplateAndPlot();
    }

    _onPrevTemplate() {
        if (this.availableTemplates.length === 0) return;
        
        if (this.currentTemplateIndex <= 0) {
            // Переходим к последнему шаблону
            this.currentTemplateIndex = this.availableTemplates.length - 1;
        } else {
            this.currentTemplateIndex--;
        }
        
        const template = this.availableTemplates[this.currentTemplateIndex];
        this.templateSelect.value = template.name || `Template ${this.currentTemplateIndex + 1}`;
        this._onTemplateSelected();
        
        // Автоматически строим график
        this._autoPlotCurrentSelection();
    }

    _onNextTemplate() {
        if (this.availableTemplates.length === 0) return;
        
        if (this.currentTemplateIndex >= this.availableTemplates.length - 1) {
            // Переходим к первому шаблону
            this.currentTemplateIndex = 0;
        } else {
            this.currentTemplateIndex++;
        }
        
        const template = this.availableTemplates[this.currentTemplateIndex];
        this.templateSelect.value = template.name || `Template ${this.currentTemplateIndex + 1}`;
        this._onTemplateSelected();
        
        // Автоматически строим график
        this._autoPlotCurrentSelection();
    }

    _updateNavigationButtons() {
        // Обновляем состояние кнопок функций
        const hasFunctions = this.availableFunctions.length > 0;
        this.prevFunctionBtn.disabled = !hasFunctions;
        this.nextFunctionBtn.disabled = !hasFunctions;
        
        // Обновляем состояние кнопок шаблонов
        const hasTemplates = this.availableTemplates.length > 0;
        this.prevTemplateBtn.disabled = !hasTemplates;
        this.nextTemplateBtn.disabled = !hasTemplates;
    }

    // Обновляем индексы при выборе
    _updateFunctionIndex() {
        const selectedFunction = this.functionSelect.value;
        this.currentFunctionIndex = this.availableFunctions.indexOf(selectedFunction);
    }

    _updateTemplateIndex() {
        const selectedTemplate = this.templateSelect.value;
        this.currentTemplateIndex = this.availableTemplates.findIndex(
            (template, index) => (template.name || `Template ${index + 1}`) === selectedTemplate
        );
    }

    // Вспомогательные методы для автоматического построения графиков
    _autoSelectFirstTemplateAndPlot() {
        // Ждем немного, чтобы UI обновился
        setTimeout(() => {
            if (this.availableTemplates.length > 0) {
                // Выбираем первый шаблон
                this.currentTemplateIndex = 0;
                const template = this.availableTemplates[0];
                this.templateSelect.value = template.name || 'Template 1';
                this._onTemplateSelected();
                
                // Строим график
                this._autoPlotCurrentSelection();
            }
        }, 100);
    }

    _autoPlotCurrentSelection() {
        // Ждем немного, чтобы UI обновился
        setTimeout(() => {
            if (this.controller && this.functionSelect.value && this.templateSelect.value) {
                try {
                    // Собираем параметры
                    const params = [];
                    this.paramInputs.forEach(input => {
                        const value = parseFloat(input.value);
                        if (!isNaN(value)) {
                            params.push(value);
                        } else {
                            params.push(0);
                        }
                    });

                    // Получаем диапазон X
                    const xMin = parseFloat(this.xMinInput.value);
                    const xMax = parseFloat(this.xMaxInput.value);

                    if (!isNaN(xMin) && !isNaN(xMax) && xMin < xMax) {
                        // Вызываем контроллер
                        this.controller.onPlotRequested(params, [xMin, xMax]);
                    }
                } catch (error) {
                    console.log('Ошибка при автоматическом построении графика:', error);
                }
            }
        }, 50);
    }

    // Обработка клавиатурных сокращений
    _handleKeyboardNavigation(event) {
        // Проверяем, что фокус не находится в поле ввода
        if (event.target.tagName === 'INPUT' || event.target.tagName === 'SELECT') {
            return;
        }

        switch (event.key) {
            case 'ArrowLeft':
                event.preventDefault();
                this._onPrevFunction();
                break;
            case 'ArrowRight':
                event.preventDefault();
                this._onNextFunction();
                break;
            case 'ArrowUp':
                event.preventDefault();
                this._onPrevTemplate();
                break;
            case 'ArrowDown':
                event.preventDefault();
                this._onNextTemplate();
                break;
            case ' ':
                event.preventDefault();
                this._onPlotButtonClick();
                break;
        }
    }
}

// Экспорт для браузера
if (typeof window !== 'undefined') {
    window.UIPanel = UIPanel;
}
