/**
 * Шаблоны функций - предустановленные параметры для красивых графиков
 * Совместимость с новой структурой FunctionLibrary
 */

// Функция для обратной совместимости со старой структурой
function getAllTemplates() {
    const functionLibrary = new FunctionLibrary();
    return functionLibrary.templates;
}

// Экспорт для использования в других модулях
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { getAllTemplates };
}
