#!/bin/sh
# Rebuilds videos.json from the MP4 files in videos/
cd "$(dirname "$0")"
ls videos/*.mp4 | sed -E 's#videos/(.*)\.mp4#"\1"#' | paste -sd, - | sed 's/^/[/; s/$/]/' > videos.json
