/**
 * База данных образовательной платформы для 9-го класса
 * Полная программа на весь учебный год
 */
class EducationDatabase {
    constructor() {
        this.subjects = {
            algebra: {
                name: "Алгебра",
                color: "#007bff",
                icon: '<i class="fas fa-chart-line"></i>',
                topics: {
                    functions: {
                        name: "Функции и их графики",
                        subtopics: {
                            linear: {
                                name: "Линейные функции",
                                lessons: [
                                    {
                                        id: "alg_9_linear_1",
                                        title: "Понятие функции. Линейная функция",
                                        type: "theory",
                                        description: "Введение в понятие функции. Линейная функция y = kx + b и её график",
                                        tags: ["алгебра", "функции", "линейные", "9 класс"],
                                        difficulty: "easy",
                                        week: 1
                                    },
                                    {
                                        id: "alg_9_linear_2",
                                        title: "График линейной функции",
                                        type: "interactive",
                                        description: "Построение графиков линейных функций. Влияние коэффициентов k и b",
                                        tags: ["алгебра", "функции", "графики", "9 класс"],
                                        difficulty: "easy",
                                        week: 2
                                    },
                                    {
                                        id: "alg_9_linear_3",
                                        title: "Взаимное расположение графиков",
                                        type: "interactive",
                                        description: "Параллельные и перпендикулярные прямые. Системы линейных уравнений",
                                        tags: ["алгебра", "функции", "системы", "9 класс"],
                                        difficulty: "medium",
                                        week: 3
                                    }
                                ]
                            },
                            quadratic: {
                                name: "Квадратичная функция",
                                lessons: [
                                    {
                                        id: "alg_9_quad_1",
                                        title: "Квадратичная функция y = ax²",
                                        type: "theory",
                                        description: "Основные свойства квадратичной функции. График параболы",
                                        tags: ["алгебра", "функции", "квадратичные", "9 класс"],
                                        difficulty: "medium",
                                        week: 4
                                    },
                                    {
                                        id: "alg_9_quad_2",
                                        title: "Квадратичная функция y = ax² + bx + c",
                                        type: "interactive",
                                        description: "Построение графика квадратичной функции. Вершина параболы",
                                        tags: ["алгебра", "функции", "парабола", "9 класс"],
                                        difficulty: "medium",
                                        week: 5
                                    },
                                    {
                                        id: "alg_9_quad_3",
                                        title: "Свойства квадратичной функции",
                                        type: "interactive",
                                        description: "Монотонность, экстремумы, нули функции",
                                        tags: ["алгебра", "функции", "свойства", "9 класс"],
                                        difficulty: "medium",
                                        week: 6
                                    }
                                ]
                            },
                            other_functions: {
                                name: "Другие функции",
                                lessons: [
                                    {
                                        id: "alg_9_other_1",
                                        title: "Функция y = k/x",
                                        type: "theory",
                                        description: "Обратная пропорциональность. Гипербола",
                                        tags: ["алгебра", "функции", "гипербола", "9 класс"],
                                        difficulty: "medium",
                                        week: 7
                                    },
                                    {
                                        id: "alg_9_other_2",
                                        title: "Функция y = √x",
                                        type: "interactive",
                                        description: "Квадратный корень. График функции",
                                        tags: ["алгебра", "функции", "корень", "9 класс"],
                                        difficulty: "medium",
                                        week: 8
                                    }
                                ]
                            }
                        }
                    },
                    equations: {
                        name: "Уравнения и неравенства",
                        subtopics: {
                            quadratic_equations: {
                                name: "Квадратные уравнения",
                                lessons: [
                                    {
                                        id: "alg_9_eq_quad_1",
                                        title: "Неполные квадратные уравнения",
                                        type: "theory",
                                        description: "Решение уравнений вида ax² = 0, ax² + bx = 0, ax² + c = 0",
                                        tags: ["алгебра", "уравнения", "квадратные", "9 класс"],
                                        difficulty: "easy",
                                        week: 9
                                    },
                                    {
                                        id: "alg_9_eq_quad_2",
                                        title: "Полные квадратные уравнения",
                                        type: "interactive",
                                        description: "Формула корней квадратного уравнения. Дискриминант",
                                        tags: ["алгебра", "уравнения", "дискриминант", "9 класс"],
                                        difficulty: "medium",
                                        week: 10
                                    },
                                    {
                                        id: "alg_9_eq_quad_3",
                                        title: "Теорема Виета",
                                        type: "theory",
                                        description: "Связь между корнями и коэффициентами квадратного уравнения",
                                        tags: ["алгебра", "уравнения", "теорема Виета", "9 класс"],
                                        difficulty: "medium",
                                        week: 11
                                    },
                                    {
                                        id: "alg_9_eq_quad_4",
                                        title: "Решение задач с помощью квадратных уравнений",
                                        type: "interactive",
                                        description: "Применение квадратных уравнений в задачах",
                                        tags: ["алгебра", "уравнения", "задачи", "9 класс"],
                                        difficulty: "hard",
                                        week: 12
                                    }
                                ]
                            },
                            systems: {
                                name: "Системы уравнений",
                                lessons: [
                                    {
                                        id: "alg_9_sys_1",
                                        title: "Системы линейных уравнений",
                                        type: "theory",
                                        description: "Методы решения систем двух линейных уравнений",
                                        tags: ["алгебра", "системы", "линейные", "9 класс"],
                                        difficulty: "medium",
                                        week: 13
                                    },
                                    {
                                        id: "alg_9_sys_2",
                                        title: "Системы с квадратными уравнениями",
                                        type: "interactive",
                                        description: "Системы, содержащие квадратные уравнения",
                                        tags: ["алгебра", "системы", "квадратные", "9 класс"],
                                        difficulty: "hard",
                                        week: 14
                                    }
                                ]
                            },
                            inequalities: {
                                name: "Неравенства",
                                lessons: [
                                    {
                                        id: "alg_9_ineq_1",
                                        title: "Линейные неравенства",
                                        type: "theory",
                                        description: "Решение линейных неравенств и их систем",
                                        tags: ["алгебра", "неравенства", "линейные", "9 класс"],
                                        difficulty: "medium",
                                        week: 15
                                    },
                                    {
                                        id: "alg_9_ineq_2",
                                        title: "Квадратные неравенства",
                                        type: "interactive",
                                        description: "Решение квадратных неравенств методом интервалов",
                                        tags: ["алгебра", "неравенства", "квадратные", "9 класс"],
                                        difficulty: "hard",
                                        week: 16
                                    }
                                ]
                            }
                        }
                    },
                    sequences: {
                        name: "Числовые последовательности",
                        subtopics: {
                            arithmetic: {
                                name: "Арифметическая прогрессия",
                                lessons: [
                                    {
                                        id: "alg_9_arith_1",
                                        title: "Понятие арифметической прогрессии",
                                        type: "theory",
                                        description: "Определение, формула n-го члена",
                                        tags: ["алгебра", "прогрессии", "арифметическая", "9 класс"],
                                        difficulty: "medium",
                                        week: 17
                                    },
                                    {
                                        id: "alg_9_arith_2",
                                        title: "Сумма n первых членов",
                                        type: "interactive",
                                        description: "Формула суммы арифметической прогрессии",
                                        tags: ["алгебра", "прогрессии", "сумма", "9 класс"],
                                        difficulty: "medium",
                                        week: 18
                                    }
                                ]
                            },
                            geometric: {
                                name: "Геометрическая прогрессия",
                                lessons: [
                                    {
                                        id: "alg_9_geom_1",
                                        title: "Понятие геометрической прогрессии",
                                        type: "theory",
                                        description: "Определение, формула n-го члена",
                                        tags: ["алгебра", "прогрессии", "геометрическая", "9 класс"],
                                        difficulty: "medium",
                                        week: 19
                                    },
                                    {
                                        id: "alg_9_geom_2",
                                        title: "Сумма n первых членов",
                                        type: "interactive",
                                        description: "Формула суммы геометрической прогрессии",
                                        tags: ["алгебра", "прогрессии", "сумма", "9 класс"],
                                        difficulty: "medium",
                                        week: 20
                                    }
                                ]
                            }
                        }
                    }
                }
            },
            geometry: {
                name: "Геометрия",
                color: "#28a745",
                icon: '<i class="fas fa-draw-polygon"></i>',
                topics: {
                    triangles: {
                        name: "Треугольники",
                        subtopics: {
                            properties: {
                                name: "Свойства треугольников",
                                lessons: [
                                    {
                                        id: "geom_9_tri_1",
                                        title: "Медианы, биссектрисы, высоты",
                                        type: "theory",
                                        description: "Замечательные точки треугольника",
                                        tags: ["геометрия", "треугольники", "медианы", "9 класс"],
                                        difficulty: "medium",
                                        week: 1
                                    },
                                    {
                                        id: "geom_9_tri_2",
                                        title: "Средняя линия треугольника",
                                        type: "interactive",
                                        description: "Свойства средней линии треугольника",
                                        tags: ["геометрия", "треугольники", "средняя линия", "9 класс"],
                                        difficulty: "medium",
                                        week: 2
                                    }
                                ]
                            },
                            similarity: {
                                name: "Подобие треугольников",
                                lessons: [
                                    {
                                        id: "geom_9_sim_1",
                                        title: "Признаки подобия треугольников",
                                        type: "theory",
                                        description: "Три признака подобия треугольников",
                                        tags: ["геометрия", "подобие", "треугольники", "9 класс"],
                                        difficulty: "medium",
                                        week: 3
                                    },
                                    {
                                        id: "geom_9_sim_2",
                                        title: "Применение подобия в задачах",
                                        type: "interactive",
                                        description: "Решение задач с использованием подобия",
                                        tags: ["геометрия", "подобие", "задачи", "9 класс"],
                                        difficulty: "hard",
                                        week: 4
                                    }
                                ]
                            }
                        }
                    },
                    circles: {
                        name: "Окружность",
                        subtopics: {
                            angles: {
                                name: "Углы в окружности",
                                lessons: [
                                    {
                                        id: "geom_9_cir_1",
                                        title: "Центральные и вписанные углы",
                                        type: "theory",
                                        description: "Связь между центральным и вписанным углами",
                                        tags: ["геометрия", "окружность", "углы", "9 класс"],
                                        difficulty: "medium",
                                        week: 5
                                    },
                                    {
                                        id: "geom_9_cir_2",
                                        title: "Углы между хордами и секущими",
                                        type: "interactive",
                                        description: "Теоремы об углах в окружности",
                                        tags: ["геометрия", "окружность", "хорды", "9 класс"],
                                        difficulty: "hard",
                                        week: 6
                                    }
                                ]
                            },
                            chords: {
                                name: "Хорды и касательные",
                                lessons: [
                                    {
                                        id: "geom_9_chord_1",
                                        title: "Свойства хорд",
                                        type: "theory",
                                        description: "Теоремы о хордах окружности",
                                        tags: ["геометрия", "окружность", "хорды", "9 класс"],
                                        difficulty: "medium",
                                        week: 7
                                    },
                                    {
                                        id: "geom_9_tangent_1",
                                        title: "Касательная к окружности",
                                        type: "interactive",
                                        description: "Свойства касательной. Теорема о касательной",
                                        tags: ["геометрия", "окружность", "касательная", "9 класс"],
                                        difficulty: "medium",
                                        week: 8
                                    }
                                ]
                            }
                        }
                    },
                    areas: {
                        name: "Площади фигур",
                        subtopics: {
                            polygons: {
                                name: "Площадь многоугольников",
                                lessons: [
                                    {
                                        id: "geom_9_area_1",
                                        title: "Площадь треугольника",
                                        type: "theory",
                                        description: "Формулы площади треугольника",
                                        tags: ["геометрия", "площадь", "треугольник", "9 класс"],
                                        difficulty: "medium",
                                        week: 9
                                    },
                                    {
                                        id: "geom_9_area_2",
                                        title: "Площадь четырехугольников",
                                        type: "interactive",
                                        description: "Площадь параллелограмма, трапеции, ромба",
                                        tags: ["геометрия", "площадь", "четырехугольники", "9 класс"],
                                        difficulty: "medium",
                                        week: 10
                                    }
                                ]
                            },
                            circles: {
                                name: "Площадь круга",
                                lessons: [
                                    {
                                        id: "geom_9_circle_area_1",
                                        title: "Площадь круга и его частей",
                                        type: "theory",
                                        description: "Площадь круга, сектора, сегмента",
                                        tags: ["геометрия", "площадь", "круг", "9 класс"],
                                        difficulty: "medium",
                                        week: 11
                                    }
                                ]
                            }
                        }
                    },
                    vectors: {
                        name: "Векторы",
                        subtopics: {
                            basics: {
                                name: "Основы векторной алгебры",
                                lessons: [
                                    {
                                        id: "geom_9_vec_1",
                                        title: "Понятие вектора",
                                        type: "theory",
                                        description: "Определение вектора. Равенство векторов",
                                        tags: ["геометрия", "векторы", "определение", "9 класс"],
                                        difficulty: "medium",
                                        week: 12
                                    },
                                    {
                                        id: "geom_9_vec_2",
                                        title: "Сложение и вычитание векторов",
                                        type: "interactive",
                                        description: "Правило треугольника и параллелограмма",
                                        tags: ["геометрия", "векторы", "сложение", "9 класс"],
                                        difficulty: "medium",
                                        week: 13
                                    },
                                    {
                                        id: "geom_9_vec_3",
                                        title: "Умножение вектора на число",
                                        type: "interactive",
                                        description: "Свойства умножения вектора на число",
                                        tags: ["геометрия", "векторы", "умножение", "9 класс"],
                                        difficulty: "medium",
                                        week: 14
                                    }
                                ]
                            }
                        }
                    }
                }
            },
            physics: {
                name: "Физика",
                color: "#dc3545",
                icon: '<i class="fas fa-atom"></i>',
                topics: {
                    mechanics: {
                        name: "Механика",
                        subtopics: {
                            kinematics: {
                                name: "Кинематика",
                                lessons: [
                                    {
                                        id: "phys_9_kin_1",
                                        title: "Механическое движение",
                                        type: "theory",
                                        description: "Виды механического движения. Система отсчета",
                                        tags: ["физика", "механика", "движение", "9 класс"],
                                        difficulty: "easy",
                                        week: 1
                                    },
                                    {
                                        id: "phys_9_kin_2",
                                        title: "Равномерное прямолинейное движение",
                                        type: "interactive",
                                        description: "Скорость, путь, время. Графики движения",
                                        tags: ["физика", "механика", "равномерное", "9 класс"],
                                        difficulty: "medium",
                                        week: 2
                                    },
                                    {
                                        id: "phys_9_kin_3",
                                        title: "Равноускоренное движение",
                                        type: "interactive",
                                        description: "Ускорение. Формулы равноускоренного движения",
                                        tags: ["физика", "механика", "ускорение", "9 класс"],
                                        difficulty: "medium",
                                        week: 3
                                    }
                                ]
                            },
                            dynamics: {
                                name: "Динамика",
                                lessons: [
                                    {
                                        id: "phys_9_dyn_1",
                                        title: "Законы Ньютона",
                                        type: "theory",
                                        description: "Три закона Ньютона. Сила и масса",
                                        tags: ["физика", "механика", "законы Ньютона", "9 класс"],
                                        difficulty: "medium",
                                        week: 4
                                    },
                                    {
                                        id: "phys_9_dyn_2",
                                        title: "Силы в природе",
                                        type: "interactive",
                                        description: "Сила тяжести, сила упругости, сила трения",
                                        tags: ["физика", "механика", "силы", "9 класс"],
                                        difficulty: "medium",
                                        week: 5
                                    },
                                    {
                                        id: "phys_9_dyn_3",
                                        title: "Движение под действием сил",
                                        type: "interactive",
                                        description: "Применение законов Ньютона к решению задач",
                                        tags: ["физика", "механика", "задачи", "9 класс"],
                                        difficulty: "hard",
                                        week: 6
                                    }
                                ]
                            },
                            energy: {
                                name: "Энергия и работа",
                                lessons: [
                                    {
                                        id: "phys_9_energy_1",
                                        title: "Кинетическая и потенциальная энергия",
                                        type: "theory",
                                        description: "Виды механической энергии",
                                        tags: ["физика", "механика", "энергия", "9 класс"],
                                        difficulty: "medium",
                                        week: 7
                                    },
                                    {
                                        id: "phys_9_energy_2",
                                        title: "Закон сохранения энергии",
                                        type: "interactive",
                                        description: "Применение закона сохранения энергии",
                                        tags: ["физика", "механика", "сохранение", "9 класс"],
                                        difficulty: "hard",
                                        week: 8
                                    }
                                ]
                            }
                        }
                    },
                    electricity: {
                        name: "Электричество",
                        subtopics: {
                            electrostatics: {
                                name: "Электростатика",
                                lessons: [
                                    {
                                        id: "phys_9_elec_1",
                                        title: "Электрический заряд",
                                        type: "theory",
                                        description: "Электризация тел. Закон сохранения заряда",
                                        tags: ["физика", "электричество", "заряд", "9 класс"],
                                        difficulty: "medium",
                                        week: 9
                                    },
                                    {
                                        id: "phys_9_elec_2",
                                        title: "Закон Кулона",
                                        type: "interactive",
                                        description: "Взаимодействие точечных зарядов",
                                        tags: ["физика", "электричество", "закон Кулона", "9 класс"],
                                        difficulty: "medium",
                                        week: 10
                                    }
                                ]
                            },
                            current: {
                                name: "Электрический ток",
                                lessons: [
                                    {
                                        id: "phys_9_current_1",
                                        title: "Электрический ток",
                                        type: "theory",
                                        description: "Сила тока, напряжение, сопротивление",
                                        tags: ["физика", "электричество", "ток", "9 класс"],
                                        difficulty: "medium",
                                        week: 11
                                    },
                                    {
                                        id: "phys_9_current_2",
                                        title: "Закон Ома",
                                        type: "interactive",
                                        description: "Закон Ома для участка цепи",
                                        tags: ["физика", "электричество", "закон Ома", "9 класс"],
                                        difficulty: "medium",
                                        week: 12
                                    },
                                    {
                                        id: "phys_9_current_3",
                                        title: "Последовательное и параллельное соединение",
                                        type: "interactive",
                                        description: "Свойства последовательного и параллельного соединения",
                                        tags: ["физика", "электричество", "соединение", "9 класс"],
                                        difficulty: "hard",
                                        week: 13
                                    }
                                ]
                            }
                        }
                    }
                }
            },
            programming: {
                name: "Программирование",
                color: "#6f42c1",
                icon: '<i class="fas fa-code"></i>',
                topics: {
                    basics: {
                        name: "Основы программирования",
                        subtopics: {
                            variables: {
                                name: "Переменные и типы данных",
                                lessons: [
                                    {
                                        id: "prog_9_var_1",
                                        title: "Введение в программирование",
                                        type: "theory",
                                        description: "Что такое программирование. Первая программа",
                                        tags: ["программирование", "основы", "введение", "9 класс"],
                                        difficulty: "easy",
                                        week: 1
                                    },
                                    {
                                        id: "prog_9_var_2",
                                        title: "Переменные и типы данных",
                                        type: "interactive",
                                        description: "Целые числа, вещественные числа, строки, логические значения",
                                        tags: ["программирование", "переменные", "типы", "9 класс"],
                                        difficulty: "easy",
                                        week: 2
                                    },
                                    {
                                        id: "prog_9_var_3",
                                        title: "Ввод и вывод данных",
                                        type: "interactive",
                                        description: "Работа с пользовательским вводом и выводом",
                                        tags: ["программирование", "ввод", "вывод", "9 класс"],
                                        difficulty: "easy",
                                        week: 3
                                    }
                                ]
                            },
                            operators: {
                                name: "Операторы и выражения",
                                lessons: [
                                    {
                                        id: "prog_9_op_1",
                                        title: "Арифметические операторы",
                                        type: "interactive",
                                        description: "Сложение, вычитание, умножение, деление, остаток от деления",
                                        tags: ["программирование", "операторы", "арифметика", "9 класс"],
                                        difficulty: "easy",
                                        week: 4
                                    },
                                    {
                                        id: "prog_9_op_2",
                                        title: "Операторы сравнения и логические операторы",
                                        type: "interactive",
                                        description: "Сравнение значений. Логические И, ИЛИ, НЕ",
                                        tags: ["программирование", "операторы", "логика", "9 класс"],
                                        difficulty: "medium",
                                        week: 5
                                    }
                                ]
                            }
                        }
                    },
                    control: {
                        name: "Управляющие конструкции",
                        subtopics: {
                            conditions: {
                                name: "Условные операторы",
                                lessons: [
                                    {
                                        id: "prog_9_if_1",
                                        title: "Оператор if",
                                        type: "interactive",
                                        description: "Простые условные операторы",
                                        tags: ["программирование", "условия", "if", "9 класс"],
                                        difficulty: "medium",
                                        week: 6
                                    },
                                    {
                                        id: "prog_9_if_2",
                                        title: "Оператор if-else",
                                        type: "interactive",
                                        description: "Условные операторы с альтернативой",
                                        tags: ["программирование", "условия", "if-else", "9 класс"],
                                        difficulty: "medium",
                                        week: 7
                                    },
                                    {
                                        id: "prog_9_switch_1",
                                        title: "Оператор switch",
                                        type: "interactive",
                                        description: "Множественный выбор",
                                        tags: ["программирование", "условия", "switch", "9 класс"],
                                        difficulty: "medium",
                                        week: 8
                                    }
                                ]
                            },
                            loops: {
                                name: "Циклы",
                                lessons: [
                                    {
                                        id: "prog_9_loop_1",
                                        title: "Цикл for",
                                        type: "interactive",
                                        description: "Цикл с известным количеством повторений",
                                        tags: ["программирование", "циклы", "for", "9 класс"],
                                        difficulty: "medium",
                                        week: 9
                                    },
                                    {
                                        id: "prog_9_loop_2",
                                        title: "Цикл while",
                                        type: "interactive",
                                        description: "Цикл с условием",
                                        tags: ["программирование", "циклы", "while", "9 класс"],
                                        difficulty: "medium",
                                        week: 10
                                    },
                                    {
                                        id: "prog_9_loop_3",
                                        title: "Вложенные циклы",
                                        type: "interactive",
                                        description: "Циклы внутри циклов",
                                        tags: ["программирование", "циклы", "вложенные", "9 класс"],
                                        difficulty: "hard",
                                        week: 11
                                    }
                                ]
                            }
                        }
                    },
                    functions: {
                        name: "Функции",
                        subtopics: {
                            basics: {
                                name: "Основы функций",
                                lessons: [
                                    {
                                        id: "prog_9_func_1",
                                        title: "Понятие функции",
                                        type: "theory",
                                        description: "Что такое функция. Зачем нужны функции",
                                        tags: ["программирование", "функции", "основы", "9 класс"],
                                        difficulty: "medium",
                                        week: 12
                                    },
                                    {
                                        id: "prog_9_func_2",
                                        title: "Объявление и вызов функций",
                                        type: "interactive",
                                        description: "Создание собственных функций",
                                        tags: ["программирование", "функции", "объявление", "9 класс"],
                                        difficulty: "medium",
                                        week: 13
                                    },
                                    {
                                        id: "prog_9_func_3",
                                        title: "Параметры и возвращаемые значения",
                                        type: "interactive",
                                        description: "Передача данных в функции и получение результатов",
                                        tags: ["программирование", "функции", "параметры", "9 класс"],
                                        difficulty: "medium",
                                        week: 14
                                    }
                                ]
                            }
                        }
                    },
                    arrays: {
                        name: "Массивы",
                        subtopics: {
                            basics: {
                                name: "Основы массивов",
                                lessons: [
                                    {
                                        id: "prog_9_arr_1",
                                        title: "Понятие массива",
                                        type: "theory",
                                        description: "Что такое массив. Индексы элементов",
                                        tags: ["программирование", "массивы", "основы", "9 класс"],
                                        difficulty: "medium",
                                        week: 15
                                    },
                                    {
                                        id: "prog_9_arr_2",
                                        title: "Работа с массивами",
                                        type: "interactive",
                                        description: "Создание, заполнение, обработка массивов",
                                        tags: ["программирование", "массивы", "обработка", "9 класс"],
                                        difficulty: "medium",
                                        week: 16
                                    },
                                    {
                                        id: "prog_9_arr_3",
                                        title: "Поиск в массивах",
                                        type: "interactive",
                                        description: "Линейный и бинарный поиск",
                                        tags: ["программирование", "массивы", "поиск", "9 класс"],
                                        difficulty: "hard",
                                        week: 17
                                    },
                                    {
                                        id: "prog_9_arr_4",
                                        title: "Сортировка массивов",
                                        type: "interactive",
                                        description: "Простые алгоритмы сортировки",
                                        tags: ["программирование", "массивы", "сортировка", "9 класс"],
                                        difficulty: "hard",
                                        week: 18
                                    }
                                ]
                            }
                        }
                    }
                }
            }
        };
    }

    // Методы для работы с базой данных
    getSubjects() {
        return Object.keys(this.subjects).map(key => ({
            id: key,
            ...this.subjects[key]
        }));
    }

    getSubject(subjectId) {
        return this.subjects[subjectId];
    }

    getTopics(subjectId) {
        const subject = this.subjects[subjectId];
        if (!subject) return [];
        
        return Object.keys(subject.topics).map(key => ({
            id: key,
            ...subject.topics[key]
        }));
    }

    getSubtopics(subjectId, topicId) {
        const subject = this.subjects[subjectId];
        if (!subject || !subject.topics[topicId]) return [];
        
        return Object.keys(subject.topics[topicId].subtopics).map(key => ({
            id: key,
            ...subject.topics[topicId].subtopics[key]
        }));
    }

    getLessons(subjectId, topicId, subtopicId) {
        const subject = this.subjects[subjectId];
        if (!subject || !subject.topics[topicId] || !subject.topics[topicId].subtopics[subtopicId]) return [];
        
        return subject.topics[topicId].subtopics[subtopicId].lessons;
    }

    getLesson(subjectId, topicId, subtopicId, lessonId) {
        const lessons = this.getLessons(subjectId, topicId, subtopicId);
        return lessons.find(lesson => lesson.id === lessonId);
    }

    getAllLessonsForSubject(subjectId) {
        const subject = this.subjects[subjectId];
        if (!subject) return [];
        
        const allLessons = [];
        
        Object.keys(subject.topics).forEach(topicId => {
            const topic = subject.topics[topicId];
            Object.keys(topic.subtopics).forEach(subtopicId => {
                const subtopic = topic.subtopics[subtopicId];
                subtopic.lessons.forEach(lesson => {
                    allLessons.push({
                        ...lesson,
                        topicName: topic.name,
                        subtopicName: subtopic.name
                    });
                });
            });
        });
        
        return allLessons.sort((a, b) => a.week - b.week);
    }

    getTotalLessons() {
        let total = 0;
        Object.keys(this.subjects).forEach(subjectId => {
            total += this.getAllLessonsForSubject(subjectId).length;
        });
        return total;
    }

    getTotalSubjects() {
        return Object.keys(this.subjects).length;
    }

    /**
     * Обновление урока
     */
    updateLesson(lessonId, updates) {
        // Находим урок в базе данных
        for (const subjectId in this.subjects) {
            const subject = this.subjects[subjectId];
            for (const topicId in subject.topics) {
                const topic = subject.topics[topicId];
                for (const subtopicId in topic.subtopics) {
                    const subtopic = topic.subtopics[subtopicId];
                    const lessonIndex = subtopic.lessons.findIndex(lesson => lesson.id === lessonId);
                    if (lessonIndex !== -1) {
                        // Обновляем урок
                        subtopic.lessons[lessonIndex] = { ...subtopic.lessons[lessonIndex], ...updates };
                        return true;
                    }
                }
            }
        }
        return false;
    }

    /**
     * Добавление нового урока
     */
    addLesson(subjectId, topicId, subtopicId, lessonData) {
        const subject = this.subjects[subjectId];
        if (!subject || !subject.topics[topicId] || !subject.topics[topicId].subtopics[subtopicId]) {
            throw new Error('Неверные параметры для добавления урока');
        }

        const subtopic = subject.topics[topicId].subtopics[subtopicId];
        
        // Генерируем уникальный ID для урока
        const lessonId = `${subjectId}_${topicId}_${subtopicId}_${Date.now()}`;
        
        // Создаем новый урок
        const newLesson = {
            id: lessonId,
            title: lessonData.title,
            type: lessonData.type,
            description: lessonData.description,
            tags: lessonData.tags || [],
            difficulty: lessonData.difficulty,
            week: subtopic.lessons.length + 1 // Простая нумерация по порядку
        };
        
        // Добавляем урок в подтему
        subtopic.lessons.push(newLesson);
        
        return newLesson;
    }
}

// Экспорт для браузера
if (typeof window !== 'undefined') {
    window.EducationDatabase = EducationDatabase;
}
