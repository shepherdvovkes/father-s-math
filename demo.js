/**
 * Демонстрационный файл для показа всех функций Graph Lab
 * Основан на структуре из graph_lab.py
 */

// Глобальные переменные
let functionLibrary;

// Инициализация после загрузки всех компонентов
function initDemo() {
    if (typeof FunctionLibrary === 'undefined') {
        console.log('FunctionLibrary еще не загружен, ждем...');
        setTimeout(initDemo, 100);
        return;
    }
    
    // Создаем экземпляр FunctionLibrary для демонстрации
    functionLibrary = new FunctionLibrary();
    console.log('Demo инициализирован успешно!');
}

// Функция для демонстрации всех доступных функций
function demonstrateAllFunctions() {
    console.log("=== Graph Lab - Демонстрация всех функций ===\n");
    
    // Выводим список всех функций
    console.log("Доступные функции:");
    console.log(functionLibrary.listFunctions());
    console.log("\n");
    
    // Демонстрируем каждую функцию
    const functionNames = functionLibrary.getFunctionNames();
    
    functionNames.forEach((functionName, index) => {
        console.log(`${index + 1}. Демонстрация функции: ${functionName}`);
        
        const funcInfo = functionLibrary.getFunctionInfo(functionName);
        console.log(`   Тип: ${funcInfo.type}`);
        console.log(`   Формула: ${funcInfo.formula}`);
        console.log(`   Параметры: ${funcInfo.params.join(', ')}`);
        console.log(`   Домен: [${funcInfo.domain.start}, ${funcInfo.domain.stop}], точек: ${funcInfo.domain.num}`);
        
        // Показываем шаблоны
        const templates = functionLibrary.getTemplates(functionName);
        console.log(`   Шаблоны (${templates.length}):`);
        templates.slice(0, 3).forEach((template, i) => {
            console.log(`     Шаблон ${i + 1}: ${JSON.stringify(template)}`);
        });
        if (templates.length > 3) {
            console.log(`     ... и еще ${templates.length - 3} шаблонов`);
        }
        console.log("");
    });
}

// Функция для демонстрации конкретной функции
function demonstrateFunction(functionName, templateIndex = 0) {
    console.log(`=== Демонстрация функции: ${functionName} ===`);
    
    const funcInfo = functionLibrary.getFunctionInfo(functionName);
    if (!funcInfo) {
        console.log("Функция не найдена!");
        return;
    }
    
    const templates = functionLibrary.getTemplates(functionName);
    if (templateIndex >= templates.length) {
        console.log("Шаблон не найден!");
        return;
    }
    
    const template = templates[templateIndex];
    console.log(`Используемый шаблон: ${JSON.stringify(template)}`);
    
    // Создаем калькулятор для вычислений
    const calculator = new Calculator(functionLibrary);
    
    // Вычисляем точки графика
    const result = calculator.calculatePoints(functionName, template);
    
    if (result.error) {
        console.log(`Ошибка вычисления: ${result.error}`);
        return;
    }
    
    console.log(`Тип графика: ${result.type}`);
    console.log(`Количество точек: ${result.x.length}`);
    console.log(`Диапазон X: [${Math.min(...result.x).toFixed(2)}, ${Math.max(...result.x).toFixed(2)}]`);
    console.log(`Диапазон Y: [${Math.min(...result.y).toFixed(2)}, ${Math.max(...result.y).toFixed(2)}]`);
    
    // Показываем первые несколько точек
    console.log("Первые 5 точек:");
    for (let i = 0; i < Math.min(5, result.x.length); i++) {
        console.log(`  (${result.x[i].toFixed(3)}, ${result.y[i].toFixed(3)})`);
    }
    console.log("");
}

// Функция для демонстрации функций по типам
function demonstrateByType() {
    console.log("=== Демонстрация функций по типам ===\n");
    
    const functionNames = functionLibrary.getFunctionNames();
    const byType = {};
    
    // Группируем функции по типам
    functionNames.forEach(name => {
        const funcInfo = functionLibrary.getFunctionInfo(name);
        const type = funcInfo.type;
        if (!byType[type]) {
            byType[type] = [];
        }
        byType[type].push(name);
    });
    
    // Выводим по типам
    Object.keys(byType).forEach(type => {
        console.log(`${type.toUpperCase()} функции (${byType[type].length}):`);
        byType[type].forEach(name => {
            const funcInfo = functionLibrary.getFunctionInfo(name);
            console.log(`  - ${name}: ${funcInfo.formula}`);
        });
        console.log("");
    });
}

// Функция для демонстрации шаблонов
function demonstrateTemplates() {
    console.log("=== Демонстрация шаблонов ===\n");
    
    const functionNames = functionLibrary.getFunctionNames();
    
    functionNames.forEach(name => {
        const templates = functionLibrary.getTemplates(name);
        console.log(`${name}: ${templates.length} шаблонов`);
        
        // Показываем несколько примеров шаблонов
        templates.slice(0, 2).forEach((template, i) => {
            console.log(`  Шаблон ${i + 1}: ${JSON.stringify(template)}`);
        });
        console.log("");
    });
}

// Функция для тестирования производительности
function performanceTest() {
    console.log("=== Тест производительности ===\n");
    
    const calculator = new Calculator(functionLibrary);
    const testFunctions = ["Linear", "Quadratic", "Sine", "Rose curve", "Butterfly (polar)"];
    
    testFunctions.forEach(functionName => {
        const funcInfo = functionLibrary.getFunctionInfo(functionName);
        const templates = functionLibrary.getTemplates(functionName);
        const template = templates[0];
        
        const startTime = performance.now();
        const result = calculator.calculatePoints(functionName, template);
        const endTime = performance.now();
        
        console.log(`${functionName}:`);
        console.log(`  Время вычисления: ${(endTime - startTime).toFixed(2)} мс`);
        console.log(`  Количество точек: ${result.x.length}`);
        console.log(`  Тип: ${result.type}`);
        console.log("");
    });
}

// Функция для демонстрации специальных функций
function demonstrateSpecialFunctions() {
    console.log("=== Демонстрация специальных функций ===\n");
    
    const specialFunctions = [
        "Hypotrochoid (spiro)",
        "Epicycloid (spiro)", 
        "Lissajous",
        "Butterfly (polar)",
        "Hexagram (Star of David)"
    ];
    
    specialFunctions.forEach(name => {
        if (functionLibrary.getFunctionNames().includes(name)) {
            demonstrateFunction(name, 0);
        }
    });
}

// Основная функция демонстрации
function runDemo() {
    console.log("🚀 Запуск демонстрации Graph Lab JavaScript версии\n");
    
    // Проверяем, что FunctionLibrary доступна
    if (typeof FunctionLibrary === 'undefined') {
        console.error("FunctionLibrary не найдена! Убедитесь, что все скрипты загружены.");
        return;
    }
    
    try {
        // Запускаем различные демонстрации
        demonstrateAllFunctions();
        demonstrateByType();
        demonstrateTemplates();
        demonstrateSpecialFunctions();
        performanceTest();
        
        console.log("✅ Демонстрация завершена успешно!");
        
    } catch (error) {
        console.error("❌ Ошибка в демонстрации:", error);
    }
}

// Экспортируем функции для использования в браузере
if (typeof window !== 'undefined') {
    window.GraphLabDemo = {
        runDemo,
        demonstrateAllFunctions,
        demonstrateFunction,
        demonstrateByType,
        demonstrateTemplates,
        demonstrateSpecialFunctions,
        performanceTest
    };
}

// Автоматический запуск демонстрации при загрузке
if (typeof document !== 'undefined') {
    document.addEventListener('DOMContentLoaded', () => {
        // Инициализируем demo
        initDemo();
        
        // Ждем немного, чтобы все скрипты загрузились
        setTimeout(() => {
            if (typeof FunctionLibrary !== 'undefined' && functionLibrary) {
                runDemo();
            } else {
                console.log("FunctionLibrary еще не загружена. Запустите runDemo() вручную.");
            }
        }, 1000);
    });
}
