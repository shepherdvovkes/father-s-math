/**
 * Главный контроллер - связывает Model и View
 * Обновлен для работы с новой структурой FunctionLibrary
 */
class MainController {
    constructor(uiPanel, graphCanvas) {
        // Инициализируем модель
        this.functionLibrary = new FunctionLibrary();
        this.calculator = new Calculator(this.functionLibrary);
        
        // Сохраняем ссылки на представления
        this.uiPanel = uiPanel;
        this.graphCanvas = graphCanvas;
        
        // Текущее состояние
        this.currentFunction = null;
        this.currentTemplate = null;
        
        // Устанавливаем контроллер в UI панель
        this.uiPanel.setController(this);
        
        // Инициализируем интерфейс
        this._initializeUI();
    }

    _initializeUI() {
        // Получаем список всех функций
        const functions = this.functionLibrary.getFunctionNames();
        
        // Устанавливаем функции в UI
        this.uiPanel.setFunctions(functions);
        
        // НЕ выбираем функцию автоматически
        // if (functions.length > 0) {
        //     this.onFunctionSelected(functions[0]);
        // }
    }

    onFunctionSelected(functionName) {
        this.currentFunction = functionName;
        
        // Получаем информацию о функции
        const funcInfo = this.functionLibrary.getFunctionInfo(functionName);
        if (!funcInfo) {
            return;
        }
        
        // Получаем параметры функции
        const paramNames = funcInfo.params;
        
        // Получаем шаблоны для этой функции
        const templates = this.functionLibrary.getTemplates(functionName);
        
        // Обновляем UI
        this.uiPanel.setTemplates(templates);
        this.uiPanel.updateParameters(paramNames);
        
        // Обновляем диапазон X
        const xRange = this.calculator.getDefaultXRange(functionName);
        this.uiPanel.updateXRange(xRange);
        
        // НЕ выбираем шаблон автоматически - пользователь должен выбрать сам
        // if (templates.length > 0) {
        //     this.onTemplateSelected(templates[0].name);
        // }
    }

    onTemplateSelected(templateName) {
        if (!this.currentFunction) {
            return;
        }
        
        // Получаем шаблоны для текущей функции
        const templates = this.functionLibrary.getTemplates(this.currentFunction);
        
        // Находим выбранный шаблон по имени
        const selectedTemplate = templates.find(template => template.name === templateName);
        
        if (selectedTemplate) {
            this.currentTemplate = selectedTemplate;
            
            // Обновляем параметры в UI
            const paramValues = this._convertTemplateToArray(selectedTemplate);
            const funcInfo = this.functionLibrary.getFunctionInfo(this.currentFunction);
            const paramNames = funcInfo.params;
            
            this.uiPanel.updateParameters(paramNames, paramValues);
            
            // НЕ строим график автоматически - пользователь должен нажать кнопку
            // this.onPlotRequested(selectedTemplate, null);
        }
    }

    _convertTemplateToArray(template) {
        // Конвертируем объект параметров в массив для совместимости с UI
        const funcInfo = this.functionLibrary.getFunctionInfo(this.currentFunction);
        const paramNames = funcInfo.params;
        
        return paramNames.map(name => template[name] || 0);
    }

    _convertArrayToParams(paramArray) {
        // Конвертируем массив параметров в объект для новой структуры
        const funcInfo = this.functionLibrary.getFunctionInfo(this.currentFunction);
        const paramNames = funcInfo.params;
        
        const params = {};
        paramNames.forEach((name, index) => {
            params[name] = paramArray[index] || 0;
        });
        
        return params;
    }

    onPlotRequested(params, xRange) {
        if (!this.currentFunction) {
            return;
        }
        
        // Конвертируем параметры в нужный формат
        const paramObj = Array.isArray(params) ? this._convertArrayToParams(params) : params;
        
        // Вычисляем точки графика
        const result = this.calculator.calculatePoints(
            this.currentFunction, 
            paramObj, 
            xRange
        );
        
        // Отображаем график
        this.graphCanvas.plotFunction(result);
    }

    getFunctionFormula(functionName) {
        const funcInfo = this.functionLibrary.getFunctionInfo(functionName);
        return funcInfo ? funcInfo.formula : "Формула недоступна";
    }

    getFunctionType(functionName) {
        const funcInfo = this.functionLibrary.getFunctionInfo(functionName);
        return funcInfo ? funcInfo.type : "unknown";
    }

    getAvailableFunctions() {
        return this.functionLibrary.getFunctionNames();
    }

    getFunctionTemplates(functionName) {
        const templates = this.functionLibrary.getTemplates(functionName);
        // Конвертируем в формат, совместимый со старым UI
        return templates.map((template, index) => ({
            name: `Template ${index + 1}`,
            params: this._convertTemplateToArray(template)
        }));
    }

    getFunctionParameters(functionName) {
        const funcInfo = this.functionLibrary.getFunctionInfo(functionName);
        return funcInfo ? funcInfo.params : [];
    }

    calculateFunction(functionName, params, xRange = null) {
        const paramObj = Array.isArray(params) ? this._convertArrayToParams(params) : params;
        return this.calculator.calculatePoints(functionName, paramObj, xRange);
    }

    saveCurrentPlot() {
        this.graphCanvas.savePlot();
    }

    clearPlot() {
        this.graphCanvas.clearPlot();
    }

    // Методы для управления графиком
    zoomIn() {
        this.graphCanvas.zoomIn();
    }

    zoomOut() {
        this.graphCanvas.zoomOut();
    }

    resetZoom() {
        this.graphCanvas.resetZoom();
    }

    // Новые методы для работы с новой структурой
    getFunctionInfo(functionName) {
        return this.functionLibrary.getFunctionInfo(functionName);
    }

    listAllFunctions() {
        return this.functionLibrary.listFunctions();
    }

    getTemplateCount(functionName) {
        const templates = this.functionLibrary.getTemplates(functionName);
        return templates.length;
    }
}

// Экспорт для браузера
if (typeof window !== 'undefined') {
    window.MainController = MainController;
}
