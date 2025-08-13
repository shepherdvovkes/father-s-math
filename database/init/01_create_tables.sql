-- Создание таблиц для образовательной платформы Father's MATH
-- Автоматически выполняется при первом запуске контейнера

-- Включаем расширение для UUID
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Таблица предметов
CREATE TABLE IF NOT EXISTS subjects (
    id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    color VARCHAR(7) NOT NULL DEFAULT '#007bff',
    icon TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Таблица тем
CREATE TABLE IF NOT EXISTS topics (
    id VARCHAR(50) PRIMARY KEY,
    subject_id VARCHAR(50) NOT NULL REFERENCES subjects(id) ON DELETE CASCADE,
    name VARCHAR(200) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Таблица подтем
CREATE TABLE IF NOT EXISTS subtopics (
    id VARCHAR(50) PRIMARY KEY,
    topic_id VARCHAR(50) NOT NULL REFERENCES topics(id) ON DELETE CASCADE,
    name VARCHAR(200) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Таблица уроков
CREATE TABLE IF NOT EXISTS lessons (
    id VARCHAR(100) PRIMARY KEY,
    subtopic_id VARCHAR(50) NOT NULL REFERENCES subtopics(id) ON DELETE CASCADE,
    title VARCHAR(300) NOT NULL,
    description TEXT,
    type VARCHAR(20) NOT NULL CHECK (type IN ('theory', 'interactive')),
    difficulty VARCHAR(20) NOT NULL CHECK (difficulty IN ('easy', 'medium', 'hard')),
    week INTEGER NOT NULL,
    github_url TEXT,
    demo_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Таблица тегов
CREATE TABLE IF NOT EXISTS tags (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) UNIQUE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Связующая таблица уроков и тегов (many-to-many)
CREATE TABLE IF NOT EXISTS lesson_tags (
    lesson_id VARCHAR(100) REFERENCES lessons(id) ON DELETE CASCADE,
    tag_id INTEGER REFERENCES tags(id) ON DELETE CASCADE,
    PRIMARY KEY (lesson_id, tag_id)
);

-- Таблица изображений теории
CREATE TABLE IF NOT EXISTS theory_images (
    id SERIAL PRIMARY KEY,
    lesson_id VARCHAR(100) NOT NULL REFERENCES lessons(id) ON DELETE CASCADE,
    image_url TEXT NOT NULL,
    filename VARCHAR(255),
    file_size INTEGER,
    mime_type VARCHAR(100),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Индексы для оптимизации запросов
CREATE INDEX IF NOT EXISTS idx_lessons_subtopic_id ON lessons(subtopic_id);
CREATE INDEX IF NOT EXISTS idx_lessons_type ON lessons(type);
CREATE INDEX IF NOT EXISTS idx_lessons_difficulty ON lessons(difficulty);
CREATE INDEX IF NOT EXISTS idx_lessons_week ON lessons(week);
CREATE INDEX IF NOT EXISTS idx_topics_subject_id ON topics(subject_id);
CREATE INDEX IF NOT EXISTS idx_subtopics_topic_id ON subtopics(topic_id);
CREATE INDEX IF NOT EXISTS idx_lesson_tags_lesson_id ON lesson_tags(lesson_id);
CREATE INDEX IF NOT EXISTS idx_lesson_tags_tag_id ON lesson_tags(tag_id);
CREATE INDEX IF NOT EXISTS idx_theory_images_lesson_id ON theory_images(lesson_id);

-- Функция для автоматического обновления updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Триггеры для автоматического обновления updated_at
CREATE TRIGGER update_subjects_updated_at BEFORE UPDATE ON subjects
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_topics_updated_at BEFORE UPDATE ON topics
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_subtopics_updated_at BEFORE UPDATE ON subtopics
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_lessons_updated_at BEFORE UPDATE ON lessons
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
