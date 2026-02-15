
import os
import json
import re
import shutil
from pathlib import Path

# --- CONFIGURATION (The 80/20 Filter) ---

# High-Valence Keywords (The "Human Save File")
# These represent the 20% of signal to KEEP.
KEEP_KEYWORDS = [
    r"Logos", r"RIE", r"Urantia", r"Kybalion", r"E8", r"Lie Group",
    r"Restoration Grid", r"Sovereign", r"Real Estate", r"Inheritance",
    r"4M", r"Asset", r"Provenance", r"De Paz", r"Durban Princess"
]

# Noise Keywords (The "Black-Box" Entropy)
# These represent the 80% of noise to PURGE (or ignore).
NOISE_KEYWORDS = [
    r"Receipt", r"Order Confirmation", r"Unsubscribe", r"Notification",
    r"TUUCI", r"DualAV", r"LinkedIn", r"Job Alert", r"Application",
    r"Marketing", r"Promo", r"No-Reply"
]

# File extensions to scan
VALID_EXTENSIONS = ['.txt', '.json', '.html', '.md', '.eml']

def scan_file(file_path):
    """Scans a single file for signal vs noise."""
    try:
        with open(file_path, 'r', encoding='utf-8', errors='ignore') as f:
            content = f.read()
            
            # Check for Noise first (Parsimony)
            for keyword in NOISE_KEYWORDS:
                if re.search(keyword, content, re.IGNORECASE):
                    return "NOISE"
            
            # Check for Signal (Provenance)
            for keyword in KEEP_KEYWORDS:
                if re.search(keyword, content, re.IGNORECASE):
                    return "KEEP"
            
            return "NEUTRAL"
    except Exception as e:
        return f"ERROR: {e}"

def audit_takeout(source_dir, output_dir):
    """Recursively scans the Takeout directory."""
    print(f"[*] Initiating Warden's Audit on: {source_dir}")
    print(f"[*] Target Provenance Vault: {output_dir}")
    
    keep_count = 0
    noise_count = 0
    neutral_count = 0
    
    provenance_path = Path(output_dir) / "PROVENANCE_VAULT"
    provenance_path.mkdir(parents=True, exist_ok=True)
    
    for root, dirs, files in os.walk(source_dir):
        for file in files:
            ext = os.path.splitext(file)[1].lower()
            if ext not in VALID_EXTENSIONS:
                continue
                
            file_path = Path(root) / file
            status = scan_file(file_path)
            
            if status == "KEEP":
                print(f"[+] FOUND SIGNAL: {file}")
                # Copy to Vault
                try:
                    rel_path = file_path.relative_to(source_dir)
                    dest_path = provenance_path / rel_path
                    dest_path.parent.mkdir(parents=True, exist_ok=True)
                    shutil.copy2(file_path, dest_path)
                    keep_count += 1
                except Exception as e:
                    print(f"[!] Copy Failed: {e}")
                    
            elif status == "NOISE":
                noise_count += 1
            else:
                neutral_count += 1

    print("-" * 40)
    print("AUDIT COMPLETE (Frequency Calibration: 80/20 Durban Princess)")
    print(f"Total Files Scanned: {keep_count + noise_count + neutral_count}")
    print(f"SIGNAL KEPT (Provenance): {keep_count}")
    print(f"NOISE IDENTIFIED (Entropy): {noise_count}")
    print(f"NEUTRAL (Drift): {neutral_count}")
    print("-" * 40)
    print(f"High-Valence Assets secured in: {provenance_path}")

if __name__ == "__main__":
    # Default Paths - Change these to match your actual location
    SOURCE = input("Enter path to extracted Google Takeout folder: ").strip()
    DEST = input("Enter path to save Provenance (e.g. ./KERNEL/_vault): ").strip()
    
    if os.path.exists(SOURCE):
        audit_takeout(SOURCE, DEST)
    else:
        print("Error: Source path does not exist.")
