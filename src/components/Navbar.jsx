import { GMAIL } from '../data.js'

export default function Navbar() {
  return (
    <header className="nav">
      <a href="#home" className="logo">Aryan.</a>
      <nav>
        <a href="#home">Home</a>
        <a href="#about">About</a>
        <a href="#skills">Skills</a>
        <a href="#projects">Projects</a>
        <a href="#certificates">Certifications</a>
        <a href="#contact">Contact</a>
      </nav>
      <div className="nr">
        <div id="mp">
          <button id="pv" type="button" aria-label="Previous">⏮</button>
          <button id="pp" type="button" aria-label="Play">▶</button>
          <button id="nx" type="button" aria-label="Next">⏭</button>
          <span id="eq"><i></i><i></i><i></i></span>
          <span id="sn" className="mono">Song 1</span>
        </div>
        <a className="pill" href={GMAIL} target="_blank" rel="noopener noreferrer">Hire Me</a>
      </div>
      <audio id="au" preload="auto"></audio>
    </header>
  )
}
