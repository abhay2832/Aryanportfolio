# Aryan Mishra - Portfolio (React + Vite)

## Run on your PC
```
npm install
npm run dev
```
Then open the link it prints (it ends with /Aryanportfolio/).

## Edit your content
- `src/data.js` : skills, projects, certificates, songs, email
- `public/` : photos, songs, resume (files here are served as-is)
- `public/certificates/` : put certificate images here, then add a line in `CERTS` in `src/data.js`
- Optional real 360 video: put `hero.mp4` in `public/`
  (`ffmpeg -i input.mp4 -an -g 1 -c:v libx264 -crf 22 -pix_fmt yuv420p hero.mp4`)

## Deploy
Push to `main`. GitHub Actions builds the site and publishes it.
In the repo: Settings > Pages > Source = **GitHub Actions** (one time).
