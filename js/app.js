/**
 * Главное приложение - инициализация и запуск
 */
class FunctionGraphApp {
    constructor() {
        this.uiPanel = null;
        this.graphCanvas = null;
        this.controller = null;
        
        this._initialize();
    }

    _initialize() {
        try {
            // Создаем компоненты представления
            this.uiPanel = new UIPanel();
            this.graphCanvas = new GraphCanvas('graphCanvas');
            
            // Создаем контроллер
            this.controller = new MainController(this.uiPanel, this.graphCanvas);
            
            // Настраиваем дополнительные обработчики событий
            this._setupAdditionalEventListeners();
            
            console.log('Приложение успешно инициализировано');
            
        } catch (error) {
            console.error('Ошибка инициализации приложения:', error);
            this._showInitializationError(error.message);
        }
    }

    _setupAdditionalEventListeners() {
        // Обработчики для кнопок управления графиком
        const zoomInBtn = document.getElementById('zoomIn');
        const zoomOutBtn = document.getElementById('zoomOut');
        const resetZoomBtn = document.getElementById('resetZoom');
        const saveGraphBtn = document.getElementById('saveGraph');

        if (zoomInBtn) {
            zoomInBtn.addEventListener('click', () => {
                this.controller.zoomIn();
            });
        }

        if (zoomOutBtn) {
            zoomOutBtn.addEventListener('click', () => {
                this.controller.zoomOut();
            });
        }

        if (resetZoomBtn) {
            resetZoomBtn.addEventListener('click', () => {
                this.controller.resetZoom();
            });
        }

        if (saveGraphBtn) {
            saveGraphBtn.addEventListener('click', () => {
                this.controller.saveCurrentPlot();
            });
        }

        // Обработчик для клавиши Enter в полях ввода
        document.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                // Если нажата Enter в любом поле ввода, строим график
                const activeElement = document.activeElement;
                if (activeElement && activeElement.classList.contains('number-input')) {
                    this.controller.onPlotRequested(
                        this._getCurrentParameters(),
                        this._getCurrentXRange()
                    );
                }
            }
        });

        // Обработчик для изменения размера окна
        window.addEventListener('resize', () => {
            // Перерисовываем график при изменении размера окна
            if (this.graphCanvas && this.graphCanvas.chart) {
                this.graphCanvas.chart.resize();
            }
        });
    }

    _getCurrentParameters() {
        const inputs = document.querySelectorAll('.number-input');
        const params = [];
        
        inputs.forEach(input => {
            const value = parseFloat(input.value);
            if (!isNaN(value)) {
                params.push(value);
            }
        });
        
        return params;
    }

    _getCurrentXRange() {
        const xMin = parseFloat(document.getElementById('xMin').value);
        const xMax = parseFloat(document.getElementById('xMax').value);
        
        if (isNaN(xMin) || isNaN(xMax)) {
            return [-10, 10]; // Значения по умолчанию
        }
        
        return [xMin, xMax];
    }

    _showInitializationError(message) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'initialization-error';
        errorDiv.innerHTML = `
            <div style="
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background: white;
                padding: 30px;
                border-radius: 10px;
                box-shadow: 0 10px 30px rgba(0,0,0,0.3);
                text-align: center;
                max-width: 400px;
                z-index: 10000;
            ">
                <h3 style="color: #ef4444; margin-bottom: 15px;">Ошибка инициализации</h3>
                <p style="color: #666; margin-bottom: 20px;">${message}</p>
                <button onclick="location.reload()" style="
                    background: #667eea;
                    color: white;
                    border: none;
                    padding: 10px 20px;
                    border-radius: 5px;
                    cursor: pointer;
                ">Перезагрузить страницу</button>
            </div>
        `;
        document.body.appendChild(errorDiv);
    }

    // Публичные методы для внешнего доступа
    getController() {
        return this.controller;
    }

    getUIPanel() {
        return this.uiPanel;
    }

    getGraphCanvas() {
        return this.graphCanvas;
    }
}

// Функция инициализации приложения
function initApp() {
    console.log('Запуск initApp...');
    
    // Проверяем, что все необходимые элементы DOM существуют
    const requiredElements = [
        'functionSelect',
        'templateSelect',
        'parametersContainer',
        'xMin',
        'xMax',
        'plotButton',
        'clearButton',
        'formulaDisplay',
        'descriptionDisplay',
        'graphCanvas'
    ];

    const missingElements = requiredElements.filter(id => !document.getElementById(id));
    
    if (missingElements.length > 0) {
        console.error('Отсутствуют необходимые элементы DOM:', missingElements);
        return;
    }

    // Инициализируем KaTeX, если он доступен
    if (typeof renderMathInElement !== 'undefined') {
        renderMathInElement(document.body, {
            delimiters: [
                {left: '$$', right: '$$', display: true},
                {left: '$', right: '$', display: false},
                {left: '\\(', right: '\\)', display: false},
                {left: '\\[', right: '\\]', display: true}
            ],
            throwOnError: false,
            errorColor: '#cc0000'
        });
    }
    
    // Проверяем загрузку KaTeX
    if (typeof katex !== 'undefined') {
        console.log('✅ KaTeX загружен успешно');
    } else {
        console.warn('⚠️ KaTeX не загружен');
    }

    // Создаем и запускаем приложение
    window.app = new FunctionGraphApp();
    
    // Добавляем глобальные обработчики ошибок
    window.addEventListener('error', (e) => {
        console.error('Глобальная ошибка:', e.error);
    });

    window.addEventListener('unhandledrejection', (e) => {
        console.error('Необработанное отклонение промиса:', e.reason);
    });
    
    console.log('Приложение инициализировано успешно!');
}

// Экспортируем функцию инициализации
if (typeof window !== 'undefined') {
    window.initApp = initApp;
}

// Экспортируем класс для возможного использования в модулях
if (typeof module !== 'undefined' && module.exports) {
    module.exports = FunctionGraphApp;
}

// Экспортируем класс для браузера
if (typeof window !== 'undefined') {
    window.App = FunctionGraphApp;
}
