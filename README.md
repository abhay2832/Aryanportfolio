# Aryan Mishra - Portfolio
Static site (HTML/CSS/JS). Open `index.html` to preview.

**Certificates:** images go in `certificates/`, then add a line in `CERTS` inside `script.js`.
**Project links:** in `index.html` replace each `href="#"` on the CODE buttons.
**Real 360 hero video (optional):** put `hero.mp4` next to `index.html`. The site auto-plays it and scrubs it with scroll.
Make it scroll-friendly: `ffmpeg -i input.mp4 -an -g 1 -c:v libx264 -crf 22 -pix_fmt yuv420p hero.mp4`
**Deploy:** GitHub repo > Settings > Pages > Branch: main / root > Save.
