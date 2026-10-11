import { Fragment } from 'react'
import { asset, TITLES } from '../data.js'

export default function Hero() {
  return (
    <div className="wrap" id="home">
      <section className="hero">
        <div className="nightbg"></div>
        <canvas id="fx"></canvas>
        <div className="orb o1"></div>
        <div className="orb o2"></div>
        <div id="lt"><div className="ring"></div><div className="halo"></div></div>

        <div className="photos">
          <img className="p" src={asset('front.png')} alt="Aryan Mishra" />
          <img className="p" src={asset('left.png')} alt="" />
          <img className="p" src={asset('right.png')} alt="" />
          <img className="p dk" src={asset('sun1.jpg')} alt="" />
          <img className="p dk" src={asset('sun2.jpg')} alt="" />
          <video id="spin" muted playsInline loop preload="auto" src={asset('hero.mp4')}></video>
          <img id="blink" src={asset('front_blink.png')} alt="" />
        </div>

        <div className="txt">
          <p className="hi mono">HI, I'M <u>ARYAN</u></p>
          <h1 className="titles">
            {TITLES.map((lines, t) => (
              <span key={t}>
                {lines.map((line, li) => (
                  <Fragment key={li}>
                    {li > 0 && <br />}
                    {[...line].map((c, k) => (
                      <i key={k} style={{ '--d': `${k * 45}ms` }}>{c === ' ' ? '\u00a0' : c}</i>
                    ))}
                  </Fragment>
                ))}
              </span>
            ))}
          </h1>
          <div className="side">
            <p className="mono ey">// TURNING IDEAS INTO REALITY</p>
            <p><span id="type"></span><b className="caret">|</b></p>
          </div>
        </div>

        <div className="btns">
          <a className="pill" href="#projects">View My Work</a>
          <a className="pill dark" href="#contact">Contact Me</a>
        </div>
        <p className="scroll mono">↓ SCROLL TO SCRUB TIMELINE</p>
      </section>
    </div>
  )
}
