FROM python:3.10-slim

# تثبيت أدوات أساسية
RUN apt-get update && apt-get install -y git curl && rm -rf /var/lib/apt/lists/*

# إنشاء مجلد المشروع
WORKDIR /app

# نسخ ملفات المشروع
COPY . .

# تثبيت Ultralytics و FastAPI و باقي المتطلبات
RUN pip install --no-cache-dir fastapi uvicorn ultralytics python-multipart

# إنشاء مجلد للرفع
RUN mkdir -p uploads

# فتح البورت 8000
EXPOSE 8000

# أمر التشغيل
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
