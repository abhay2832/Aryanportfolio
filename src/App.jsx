import { useEffect } from 'react'
import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import About from './components/About.jsx'
import Skills from './components/Skills.jsx'
import Projects from './components/Projects.jsx'
import Certificates from './components/Certificates.jsx'
import Contact from './components/Contact.jsx'
import Footer from './components/Footer.jsx'
import { initEffects } from './effects.js'

export default function App() {
  // starts animations, music analyser, scroll reveal etc. after the page is drawn
  useEffect(() => initEffects(), [])
  return (
    <>
      <div id="bar"></div>
      <div id="spot"></div>
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Certificates />
      <Contact />
      <Footer />
    </>
  )
}
