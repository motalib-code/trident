import os
from sqlalchemy.orm import Session
from database import SessionLocal, engine
import models, crud, schemas

# Create tables
models.Base.metadata.create_all(bind=engine)

def seed_diseases():
    db = SessionLocal()
    
    # Path to dataset (adjust if 'train' or 'test' subfolders exist)
    dataset_path = "integrations/disease_data"
    
    # 1. Try to read from disk
    found_classes = []
    if os.path.exists(dataset_path):
        for item in os.listdir(dataset_path):
            if os.path.isdir(os.path.join(dataset_path, item)) and not item.startswith("."):
                found_classes.append(item)
    
    # 2. Hardcoded Fallback (if repo didn't clone well or structure differs)
    fallback_classes = [
        "Tomato_Early_blight", "Tomato_Late_blight", "Tomato_healthy",
        "Potato_Early_blight", "Potato_Late_blight", "Potato_healthy",
        "Corn_Common_rust", "Corn_Gray_leaf_spot", "Corn_healthy",
        "Pepper_bell_Bacterial_spot", "Pepper_bell_healthy"
    ]
    
    final_list = list(set(found_classes + fallback_classes))
    
    print(f"Seeding {len(final_list)} diseases...")
    
    for disease_name in final_list:
        # Check if exists
        existing = crud.get_disease_by_name(db, disease_name)
        if not existing:
            # Determine mock metadata
            severity = "High" if "blight" in disease_name.lower() or "rot" in disease_name.lower() else "Low"
            if "healthy" in disease_name.lower():
                severity = "None"
                cure = "Maintain regular monitoring."
            else:
                cure = "Apply recommended fungicide/pesticide and isolate infected plants."
            
            disease_data = schemas.DiseaseCreate(
                disease_name=disease_name,
                recommended_cure=cure,
                severity_level=severity
            )
            crud.create_disease(db, disease_data)
            print(f"Created: {disease_name}")
        else:
            print(f"Skipped (Exists): {disease_name}")

    db.close()

if __name__ == "__main__":
    seed_diseases()
