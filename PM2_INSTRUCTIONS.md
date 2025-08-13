# Управление Father's MATH через PM2

## Статус приложения
Приложение **Father's MATH** успешно запущено через PM2 и работает на HTTPS порту 443.

## Основные команды PM2

### Просмотр статуса
```bash
pm2 status
```

### Просмотр логов
```bash
# Все логи
pm2 logs fathers-math

# Последние 10 строк
pm2 logs fathers-math --lines 10

# Только ошибки
pm2 logs fathers-math --err --lines 10
```

### Управление приложением
```bash
# Перезапуск
pm2 restart fathers-math

# Остановка
pm2 stop fathers-math

# Запуск
pm2 start fathers-math

# Удаление из PM2
pm2 delete fathers-math
```

### Мониторинг
```bash
# Интерактивный мониторинг
pm2 monit
```

## Готовые скрипты

### Запуск в продакшн режиме
```bash
./start-production.sh
```

### Остановка приложения
```bash
./stop-production.sh
```

## Доступ к приложению

- **Основная страница**: https://localhost:443
- **Образовательная платформа**: https://localhost:443/education.html
- **Тестовая страница**: https://localhost:443/test-education.html

## Автозапуск

Приложение настроено на автоматический запуск при перезагрузке системы:
```bash
pm2 save
```

## Логи

Логи сохраняются в:
- `/Users/vovkes/.pm2/logs/fathers-math-out.log` - стандартный вывод
- `/Users/vovkes/.pm2/logs/fathers-math-error.log` - ошибки

## Известные проблемы

1. **AI-чат**: Есть ошибка в обработке OpenAI API (не критично для основного функционала)
2. **SSL сертификат**: Самоподписанный сертификат - браузер может показать предупреждение

## Конфигурация

Конфигурация PM2 находится в файле `ecosystem.config.js`:
- Порт: 443 (HTTPS)
- Автоперезапуск: включен
- Логирование: включено
- Мониторинг памяти: 1GB лимит
