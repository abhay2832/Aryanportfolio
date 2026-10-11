import { SONGS } from './data.js'

// Starts every animation of the page (hero turn, blink, particles, beat-sync, music, reveal).
// Called once from App.jsx after the page is drawn. Returns a cleanup function.
export function initEffects() {
  const $ = (id) => document.getElementById(id)
  let dead = false
  const offs = []
  const timers = []
  const on = (t, e, f, o) => { t.addEventListener(e, f, o); offs.push(() => t.removeEventListener(e, f, o)) }
  const later = (f, ms) => { const id = setTimeout(() => { if (!dead) f() }, ms); timers.push(id); return id }

  const au = $('au')
  let AC, an, buf, bs = 0, md = 0, hg = 0, PK = 0

  // ---------- Audio analyser (makes the page react to the beat) ----------
  function setupAudio() {
    if (AC) { if (AC.state === 'suspended') AC.resume(); return }
    try {
      AC = new (window.AudioContext || window.webkitAudioContext)()
      const s = AC.createMediaElementSource(au)
      an = AC.createAnalyser(); an.fftSize = 256; an.smoothingTimeConstant = 0.78
      s.connect(an); an.connect(AC.destination)
      buf = new Uint8Array(an.frequencyBinCount)
    } catch { /* sound still plays without the beat effect */ }
  }
  function level() {
    let tb = 0, tm = 0, th = 0
    if (an && !au.paused) {
      an.getByteFrequencyData(buf)
      const a = (f, t) => { let s = 0; for (let i = f; i < t; i++) s += buf[i]; return s / ((t - f) * 255) }
      tb = a(1, 6); tm = a(6, 24); th = a(24, 70)
    }
    bs += (tb - bs) * 0.3; md += (tm - md) * 0.3; hg += (th - hg) * 0.3
  }

  // ---------- Hero: smooth 3D turn + blink (auto-plays, scroll scrubs) ----------
  const hero = document.querySelector('.hero')
  const orbs = [...document.querySelectorAll('.orb')]
  const eqs = [...document.querySelectorAll('#eq i')]
  const P = [...document.querySelectorAll('.photos img.p')]
  const vid = $('spin'), dark = document.querySelector('.nightbg'), lt = $('lt'), blink = $('blink')
  const ts = [...document.querySelectorAll('.titles span')]
  const wrap = document.querySelector('.wrap'), spot = $('spot'), bar = $('bar')

  const ease = (t) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2)
  // [seconds, position 0..1]: 5s hold on each photo, ~2.6s turn between photos
  const KF = [[0, 0], [5, 0], [7.6, 0.25], [12.6, 0.25], [15.2, 0.5], [20.2, 0.5], [22.8, 0.75], [27.8, 0.75], [30.4, 1], [35.4, 1], [40, 0], [42, 0]]
  function auto(t) {
    t %= 42
    for (let i = 0; i < KF.length - 1; i++) {
      const [a, x] = KF[i], [b, y] = KF[i + 1]
      if (t >= a && t < b) return x + (y - x) * ease((t - a) / (b - a))
    }
    return 0
  }
  let useVid = false, scrolled = false, pos = 0, tgt = 0, cur = -1, mx = 0, my = 0, smx = 0, smy = 0, blinkOn = 0
  const t0 = performance.now()

  on(window, 'scroll', () => { if (window.scrollY > 30) scrolled = true })
  on(window, 'mousemove', (e) => {
    mx = e.clientX / innerWidth - 0.5; my = e.clientY / innerHeight - 0.5
    spot.style.left = e.clientX + 'px'; spot.style.top = e.clientY + 'px'
  })
  ;(function blinkLoop() {
    later(() => {
      blinkOn = 1
      later(() => {
        blinkOn = 0
        if (Math.random() < 0.3) later(() => { blinkOn = 1; later(() => { blinkOn = 0 }, 110) }, 180)
        blinkLoop()
      }, 130)
    }, 2200 + Math.random() * 2800)
  })()

  function frame(now) {
    if (dead) return
    const max = wrap.offsetHeight - innerHeight, sp = scrollY / max
    if (scrolled && scrollY < max) tgt = Math.min(Math.max(sp, 0), 1)
    else if (!scrolled) tgt = auto((now - t0) / 1000)
    pos += (tgt - pos) * 0.07; smx += (mx - smx) * 0.06; smy += (my - smy) * 0.06
    const x = pos * (P.length - 1), base = innerWidth < 800 ? -50 : -20
    let dk = 0
    level()
    const pk = Math.max(0, (bs - 0.28) / 0.72); PK = pk
    P.forEach((im, i) => {
      const d = x - i, w = Math.max(0, Math.min(1, (0.4 - Math.abs(d)) / 0.15))
      im.style.opacity = w
      im.style.transform = `translate(${base}%,0) translate3d(${smx * -26 - d * 60}px,${smy * -10 - pk * 14}px,0) rotateY(${-d * 55 + smx * 8}deg) scale(${1 + (1 - w) * -0.06 + pk * 0.05})`
      if (i >= 3) dk += w
      if (i === 0) { blink.style.opacity = w * blinkOn; blink.style.transform = im.style.transform }
    })
    dark.style.opacity = dk
    lt.style.opacity = 1 - dk
    lt.style.transform = `scale(${1 + pk * 0.09})`
    hero.style.setProperty('--b', pk.toFixed(2))
    orbs.forEach((o) => { o.style.opacity = 0.55 + pk * 0.4 })
    eqs.forEach((e, i) => { e.style.height = (au.paused ? 4 : 4 + Math.min(1, [bs, md * 1.6, hg * 2.4][i]) * 12) + 'px' })

    // title: old one leaves first, then the new one enters (never overlap)
    const k = Math.round(x)
    if (k !== cur) {
      const old = ts[cur]
      if (old) { old.classList.remove('on'); old.classList.add('out'); later(() => old.classList.remove('out'), 460) }
      cur = k
      later(() => { if (cur === k) ts[k].classList.add('on') }, old ? 480 : 0)
    }
    // optional real video (public/hero.mp4) scrubbed by scroll
    if (useVid && vid.duration) {
      if (!scrolled) { if (vid.paused) vid.play().catch(() => {}) }
      else {
        vid.pause()
        const tt = Math.min(Math.max(tgt, 0), 1) * vid.duration
        if (Math.abs(vid.currentTime - tt) > 0.03) vid.currentTime = tt
      }
    }
    bar.style.width = (scrollY / (document.body.scrollHeight - innerHeight)) * 100 + '%'
    requestAnimationFrame(frame)
  }
  requestAnimationFrame(frame)
  on(vid, 'loadedmetadata', () => { useVid = true; vid.style.display = 'block'; document.querySelector('.photos').style.display = 'none' })

  // ---------- Typing line ----------
  const words = ['Available for internships.', 'Learning fast with modern AI tools.', 'Building useful web projects.']
  let wi = 0, ci = 0, del = false
  const ty = $('type')
  ;(function tick() {
    const w = words[wi]
    ty.textContent = w.slice(0, ci)
    if (!del && ci === w.length) { del = true; return later(tick, 1600) }
    if (del && ci === 0) { del = false; wi = (wi + 1) % words.length }
    ci += del ? -1 : 1
    later(tick, del ? 25 : 55)
  })()

  // ---------- Particles ----------
  const cv = $('fx'), cx = cv.getContext('2d')
  let pts = []
  function rs() {
    cv.width = cv.offsetWidth; cv.height = cv.offsetHeight
    pts = Array.from({ length: 70 }, () => ({ x: Math.random() * cv.width, y: Math.random() * cv.height, r: Math.random() * 2 + 0.5, v: Math.random() * 0.5 + 0.15 }))
  }
  rs(); on(window, 'resize', rs)
  ;(function dr() {
    if (dead) return
    cx.clearRect(0, 0, cv.width, cv.height)
    pts.forEach((p) => {
      p.y -= p.v * (1 + PK * 6)
      if (p.y < 0) { p.y = cv.height; p.x = Math.random() * cv.width }
      cx.fillStyle = 'rgba(255,255,255,.55)'; cx.beginPath(); cx.arc(p.x, p.y, p.r, 0, 7); cx.fill()
    })
    requestAnimationFrame(dr)
  })()

  // ---------- Tilt cards ----------
  document.querySelectorAll('.tilt').forEach((el) => {
    on(el, 'mousemove', (e) => {
      const r = el.getBoundingClientRect(), x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height
      el.style.setProperty('--ry', (x - 0.5) * 14 + 'deg'); el.style.setProperty('--rx', (0.5 - y) * 14 + 'deg')
      el.style.setProperty('--mx', x * 100 + '%'); el.style.setProperty('--my', y * 100 + '%')
    })
    on(el, 'mouseleave', () => { el.style.setProperty('--rx', '0deg'); el.style.setProperty('--ry', '0deg') })
  })

  // ---------- Scroll reveal + counters ----------
  const io = new IntersectionObserver((entries) => entries.forEach((x) => {
    if (!x.isIntersecting) return
    x.target.classList.add('in')
    x.target.querySelectorAll('[data-n]').forEach((n) => {
      let v = 0; const t = +n.dataset.n
      const id = setInterval(() => { n.textContent = ++v; if (v >= t) clearInterval(id) }, 250)
      timers.push(id)
    })
  }), { threshold: 0.12 })
  document.querySelectorAll('.reveal').forEach((el) => io.observe(el))

  // ---------- Music: two songs, loops; browsers need one click/tap before sound can start ----------
  const mp = $('mp'), pp = $('pp'), sn = $('sn')
  let si = 0, started = false
  function load(i) { si = (i + SONGS.length) % SONGS.length; au.src = SONGS[si][0]; sn.textContent = SONGS[si][1] }
  function play() { setupAudio(); au.play().then(() => { mp.classList.add('on'); pp.textContent = '❚❚' }).catch(() => {}) }
  function pause() { au.pause(); mp.classList.remove('on'); pp.textContent = '▶' }
  load(0)
  on(au, 'ended', () => { load(si + 1); play() })
  on(pp, 'click', (e) => { e.stopPropagation(); started = true; au.paused ? play() : pause() })
  on($('nx'), 'click', (e) => { e.stopPropagation(); started = true; load(si + 1); play() })
  on($('pv'), 'click', (e) => { e.stopPropagation(); started = true; load(si - 1); play() })
  on(window, 'pointerdown', (e) => { if (started || e.target.closest('a,button,input,textarea')) return; started = true; play() })

  return () => {
    dead = true
    offs.forEach((f) => f())
    timers.forEach((t) => { clearTimeout(t); clearInterval(t) })
    io.disconnect()
    try { au.pause() } catch { /* ignore */ }
  }
}
