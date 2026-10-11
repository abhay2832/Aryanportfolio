import { asset } from '../data.js'

export default function About() {
  return (
    <section id="about" className="sec reveal">
      <div className="about">
        <div className="phone">
          <div className="glow"></div>
          <div className="screen">
            <img src={asset('front.png')} alt="Aryan" />
            <span className="badge mono"><i></i>OPEN TO OPPORTUNITIES <em>2026</em></span>
          </div>
        </div>
        <div>
          <span className="tagp mono">● // SYSTEM PROFILE</span>
          <h2>Hello, I'm<br />Aryan Mishra</h2>
          <p className="muted">
            A motivated B.Com student at FS University, Sikohabad (2027), based in Firozabad. I completed a 6-month internship at a Public Service Center (CSC) handling data entry, documentation and customers. Alongside my studies I build web apps such as a chat site, a temp mail service and a math learning app using AI-assisted development.
          </p>
          <div className="stats">
            <div className="card tilt"><b>Commerce</b><span className="mono">B.COM 2027</span></div>
            <div className="card tilt"><b><em data-n="6">0</em> Months</b><span className="mono">INTERNSHIP</span></div>
            <div className="card tilt"><b><em data-n="3">0</em> Projects</b><span className="mono">WEB APPS</span></div>
          </div>
        </div>
      </div>
    </section>
  )
}
