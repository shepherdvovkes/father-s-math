#!/bin/bash

# Father's MATH Production Stop Script

echo "🛑 Остановка Father's MATH..."

# Останавливаем приложение
pm2 stop fathers-math

# Удаляем процесс из PM2
pm2 delete fathers-math

echo "✅ Приложение остановлено"
echo "📊 Статус PM2:"
pm2 status
