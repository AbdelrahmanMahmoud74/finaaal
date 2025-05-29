FROM python:3.10-slim

# تثبيت أدوات أساسية
RUN apt-get update && apt-get install -y git curl && rm -rf /var/lib/apt/lists/*

# إنشاء مجلد المشروع
WORKDIR /app

# نسخ فقط ملفات البايثون المطلوبة
COPY main.py .
COPY utils/ ./utils
COPY requirements.txt .

# تثبيت المتطلبات
RUN pip install --no-cache-dir -r requirements.txt

# إنشاء مجلد للرفع
RUN mkdir -p uploads

# فتح البورت 8000
EXPOSE 8000

# أمر التشغيل
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
