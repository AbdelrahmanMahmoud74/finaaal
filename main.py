from fastapi import FastAPI, UploadFile, File
from fastapi.responses import JSONResponse
from fastapi.responses import FileResponse

from ultralytics import YOLO
import shutil
import uuid
import os
import download

app = FastAPI()
model = YOLO("yolo/best.pt")  # تأكد أن الموديل هنا هو نفس اللي كنت بتجربه يدويًا

UPLOAD_DIR = "uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)

@app.post("/detect_image")
async def detect_and_return_image(image: UploadFile = File(...)):
    file_ext = image.filename.split(".")[-1]
    filename = f"{uuid.uuid4()}.{file_ext}"
    file_path = os.path.join(UPLOAD_DIR, filename)

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(image.file, buffer)

    # Run detection and save image with bounding boxes
    results = model.predict(file_path, save=True, save_txt=False)

    # Get saved image path from ultralytics (saved in runs/detect/)
    saved_dir = results[0].save_dir
    result_image_path = os.path.join(saved_dir, filename)

    return FileResponse(result_image_path, media_type="image/jpeg")
