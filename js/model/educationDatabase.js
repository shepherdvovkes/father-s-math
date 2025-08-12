/**
 * База данных образовательной платформы для 10-го класса
 * Структура: раздел -> главная тема -> подтемы -> уроки
 */
class EducationDatabase {
    constructor() {
        this.subjects = {
            algebra: {
                name: "Алгебра",
                color: "#007bff",
                icon: "📊",
                topics: {
                    functions: {
                        name: "Функции и их графики",
                        subtopics: {
                            linear: {
                                name: "Линейные функции",
                                lessons: [
                                    {
                                        id: "alg_linear_1",
                                        title: "Графики линейных функций",
                                        type: "interactive",
                                        description: "Изучение графиков функций вида y = ax + b. Первый урок по алгебре за 10-й класс. Изучите, как изменяются графики линейных функций при изменении параметров a и b.",
                                        tags: ["алгебра", "функции", "линейные", "графики", "10 класс"],
                                        githubUrl: null,
                                        demoUrl: "main.html",
                                        theoryImages: [],
                                        difficulty: "easy"
                                    }
                                ]
                            },
                            quadratic: {
                                name: "Квадратичные функции",
                                lessons: [
                                    {
                                        id: "alg_quad_1",
                                        title: "Параболы и их свойства",
                                        type: "interactive",
                                        description: "Изучение квадратичных функций y = ax² + bx + c",
                                        tags: ["алгебра", "функции", "квадратичные", "параболы"],
                                        githubUrl: null,
                                        demoUrl: null,
                                        theoryImages: [],
                                        difficulty: "medium"
                                    }
                                ]
                            },
                            exponential: {
                                name: "Показательные функции",
                                lessons: [
                                    {
                                        id: "alg_exp_1",
                                        title: "Экспоненциальный рост и убывание",
                                        type: "interactive",
                                        description: "Изучение функций вида y = a^x",
                                        tags: ["алгебра", "функции", "показательные", "экспонента"],
                                        githubUrl: null,
                                        demoUrl: null,
                                        theoryImages: [],
                                        difficulty: "medium"
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
                                        id: "alg_eq_quad_1",
                                        title: "Решение квадратных уравнений",
                                        type: "theory",
                                        description: "Методы решения ax² + bx + c = 0",
                                        tags: ["алгебра", "уравнения", "квадратные"],
                                        githubUrl: null,
                                        demoUrl: null,
                                        theoryImages: [],
                                        difficulty: "medium"
                                    }
                                ]
                            },
                            systems: {
                                name: "Системы уравнений",
                                lessons: [
                                    {
                                        id: "alg_sys_1",
                                        title: "Системы линейных уравнений",
                                        type: "theory",
                                        description: "Методы решения систем уравнений",
                                        tags: ["алгебра", "системы", "уравнения"],
                                        githubUrl: null,
                                        demoUrl: null,
                                        theoryImages: [],
                                        difficulty: "hard"
                                    }
                                ]
                            }
                        }
                    },
                    trigonometry: {
                        name: "Тригонометрия",
                        subtopics: {
                            basic_functions: {
                                name: "Основные тригонометрические функции",
                                lessons: [
                                    {
                                        id: "alg_trig_1",
                                        title: "Синус, косинус, тангенс",
                                        type: "interactive",
                                        description: "Графики тригонометрических функций",
                                        tags: ["алгебра", "тригонометрия", "синус", "косинус"],
                                        githubUrl: null,
                                        demoUrl: null,
                                        theoryImages: [],
                                        difficulty: "medium"
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
                icon: "📐",
                topics: {
                    vectors: {
                        name: "Векторы",
                        subtopics: {
                            basic_vectors: {
                                name: "Основы векторной алгебры",
                                lessons: [
                                    {
                                        id: "geom_vec_1",
                                        title: "Векторы на плоскости",
                                        type: "interactive",
                                        description: "Операции с векторами",
                                        tags: ["геометрия", "векторы", "плоскость"],
                                        githubUrl: null,
                                        demoUrl: null,
                                        theoryImages: [],
                                        difficulty: "medium"
                                    }
                                ]
                            }
                        }
                    },
                    coordinates: {
                        name: "Координатная геометрия",
                        subtopics: {
                            lines_circles: {
                                name: "Прямые и окружности",
                                lessons: [
                                    {
                                        id: "geom_coord_1",
                                        title: "Уравнения прямых и окружностей",
                                        type: "theory",
                                        description: "Аналитическая геометрия",
                                        tags: ["геометрия", "координаты", "прямые", "окружности"],
                                        githubUrl: null,
                                        demoUrl: null,
                                        theoryImages: [],
                                        difficulty: "medium"
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
                icon: "⚡",
                topics: {
                    mechanics: {
                        name: "Механика",
                        subtopics: {
                            kinematics: {
                                name: "Кинематика",
                                lessons: [
                                    {
                                        id: "phys_kin_1",
                                        title: "Движение по прямой",
                                        type: "interactive",
                                        description: "Равномерное и равноускоренное движение",
                                        tags: ["физика", "механика", "кинематика", "движение"],
                                        githubUrl: null,
                                        demoUrl: null,
                                        theoryImages: [],
                                        difficulty: "medium"
                                    }
                                ]
                            },
                            dynamics: {
                                name: "Динамика",
                                lessons: [
                                    {
                                        id: "phys_dyn_1",
                                        title: "Законы Ньютона",
                                        type: "theory",
                                        description: "Основные законы динамики",
                                        tags: ["физика", "механика", "динамика", "ньютон"],
                                        githubUrl: null,
                                        demoUrl: null,
                                        theoryImages: [],
                                        difficulty: "hard"
                                    }
                                ]
                            }
                        }
                    },
                    electricity: {
                        name: "Электричество",
                        subtopics: {
                            circuits: {
                                name: "Электрические цепи",
                                lessons: [
                                    {
                                        id: "phys_elec_1",
                                        title: "Законы Ома",
                                        type: "interactive",
                                        description: "Электрические цепи постоянного тока",
                                        tags: ["физика", "электричество", "ом", "цепи"],
                                        githubUrl: null,
                                        demoUrl: null,
                                        theoryImages: [],
                                        difficulty: "medium"
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
                icon: "💻",
                topics: {
                    algorithms: {
                        name: "Алгоритмы и структуры данных",
                        subtopics: {
                            basic_algorithms: {
                                name: "Основные алгоритмы",
                                lessons: [
                                    {
                                        id: "prog_alg_1",
                                        title: "Сортировка и поиск",
                                        type: "interactive",
                                        description: "Базовые алгоритмы сортировки",
                                        tags: ["программирование", "алгоритмы", "сортировка"],
                                        githubUrl: null,
                                        demoUrl: null,
                                        theoryImages: [],
                                        difficulty: "medium"
                                    }
                                ]
                            }
                        }
                    },
                    data_structures: {
                        name: "Структуры данных",
                        subtopics: {
                            arrays_lists: {
                                name: "Массивы и списки",
                                lessons: [
                                    {
                                        id: "prog_data_1",
                                        title: "Работа с массивами",
                                        type: "interactive",
                                        description: "Операции с массивами и списками",
                                        tags: ["программирование", "структуры данных", "массивы"],
                                        githubUrl: null,
                                        demoUrl: null,
                                        theoryImages: [],
                                        difficulty: "easy"
                                    }
                                ]
                            }
                        }
                    }
                }
            }
        };
    }

    /**
     * Получить все предметы
     */
    getSubjects() {
        return Object.keys(this.subjects).map(key => ({
            id: key,
            ...this.subjects[key]
        }));
    }

    /**
     * Получить предмет по ID
     */
    getSubject(subjectId) {
        return this.subjects[subjectId];
    }

    /**
     * Получить все темы предмета
     */
    getTopics(subjectId) {
        const subject = this.subjects[subjectId];
        if (!subject) return [];
        
        return Object.keys(subject.topics).map(key => ({
            id: key,
            ...subject.topics[key]
        }));
    }

    /**
     * Получить все подтемы темы
     */
    getSubtopics(subjectId, topicId) {
        const subject = this.subjects[subjectId];
        if (!subject || !subject.topics[topicId]) return [];
        
        return Object.keys(subject.topics[topicId].subtopics).map(key => ({
            id: key,
            ...subject.topics[topicId].subtopics[key]
        }));
    }

    /**
     * Получить все уроки подтемы
     */
    getLessons(subjectId, topicId, subtopicId) {
        const subject = this.subjects[subjectId];
        if (!subject || !subject.topics[topicId] || !subject.topics[topicId].subtopics[subtopicId]) {
            return [];
        }
        
        return subject.topics[topicId].subtopics[subtopicId].lessons;
    }

    /**
     * Получить урок по ID
     */
    getLesson(lessonId) {
        for (const subjectId in this.subjects) {
            const subject = this.subjects[subjectId];
            for (const topicId in subject.topics) {
                const topic = subject.topics[topicId];
                for (const subtopicId in topic.subtopics) {
                    const subtopic = topic.subtopics[subtopicId];
                    const lesson = subtopic.lessons.find(l => l.id === lessonId);
                    if (lesson) {
                        return {
                            lesson,
                            subjectId,
                            topicId,
                            subtopicId,
                            subject: subject.name,
                            topic: topic.name,
                            subtopic: subtopic.name
                        };
                    }
                }
            }
        }
        return null;
    }

    /**
     * Добавить новый урок
     */
    addLesson(subjectId, topicId, subtopicId, lessonData) {
        const subject = this.subjects[subjectId];
        if (!subject || !subject.topics[topicId] || !subject.topics[topicId].subtopics[subtopicId]) {
            throw new Error('Неверный путь к подтеме');
        }

        const lesson = {
            id: `lesson_${Date.now()}`,
            ...lessonData,
            createdAt: new Date().toISOString()
        };

        subject.topics[topicId].subtopics[subtopicId].lessons.push(lesson);
        return lesson;
    }

    /**
     * Обновить урок
     */
    updateLesson(lessonId, updates) {
        const lessonInfo = this.getLesson(lessonId);
        if (!lessonInfo) {
            throw new Error('Урок не найден');
        }

        Object.assign(lessonInfo.lesson, updates, {
            updatedAt: new Date().toISOString()
        });

        return lessonInfo.lesson;
    }

    /**
     * Удалить урок
     */
    deleteLesson(lessonId) {
        const lessonInfo = this.getLesson(lessonId);
        if (!lessonInfo) {
            throw new Error('Урок не найден');
        }

        const subject = this.subjects[lessonInfo.subjectId];
        const subtopic = subject.topics[lessonInfo.topicId].subtopics[lessonInfo.subtopicId];
        const index = subtopic.lessons.findIndex(l => l.id === lessonId);
        
        if (index !== -1) {
            subtopic.lessons.splice(index, 1);
            return true;
        }
        
        return false;
    }

    /**
     * Поиск уроков по тегам
     */
    searchLessonsByTags(tags) {
        const results = [];
        
        for (const subjectId in this.subjects) {
            const subject = this.subjects[subjectId];
            for (const topicId in subject.topics) {
                const topic = subject.topics[topicId];
                for (const subtopicId in topic.subtopics) {
                    const subtopic = topic.subtopics[subtopicId];
                    for (const lesson of subtopic.lessons) {
                        if (tags.some(tag => lesson.tags.includes(tag))) {
                            results.push({
                                lesson,
                                subjectId,
                                topicId,
                                subtopicId,
                                subject: subject.name,
                                topic: topic.name,
                                subtopic: subtopic.name
                            });
                        }
                    }
                }
            }
        }
        
        return results;
    }

    /**
     * Получить статистику
     */
    getStatistics() {
        let totalLessons = 0;
        let interactiveLessons = 0;
        let theoryLessons = 0;
        
        for (const subjectId in this.subjects) {
            const subject = this.subjects[subjectId];
            for (const topicId in subject.topics) {
                const topic = subject.topics[topicId];
                for (const subtopicId in topic.subtopics) {
                    const subtopic = topic.subtopics[subtopicId];
                    totalLessons += subtopic.lessons.length;
                    
                    for (const lesson of subtopic.lessons) {
                        if (lesson.type === 'interactive') {
                            interactiveLessons++;
                        } else if (lesson.type === 'theory') {
                            theoryLessons++;
                        }
                    }
                }
            }
        }
        
        return {
            totalLessons,
            interactiveLessons,
            theoryLessons,
            subjects: Object.keys(this.subjects).length
        };
    }
}

// Экспорт для браузера
if (typeof window !== 'undefined') {
    window.EducationDatabase = EducationDatabase;
}
