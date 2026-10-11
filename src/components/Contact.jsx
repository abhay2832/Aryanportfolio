import { EMAIL } from '../data.js'

function send(e) {
  e.preventDefault()
  const f = e.currentTarget.elements
  const url =
    'https://mail.google.com/mail/?view=cm&fs=1&to=' + EMAIL +
    '&su=' + encodeURIComponent('Portfolio Message from ' + f.nm.value) +
    '&body=' + encodeURIComponent('Name: ' + f.nm.value + '\nEmail: ' + f.em.value + '\n\n' + f.ms.value)
  window.open(url, '_blank')
}

export default function Contact() {
  return (
    <section id="contact" className="sec reveal">
      <p className="ghost mono">// CONTACT</p>
      <div className="contact card">
        <div>
          <p className="mono ey">// CONTACT TRANSMISSION</p>
          <h2>Let's Build Something Exceptional</h2>
          <p className="muted">Looking for an internship or have a project idea? Send me a message.</p>
        </div>
        <form id="f" onSubmit={send}>
          <input name="nm" placeholder="Your name" required />
          <input name="em" type="email" placeholder="Your email" required />
          <textarea name="ms" rows="4" placeholder="Your message" required></textarea>
          <button className="pill" type="submit">Send Message</button>
        </form>
      </div>
    </section>
  )
}
