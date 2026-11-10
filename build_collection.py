#!/usr/bin/env python3
"""Prepares the Just Saying image collection for the app.

Reads the daily images from ~/🌅 Gallery/Just Saying <year>/, makes a web copy
(1024px) and a thumbnail (540px) of every image dated today or earlier, and
writes collection/images.json (newest first). Images dated after today are left
out until their day. Safe to run any number of times.
Usage: python3 -I build_collection.py [year ...]   (default: the current year)
"""
import datetime, json, os, re, subprocess, sys

REPO = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.join(REPO, "collection")
HOME = os.path.expanduser("~")
MONTHS = ["january", "february", "march", "april", "may", "june", "july",
          "august", "september", "october", "november", "december"]
# One-off images that don't follow the "<Month> <Day>" naming: file name -> id
SPECIALS = {"50k.jpg": "09-05b"}
SKIP = {"50k instagram.jpg"}

def month_num(word):
    w = word.lower()
    for i, m in enumerate(MONTHS):
        if w == m or (len(w) >= 3 and m.startswith(w)):
            return i + 1
    return None

def find_images(year):
    root = os.path.join(HOME, "🌅 Gallery", f"Just Saying {year}")
    found = {}
    for dirpath, dirnames, files in os.walk(root):
        dirnames[:] = [d for d in dirnames if d.lower() not in ("psd", "videos", "animations", "audio", "facebook")]
        if dirpath == root:
            continue  # skip Logo.jpg etc. at the top level
        for f in files:
            low = f.lower()
            if not low.endswith((".jpg", ".jpeg", ".png")) or low in SKIP:
                continue
            if low in SPECIALS:
                key = f"{year}-{SPECIALS[low]}"
            else:
                m = re.match(r"^([A-Za-z]+)\s*(\d{1,2})\.(jpe?g|png)$", f, re.I)
                if not m or not month_num(m.group(1)):
                    continue
                key = f"{year}-{month_num(m.group(1)):02d}-{int(m.group(2)):02d}"
            found[key] = os.path.join(dirpath, f)
    return found

def make(src, dst, size, quality):
    if os.path.exists(dst) and os.path.getmtime(dst) >= os.path.getmtime(src):
        return False
    subprocess.run(["sips", "-s", "format", "jpeg", "-s", "formatOptions", str(quality),
                    "-Z", str(size), src, "--out", dst],
                   check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    return True

def main():
    years = sys.argv[1:] or [str(datetime.date.today().year)]
    today = datetime.date.today().isoformat()
    os.makedirs(os.path.join(OUT, "img"), exist_ok=True)
    os.makedirs(os.path.join(OUT, "thumb"), exist_ok=True)
    listed, added, waiting = [], [], 0
    for year in years:
        for key, src in sorted(find_images(year).items()):
            if key[:10] > today:
                waiting += 1
                continue
            try:
                new = make(src, os.path.join(OUT, "img", key + ".jpg"), 1024, 80)
                make(src, os.path.join(OUT, "thumb", key + ".jpg"), 540, 74)
                if new:
                    added.append(key)
                listed.append(key)
            except subprocess.CalledProcessError:
                print(f"ERROR converting {src}")
    # Keep anything already published from earlier years too.
    for f in os.listdir(os.path.join(OUT, "img")):
        k = f[:-4]
        if f.endswith(".jpg") and k not in listed and k[:10] <= today and k[:4] not in years:
            listed.append(k)
    listed = sorted(set(listed), reverse=True)
    with open(os.path.join(OUT, "images.json"), "w") as fh:
        json.dump(listed, fh, separators=(",", ":"))
    for k in added:
        print(f"ADDED image {k}")
    print(f"Collection: {len(listed)} images live, {waiting} waiting for their day")

if __name__ == "__main__":
    main()
