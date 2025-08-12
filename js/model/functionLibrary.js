/**
 * Graph Lab — 30+ function grapher (cartesian, parametric, polar, polygon)
 * JavaScript версия, основанная на graph_lab.py
 */

// Импорт класса для индивидуальных названий шаблонов
// Будет инициализирован позже через init.js
// TemplateNames загружается из templateNames.js

class FunctionLibrary {
    constructor() {
        this.functions = this._initializeFunctions();
        this.templates = this._initializeTemplates();
    }

    _initializeFunctions() {
        return {
            // 1-16 Cartesian functions
            "Linear": {
                id: 1,
                formula: "y = a*x + b",
                function: (x, params) => params.a * x + params.b,
                params: ["a", "b"],
                type: "cartesian",
                domain: { start: -10, stop: 10, num: 1200 }
            },
            "Quadratic": {
                id: 2,
                formula: "y = a*x^2 + b*x + c",
                function: (x, params) => params.a * x**2 + params.b * x + params.c,
                params: ["a", "b", "c"],
                type: "cartesian",
                domain: { start: -6, stop: 6, num: 1400 }
            },
            "Cubic (odd)": {
                id: 3,
                formula: "y = a*x^3 + b*x",
                function: (x, params) => params.a * x**3 + params.b * x,
                params: ["a", "b"],
                type: "cartesian",
                domain: { start: -4, stop: 4, num: 1400 }
            },
            "Quartic (even-symmetric)": {
                id: 4,
                formula: "y = a*x^4 + b*x^2 + c",
                function: (x, params) => params.a * x**4 + params.b * x**2 + params.c,
                params: ["a", "b", "c"],
                type: "cartesian",
                domain: { start: -3, stop: 3, num: 1400 }
            },
            "Absolute value": {
                id: 5,
                formula: "y = a*|x| + b",
                function: (x, params) => params.a * Math.abs(x) + params.b,
                params: ["a", "b"],
                type: "cartesian",
                domain: { start: -10, stop: 10, num: 1200 }
            },
            "Exponential": {
                id: 6,
                formula: "y = a*exp(b*x) + c",
                function: (x, params) => params.a * Math.exp(params.b * x) + params.c,
                params: ["a", "b", "c"],
                type: "cartesian",
                domain: { start: -4, stop: 4, num: 1600 }
            },
            "Logarithm": {
                id: 7,
                formula: "y = a*ln(b*x + c) + d",
                function: (x, params) => {
                    const z = params.b * x + params.c;
                    return z > 0 ? params.a * Math.log(z) + params.d : NaN;
                },
                params: ["a", "b", "c", "d"],
                type: "cartesian",
                domain: { start: -5, stop: 5, num: 1600 }
            },
            "Power (|x|^b)": {
                id: 8,
                formula: "y = a*|x|^b + c",
                function: (x, params) => params.a * Math.pow(Math.abs(x), params.b) + params.c,
                params: ["a", "b", "c"],
                type: "cartesian",
                domain: { start: -4, stop: 4, num: 1400 }
            },
            "Sine": {
                id: 9,
                formula: "y = a*sin(b*x + c) + d",
                function: (x, params) => params.a * Math.sin(params.b * x + params.c) + params.d,
                params: ["a", "b", "c", "d"],
                type: "cartesian",
                domain: { start: -10, stop: 10, num: 2000 }
            },
            "Cosine sum": {
                id: 10,
                formula: "y = a*cos(b*x) + c*cos(d*x)",
                function: (x, params) => params.a * Math.cos(params.b * x) + params.c * Math.cos(params.d * x),
                params: ["a", "b", "c", "d"],
                type: "cartesian",
                domain: { start: -15, stop: 15, num: 2400 }
            },
            "Damped sine": {
                id: 11,
                formula: "y = a*exp(-b*|x|)*sin(c*x)",
                function: (x, params) => params.a * Math.exp(-params.b * Math.abs(x)) * Math.sin(params.c * x),
                params: ["a", "b", "c"],
                type: "cartesian",
                domain: { start: -40, stop: 40, num: 2600 }
            },
            "Gaussian bell": {
                id: 12,
                formula: "y = a*exp(-((x-b)^2)/(2*c^2))",
                function: (x, params) => params.a * Math.exp(-((x - params.b)**2) / (2 * (params.c**2 + 1e-9))),
                params: ["a", "b", "c"],
                type: "cartesian",
                domain: { start: -6, stop: 6, num: 1600 }
            },
            "Sinc": {
                id: 13,
                formula: "y = a*sin(b*x)/(c*x)",
                function: (x, params) => params.a * Math.sin(params.b * x) / (params.c * x + 1e-9),
                params: ["a", "b", "c"],
                type: "cartesian",
                domain: { start: -30, stop: 30, num: 2800 }
            },
            "Logistic (sigmoid)": {
                id: 14,
                formula: "y = a/(1+exp(-b*(x-c))) + d",
                function: (x, params) => params.a / (1 + Math.exp(-params.b * (x - params.c))) + params.d,
                params: ["a", "b", "c", "d"],
                type: "cartesian",
                domain: { start: -8, stop: 8, num: 1600 }
            },
            "Tangent": {
                id: 15,
                formula: "y = a*tan(b*x + c) + d",
                function: (x, params) => {
                    const arg = params.b * x + params.c;
                    return Math.abs(Math.cos(arg)) > 0.02 ? params.a * Math.tan(arg) + params.d : NaN;
                },
                params: ["a", "b", "c", "d"],
                type: "cartesian",
                domain: { start: -6, stop: 6, num: 2600 }
            },
            "Rational": {
                id: 16,
                formula: "y = a*x/(1 + b*x^2)",
                function: (x, params) => params.a * x / (1 + params.b * x**2),
                params: ["a", "b"],
                type: "cartesian",
                domain: { start: -10, stop: 10, num: 2000 }
            },

            // 17-23 Parametric functions
            "Circle": {
                id: 17,
                formula: "x=a*cos(t), y=a*sin(t)",
                function: (t, params) => [params.a * Math.cos(t), params.a * Math.sin(t)],
                params: ["a"],
                type: "parametric",
                domain: { start: 0, stop: 2 * Math.PI, num: 1600 }
            },
            "Ellipse": {
                id: 18,
                formula: "x=a*cos(t), y=b*sin(t)",
                function: (t, params) => [params.a * Math.cos(t), params.b * Math.sin(t)],
                params: ["a", "b"],
                type: "parametric",
                domain: { start: 0, stop: 2 * Math.PI, num: 1600 }
            },
            "Lissajous": {
                id: 19,
                formula: "x=a*sin(p*t+δ), y=b*sin(q*t)",
                function: (t, params) => [
                    params.a * Math.sin(params.p * t + params.delta),
                    params.b * Math.sin(params.q * t)
                ],
                params: ["a", "b", "p", "q", "delta"],
                type: "parametric",
                domain: { start: 0, stop: 2 * Math.PI, num: 2400 }
            },
            "Hypotrochoid (spiro)": {
                id: 20,
                formula: "x=(R-r)cos t + d cos((R-r)/r * t); y=(R-r)sin t - d sin((R-r)/r * t)",
                function: (t, params) => {
                    const R = params.R, r = params.r, d = params.d;
                    const k = (R - r) / (r + 1e-9);
                    return [
                        (R - r) * Math.cos(t) + d * Math.cos(k * t),
                        (R - r) * Math.sin(t) - d * Math.sin(k * t)
                    ];
                },
                params: ["R", "r", "d"],
                type: "parametric",
                domain: { start: 0, stop: 2 * Math.PI * 24, num: 4800 }
            },
            "Epicycloid (spiro)": {
                id: 21,
                formula: "x=(R+r)cos t - d cos((R+r)/r * t); y=(R+r)sin t - d sin((R+r)/r * t)",
                function: (t, params) => {
                    const R = params.R, r = params.r, d = params.d;
                    const k = (R + r) / (r + 1e-9);
                    return [
                        (R + r) * Math.cos(t) - d * Math.cos(k * t),
                        (R + r) * Math.sin(t) - d * Math.sin(k * t)
                    ];
                },
                params: ["R", "r", "d"],
                type: "parametric",
                domain: { start: 0, stop: 2 * Math.PI * 16, num: 4000 }
            },
            "Spiral (parametric)": {
                id: 22,
                formula: "x=(a+b*t)cos t, y=(a+b*t)sin t",
                function: (t, params) => {
                    const r = params.a + params.b * t;
                    return [r * Math.cos(t), r * Math.sin(t)];
                },
                params: ["a", "b"],
                type: "parametric",
                domain: { start: 0, stop: 12 * Math.PI, num: 3600 }
            },
            "Superellipse": {
                id: 23,
                formula: "superellipse |x/a|^n + |y/b|^n = 1",
                function: (t, params) => {
                    const n = params.n;
                    const x = params.a * Math.sign(Math.cos(t)) * Math.pow(Math.abs(Math.cos(t)), 2.0 / (n + 1e-9));
                    const y = params.b * Math.sign(Math.sin(t)) * Math.pow(Math.abs(Math.sin(t)), 2.0 / (n + 1e-9));
                    return [x, y];
                },
                params: ["a", "b", "n"],
                type: "parametric",
                domain: { start: 0, stop: 2 * Math.PI, num: 2000 }
            },

            // 24-30 Polar functions
            "Rose curve": {
                id: 24,
                formula: "r = a*cos(k*θ)",
                function: (theta, params) => {
                    const r = params.a * Math.cos(params.k * theta);
                    return [r * Math.cos(theta), r * Math.sin(theta)];
                },
                params: ["a", "k"],
                type: "polar",
                domain: { start: 0, stop: 2 * Math.PI, num: 2400 }
            },
            "Cardioid": {
                id: 25,
                formula: "r = a*(1 - cos θ)",
                function: (theta, params) => {
                    const r = params.a * (1 - Math.cos(theta));
                    return [r * Math.cos(theta), r * Math.sin(theta)];
                },
                params: ["a"],
                type: "polar",
                domain: { start: 0, stop: 2 * Math.PI, num: 2000 }
            },
            "Lemniscate of Bernoulli": {
                id: 26,
                formula: "r = a*sqrt(cos(2θ))",
                function: (theta, params) => {
                    const val = Math.cos(2 * theta);
                    if (val < 0) return [NaN, NaN];
                    const r = params.a * Math.sqrt(val);
                    return [r * Math.cos(theta), r * Math.sin(theta)];
                },
                params: ["a"],
                type: "polar",
                domain: { start: 0, stop: 2 * Math.PI, num: 2200 }
            },
            "Logarithmic spiral": {
                id: 27,
                formula: "r = a*exp(b*θ)",
                function: (theta, params) => {
                    const r = params.a * Math.exp(params.b * theta);
                    return [r * Math.cos(theta), r * Math.sin(theta)];
                },
                params: ["a", "b"],
                type: "polar",
                domain: { start: 0, stop: 6 * Math.PI, num: 2400 }
            },
            "Hyperbolic spiral": {
                id: 28,
                formula: "r = a/θ",
                function: (theta, params) => {
                    const r = params.a / (theta + 1e-9);
                    return [r * Math.cos(theta), r * Math.sin(theta)];
                },
                params: ["a"],
                type: "polar",
                domain: { start: 0.1, stop: 10 * Math.PI, num: 2400 }
            },
            "Archimedean spiral": {
                id: 29,
                formula: "r = a + b*θ",
                function: (theta, params) => {
                    const r = params.a + params.b * theta;
                    return [r * Math.cos(theta), r * Math.sin(theta)];
                },
                params: ["a", "b"],
                type: "polar",
                domain: { start: 0, stop: 8 * Math.PI, num: 2400 }
            },
            "Butterfly (polar)": {
                id: 30,
                formula: "r = e^{sin θ} - 2 cos(4θ) + sin^5((2θ-π)/24)",
                function: (theta, params) => {
                    const r = (Math.exp(Math.sin(theta)) - 2 * Math.cos(4 * theta) + 
                              Math.pow(Math.sin((2 * theta - Math.PI) / 24), 5)) * params.scale;
                    return [r * Math.cos(theta), r * Math.sin(theta)];
                },
                params: ["scale"],
                type: "polar",
                domain: { start: 0, stop: 12 * Math.PI, num: 3600 }
            },

            // 31 Polygon function
            "Hexagram (Star of David)": {
                id: 31,
                formula: "12-vertex star polygon (two equilateral triangles)",
                function: (t, params) => {
                    return this._hexagramVertices(params.scale, params.rotation);
                },
                params: ["scale", "rotation"],
                type: "polygon",
                domain: { start: 0, stop: 1, num: 2000 }
            }
        };
    }

    _hexagramVertices(scale = 1.0, rotation = 0.0) {
        const R = 1.0 * scale;
        const r = (Math.sqrt(3) / 3.0) * R;
        const vertices = [];
        
        for (let k = 0; k < 12; k++) {
            const ang = rotation + k * (Math.PI / 6.0);
            const rad = (k % 2 === 0) ? R : r;
            vertices.push([rad * Math.cos(ang), rad * Math.sin(ang)]);
        }
        
        // Close the polygon
        vertices.push(vertices[0]);
        
        // Interpolate points along edges
        const points = [];
        for (let i = 0; i < vertices.length - 1; i++) {
            const [x0, y0] = vertices[i];
            const [x1, y1] = vertices[i + 1];
            const perEdge = Math.max(2, 2000 / (vertices.length - 1));
            
            for (let j = 0; j < perEdge; j++) {
                const t = j / perEdge;
                const x = x0 + (x1 - x0) * t;
                const y = y0 + (y1 - y0) * t;
                points.push([x, y]);
            }
        }
        
        return points;
    }

    _initializeTemplates() {
        return this._generateAllTemplates();
    }

    _generateAllTemplates() {
        return {
            "Linear": this._linearTemplates(10),
            "Quadratic": this._quadraticTemplates(10),
            "Cubic (odd)": this._cubicTemplates(10),
            "Quartic (even-symmetric)": this._quarticTemplates(10),
            "Absolute value": this._absTemplates(10),
            "Exponential": this._expTemplates(10),
            "Logarithm": this._logTemplates(10),
            "Power (|x|^b)": this._powerTemplates(10),
            "Sine": this._sineTemplates(10),
            "Cosine sum": this._cosSumTemplates(10),
            "Damped sine": this._dampedSineTemplates(10),
            "Gaussian bell": this._gaussianTemplates(10),
            "Sinc": this._sincTemplates(10),
            "Logistic (sigmoid)": this._logisticTemplates(10),
            "Tangent": this._tangentTemplates(10),
            "Rational": this._rationalTemplates(10),
            "Circle": this._circleTemplates(10),
            "Ellipse": this._ellipseTemplates(10),
            "Lissajous": this._lissajousTemplates(10),
            "Hypotrochoid (spiro)": this._hypotrochoidTemplates(10),
            "Epicycloid (spiro)": this._epicycloidTemplates(10),
            "Spiral (parametric)": this._spiralParamTemplates(10),
            "Superellipse": this._superellipseTemplates(10),
            "Rose curve": this._roseTemplates(10),
            "Cardioid": this._cardioidTemplates(10),
            "Lemniscate of Bernoulli": this._lemniscateTemplates(10),
            "Logarithmic spiral": this._logSpiralTemplates(10),
            "Hyperbolic spiral": this._hyperbolicSpiralTemplates(10),
            "Archimedean spiral": this._archSpiralTemplates(10),
            "Butterfly (polar)": this._butterflyTemplates(10),
            "Hexagram (Star of David)": this._hexagramTemplates(10)
        };
    }

    // Template generators (based on graph_lab.py)
    _linearTemplates(n = 10) {
        const vals = [];
        for (let i = 0; i < n; i++) {
            const a = (i - (n / 2)) * 0.4 + 1.0;
            const b = (i % 3 - 1) * 2.0;
            vals.push({ a, b });
        }
        return vals;
    }

    _quadraticTemplates(n = 10) {
        const vals = [];
        for (let i = 0; i < n; i++) {
            const a = 0.5 + 0.2 * i;
            const b = (i % 4 - 2) * 0.8;
            const c = (i % 5 - 2) * 1.2;
            vals.push({ a, b, c });
        }
        return vals;
    }

    _cubicTemplates(n = 10) {
        const vals = [];
        for (let i = 0; i < n; i++) {
            const a = 0.2 + 0.1 * i;
            const b = (i % 5 - 2) * 0.8;
            vals.push({ a, b });
        }
        return vals;
    }

    _quarticTemplates(n = 10) {
        const vals = [];
        for (let i = 0; i < n; i++) {
            const a = 0.02 + 0.04 * i;
            const b = (i % 5 - 2) * 0.5;
            const c = (i % 3 - 1) * 1.0;
            vals.push({ a, b, c });
        }
        return vals;
    }

    _absTemplates(n = 10) {
        const vals = [];
        for (let i = 0; i < n; i++) {
            const a = 0.5 + 0.3 * i;
            const b = (i % 5 - 2) * 1.0;
            vals.push({ a, b });
        }
        return vals;
    }

    _expTemplates(n = 10) {
        const vals = [];
        for (let i = 0; i < n; i++) {
            const a = 1.0;
            const b = -1.0 + 0.2 * i;
            const c = (i % 3 - 1) * 0.5;
            vals.push({ a, b, c });
        }
        return vals;
    }

    _logTemplates(n = 10) {
        const vals = [];
        for (let i = 0; i < n; i++) {
            const a = 1.0;
            const b = 0.5 + 0.1 * i;
            const c = Math.max(0.1, (i % 4) * 0.5);
            const d = (i % 3 - 1) * 0.5;
            vals.push({ a, b, c, d });
        }
        return vals;
    }

    _powerTemplates(n = 10) {
        const exps = [0.5, 1.5, 2.5, 3.0, 0.8, 1.2, 2.2, 2.8, 3.5, 1.7];
        return exps.slice(0, n).map(exp => ({ a: 1.0, b: exp, c: 0.0 }));
    }

    _sineTemplates(n = 10) {
        const vals = [];
        for (let i = 0; i < n; i++) {
            vals.push({
                a: 1.0,
                b: 0.5 + i * 0.5,
                c: i * Math.PI / 10.0,
                d: 0.0
            });
        }
        return vals;
    }

    _cosSumTemplates(n = 10) {
        const combos = [[1, 2], [2, 3], [3, 5], [1, 5], [2, 7], [3, 7], [5, 8], [5, 9], [7, 9], [8, 13]];
        const vals = [];
        for (let i = 0; i < n; i++) {
            const [b, d] = combos[i % combos.length];
            vals.push({ a: 1.0, b, c: 0.6, d });
        }
        return vals;
    }

    _dampedSineTemplates(n = 10) {
        const vals = [];
        for (let i = 0; i < n; i++) {
            vals.push({
                a: 1.0,
                b: 0.05 + 0.05 * i,
                c: 2 + i
            });
        }
        return vals;
    }

    _gaussianTemplates(n = 10) {
        const vals = [];
        for (let i = 0; i < n; i++) {
            vals.push({
                a: 1.0,
                b: (i % 5 - 2) * 1.0,
                c: 0.3 + 0.1 * (i % 5)
            });
        }
        return vals;
    }

    _sincTemplates(n = 10) {
        const vals = [];
        for (let i = 0; i < n; i++) {
            vals.push({
                a: 1.0,
                b: 1.0 + 0.6 * i,
                c: 1.0
            });
        }
        return vals;
    }

    _logisticTemplates(n = 10) {
        const vals = [];
        for (let i = 0; i < n; i++) {
            vals.push({
                a: 1.0,
                b: 2 + 0.5 * i,
                c: (i % 5 - 2) * 0.5,
                d: 0.0
            });
        }
        return vals;
    }

    _tangentTemplates(n = 10) {
        const vals = [];
        for (let i = 0; i < n; i++) {
            vals.push({
                a: 1.0,
                b: 0.5 + 0.3 * i,
                c: i * Math.PI / 12.0,
                d: 0.0
            });
        }
        return vals;
    }

    _rationalTemplates(n = 10) {
        const vals = [];
        for (let i = 0; i < n; i++) {
            vals.push({
                a: 1.0,
                b: 0.2 + 0.2 * i
            });
        }
        return vals;
    }

    _circleTemplates(n = 10) {
        const vals = [];
        for (let i = 0; i < n; i++) {
            vals.push({ a: 0.5 + 0.1 * i });
        }
        return vals;
    }

    _ellipseTemplates(n = 10) {
        const vals = [];
        for (let i = 0; i < n; i++) {
            vals.push({
                a: 1.0 + 0.2 * (i % 5),
                b: 0.5 + 0.1 * ((i + 2) % 5)
            });
        }
        return vals;
    }

    _lissajousTemplates(n = 10) {
        const pairs = [[1, 2], [2, 1], [2, 3], [3, 2], [3, 4], [4, 3], [3, 5], [5, 3], [5, 4], [4, 5]];
        const vals = [];
        for (let i = 0; i < n; i++) {
            const [p, q] = pairs[i % pairs.length];
            vals.push({
                a: 1.0,
                b: 1.0,
                p,
                q,
                delta: (i % 10) * Math.PI / 10.0
            });
        }
        return vals;
    }

    _hypotrochoidTemplates(n = 10) {
        const triples = [[5, 3, 5], [7, 3, 3], [8, 3, 5], [9, 4, 3], [10, 3, 5], [11, 5, 5], [12, 5, 3], [13, 5, 4], [14, 3, 6], [15, 4, 5]];
        return triples.slice(0, n).map(([R, r, d]) => ({ R: R, r: r, d: d }));
    }

    _epicycloidTemplates(n = 10) {
        const pairs = [[3, 1], [4, 1], [5, 1], [5, 2], [6, 1], [7, 2], [7, 3], [8, 3], [9, 2], [10, 3]];
        const vals = [];
        for (let i = 0; i < n; i++) {
            const [R, r] = pairs[i % pairs.length];
            vals.push({ R: R, r: r, d: r });
        }
        return vals;
    }

    _spiralParamTemplates(n = 10) {
        const vals = [];
        for (let i = 0; i < n; i++) {
            vals.push({
                a: 0.0,
                b: 0.05 + 0.02 * i
            });
        }
        return vals;
    }

    _superellipseTemplates(n = 10) {
        const exps = [2, 2.5, 3, 3.5, 4, 1.5, 5, 6, 2.2, 2.8];
        const vals = [];
        for (let i = 0; i < n; i++) {
            vals.push({
                a: 1.0 + 0.2 * (i % 5),
                b: 1.0 + 0.2 * ((i + 2) % 5),
                n: exps[i % exps.length]
            });
        }
        return vals;
    }

    _roseTemplates(n = 10) {
        const ks = [3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
        return ks.slice(0, n).map(k => ({ a: 1.0, k: k }));
    }

    _cardioidTemplates(n = 10) {
        const vals = [];
        for (let i = 0; i < n; i++) {
            vals.push({ a: 1.0 + 0.1 * i });
        }
        return vals;
    }

    _lemniscateTemplates(n = 10) {
        const vals = [];
        for (let i = 0; i < n; i++) {
            vals.push({ a: 1.0 + 0.1 * i });
        }
        return vals;
    }

    _logSpiralTemplates(n = 10) {
        const vals = [];
        for (let i = 0; i < n; i++) {
            vals.push({
                a: 0.1,
                b: 0.1 + 0.05 * i
            });
        }
        return vals;
    }

    _hyperbolicSpiralTemplates(n = 10) {
        const vals = [];
        for (let i = 0; i < n; i++) {
            vals.push({ a: 1.0 + 0.2 * i });
        }
        return vals;
    }

    _archSpiralTemplates(n = 10) {
        const vals = [];
        for (let i = 0; i < n; i++) {
            vals.push({
                a: 0.0,
                b: 0.1 + 0.05 * i
            });
        }
        return vals;
    }

    _butterflyTemplates(n = 10) {
        const vals = [];
        for (let i = 0; i < n; i++) {
            vals.push({ scale: 1.0 + 0.1 * i });
        }
        return vals;
    }

    _hexagramTemplates(n = 10) {
        const vals = [];
        for (let i = 0; i < n; i++) {
            vals.push({
                scale: 1.0 + 0.1 * i,
                rotation: i * (Math.PI / 30.0)
            });
        }
        return vals;
    }

    getFunctionNames() {
        return Object.keys(this.functions);
    }

    getFunctionInfo(functionName) {
        return this.functions[functionName] || {};
    }

    getTemplates(functionName) {
        const templates = this.templates[functionName] || [];
        // Добавляем индивидуальные имена к шаблонам
        try {
            if (typeof window !== 'undefined' && window.TemplateNames) {
                const templateNames = new window.TemplateNames();
                return templates.map((template, index) => ({
                    name: templateNames.getTemplateName(functionName, index),
                    ...template
                }));
            } else {
                // Fallback к простым названиям
                return templates.map((template, index) => ({
                    name: `Template ${index + 1}`,
                    ...template
                }));
            }
        } catch (error) {
            console.warn('Ошибка при получении названий шаблонов:', error);
            // Fallback к простым названиям
            return templates.map((template, index) => ({
                name: `Template ${index + 1}`,
                ...template
            }));
        }
    }

    getFunction(functionName) {
        const funcInfo = this.functions[functionName];
        return funcInfo ? funcInfo.function : null;
    }

    listFunctions() {
        const lines = [];
        for (const [name, func] of Object.entries(this.functions)) {
            lines.push(`${func.id.toString().padStart(2, '0')}. ${name} [${func.type}] :: ${func.formula} :: params=${func.params.join(',')}`);
        }
        return lines.join('\n');
    }
}

// Экспорт для браузера
if (typeof window !== 'undefined') {
    window.FunctionLibrary = FunctionLibrary;
}
