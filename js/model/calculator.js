/**
 * Вычислитель - выполняет расчеты для построения графиков
 * Обновлен для работы с новой структурой FunctionLibrary
 */
class Calculator {
    constructor(functionLibrary) {
        this.functionLibrary = functionLibrary;
    }

    calculatePoints(functionName, params, xRange = null, pointsCount = null) {
        const funcInfo = this.functionLibrary.getFunctionInfo(functionName);
        if (!funcInfo) {
            return {error: `Функция '${functionName}' не найдена`};
        }

        const funcType = funcInfo.type;
        const func = funcInfo.function;
        const domain = funcInfo.domain;

        // Используем значения по умолчанию из domain, если не указаны
        const start = xRange ? xRange[0] : domain.start;
        const stop = xRange ? xRange[1] : domain.stop;
        const num = pointsCount || domain.num;

        try {
            switch (funcType) {
                case "cartesian":
                    return this._calculateCartesian(func, params, start, stop, num, funcInfo);
                case "parametric":
                    return this._calculateParametric(func, params, start, stop, num, funcInfo);
                case "polar":
                    return this._calculatePolar(func, params, start, stop, num, funcInfo);
                case "polygon":
                    return this._calculatePolygon(func, params, funcInfo);
                default:
                    return {error: `Неизвестный тип функции: ${funcType}`};
            }
        } catch (e) {
            return {error: `Ошибка вычисления: ${e.message}`};
        }
    }

    _calculateCartesian(func, params, start, stop, num, funcInfo) {
        const x = this._linspace(start, stop, num);
        
        const validX = [];
        const validY = [];

        for (let i = 0; i < x.length; i++) {
            try {
                const xi = x[i];
                const yi = func(xi, params);
                
                if (this._isFinite(yi)) {
                    validX.push(xi);
                    validY.push(yi);
                }
            } catch (e) {
                // Пропускаем точки с ошибками
                continue;
            }
        }

        return {
            type: "cartesian",
            x: validX,
            y: validY,
            xRange: [start, stop],
            formula: funcInfo.formula,
            params: params
        };
    }

    _calculateParametric(func, params, start, stop, num, funcInfo) {
        const t = this._linspace(start, stop, num);
        
        const validX = [];
        const validY = [];
        const validT = [];

        for (let i = 0; i < t.length; i++) {
            try {
                const ti = t[i];
                const result = func(ti, params);
                
                if (Array.isArray(result) && result.length === 2) {
                    const [xi, yi] = result;
                    if (this._isFinite(xi) && this._isFinite(yi)) {
                        validX.push(xi);
                        validY.push(yi);
                        validT.push(ti);
                    }
                }
            } catch (e) {
                // Пропускаем точки с ошибками
                continue;
            }
        }

        return {
            type: "parametric",
            x: validX,
            y: validY,
            t: validT,
            formula: funcInfo.formula,
            params: params
        };
    }

    _calculatePolar(func, params, start, stop, num, funcInfo) {
        const theta = this._linspace(start, stop, num);
        
        const validX = [];
        const validY = [];
        const validTheta = [];

        for (let i = 0; i < theta.length; i++) {
            try {
                const ti = theta[i];
                const result = func(ti, params);
                
                if (Array.isArray(result) && result.length === 2) {
                    const [xi, yi] = result;
                    if (this._isFinite(xi) && this._isFinite(yi)) {
                        validX.push(xi);
                        validY.push(yi);
                        validTheta.push(ti);
                    }
                }
            } catch (e) {
                // Пропускаем точки с ошибками
                continue;
            }
        }

        return {
            type: "polar",
            x: validX,
            y: validY,
            theta: validTheta,
            formula: funcInfo.formula,
            params: params
        };
    }

    _calculatePolygon(func, params, funcInfo) {
        try {
            const points = func(0, params); // Для полигонов параметр t не используется
            
            if (Array.isArray(points) && points.length > 0) {
                const x = points.map(p => p[0]);
                const y = points.map(p => p[1]);
                
                return {
                    type: "polygon",
                    x: x,
                    y: y,
                    formula: funcInfo.formula,
                    params: params
                };
            }
        } catch (e) {
            return {error: `Ошибка вычисления полигона: ${e.message}`};
        }
    }

    _linspace(start, end, count) {
        const step = (end - start) / (count - 1);
        const result = [];
        for (let i = 0; i < count; i++) {
            result.push(start + i * step);
        }
        return result;
    }

    _isFinite(value) {
        return Number.isFinite(value) && !Number.isNaN(value);
    }

    getDefaultXRange(functionName) {
        const funcInfo = this.functionLibrary.getFunctionInfo(functionName);
        if (!funcInfo) {
            return [-10, 10];
        }

        return [funcInfo.domain.start, funcInfo.domain.stop];
    }

    getDefaultPointsCount(functionName) {
        const funcInfo = this.functionLibrary.getFunctionInfo(functionName);
        if (!funcInfo) {
            return 1000;
        }

        return funcInfo.domain.num;
    }
}

// Экспорт для браузера
if (typeof window !== 'undefined') {
    window.Calculator = Calculator;
}
