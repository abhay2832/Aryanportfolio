// All your content lives here. Edit this file to change the website.
import { SONG_FILES } from './generated-songs.js'
export const asset = (p) => import.meta.env.BASE_URL + p

export const EMAIL = 'pp9099034@gmail.com'
export const LINKEDIN = 'https://linkedin.com/in/aryan-mishra-frz'
export const GMAIL =
  'https://mail.google.com/mail/?view=cm&fs=1&to=' + EMAIL + '&su=Hello%20Aryan&body=Hi%20Aryan%2C%0A%0A'

// Big hero titles (each slide = two lines)
export const TITLES = [
  ['B.COM', 'STUDENT'],
  ['WEB', 'BUILDER'],
  ['FUTURE', 'LEADER'],
  ['CREATIVE', 'MIND'],
  ['READY TO', 'WORK'],
]

export const SKILLS_1 = ['Microsoft Word', 'Microsoft Excel', 'PowerPoint', 'Google Workspace', 'Tally', 'Basic GST', 'Financial Accounting', 'Data Entry', 'Internet Research', 'Email Writing', 'AI Tools & Prompting']
export const SKILLS_2 = ['Communication', 'Leadership', 'Teamwork', 'Problem Solving', 'Time Management', 'Customer Handling', 'Analytical Skills', 'Decision Making', 'Adaptability', 'Critical Thinking']

// Replace link: '#' with your GitHub / live link of each project
export const PROJECTS = [
  { title: 'Chat Website', desc: 'A real-time chat platform for online communication, built to learn web app structure and user interaction design.', tags: ['Web App', 'Real-time', 'AI-assisted'], link: '#' },
  { title: 'Temp Mail Website', desc: 'Gives users temporary, disposable email addresses for quick and secure online use, with email handling and backend logic.', tags: ['Backend', 'Email', 'AI-assisted'], link: '#' },
  { title: 'Math Learning App', desc: 'An interactive app that helps students practice and understand math concepts through problem solving.', tags: ['Education', 'Interactive', 'AI-assisted'], link: '#' },
]

// Certificates: put the image in public/certificates/ and add a line like:
// ['badminton.jpg', 'Badminton Certificate - FS University'],
export const CERTS = [
]

export const SONGS = SONG_FILES.map((filename, index) => {
  const title = filename
    .replace(/\.mp3$/i, '')
    .replace(/([a-z])(\d)/gi, '$1 $2')
    .replace(/[-_]+/g, ' ')
    .replace(/\b\w/g, char => char.toUpperCase());

  return [asset(filename), title || `Song ${index + 1}`];
});
