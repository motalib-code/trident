from sqlalchemy.orm import Session
from database import SessionLocal
import models

def check_db():
    db = SessionLocal()
    scans = db.query(models.Scan).all()
    print(f"Total Scans: {len(scans)}")
    if scans:
        last = scans[-1]
        print(f"Last Scan ID: {last.id}")
        r = last.result
        if r:
            print(f"Health: {r.health_score}")
            print(f"Pests: {r.pest_detected_count}")
            print(f"NPK: N={r.n_level}, P={r.p_level}, K={r.k_level}")
            print(f"Weather: {r.weather_desc}, Hum={r.weather_humidity}")
            
            # Verify Determinism
            # N
            expected_n = "Low" if r.health_score < 75 else "Optimal"
            print(f"N Check: {'PASS' if r.n_level == expected_n else 'FAIL'} (Expected {expected_n})")
            
            # K
            expected_k = "Low" if (r.weather_humidity > 80 or "Rain" in (r.weather_desc or "")) else "Optimal"
            print(f"K Check: {'PASS' if r.k_level == expected_k else 'FAIL'} (Expected {expected_k})")
            
    db.close()

if __name__ == "__main__":
    check_db()
