-- Вставка начальных данных для образовательной платформы
-- Данные из существующей структуры JavaScript

-- Вставка предметов
INSERT INTO subjects (id, name, color, icon) VALUES
('algebra', 'Алгебра', '#007bff', '<i class="fas fa-chart-line"></i>'),
('geometry', 'Геометрия', '#28a745', '<i class="fas fa-shapes"></i>'),
('trigonometry', 'Тригонометрия', '#ffc107', '<i class="fas fa-circle"></i>'),
('calculus', 'Математический анализ', '#dc3545', '<i class="fas fa-function"></i>')
ON CONFLICT (id) DO NOTHING;

-- Вставка тем для алгебры
INSERT INTO topics (id, subject_id, name) VALUES
('functions', 'algebra', 'Функции и их графики'),
('equations', 'algebra', 'Уравнения и неравенства'),
('sequences', 'algebra', 'Числовые последовательности')
ON CONFLICT (id) DO NOTHING;

-- Вставка тем для геометрии
INSERT INTO topics (id, subject_id, name) VALUES
('areas', 'geometry', 'Площади фигур'),
('volumes', 'geometry', 'Объемы тел'),
('transformations', 'geometry', 'Геометрические преобразования')
ON CONFLICT (id) DO NOTHING;

-- Вставка тем для тригонометрии
INSERT INTO topics (id, subject_id, name) VALUES
('trig_functions', 'trigonometry', 'Тригонометрические функции'),
('trig_equations', 'trigonometry', 'Тригонометрические уравнения'),
('trig_identities', 'trigonometry', 'Тригонометрические тождества')
ON CONFLICT (id) DO NOTHING;

-- Вставка тем для математического анализа
INSERT INTO topics (id, subject_id, name) VALUES
('limits', 'calculus', 'Пределы'),
('derivatives', 'calculus', 'Производные'),
('integrals', 'calculus', 'Интегралы')
ON CONFLICT (id) DO NOTHING;

-- Вставка подтем для функций (алгебра)
INSERT INTO subtopics (id, topic_id, name) VALUES
('linear', 'functions', 'Линейные функции'),
('quadratic', 'functions', 'Квадратичная функция'),
('other_functions', 'functions', 'Другие функции')
ON CONFLICT (id) DO NOTHING;

-- Вставка подтем для площадей (геометрия)
INSERT INTO subtopics (id, topic_id, name) VALUES
('polygons', 'areas', 'Площадь многоугольников'),
('circles', 'areas', 'Площадь круга'),
('complex_figures', 'areas', 'Площадь сложных фигур')
ON CONFLICT (id) DO NOTHING;

-- Вставка подтем для тригонометрических функций
INSERT INTO subtopics (id, topic_id, name) VALUES
('basic_trig', 'trig_functions', 'Основные тригонометрические функции'),
('trig_graphs', 'trig_functions', 'Графики тригонометрических функций'),
('trig_properties', 'trig_functions', 'Свойства тригонометрических функций')
ON CONFLICT (id) DO NOTHING;

-- Вставка подтем для пределов
INSERT INTO subtopics (id, topic_id, name) VALUES
('limit_concept', 'limits', 'Понятие предела'),
('limit_calculation', 'limits', 'Вычисление пределов'),
('limit_properties', 'limits', 'Свойства пределов')
ON CONFLICT (id) DO NOTHING;

-- Вставка базовых тегов
INSERT INTO tags (name) VALUES
('алгебра'), ('геометрия'), ('тригонометрия'), ('математический анализ'),
('функции'), ('графики'), ('уравнения'), ('неравенства'),
('площадь'), ('объем'), ('пределы'), ('производные'),
('9 класс'), ('10 класс'), ('11 класс'), ('интерактивный'),
('теория'), ('практика'), ('задачи'), ('примеры')
ON CONFLICT (name) DO NOTHING;

-- Вставка начальных уроков для алгебры
INSERT INTO lessons (id, subtopic_id, title, description, type, difficulty, week) VALUES
('alg_9_linear_1', 'linear', 'Понятие функции. Линейная функция', 'Введение в понятие функции. Линейная функция y = kx + b и её график', 'theory', 'easy', 1),
('alg_9_linear_2', 'linear', 'График линейной функции', 'Построение графиков линейных функций. Влияние коэффициентов k и b', 'interactive', 'easy', 2),
('alg_9_linear_3', 'linear', 'Взаимное расположение графиков', 'Параллельные и перпендикулярные прямые. Системы линейных уравнений', 'interactive', 'medium', 3),
('alg_9_quad_1', 'quadratic', 'Квадратичная функция y = ax²', 'Основные свойства квадратичной функции. График параболы', 'theory', 'medium', 4),
('alg_9_quad_2', 'quadratic', 'Квадратичная функция y = ax² + bx + c', 'Построение графика квадратичной функции. Вершина параболы', 'interactive', 'medium', 5),
('alg_9_quad_3', 'quadratic', 'Свойства квадратичной функции', 'Монотонность, экстремумы, нули функции', 'interactive', 'medium', 6),
('alg_9_other_1', 'other_functions', 'Функция y = k/x', 'Обратная пропорциональность. Гипербола', 'theory', 'medium', 7),
('alg_9_other_2', 'other_functions', 'Функция y = √x', 'Квадратный корень. График функции', 'interactive', 'medium', 8)
ON CONFLICT (id) DO NOTHING;

-- Вставка начальных уроков для геометрии
INSERT INTO lessons (id, subtopic_id, title, description, type, difficulty, week) VALUES
('geom_9_area_1', 'polygons', 'Площадь треугольника', 'Формулы площади треугольника. Высота и медиана', 'theory', 'easy', 9),
('geom_9_area_2', 'polygons', 'Площадь четырехугольников', 'Площадь параллелограмма, трапеции, ромба', 'interactive', 'medium', 10),
('geom_9_circle_area_1', 'circles', 'Площадь круга и его частей', 'Площадь круга, сектора, сегмента', 'theory', 'medium', 11),
('geom_9_circle_area_2', 'circles', 'Площадь круга - практика', 'Решение задач на площадь круга и его частей', 'interactive', 'medium', 12)
ON CONFLICT (id) DO NOTHING;

-- Связывание уроков с тегами
INSERT INTO lesson_tags (lesson_id, tag_id) 
SELECT l.id, t.id FROM lessons l, tags t 
WHERE l.id = 'alg_9_linear_1' AND t.name IN ('алгебра', 'функции', 'линейные', '9 класс', 'теория')
ON CONFLICT DO NOTHING;

INSERT INTO lesson_tags (lesson_id, tag_id) 
SELECT l.id, t.id FROM lessons l, tags t 
WHERE l.id = 'alg_9_linear_2' AND t.name IN ('алгебра', 'функции', 'графики', '9 класс', 'интерактивный')
ON CONFLICT DO NOTHING;

INSERT INTO lesson_tags (lesson_id, tag_id) 
SELECT l.id, t.id FROM lessons l, tags t 
WHERE l.id = 'geom_9_area_1' AND t.name IN ('геометрия', 'площадь', '9 класс', 'теория')
ON CONFLICT DO NOTHING;

INSERT INTO lesson_tags (lesson_id, tag_id) 
SELECT l.id, t.id FROM lessons l, tags t 
WHERE l.id = 'geom_9_area_2' AND t.name IN ('геометрия', 'площадь', 'четырехугольники', '9 класс', 'интерактивный')
ON CONFLICT DO NOTHING;
