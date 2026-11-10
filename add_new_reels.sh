#!/bin/bash
# Adds any new Just Saying reels from ~/🔗 Social/Just Saying/ ("<Month> <D>.mov")
# to the app home-page site, then publishes them to GitHub Pages.
# Safe to run any number of times: days already added are skipped.
set -u
REPO="$(cd "$(dirname "$0")" && pwd)"
SRC="$HOME/🔗 Social/Just Saying"
export PATH="/opt/homebrew/bin:/usr/local/bin:$PATH"

this_year=$(date +%Y); this_month=$(date +%-m)
added=0; errors=0

shopt -s nullglob
for f in "$SRC"/*.mov; do
  name=$(basename "$f" .mov)
  [[ "$name" =~ ^(January|February|March|April|May|June|July|August|September|October|November|December)\ ([0-9]{1,2})$ ]] || continue
  mon=$(date -j -f "%B" "${BASH_REMATCH[1]}" +%-m 2>/dev/null) || continue
  day=${BASH_REMATCH[2]}
  year=$this_year
  # Reels made in December for January belong to next year (and vice versa).
  if (( mon - this_month < -6 )); then year=$((this_year + 1)); fi
  if (( mon - this_month > 6 )); then year=$((this_year - 1)); fi
  iso=$(printf "%04d-%02d-%02d" "$year" "$mon" "$day")
  out="$REPO/videos/$iso.mp4"
  # Skip days already added, unless the .mov was changed after it was converted.
  if [[ -f "$out" && "$out" -nt "$f" ]]; then continue; fi
  if ffmpeg -nostdin -v error -y -i "$f" -map 0:v:0 -map '0:a:0?' \
       -vf "scale=720:1280,crop=720:900:0:120" -c:v libx264 -profile:v high -crf 24 -preset slow \
       -pix_fmt yuv420p -c:a aac -b:a 96k -movflags +faststart "$out" \
     && ffmpeg -nostdin -v error -y -i "$out" -frames:v 1 -q:v 4 "$REPO/videos/$iso.jpg"; then
    echo "ADDED $iso (from $name.mov)"; added=$((added + 1))
  else
    echo "ERROR converting $name.mov"; rm -f "$out"; errors=$((errors + 1))
  fi
done

cd "$REPO" || exit 1
./update_list.sh
latest=$(ls videos/*.mp4 | tail -1 | sed -E 's#videos/(.*)\.mp4#\1#')
today=$(date +%F)
if [[ "$latest" < "$today" ]]; then echo "MISSING: no reel for $today yet (app is showing $latest)"; fi

if [[ -n "$(git status --porcelain)" ]]; then
  git add -A
  git -c user.name="Aneel Aranha" -c user.email="aneelaranha@users.noreply.github.com" \
    commit -q -m "Add Just Saying reels ($added new)" && git push -q && echo "PUBLISHED $added new reel(s)" \
    || { echo "ERROR pushing to GitHub"; errors=$((errors + 1)); }
else
  echo "No new reels. Latest in the app: $latest"
fi
exit $errors
