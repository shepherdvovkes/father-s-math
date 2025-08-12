class AIChat {
    constructor() {
        this.container = document.getElementById('aiChatContainer');
        this.messages = document.getElementById('aiChatMessages');
        this.input = document.getElementById('aiChatInput');
        this.sendBtn = document.getElementById('aiChatSend');
        this.closeBtn = document.getElementById('aiChatClose');
        this.openBtn = document.getElementById('aiHelpBtn');
        
        this.isOpen = false;
        this.isTyping = false;
        
        this.init();
    }
    
    init() {
        this.bindEvents();
        this.setupAutoResize();
    }
    
    bindEvents() {
        // Открытие/закрытие чата
        this.openBtn.addEventListener('click', () => this.toggleChat());
        this.closeBtn.addEventListener('click', () => this.closeChat());
        
        // Отправка сообщения
        this.sendBtn.addEventListener('click', () => this.sendMessage());
        this.input.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                this.sendMessage();
            }
        });
        
        // Закрытие по клику вне чата
        document.addEventListener('click', (e) => {
            if (this.isOpen && !this.container.contains(e.target) && !this.openBtn.contains(e.target)) {
                this.closeChat();
            }
        });
    }
    
    setupAutoResize() {
        this.input.addEventListener('input', () => {
            this.input.style.height = 'auto';
            this.input.style.height = Math.min(this.input.scrollHeight, 100) + 'px';
        });
    }
    
    toggleChat() {
        if (this.isOpen) {
            this.closeChat();
        } else {
            this.openChat();
        }
    }
    
    openChat() {
        this.container.classList.add('active');
        this.isOpen = true;
        this.input.focus();
    }
    
    closeChat() {
        this.container.classList.remove('active');
        this.isOpen = false;
    }
    
    async sendMessage() {
        const message = this.input.value.trim();
        if (!message || this.isTyping) return;
        
        // Добавляем сообщение пользователя
        this.addUserMessage(message);
        this.input.value = '';
        this.input.style.height = 'auto';
        
        // Показываем индикатор печати
        this.showTypingIndicator();
        
        try {
            // Получаем контекст текущего урока
            const lessonContext = this.getLessonContext();
            
            // Отправляем запрос к API
            await this.streamResponse(message, lessonContext);
        } catch (error) {
            console.error('Ошибка при отправке сообщения:', error);
            this.addAIMessage('Извините, произошла ошибка при обработке вашего запроса. Попробуйте еще раз.');
        } finally {
            this.hideTypingIndicator();
        }
    }
    
    getLessonContext() {
        const lessonTitle = document.getElementById('lessonTitle')?.textContent || '';
        const lessonDescription = document.getElementById('lessonDescription')?.textContent || '';
        const currentSubject = document.getElementById('currentSubjectName')?.textContent || '';
        
        return {
            lessonTitle,
            lessonDescription,
            currentSubject,
            url: window.location.href
        };
    }
    
    async streamResponse(userMessage, context) {
        const response = await fetch('/api/ai-chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                message: userMessage,
                context: context
            })
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        
        // Создаем элемент для ответа AI
        const aiMessageElement = this.createAIMessageElement();
        const contentElement = aiMessageElement.querySelector('.ai-message-content p');
        
        let fullResponse = '';
        
        while (true) {
            const { done, value } = await reader.read();
            
            if (done) break;
            
            const chunk = decoder.decode(value, { stream: true });
            fullResponse += chunk;
            
            // Обновляем содержимое сообщения
            contentElement.textContent = fullResponse;
            
            // Прокручиваем к новому сообщению
            this.scrollToBottom();
        }
        
        // Добавляем сообщение в DOM
        this.messages.appendChild(aiMessageElement);
        this.scrollToBottom();
    }
    
    addUserMessage(message) {
        const messageElement = document.createElement('div');
        messageElement.className = 'user-message';
        messageElement.innerHTML = `
            <div class="user-avatar">
                <i class="fas fa-user"></i>
            </div>
            <div class="user-message-content">
                <p>${this.escapeHtml(message)}</p>
            </div>
        `;
        
        this.messages.appendChild(messageElement);
        this.scrollToBottom();
    }
    
    addAIMessage(message) {
        const messageElement = this.createAIMessageElement();
        messageElement.querySelector('.ai-message-content p').textContent = message;
        this.messages.appendChild(messageElement);
        this.scrollToBottom();
    }
    
    createAIMessageElement() {
        const messageElement = document.createElement('div');
        messageElement.className = 'ai-message';
        messageElement.innerHTML = `
            <div class="ai-avatar">
                <i class="fas fa-robot"></i>
            </div>
            <div class="ai-message-content">
                <p></p>
            </div>
        `;
        return messageElement;
    }
    
    showTypingIndicator() {
        this.isTyping = true;
        this.sendBtn.disabled = true;
        
        const typingElement = document.createElement('div');
        typingElement.className = 'ai-message typing-indicator';
        typingElement.id = 'typingIndicator';
        typingElement.innerHTML = `
            <div class="ai-avatar">
                <i class="fas fa-robot"></i>
            </div>
            <div class="typing-dots">
                <div class="typing-dot"></div>
                <div class="typing-dot"></div>
                <div class="typing-dot"></div>
            </div>
        `;
        
        this.messages.appendChild(typingElement);
        this.scrollToBottom();
    }
    
    hideTypingIndicator() {
        this.isTyping = false;
        this.sendBtn.disabled = false;
        
        const typingIndicator = document.getElementById('typingIndicator');
        if (typingIndicator) {
            typingIndicator.remove();
        }
    }
    
    scrollToBottom() {
        this.messages.scrollTop = this.messages.scrollHeight;
    }
    
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
}

// Инициализация AI чата при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    new AIChat();
});
