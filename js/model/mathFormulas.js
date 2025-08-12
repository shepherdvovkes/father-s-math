/**
 * Математические формулы в формате LaTeX для всех функций
 */
class MathFormulas {
    constructor() {
        this.formulas = this._initializeFormulas();
    }

    _initializeFormulas() {
        return {
            // Декартовы функции
            "Linear": {
                display: "y = ax + b",
                latex: "y = ax + b"
            },
            "Quadratic": {
                display: "y = ax² + bx + c",
                latex: "y = ax^2 + bx + c"
            },
            "Cubic (odd)": {
                display: "y = ax³ + bx",
                latex: "y = ax^3 + bx"
            },
            "Quartic (even-symmetric)": {
                display: "y = ax⁴ + bx² + c",
                latex: "y = ax^4 + bx^2 + c"
            },
            "Absolute value": {
                display: "y = a|x| + b",
                latex: "y = a|x| + b"
            },
            "Exponential": {
                display: "y = ae^(bx) + c",
                latex: "y = ae^{bx} + c"
            },
            "Logarithm": {
                display: "y = a ln(bx + c) + d",
                latex: "y = a\\log(bx + c) + d"
            },
            "Power (|x|^b)": {
                display: "y = a|x|^b + c",
                latex: "y = a|x|^{b} + c"
            },
            "Sine": {
                display: "y = a sin(bx + c) + d",
                latex: "y = a\\sin(bx + c) + d"
            },
            "Cosine sum": {
                display: "y = a cos(bx) + c cos(dx)",
                latex: "y = a\\cos(bx) + c\\cos(dx)"
            },
            "Damped sine": {
                display: "y = ae^(-b|x|) sin(cx)",
                latex: "y = ae^{-b|x|}\\sin(cx)"
            },
            "Gaussian bell": {
                display: "y = ae^(-((x-b)²)/(2c²))",
                latex: "y = ae^{-(x-b)^2/(2c^2)}"
            },
            "Sinc": {
                display: "y = a sin(bx)/(cx)",
                latex: "y = a\\sin(bx)/(cx)"
            },
            "Logistic (sigmoid)": {
                display: "y = a/(1+e^(-b(x-c))) + d",
                latex: "y = a/(1 + e^{-b(x-c)}) + d"
            },
            "Tangent": {
                display: "y = a tan(bx + c) + d",
                latex: "y = a\\tan(bx + c) + d"
            },
            "Rational": {
                display: "y = ax/(1 + bx²)",
                latex: "y = ax/(1 + bx^2)"
            },

            // Параметрические функции
            "Circle": {
                display: "x = a cos(t), y = a sin(t)",
                latex: "\\begin{cases} x = a\\cos(t) \\\\ y = a\\sin(t) \\end{cases}"
            },
            "Ellipse": {
                display: "x = a cos(t), y = b sin(t)",
                latex: "\\begin{cases} x = a\\cos(t) \\\\ y = b\\sin(t) \\end{cases}"
            },
            "Lissajous": {
                display: "x = a sin(pt+δ), y = b sin(qt)",
                latex: "\\begin{cases} x = a\\sin(pt + \\delta) \\\\ y = b\\sin(qt) \\end{cases}"
            },
            "Hypotrochoid (spiro)": {
                display: "x = (R-r)cos(t) + d cos((R-r)t/r), y = (R-r)sin(t) - d sin((R-r)t/r)",
                latex: "\\begin{cases} x = (R-r)\\cos(t) + d\\cos\\left(\\frac{(R-r)t}{r}\\right) \\\\ y = (R-r)\\sin(t) - d\\sin\\left(\\frac{(R-r)t}{r}\\right) \\end{cases}"
            },
            "Epicycloid (spiro)": {
                display: "x = (R+r)cos(t) - r cos((R+r)t/r), y = (R+r)sin(t) - r sin((R+r)t/r)",
                latex: "\\begin{cases} x = (R+r)\\cos(t) - r\\cos\\left(\\frac{(R+r)t}{r}\\right) \\\\ y = (R+r)\\sin(t) - r\\sin\\left(\\frac{(R+r)t}{r}\\right) \\end{cases}"
            },
            "Spiral (parametric)": {
                display: "x = (a+bt)cos(t), y = (a+bt)sin(t)",
                latex: "\\begin{cases} x = (a+bt)\\cos(t) \\\\ y = (a+bt)\\sin(t) \\end{cases}"
            },
            "Superellipse": {
                display: "x = a cos(t)^(2/n), y = b sin(t)^(2/n)",
                latex: "\\begin{cases} x = a\\cos(t)^{2/n} \\\\ y = b\\sin(t)^{2/n} \\end{cases}"
            },

            // Полярные функции
            "Rose curve": {
                display: "r = a cos(kθ)",
                latex: "r = a\\cos(k\\theta)"
            },
            "Cardioid": {
                display: "r = a(1 - cos(θ))",
                latex: "r = a(1 - \\cos(\\theta))"
            },
            "Lemniscate of Bernoulli": {
                display: "r = a√cos(2θ)",
                latex: "r = a\\sqrt{\\cos(2\\theta)}"
            },
            "Logarithmic spiral": {
                display: "r = ae^(bθ)",
                latex: "r = ae^{b\\theta}"
            },
            "Hyperbolic spiral": {
                display: "r = a/θ",
                latex: "r = \\frac{a}{\\theta}"
            },
            "Archimedean spiral": {
                display: "r = a + bθ",
                latex: "r = a + b\\theta"
            },
            "Butterfly (polar)": {
                display: "r = e^(sin(θ)) - 2cos(4θ) + sin^5(θ/12)",
                latex: "r = e^{\\sin(\\theta)} - 2\\cos(4\\theta) + \\sin^5(\\theta/12)"
            },
            "Hexagram (Star of David)": {
                display: "r = a cos(3θ)",
                latex: "r = a\\cos(3\\theta)"
            }
        };
    }

    /**
     * Получить LaTeX формулу для функции
     * @param {string} functionName - название функции
     * @returns {string} LaTeX формула
     */
    getFormula(functionName) {
        return this.formulas[functionName]?.latex || "y = f(x)";
    }

    /**
     * Получить отображаемую формулу для функции
     * @param {string} functionName - название функции
     * @returns {string} отображаемая формула
     */
    getDisplayFormula(functionName) {
        return this.formulas[functionName]?.display || "y = f(x)";
    }

    /**
     * Проверить, является ли функция параметрической
     * @param {string} functionName - название функции
     * @returns {boolean}
     */
    isParametric(functionName) {
        const parametricFunctions = [
            "Circle", "Ellipse", "Lissajous", "Hypotrochoid (spiro)", 
            "Epicycloid (spiro)", "Spiral (parametric)", "Superellipse"
        ];
        return parametricFunctions.includes(functionName);
    }

    /**
     * Проверить, является ли функция полярной
     * @param {string} functionName - название функции
     * @returns {boolean}
     */
    isPolar(functionName) {
        const polarFunctions = [
            "Rose curve", "Cardioid", "Lemniscate of Bernoulli", 
            "Logarithmic spiral", "Hyperbolic spiral", "Archimedean spiral",
            "Butterfly (polar)", "Hexagram (Star of David)"
        ];
        return polarFunctions.includes(functionName);
    }

    /**
     * Получить тип функции
     * @param {string} functionName - название функции
     * @returns {string} тип функции ('cartesian', 'parametric', 'polar')
     */
    getFunctionType(functionName) {
        if (this.isParametric(functionName)) {
            return 'parametric';
        } else if (this.isPolar(functionName)) {
            return 'polar';
        } else {
            return 'cartesian';
        }
    }
}
