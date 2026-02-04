from ultralytics import YOLO
import os

def train_model():
    # 1. Load a model
    # yolov8n.pt is the Nano model (fastest, smallest). 
    # Use yolov8s.pt or yolov8m.pt for better accuracy if you have a GPU.
    model = YOLO('yolov8n.pt')  

    # 2. Train the model
    # We use the wheat_config.yaml we created.
    # Mosaic augmentation is enabled by default in YOLOv8. 
    # We can control it via 'mosaic' arg (0.0 to 1.0). 1.0 is standard.
    results = model.train(
        data='wheat_config.yaml',
        epochs=50,
        imgsz=640,
        batch=16, # Adjust based on your GPU VRAM
        name='yolov8n_wheat_v1', # Project name
        project='runs/train', # Save results to runs/train/yolov8n_wheat_v1
        mosaic=1.0,  # Explicitly ensuring Mosaic Augmentation is ON
        exist_ok=True # Overwrite existing project if exists
    )
    
    # 3. Validation
    # Validate on the validation set
    metrics = model.val()
    print(f"mAP50: {metrics.box.map50}")
    
    # 4. Export
    # Export the model to ONNX or TFLite for deployment (optional)
    # success = model.export(format='onnx')
    
    # --- Note on Switching Datasets ---
    # If you want to train on PlantVillage (Diseases):
    # 1. Update wheat_config.yaml with the correct classes.
    # 2. Change the project name above to 'yolov8n_plant_disease'.
    # 3. Ensure your data/ directory has the PlantVillage images/labels.

if __name__ == '__main__':
    # Ensure this runs in the correct directory context
    # Usually you run this from the folder containing the script
    train_model()
