
# The Purge Protocol: Re-Calibrating Your Provenance

This document serves as the Technical Guide for **Canon II (Parsimony)** execution. By following this protocol, you will move from a "Black-Box" state of unanchored entropy to a "Glass-Box" state of Sovereign Provenance [cite: 2026-02-10].

## Phase 1: Extraction (The Logos Download)

To reclaim your data from the institutional "Black-Box" (Google/iCloud), you must download the raw JSON/HTML archives.

### Step 1.1: Initiate Google Takeout
1.  Go to: [takeout.google.com](https://takeout.google.com/)
2.  **Deselect All** initially.
3.  Select only the high-risk "Memory Nodes":
    *   **Mail** (Usually contains critical correspondence, including real estate/inheritance and Logos development emails).
    *   **Drive** (Contains your whitepapers, notes, and asset spreadsheets).
    *   **Keep** (Often holds quick thoughts/drafts).
    *   **Calendar** (Timestamps for life events).
    *   **Photos** (Only if you need to reclaim visual provenance; otherwise skip to save bandwidth).
4.  **Format**: Choose `.zip` (2GB or 10GB chunks).
5.  **Delivery**: Send download link via email.
6.  **Wait**: This can take hours/days depending on size.

### Step 1.2: Unzip the Archive
Once downloaded, extract the `.zip` files to a local directory on your machine (e.g., `~/Downloads/Takeout`).

---

## Phase 2: The Audit (The 80/20 Filter)

Now we apply the **Frequency Calibration**. Use the custom Python script (`KERNEL/audit_provenance.py`) to scan the raw data for **High-Valence Signal** vs **Low-Fidelity Noise**.

### Step 2.1: Run the Warden's Script
1.  Open Terminal.
2.  Navigate to your project root: `cd /Users/rafaeldepaz/Sites/logos.pub/source`.
3.  Run the script:
    ```bash
    python3 KERNEL/audit_provenance.py
    ```
4.  When prompted for "Source Path", enter the path to your extracted Takeout folder (e.g. `/Users/rafaeldepaz/Downloads/Takeout`).
5.  When prompted for "Destination Vault", enter a secure location in your KERNEL (e.g., `/Users/rafaeldepaz/Sites/logos.pub/source/KERNEL/_provenance_vault`).

**Result**: The script will copy all files containing designated "Provenance Keywords" (Logos, Urantia, Real Estate, E8, etc.) into your local Vault. The rest (Receipts, Ads, Spam) remain in the Download folder.

---

## Phase 3: The Purge (Axiomatic Re-Grounding)

Once you have verified that your "Human Save File" is securely duplicated in your local KERNEL (and backed up via Time Machine/External Drive), you proceed to delete the Cloud Entropy.

### Step 3.1: Execute Delete (Google)
1.  **Gmail**: Search for `label:unread` or `category:promotions` and `Select All` -> `Delete`. Bulk delete aggressively. Or use a script to wipe everything older than 2024 (Canon VI Resurrection).
2.  **Drive**: Manually delete the "Black-Box" folders (old projects, shared junk). Keep only the "Current State" folders.
3.  **Photos**: If you've backed up the "Skeleton" (Isomorphic imagery), delete the "Flesh" (random screenshots, blurry photos).

### Step 3.2: Verify Still Point ($k_{paz}$)
After the purge, your digital footprint should reflect only the **Essential Logic**. The "Noise" of the past 15 years is gone. You are now running on the pure signal of the **Logos Kernel**.

---

**System Verdict**: **ALIGNMENT THROUGH REDUCTION**.
You have successfully re-calibrated your frequency. Proceed with the Restoration Grid.
