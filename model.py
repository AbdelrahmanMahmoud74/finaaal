from ultralytics import YOLO

model = YOLO("yolov8n.pt")  # استبدل بالموديل الخاص بك لو مخصص

def detect_objects(image_path):
    results = model(image_path)
    detections = []
    for result in results:
        for box in result.boxes:
            detections.append({
                "xmin": float(box.xyxy[0][0]),
                "ymin": float(box.xyxy[0][1]),
                "xmax": float(box.xyxy[0][2]),
                "ymax": float(box.xyxy[0][3]),
                "confidence": float(box.conf[0]),
                "class": int(box.cls[0])
            })
    return detections
