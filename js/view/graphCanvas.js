/**
 * Холст для отображения графиков с использованием Chart.js
 */
class GraphCanvas {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.chart = null;
        this.currentData = null;
        
        this._initializeChart();
    }

    _initializeChart() {
        const ctx = this.canvas.getContext('2d');
        
        this.chart = new Chart(ctx, {
            type: 'line',
            data: {
                datasets: []
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    title: {
                        display: true,
                        text: 'График функции',
                        font: {
                            size: 16,
                            weight: 'bold'
                        }
                    },
                    legend: {
                        display: true,
                        position: 'top'
                    },
                    tooltip: {
                        mode: 'index',
                        intersect: false
                    }
                },
                scales: {
                    x: {
                        type: 'linear',
                        display: true,
                        title: {
                            display: true,
                            text: 'X'
                        },
                        grid: {
                            color: 'rgba(0, 0, 0, 0.1)'
                        }
                    },
                    y: {
                        type: 'linear',
                        display: true,
                        title: {
                            display: true,
                            text: 'Y'
                        },
                        grid: {
                            color: 'rgba(0, 0, 0, 0.1)'
                        }
                    }
                },
                interaction: {
                    mode: 'nearest',
                    axis: 'x',
                    intersect: false
                },
                elements: {
                    point: {
                        radius: 0
                    },
                    line: {
                        borderWidth: 2
                    }
                }
            }
        });

        // Добавляем начальное сообщение
        this._showInitialMessage();
    }

    _showInitialMessage() {
        this.chart.data.datasets = [];
        this.chart.options.plugins.title.text = 'Выберите функцию и нажмите "Построить график"';
        this.chart.options.scales.x.min = -10;
        this.chart.options.scales.x.max = 10;
        this.chart.options.scales.y.min = -10;
        this.chart.options.scales.y.max = 10;
        this.chart.update();
    }

    plotFunction(data) {
        if (data.error) {
            this._showError(data.error);
            return;
        }

        const xData = data.x;
        const yData = data.y;
        const plotType = data.type || "cartesian";
        const formula = data.formula || "";

        if (!xData || !yData || xData.length === 0 || yData.length === 0) {
            this._showError("Нет данных для построения графика");
            return;
        }

        // Создаем точки для графика
        const points = [];
        for (let i = 0; i < xData.length; i++) {
            points.push({
                x: xData[i],
                y: yData[i]
            });
        }

        // Настраиваем цвета в зависимости от типа графика
        let borderColor, backgroundColor;
        switch (plotType) {
            case "cartesian":
                borderColor = 'rgb(59, 130, 246)';
                backgroundColor = 'rgba(59, 130, 246, 0.1)';
                break;
            case "parametric":
                borderColor = 'rgb(239, 68, 68)';
                backgroundColor = 'rgba(239, 68, 68, 0.1)';
                break;
            case "polar":
                borderColor = 'rgb(34, 197, 94)';
                backgroundColor = 'rgba(34, 197, 94, 0.1)';
                break;
            default:
                borderColor = 'rgb(59, 130, 246)';
                backgroundColor = 'rgba(59, 130, 246, 0.1)';
        }

        // Обновляем данные графика
        this.chart.data.datasets = [{
            label: formula || 'Функция',
            data: points,
            borderColor: borderColor,
            backgroundColor: backgroundColor,
            fill: false,
            tension: 0.1,
            pointRadius: 0,
            pointHoverRadius: 4
        }];

        // Обновляем заголовок
        this.chart.options.plugins.title.text = `График: ${formula}`;

        // Автоматическое масштабирование
        this._autoScale(xData, yData);

        // Обновляем график
        this.chart.update();

        // Сохраняем текущие данные
        this.currentData = data;
    }

    _autoScale(xData, yData) {
        if (xData.length === 0 || yData.length === 0) return;

        const xMin = Math.min(...xData);
        const xMax = Math.max(...xData);
        const yMin = Math.min(...yData);
        const yMax = Math.max(...yData);

        const xRange = xMax - xMin;
        const yRange = yMax - yMin;

        // Добавляем отступы
        const xPadding = xRange * 0.1;
        const yPadding = yRange * 0.1;

        this.chart.options.scales.x.min = xMin - xPadding;
        this.chart.options.scales.x.max = xMax + xPadding;
        this.chart.options.scales.y.min = yMin - yPadding;
        this.chart.options.scales.y.max = yMax + yPadding;
    }

    _showError(errorMessage) {
        this.chart.data.datasets = [];
        this.chart.options.plugins.title.text = `Ошибка: ${errorMessage}`;
        this.chart.options.scales.x.min = -10;
        this.chart.options.scales.x.max = 10;
        this.chart.options.scales.y.min = -10;
        this.chart.options.scales.y.max = 10;
        this.chart.update();
    }

    clearPlot() {
        this._showInitialMessage();
        this.currentData = null;
    }

    savePlot() {
        if (!this.chart) return;

        // Создаем временную ссылку для скачивания
        const link = document.createElement('a');
        link.download = 'graph.png';
        link.href = this.canvas.toDataURL('image/png');
        link.click();
    }

    zoomIn() {
        if (!this.chart) return;

        const xScale = this.chart.options.scales.x;
        const yScale = this.chart.options.scales.y;

        const xRange = xScale.max - xScale.min;
        const yRange = yScale.max - yScale.min;

        xScale.min += xRange * 0.1;
        xScale.max -= xRange * 0.1;
        yScale.min += yRange * 0.1;
        yScale.max -= yRange * 0.1;

        this.chart.update();
    }

    zoomOut() {
        if (!this.chart) return;

        const xScale = this.chart.options.scales.x;
        const yScale = this.chart.options.scales.y;

        const xRange = xScale.max - xScale.min;
        const yRange = yScale.max - yScale.min;

        xScale.min -= xRange * 0.1;
        xScale.max += xRange * 0.1;
        yScale.min -= yRange * 0.1;
        yScale.max += yRange * 0.1;

        this.chart.update();
    }

    resetZoom() {
        if (!this.currentData) {
            this._showInitialMessage();
            return;
        }

        // Восстанавливаем автоматическое масштабирование
        this._autoScale(this.currentData.x, this.currentData.y);
        this.chart.update();
    }

    getCurrentData() {
        return this.currentData;
    }
}

// Экспорт для браузера
if (typeof window !== 'undefined') {
    window.GraphCanvas = GraphCanvas;
}
