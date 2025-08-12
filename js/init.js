/**
 * Файл инициализации - загружается после всех остальных файлов
 * Обеспечивает правильную инициализацию зависимостей
 */

// Ждем загрузки всех скриптов
document.addEventListener('DOMContentLoaded', function() {
    console.log('Инициализация Graph Lab...');
    
    // Увеличенная задержка для полной загрузки всех скриптов
    setTimeout(() => {
        console.log('Проверяем доступность классов...');
        
        // Проверяем основные классы
        const classes = ['FunctionLibrary', 'TemplateNames', 'UIPanel', 'GraphCanvas', 'MainController', 'App'];
        const missingClasses = [];
        
        classes.forEach(className => {
            if (typeof window[className] === 'undefined') {
                missingClasses.push(className);
                console.error(`${className} не загружен!`);
            } else {
                console.log(`✓ ${className} загружен`);
            }
        });
        
        if (missingClasses.length > 0) {
            console.error('Не удалось загрузить классы:', missingClasses);
            return;
        }
        
        console.log('Все компоненты загружены успешно!');
        
        // Запускаем приложение
        try {
            if (typeof initApp === 'function') {
                console.log('Запускаем initApp...');
                initApp();
            } else {
                console.log('Запускаем стандартную инициализацию...');
                const app = new App();
                app.init();
            }
            console.log('Приложение запущено успешно!');
        } catch (error) {
            console.error('Ошибка при запуске приложения:', error);
        }
    }, 500);
});

console.log('Файл инициализации загружен');
