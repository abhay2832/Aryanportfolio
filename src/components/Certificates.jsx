import { asset, CERTS } from '../data.js'

export default function Certificates() {
  return (
    <section id="certificates" className="sec reveal center">
      <span className="tagp mono">● // ACHIEVEMENTS</span>
      <h2>Certifications</h2>
      <div className="rail" id="certs">
        {CERTS.length === 0 ? (
          <div className="empty mono">// CERTIFICATES COMING SOON</div>
        ) : (
          CERTS.map(([file, name]) => (
            <div className="card tilt" key={file}>
              <img src={asset('certificates/' + file)} alt={name} />
              <h3>{name}</h3>
            </div>
          ))
        )}
      </div>
    </section>
  )
}
