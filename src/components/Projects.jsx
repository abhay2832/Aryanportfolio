import { PROJECTS } from '../data.js'

export default function Projects() {
  return (
    <section id="projects" className="sec reveal center">
      <span className="tagp mono">● // PORTFOLIO WORK</span>
      <h2>Featured Projects</h2>
      <div className="rail">
        {PROJECTS.map((p, i) => (
          <article className="card tilt" key={p.title}>
            <p className="mono n">// PROJECT 0{i + 1}</p>
            <h3>{p.title}</h3>
            <p className="muted">{p.desc}</p>
            <div className="tech mono">{p.tags.map((t) => <i key={t}>{t}</i>)}</div>
            <a className="mono code" href={p.link}>CODE →</a>
          </article>
        ))}
      </div>
    </section>
  )
}
