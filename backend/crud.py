from sqlalchemy.orm import Session
import models, schemas
import json

def get_scan(db: Session, scan_id: int):
    return db.query(models.Scan).filter(models.Scan.id == scan_id).first()

def create_scan_entry(db: Session, scan_data: schemas.ScanCreate, result_data: schemas.ScanResultCreate):
    # 1. Create Scan
    db_scan = models.Scan(
        image_path=scan_data.image_path,
        user_name=scan_data.user_name,
        location_lat=scan_data.location_lat,
        location_lon=scan_data.location_lon
    )
    db.add(db_scan)
    db.commit()
    db.refresh(db_scan)

    # 2. Create Result
    db_result = models.ScanResult(
        scan_id=db_scan.id,
        health_score=result_data.health_score,
        yield_prediction=result_data.yield_prediction,
        pest_detected_count=result_data.pest_detected_count,
        weather_temp=result_data.weather_temp,
        weather_humidity=result_data.weather_humidity,
        weather_desc=result_data.weather_desc,
        n_level=result_data.n_level,
        p_level=result_data.p_level,
        k_level=result_data.k_level,
        raw_json_output=result_data.raw_json_output
    )
    db.add(db_result)
    db.commit()
    db.refresh(db_result)
    
    # Refresh scan to include result for return
    db.refresh(db_scan)
    return db_scan

def create_disease(db: Session, disease: schemas.DiseaseCreate):
    db_disease = models.DiseaseCatalog(
        disease_name=disease.disease_name,
        recommended_cure=disease.recommended_cure,
        severity_level=disease.severity_level
    )
    db.add(db_disease)
    db.commit()
    db.refresh(db_disease)
    return db_disease

def get_disease_by_name(db: Session, name: str):
    return db.query(models.DiseaseCatalog).filter(models.DiseaseCatalog.disease_name == name).first()
