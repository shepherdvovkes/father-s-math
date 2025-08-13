/**
 * Основной файл образовательной платформы
 * Управляет навигацией, отображением уроков и взаимодействием с базой данных
 */
class EducationPlatform {
    constructor() {
        console.log('EducationPlatform: Инициализация...');
        
        this.database = new EducationDatabase();
        console.log('EducationPlatform: База данных создана');
        
        this.currentSubject = null;
        this.currentTopic = null;
        this.currentSubtopic = null;
        this.currentLesson = null;
        
        this.initializeElements();
        console.log('EducationPlatform: Элементы инициализированы');
        
        this.setupEventListeners();
        console.log('EducationPlatform: События настроены');
        
        this.loadSubjects();
        console.log('EducationPlatform: Предметы загружены');
        
        this.updateStatistics();
        console.log('EducationPlatform: Статистика обновлена');
        
        // Показываем карточки предметов при загрузке
        console.log('EducationPlatform: Показываем карточки предметов...');
        this.showSubjects();
        console.log('EducationPlatform: Карточки предметов отображены');
    }

    initializeElements() {
        console.log('initializeElements: Начинаем инициализацию элементов...');
        
        // Основные элементы
        this.subjectsGrid = document.getElementById('subjectsGrid');
        console.log('subjectsGrid:', this.subjectsGrid);
        
        this.topicsSidebar = document.getElementById('topicsSidebar');
        console.log('topicsSidebar:', this.topicsSidebar);
        
        this.topicsTree = document.getElementById('topicsTree');
        console.log('topicsTree:', this.topicsTree);
        
        this.contentPlaceholder = document.getElementById('contentPlaceholder');
        console.log('contentPlaceholder:', this.contentPlaceholder);
        
        this.lessonContent = document.getElementById('lessonContent');
        console.log('lessonContent:', this.lessonContent);
        
        this.currentSubjectName = document.getElementById('currentSubjectName');
        console.log('currentSubjectName:', this.currentSubjectName);
        
        this.backToSubjectsBtn = document.getElementById('backToSubjects');
        console.log('backToSubjectsBtn:', this.backToSubjectsBtn);
        
        // Статистика
        this.totalLessonsElement = document.getElementById('totalLessons');
        this.totalSubjectsElement = document.getElementById('totalSubjects');
        
        // Контент урока
        this.lessonTitleElement = document.getElementById('lessonTitle');
        this.lessonTypeElement = document.getElementById('lessonType');
        this.lessonDifficultyElement = document.getElementById('lessonDifficulty');
        this.lessonDescriptionElement = document.getElementById('lessonDescription');
        this.theorySection = document.getElementById('theorySection');
        this.interactiveSection = document.getElementById('interactiveSection');
        this.tagsContainer = document.getElementById('tagsContainer');
        
        // Формы и модальные окна
        this.lessonModal = document.getElementById('lessonModal');
        this.lessonForm = document.getElementById('lessonForm');
        this.modalTitle = document.getElementById('modalTitle');
        this.modalClose = document.getElementById('modalClose');
        this.modalCancel = document.getElementById('modalCancel');
        this.modalSave = document.getElementById('modalSave');
        
        // Поля формы
        this.lessonTitleInput = document.getElementById('lessonTitleInput');
        this.lessonDescriptionInput = document.getElementById('lessonDescriptionInput');
        this.lessonTypeSelect = document.getElementById('lessonTypeSelect');
        this.lessonDifficultySelect = document.getElementById('lessonDifficultySelect');
        this.lessonTagsInput = document.getElementById('lessonTagsInput');
        
        // Ссылки на программы
        this.githubUrlInput = document.getElementById('githubUrl');
        this.demoUrlInput = document.getElementById('demoUrl');
        this.saveLinksBtn = document.getElementById('saveLinksBtn');
        this.programEmbed = document.getElementById('programEmbed');
        
        // Теги
        this.newTagInput = document.getElementById('newTagInput');
        this.addTagBtn = document.getElementById('addTagBtn');
        
        // Теоретические материалы
        this.theoryImages = document.getElementById('theoryImages');
        this.theoryImageUpload = document.getElementById('theoryImageUpload');
        
        // Кнопки действий
        this.editLessonBtn = document.getElementById('editLessonBtn');
        this.addLessonBtn = document.getElementById('addLessonBtn');
        
        // Проверяем отсутствующие элементы
        const missingElements = [];
        const elementNames = [
            'subjectsGrid', 'topicsSidebar', 'topicsTree', 'contentPlaceholder', 
            'lessonContent', 'currentSubjectName', 'backToSubjectsBtn',
            'lessonModal', 'lessonForm', 'modalTitle', 'modalClose', 'modalCancel', 'modalSave',
            'lessonTitleInput', 'lessonDescriptionInput', 'lessonTypeSelect', 'lessonDifficultySelect', 'lessonTagsInput',
            'githubUrl', 'demoUrl', 'saveLinksBtn', 'programEmbed',
            'newTagInput', 'addTagBtn', 'theoryImages', 'theoryImageUpload',
            'editLessonBtn', 'addLessonBtn'
        ];
        
        elementNames.forEach(name => {
            if (!this[name]) {
                missingElements.push(name);
            }
        });
        
        if (missingElements.length > 0) {
            console.warn('Отсутствующие элементы:', missingElements);
        }
    }

    setupEventListeners() {
        // Навигация
        if (this.backToSubjectsBtn) {
            this.backToSubjectsBtn.addEventListener('click', () => this.showSubjects());
        }
        
        // Модальное окно
        if (this.modalClose) {
            this.modalClose.addEventListener('click', () => this.closeModal());
        }
        if (this.modalCancel) {
            this.modalCancel.addEventListener('click', () => this.closeModal());
        }
        if (this.modalSave) {
            this.modalSave.addEventListener('click', () => this.saveLesson());
        }
        
        // Действия с уроками
        if (this.editLessonBtn) {
            this.editLessonBtn.addEventListener('click', () => this.editCurrentLesson());
        }
        if (this.addLessonBtn) {
            this.addLessonBtn.addEventListener('click', () => this.addNewLesson());
        }
        
        // Ссылки на программы
        if (this.saveLinksBtn) {
            this.saveLinksBtn.addEventListener('click', () => this.saveProgramLinks());
        }
        
        // Теги
        if (this.addTagBtn) {
            this.addTagBtn.addEventListener('click', () => this.addTag());
        }
        if (this.newTagInput) {
            this.newTagInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    this.addTag();
                }
            });
        }
        
        // Загрузка изображений
        if (this.theoryImageUpload) {
            this.theoryImageUpload.addEventListener('change', (e) => this.handleImageUpload(e));
        }
        
        // Закрытие модального окна по клику вне его
        if (this.lessonModal) {
            this.lessonModal.addEventListener('click', (e) => {
                if (e.target === this.lessonModal) {
                    this.closeModal();
                }
            });
        }
    }

    /**
     * Загрузка предметов
     */
    loadSubjects() {
        const subjects = this.database.getSubjects();
        this.subjectsGrid.innerHTML = '';
        
        subjects.forEach(subject => {
            const subjectCard = this.createSubjectCard(subject);
            this.subjectsGrid.appendChild(subjectCard);
        });
    }

    /**
     * Создание карточки предмета
     */
    createSubjectCard(subject) {
        const card = document.createElement('div');
        card.className = 'subject-card';
        card.setAttribute('data-subject-id', subject.id);
        card.innerHTML = `
            <div class="subject-icon">${subject.icon}</div>
            <h3>${subject.name}</h3>
            <p>${this.getSubjectDescription(subject.id)}</p>
            <div class="subject-stats">
                <span class="topic-count">${this.getTopicCount(subject.id)} тем</span>
                <span class="lesson-count">${this.getLessonCount(subject.id)} уроков</span>
            </div>
        `;
        
        card.addEventListener('click', () => this.selectSubject(subject.id));
        return card;
    }

    /**
     * Получение описания предмета
     */
    getSubjectDescription(subjectId) {
        const descriptions = {
            algebra: "Функции, уравнения, прогрессии",
            geometry: "Треугольники, окружность, площади, векторы",
            physics: "Механика, электричество",
            programming: "Основы программирования, управляющие конструкции"
        };
        return descriptions[subjectId] || "Описание недоступно";
    }

    /**
     * Получение количества тем в предмете
     */
    getTopicCount(subjectId) {
        return this.database.getTopics(subjectId).length;
    }

    /**
     * Получение количества уроков в предмете
     */
    getLessonCount(subjectId) {
        return this.database.getAllLessonsForSubject(subjectId).length;
    }

    /**
     * Получение количества уроков в подтемах темы
     */
    getSubtopicLessonCount(subjectId, topicId) {
        const subtopics = this.database.getSubtopics(subjectId, topicId);
        let totalLessons = 0;
        
        subtopics.forEach(subtopic => {
            const lessons = this.database.getLessons(subjectId, topicId, subtopic.id);
            totalLessons += lessons.length;
        });
        
        return totalLessons;
    }

    /**
     * Выбор предмета
     */
    selectSubject(subjectId) {
        console.log('selectSubject: Выбираем предмет', subjectId);
        
        this.currentSubject = subjectId;
        const subject = this.database.getSubject(subjectId);
        console.log('selectSubject: Предмет получен', subject);
        
        // Обновляем заголовок
        this.currentSubjectName.textContent = subject.name;
        
        // Показываем кнопку "Назад"
        this.backToSubjectsBtn.style.display = 'block';
        
        // Загружаем темы предмета
        this.loadTopics(subjectId);
        
        // Показываем боковую панель
        this.showTopicsSidebar();
        
        // Скрываем заглушку и показываем контент
        this.contentPlaceholder.style.display = 'none';
        this.lessonContent.style.display = 'none';
        
        // Обновляем активные состояния
        this.updateSubjectSelection(subjectId);
        
        // Показываем информацию о предмете
        this.displaySubjectInfo(subjectId);
        
        console.log('selectSubject: Предмет выбран успешно');
    }

    /**
     * Загрузка тем предмета
     */
    loadTopics(subjectId) {
        const topics = this.database.getTopics(subjectId);
        this.topicsTree.innerHTML = '';
        
        topics.forEach(topic => {
            const topicElement = this.createTopicElement(topic, subjectId);
            this.topicsTree.appendChild(topicElement);
        });
    }

    /**
     * Создание элемента темы
     */
    createTopicElement(topic, subjectId) {
        const topicItem = document.createElement('div');
        topicItem.className = 'topic-item';
        
        const topicHeader = document.createElement('div');
        topicHeader.className = 'topic-header';
        topicHeader.setAttribute('data-topic-id', topic.id);
        topicHeader.innerHTML = `
            <div class="topic-info">
                <span class="topic-name">${topic.name}</span>
            </div>
            <div class="topic-meta">
                <span class="topic-lesson-count">${this.getSubtopicLessonCount(subjectId, topic.id)} уроков</span>
                <span class="topic-toggle"><i class="fas fa-chevron-right"></i></span>
            </div>
        `;
        
        const subtopicsList = document.createElement('div');
        subtopicsList.className = 'subtopics-list';
        
        const subtopics = this.database.getSubtopics(subjectId, topic.id);
        subtopics.forEach(subtopic => {
            const subtopicElement = this.createSubtopicElement(subtopic, subjectId, topic.id);
            subtopicsList.appendChild(subtopicElement);
        });
        
        topicHeader.addEventListener('click', () => {
            const isExpanded = subtopicsList.classList.contains('expanded');
            const toggle = topicHeader.querySelector('.topic-toggle');
            
            if (isExpanded) {
                subtopicsList.classList.remove('expanded');
                toggle.classList.remove('expanded');
            } else {
                subtopicsList.classList.add('expanded');
                toggle.classList.add('expanded');
            }
        });
        
        topicItem.appendChild(topicHeader);
        topicItem.appendChild(subtopicsList);
        
        return topicItem;
    }

    /**
     * Создание элемента подтемы
     */
    createSubtopicElement(subtopic, subjectId, topicId) {
        const subtopicItem = document.createElement('div');
        subtopicItem.className = 'subtopic-item';
        
        const subtopicHeader = document.createElement('div');
        subtopicHeader.className = 'subtopic-header';
        subtopicHeader.setAttribute('data-subtopic-id', subtopic.id);
        const lessons = this.database.getLessons(subjectId, topicId, subtopic.id);
        subtopicHeader.innerHTML = `
            <div class="subtopic-info">
                <span class="subtopic-name">${subtopic.name}</span>
            </div>
            <div class="subtopic-meta">
                <span class="subtopic-lesson-count">${lessons.length} уроков</span>
                <span class="topic-toggle"><i class="fas fa-chevron-right"></i></span>
            </div>
        `;
        
        const lessonsList = document.createElement('div');
        lessonsList.className = 'lessons-list';
        
        lessons.forEach(lesson => {
            const lessonElement = this.createLessonElement(lesson, subjectId, topicId, subtopic.id);
            lessonsList.appendChild(lessonElement);
        });
        
        subtopicHeader.addEventListener('click', () => {
            const isExpanded = lessonsList.classList.contains('expanded');
            const toggle = subtopicHeader.querySelector('.topic-toggle');
            
            if (isExpanded) {
                lessonsList.classList.remove('expanded');
                toggle.classList.remove('expanded');
            } else {
                lessonsList.classList.add('expanded');
                toggle.classList.add('expanded');
            }
        });
        
        subtopicItem.appendChild(subtopicHeader);
        subtopicItem.appendChild(lessonsList);
        
        return subtopicItem;
    }

    /**
     * Создание элемента урока
     */
    createLessonElement(lesson, subjectId, topicId, subtopicId) {
        const lessonItem = document.createElement('div');
        lessonItem.className = 'lesson-item';
        
        const lessonLink = document.createElement('div');
        lessonLink.className = 'lesson-link';
        lessonLink.setAttribute('data-lesson-id', lesson.id);
        lessonLink.innerHTML = `
            <div class="lesson-info">
                <span class="lesson-title">${lesson.title}</span>
            </div>
            <div class="lesson-meta">
                <span class="lesson-week">Неделя ${lesson.week}</span>
            </div>
        `;
        
        lessonLink.addEventListener('click', () => {
            this.selectLesson(lesson.id, subjectId, topicId, subtopicId);
        });
        
        lessonItem.appendChild(lessonLink);
        return lessonItem;
    }

    /**
     * Получение иконки урока
     */
    getLessonIcon(type) {
        const icons = {
            interactive: '<i class="fas fa-gamepad"></i>',
            theory: '<i class="fas fa-book"></i>'
        };
        return icons[type] || '<i class="fas fa-edit"></i>';
    }

    /**
     * Получение текста типа урока
     */
    getLessonTypeText(type) {
        const texts = {
            interactive: 'Интеракт',
            theory: 'Теория'
        };
        return texts[type] || 'Неизвестно';
    }

    /**
     * Выбор урока
     */
    selectLesson(lessonId, subjectId, topicId, subtopicId) {
        this.currentLesson = lessonId;
        this.currentSubject = subjectId;
        this.currentTopic = topicId;
        this.currentSubtopic = subtopicId;
        
        const lesson = this.database.getLesson(subjectId, topicId, subtopicId, lessonId);
        if (lesson) {
            this.displayLesson(lesson);
        }
    }

    /**
     * Отображение урока
     */
    displayLesson(lesson) {
        this.contentPlaceholder.style.display = 'none';
        this.lessonContent.style.display = 'block';
        
        // Заполняем информацию об уроке
        this.lessonTitleElement.textContent = lesson.title;
        this.lessonTypeElement.textContent = this.getLessonTypeText(lesson.type);
        this.lessonDifficultyElement.textContent = this.getDifficultyText(lesson.difficulty);
        this.lessonDescriptionElement.textContent = lesson.description;
        
        // Отображаем соответствующие секции
        this.theorySection.style.display = lesson.type === 'theory' ? 'block' : 'none';
        this.interactiveSection.style.display = lesson.type === 'interactive' ? 'block' : 'none';
        
        // Загружаем теги
        this.loadTags(lesson.tags || []);
        
        // Загружаем ссылки на программы
        if (lesson.githubUrl) {
            this.githubUrlInput.value = lesson.githubUrl;
        }
        if (lesson.demoUrl) {
            this.demoUrlInput.value = lesson.demoUrl;
            this.embedProgram(lesson.demoUrl);
        }
        
        // Загружаем теоретические изображения
        this.loadTheoryImages(lesson.theoryImages || []);
        
        // Обновляем активные состояния в навигации
        this.updateActiveStates();
    }

    /**
     * Отображение информации о предмете
     */
    displaySubjectInfo(subjectId) {
        this.contentPlaceholder.style.display = 'none';
        this.lessonContent.style.display = 'block';
        
        const subject = this.database.getSubject(subjectId);
        const allLessons = this.database.getAllLessonsForSubject(subjectId);
        
        // Заполняем информацию о предмете
        this.lessonTitleElement.textContent = subject.name;
        this.lessonTypeElement.textContent = 'Предмет';
        this.lessonDifficultyElement.textContent = `${allLessons.length} уроков`;
        this.lessonDescriptionElement.textContent = this.getSubjectDescription(subjectId);
        
        // Скрываем секции уроков
        this.theorySection.style.display = 'none';
        this.interactiveSection.style.display = 'none';
        
        // Очищаем теги
        this.loadTags([]);
        
        // Обновляем активные состояния в навигации
        this.updateActiveStates();
    }

    /**
     * Получение текста сложности
     */
    getDifficultyText(difficulty) {
        const texts = {
            easy: 'Легкий',
            medium: 'Средний',
            hard: 'Сложный'
        };
        return texts[difficulty] || 'Неизвестно';
    }

    /**
     * Загрузка тегов
     */
    loadTags(tags) {
        this.tagsContainer.innerHTML = '';
        
        tags.forEach(tag => {
            const tagElement = this.createTagElement(tag);
            this.tagsContainer.appendChild(tagElement);
        });
    }

    /**
     * Создание элемента тега
     */
    createTagElement(tag) {
        const tagElement = document.createElement('div');
        tagElement.className = 'tag';
        tagElement.innerHTML = `
            ${tag}
            <button class="tag-remove" onclick="this.parentElement.remove()">&times;</button>
        `;
        return tagElement;
    }

    /**
     * Добавление тега
     */
    addTag() {
        const tagText = this.newTagInput.value.trim();
        if (tagText) {
            const tagElement = this.createTagElement(tagText);
            this.tagsContainer.appendChild(tagElement);
            this.newTagInput.value = '';
        }
    }

    /**
     * Загрузка теоретических изображений
     */
    loadTheoryImages(images) {
        this.theoryImages.innerHTML = '';
        
        images.forEach(imageUrl => {
            const imageElement = this.createTheoryImageElement(imageUrl);
            this.theoryImages.appendChild(imageElement);
        });
    }

    /**
     * Создание элемента изображения теории
     */
    createTheoryImageElement(imageUrl) {
        const imageDiv = document.createElement('div');
        imageDiv.className = 'theory-image';
        
        const img = document.createElement('img');
        img.src = imageUrl;
        img.alt = 'Теоретический материал';
        
        imageDiv.appendChild(img);
        return imageDiv;
    }

    /**
     * Обработка загрузки изображений
     */
    handleImageUpload(event) {
        const files = event.target.files;
        
        for (let file of files) {
            if (file.type.startsWith('image/')) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    const imageElement = this.createTheoryImageElement(e.target.result);
                    this.theoryImages.appendChild(imageElement);
                };
                reader.readAsDataURL(file);
            }
        }
    }

    /**
     * Сохранение ссылок на программы
     */
    saveProgramLinks() {
        const githubUrl = this.githubUrlInput.value.trim();
        const demoUrl = this.demoUrlInput.value.trim();
        
        if (demoUrl) {
            this.embedProgram(demoUrl);
        }
        
        // Сохраняем в базу данных
        if (this.currentLesson) {
            this.database.updateLesson(this.currentLesson, {
                githubUrl: githubUrl || null,
                demoUrl: demoUrl || null
            });
        }
        
        this.showNotification('Ссылки сохранены!', 'success');
    }

    /**
     * Встраивание программы
     */
    embedProgram(url) {
        this.programEmbed.innerHTML = `<iframe src="${url}" frameborder="0"></iframe>`;
    }

    /**
     * Показ боковой панели тем
     */
    showTopicsSidebar() {
        this.topicsSidebar.style.display = 'block';
    }

    /**
     * Показ предметов
     */
    showSubjects() {
        this.currentSubject = null;
        this.currentTopic = null;
        this.currentSubtopic = null;
        this.currentLesson = null;
        
        // Показываем карточки предметов
        this.contentPlaceholder.style.display = 'block';
        this.lessonContent.style.display = 'none';
        
        // Скрываем боковую панель и кнопку "Назад"
        this.topicsSidebar.style.display = 'none';
        this.backToSubjectsBtn.style.display = 'none';
        this.currentSubjectName.textContent = 'Выберите предмет';
        
        // Сбрасываем активные состояния
        this.updateActiveStates();
        
        // Убираем выделение со всех карточек предметов
        document.querySelectorAll('.subject-card').forEach(card => {
            card.classList.remove('selected');
        });
    }

    /**
     * Обновление выбора предмета
     */
    updateSubjectSelection(subjectId) {
        // Убираем выделение со всех карточек предметов
        document.querySelectorAll('.subject-card').forEach(card => {
            card.classList.remove('selected');
        });
        
        // Выделяем выбранный предмет
        const selectedCard = document.querySelector(`[data-subject-id="${subjectId}"]`);
        if (selectedCard) {
            selectedCard.classList.add('selected');
        }
    }

    /**
     * Обновление активных состояний
     */
    updateActiveStates() {
        // Сбрасываем все активные состояния
        document.querySelectorAll('.topic-header.active, .subtopic-header.active, .lesson-link.active')
            .forEach(el => el.classList.remove('active'));
        
        // Устанавливаем активные состояния для текущего выбора
        if (this.currentLesson) {
            const lessonLink = document.querySelector(`[data-lesson-id="${this.currentLesson}"]`);
            if (lessonLink) {
                lessonLink.classList.add('active');
                
                // Находим и активируем родительские элементы
                const subtopicHeader = lessonLink.closest('.subtopic-item').querySelector('.subtopic-header');
                const topicHeader = subtopicHeader.closest('.topic-item').querySelector('.topic-header');
                
                subtopicHeader.classList.add('active');
                topicHeader.classList.add('active');
                
                // Раскрываем родительские списки
                const subtopicsList = subtopicHeader.nextElementSibling;
                const topicsList = topicHeader.nextElementSibling;
                
                if (subtopicsList && !subtopicsList.classList.contains('expanded')) {
                    subtopicsList.classList.add('expanded');
                    subtopicHeader.querySelector('.topic-toggle').classList.add('expanded');
                }
                
                if (topicsList && !topicsList.classList.contains('expanded')) {
                    topicsList.classList.add('expanded');
                    topicHeader.querySelector('.topic-toggle').classList.add('expanded');
                }
            }
        }
    }

    /**
     * Редактирование текущего урока
     */
    editCurrentLesson() {
        if (!this.currentLesson || !this.currentSubject || !this.currentTopic || !this.currentSubtopic) return;
        
        const lessonInfo = this.database.getLesson(this.currentSubject, this.currentTopic, this.currentSubtopic, this.currentLesson);
        if (lessonInfo) {
            this.openLessonModal('edit', lessonInfo);
        }
    }

    /**
     * Добавление нового урока
     */
    addNewLesson() {
        if (!this.currentSubject || !this.currentTopic || !this.currentSubtopic) {
            this.showNotification('Сначала выберите подтему для добавления урока', 'warning');
            return;
        }
        
        this.openLessonModal('add');
    }

    /**
     * Открытие модального окна урока
     */
    openLessonModal(mode, lesson = null) {
        this.modalTitle.textContent = mode === 'edit' ? 'Редактировать урок' : 'Добавить новый урок';
        
        if (mode === 'edit' && lesson) {
            this.lessonTitleInput.value = lesson.title;
            this.lessonDescriptionInput.value = lesson.description;
            this.lessonTypeSelect.value = lesson.type;
            this.lessonDifficultySelect.value = lesson.difficulty;
            this.lessonTagsInput.value = (lesson.tags || []).join(', ');
        } else {
            this.lessonForm.reset();
        }
        
        this.lessonModal.classList.add('show');
    }

    /**
     * Закрытие модального окна
     */
    closeModal() {
        this.lessonModal.classList.remove('show');
    }

    /**
     * Сохранение урока
     */
    saveLesson() {
        const formData = new FormData(this.lessonForm);
        const lessonData = {
            title: this.lessonTitleInput.value.trim(),
            description: this.lessonDescriptionInput.value.trim(),
            type: this.lessonTypeSelect.value,
            difficulty: this.lessonDifficultySelect.value,
            tags: this.lessonTagsInput.value.split(',').map(tag => tag.trim()).filter(tag => tag)
        };
        
        if (!lessonData.title || !lessonData.description) {
            this.showNotification('Заполните все обязательные поля', 'error');
            return;
        }
        
        try {
            if (this.modalTitle.textContent.includes('Редактировать')) {
                // Редактирование
                this.database.updateLesson(this.currentLesson, lessonData);
                this.showNotification('Урок обновлен!', 'success');
            } else {
                // Добавление
                const newLesson = this.database.addLesson(
                    this.currentSubject,
                    this.currentTopic,
                    this.currentSubtopic,
                    lessonData
                );
                this.showNotification('Урок добавлен!', 'success');
                
                // Перезагружаем дерево тем
                this.loadTopics(this.currentSubject);
            }
            
            this.closeModal();
            this.updateStatistics();
            
        } catch (error) {
            this.showNotification('Ошибка при сохранении: ' + error.message, 'error');
        }
    }

    /**
     * Обновление статистики
     */
    updateStatistics() {
        this.totalLessonsElement.textContent = this.database.getTotalLessons();
        this.totalSubjectsElement.textContent = this.database.getTotalSubjects();
    }

    /**
     * Показ уведомления
     */
    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            color: white;
            font-weight: 500;
            z-index: 1001;
            animation: slideIn 0.3s ease;
        `;
        
        // Цвета для разных типов уведомлений
        const colors = {
            success: '#28a745',
            error: '#dc3545',
            warning: '#ffc107',
            info: '#17a2b8'
        };
        
        notification.style.background = colors[type] || colors.info;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }
}

// Добавляем CSS анимации для уведомлений
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Инициализация платформы при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    window.educationPlatform = new EducationPlatform();
});
