import os
import shutil
import pandas as pd
import numpy as np
from pathlib import Path
from tqdm import tqdm

# --- Configuration ---
DATASET_NAME = "global-wheat-detection"
BASE_DIR = Path(os.getcwd()) / "data"
IMAGES_DIR = BASE_DIR / "images"
LABELS_DIR = BASE_DIR / "labels"

def setup_directories():
    print(f"Creating directory structure at {BASE_DIR}...")
    for split in ['train', 'val']:
        (IMAGES_DIR / split).mkdir(parents=True, exist_ok=True)
        (LABELS_DIR / split).mkdir(parents=True, exist_ok=True)

def download_from_kaggle():
    """Download using Kaggle API."""
    try:
        import kaggle
        print("Authenticating Kaggle API...")
        print(f"Downloading {DATASET_NAME}...")
        kaggle.api.competition_download_files(DATASET_NAME, path=BASE_DIR, unzip=True)
        print("Download complete. Unzipped to data/")
    except Exception as e:
        print(f"Download Error: {e}")
        print("Ensure kaggle.json is configured or manually place 'train.csv' and 'train/' folder in 'data/'.")

def convert_labels_to_yolo():
    """
    Converts Global Wheat Detection train.csv to YOLO format .txt files.
    """
    csv_path = BASE_DIR / "train.csv"
    if not csv_path.exists():
        print(f"Error: {csv_path} not found. Cannot convert labels.")
        return

    print("Loading train.csv for label conversion...")
    df = pd.read_csv(csv_path)

    # Clean and parse bbox
    # bbox format in CSV is [x_min, y_min, width, height]
    # YOLO format is [class, x_center, y_center, width, height] (normalized 0-1)
    
    print("Converting BBox format...")
    # The bbox column is a string like "[956.0, 240.0, 118.0, 84.0]"
    bbox_items = np.stack(df['bbox'].apply(lambda x: np.fromstring(x[1:-1], sep=',')))
    
    df['x'] = bbox_items[:, 0]
    df['y'] = bbox_items[:, 1]
    df['w'] = bbox_items[:, 2]
    df['h'] = bbox_items[:, 3]

    # Calculate Centers
    df['x_center'] = df['x'] + df['w'] / 2
    df['y_center'] = df['y'] + df['h'] / 2
    df['class_id'] = 0 # Wheat head is class 0

    # Source images usually in data/train
    source_train_dir = BASE_DIR / "train"
    if not source_train_dir.exists():
        print(f"Warning: {source_train_dir} not found. Assuming images are already moved or dataset structure matches.")
    
    # We will split into Train (80%) and Val (20%) based on Image IDs
    image_ids = df['image_id'].unique()
    np.random.seed(42)
    val_ids = np.random.choice(image_ids, size=int(len(image_ids) * 0.2), replace=False)
    
    print("Generating labels and moving images...")
    
    for img_id in tqdm(image_ids):
        # Determine split
        split = 'val' if img_id in val_ids else 'train'
        
        # Filter rows for this image
        subset = df[df['image_id'] == img_id]
        
        # Prepare YOLO Labels: class x_c y_c w h (normalized)
        # Note: We need image dimensions. train.csv often doesn't have it, but for Wheat it's 1024x1024 usually.
        # Let's check image functionality or assume 1024 if standard.
        # Safest way: open image. Slows down. 
        # For this dataset, images are 1024x1024.
        IMG_W, IMG_H = 1024, 1024 
        
        label_content = []
        for _, row in subset.iterrows():
            x_c = row['x_center'] / IMG_W
            y_c = row['y_center'] / IMG_H
            w = row['w'] / IMG_W
            h = row['h'] / IMG_H
            
            label_content.append(f"{int(row['class_id'])} {x_c:.6f} {y_c:.6f} {w:.6f} {h:.6f}")
        
        # Write .txt file
        label_file = LABELS_DIR / split / f"{img_id}.txt"
        with open(label_file, "w") as f:
            f.write("\n".join(label_content))
            
        # Move Image
        # Expected source: data/train/{img_id}.jpg
        src_img = source_train_dir / f"{img_id}.jpg"
        dst_img = IMAGES_DIR / split / f"{img_id}.jpg"
        
        if src_img.exists():
            shutil.copy(src_img, dst_img)
            
    print("Conversion and Dataset Split Complete.")

def main():
    setup_directories()
    
    # 1. Download
    if not (BASE_DIR / "train.csv").exists():
        download_from_kaggle()
    else:
        print("Dataset already downloaded (train.csv found).")
    
    # 2. Convert & Organize
    convert_labels_to_yolo()

if __name__ == "__main__":
    main()
