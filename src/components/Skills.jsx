import { SKILLS_1, SKILLS_2 } from '../data.js'

const row = (a) => [...a, ...a, ...a, ...a]

export default function Skills() {
  return (
    <section id="skills" className="sec reveal center">
      <span className="tagp mono">● // CORE SKILLS</span>
      <h2>Skills I Work With</h2>
      <p className="muted">Business tools, soft skills and modern AI-powered building.</p>
      <div className="mq"><div className="tr" id="r1">{row(SKILLS_1).map((s, i) => <i key={i}>{s}</i>)}</div></div>
      <div className="mq"><div className="tr rev" id="r2">{row(SKILLS_2).map((s, i) => <i key={i}>{s}</i>)}</div></div>
    </section>
  )
}
