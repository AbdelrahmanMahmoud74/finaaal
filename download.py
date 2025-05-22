import gdown
import os

model_path = "yolo/best.pt"

if not os.path.exists(model_path):
    os.makedirs("yolo", exist_ok=True)
    url = "https://drive.google.com/uc?id=1xBKsoavYwZ3K8LUDw5ToydSJWaAN_zyH"
    gdown.download(url, model_path, quiet=False)
