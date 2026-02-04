from sqlalchemy import Column, Integer, String, Float, DateTime, ForeignKey, Text, JSON
from sqlalchemy.orm import relationship
from datetime import datetime
from database import Base

class Scan(Base):
    __tablename__ = "scans"

    id = Column(Integer, primary_key=True, index=True)
    image_path = Column(String, nullable=False)
    user_name = Column(String, nullable=True) # Added user_name
    timestamp = Column(DateTime, default=datetime.utcnow)
    location_lat = Column(Float, nullable=True)
    location_lon = Column(Float, nullable=True)

    # Relationships
    result = relationship("ScanResult", back_populates="scan", uselist=False)

class ScanResult(Base):
    __tablename__ = "scan_results"

    id = Column(Integer, primary_key=True, index=True)
    scan_id = Column(Integer, ForeignKey("scans.id"))
    
    health_score = Column(Float)
    yield_prediction = Column(String) 
    pest_detected_count = Column(Integer)
    
    # Weather Context
    weather_temp = Column(Float, nullable=True)
    weather_humidity = Column(Float, nullable=True)
    weather_desc = Column(String, nullable=True) # Added weather_desc
    
    # NPK Levels
    n_level = Column(String, default="Optimal")
    p_level = Column(String, default="Optimal")
    k_level = Column(String, default="Optimal")
    
    raw_json_output = Column(JSON)

    # Relationships
    scan = relationship("Scan", back_populates="result")

class DiseaseCatalog(Base):
    __tablename__ = "disease_catalog"

    id = Column(Integer, primary_key=True, index=True)
    disease_name = Column(String, unique=True, index=True)
    recommended_cure = Column(Text)
    severity_level = Column(String, default="Medium")
