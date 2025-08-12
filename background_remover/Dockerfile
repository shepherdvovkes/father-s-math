# Используем стабильный Python образ
FROM python:3.11-slim

# Устанавливаем необходимые системные зависимости
RUN apt-get update && apt-get install -y \
    gcc \
    g++ \
    libffi-dev \
    libopenblas-dev \
    liblapack-dev \
    gfortran \
    libjpeg-dev \
    zlib1g-dev \
    libfreetype6-dev \
    liblcms2-dev \
    libopenjp2-7-dev \
    libtiff-dev \
    libwebp-dev \
    && rm -rf /var/lib/apt/lists/*

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем файлы зависимостей
COPY requirements.txt .

# Устанавливаем Python зависимости
RUN pip install --no-cache-dir -r requirements.txt

# Копируем основной скрипт
COPY simple_background_remover.py .

# Создаем директорию для входных/выходных файлов
RUN mkdir -p /data/input /data/output

# Делаем скрипт исполняемым
RUN chmod +x simple_background_remover.py

# Создаем алиас для удобства
RUN echo '#!/bin/sh' > /usr/local/bin/bg-remove && \
    echo 'python /app/simple_background_remover.py "$@"' >> /usr/local/bin/bg-remove && \
    chmod +x /usr/local/bin/bg-remove

# Устанавливаем точку входа
ENTRYPOINT ["python", "/app/simple_background_remover.py"]

# По умолчанию показываем справку
CMD ["--help"]
