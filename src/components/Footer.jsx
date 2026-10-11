import { GMAIL, EMAIL, LINKEDIN } from '../data.js'

export default function Footer() {
  return (
    <footer>
      <div className="cols mono">
        <div><b>// System Architecture</b><br />B.Com Student<br />Web Projects &amp; AI Tools</div>
        <div><b>// Status</b><br /><span className="green">Open to Opportunities</span></div>
        <div><b>// Region</b><br />India / Firozabad</div>
      </div>
      <div className="big">ARYAN</div>
      <div className="cols mono foot">
        <div>
          <a href={GMAIL} target="_blank" rel="noopener noreferrer">{EMAIL}</a><br />
          <a href={LINKEDIN} target="_blank" rel="noopener noreferrer">linkedin.com/in/aryan-mishra-frz</a>
        </div>
        <div>Built with React &amp; Vite</div>
        <div><a href="#home">Back to Top ↑</a></div>
      </div>
    </footer>
  )
}
