import { config } from './config'

// A photo slot. Replace src with a path from /public/images (e.g. '/images/g11-day-one-1.webp')
// or any full URL. Leave src empty to show a placeholder frame.
// Use as many photos per stage as you like (6 to 12 looks best).
const blank = (count) => Array.from({ length: count }, () => ({ src: '', caption: '' }))

// palette = [sky top, sky middle, sky bottom]. The whole journey runs from dawn to night.
export const stages = [
  {
    id: 'start',
    kind: 'intro',
    title: config.sectionName,
    date: '2022',
    palette: ['#1f2a44', '#8c4f4a', '#e3a15a'],
    copy: [],
    photos: [],
  },
  {
    id: 'day-one',
  kind: 'story',
  title: 'Grade 11: Day One',
  date: 'G11 2022',
  palette: ['#2d4a6b', '#6f8fa0', '#e8c07a'],
  copy: ['New faces, new seats, and nobody sure where anything was.', 'This is where the story starts.'],
  photos: [
       { src: '/images/stories/day-one/1.jpg', caption: 'Singkong Duleng' },
      { src: '/images/stories/day-one/2.jpg', caption: 'Piña for Sales' },
      { src: '/images/stories/day-one/3.jpg', caption: 'Galaw Pilipinas' },
      { src: '/images/stories/day-one/4.jpg', caption: 'Statue of ICT?' },
      { src: '/images/stories/day-one/5.jpg', caption: 'La Peace' },
      { src: '/images/stories/day-one/6.jpg', caption: 'Helmeet' },
      { src: '/images/stories/day-one/7.jpg', caption: '1st Meet' },
      { src: '/images/stories/day-one/8.jpg', caption: '👀' }
    ],
  },
  {
     id: 'settling-in',
    kind: 'story',
    title: 'Settling In',
    date: 'G11 2022',
    palette: ['#35607a', '#7aa6a0', '#efd08c'],
    copy: ['Names turned into friends. Groups formed without anyone planning it.'],
    photos: [
      { src: '/images/stories/settling-in/1.jpg', caption: 'CPAR Days' },
      { src: '/images/stories/settling-in/2.jpg', caption: 'Slumber Party' },
      { src: '/images/stories/settling-in/3.jpg', caption: 'Bansilog' },
      { src: '/images/stories/settling-in/4.jpg', caption: 'Mr.WorldWideWeb' },
      { src: '/images/stories/settling-in/5.jpg', caption: 'Chismis?' },
      { src: '/images/stories/settling-in/6.jpg', caption: 'Hands Up' },
      { src: '/images/stories/settling-in/7.jpg', caption: 'Eyyyy' },
      { src: '/images/stories/settling-in/8.jpg', caption: 'Na Hacked' }
    ],
  },
  {
    id: 'growing-together',
    kind: 'story',
    title: 'Growing Together',
    date: 'G11 2023',
    palette: ['#3f6f8f', '#8fb5a8', '#f2d27f'],
    copy: ['Projects, events, and long afternoons that turned a class into a section.'],
    photos: [
      { src: '/images/stories/growing-together/1.jpg', caption: 'Binibining Briagas' },
      { src: '/images/stories/growing-together/2.jpg', caption: 'Group Photoo' },
      { src: '/images/stories/growing-together/3.jpg', caption: 'Earth and Life Science?' },
      { src: '/images/stories/growing-together/4.jpg', caption: 'Jabbawockeez' },
      { src: '/images/stories/growing-together/5.jpg', caption: 'Signal Mafia' },
      { src: '/images/stories/growing-together/6.jpg', caption: 'Walang English Buseng?' },
      { src: '/images/stories/growing-together/7.jpg', caption: 'Mrs. Angel' },
      { src: '/images/stories/growing-together/8.jpg', caption: 'Core Memory hehe' }
    ],
  },
  {
     id: 'beyond-the-classroom',
    kind: 'story',
    title: 'Beyond the Classroom',
    date: 'G11 2023',
    palette: ['#44759a', '#9bbfae', '#f4da86'],
    copy: ['Events, trips, and the days that had nothing to do with grades.'],
    photos: [
      { src: '/images/stories/beyond-the-classroom/1.jpg', caption: 'Top Leaders' },
      { src: '/images/stories/beyond-the-classroom/2.jpg', caption: 'Tres Marias' },
      { src: '/images/stories/beyond-the-classroom/3.jpg', caption: 'Congratss' },
      { src: '/images/stories/beyond-the-classroom/4.jpg', caption: 'Maam Heide and Friends' },
      { src: '/images/stories/beyond-the-classroom/5.jpg', caption: '11-ICT-A' },
      { src: '/images/stories/beyond-the-classroom/6.jpg', caption: 'Tres Diktadores' },
      { src: '/images/stories/beyond-the-classroom/7.jpg', caption: 'Banag' },
      { src: '/images/stories/beyond-the-classroom/8.jpg', caption: 'Midterms' }
    ],
  },
  {
    id: 'level-up',
    kind: 'levelup',
    title: 'Level Up',
    date: 'G11 to G12',
    palette: ['#2f5a72', '#c79a5a', '#e8935a'],
    copy: ['Grade 11 cleared.', 'Everything we learned comes with us.'],
    photos: [],
  },
  {
     id: 'back-again',
    kind: 'story',
    title: 'Grade 12: Back Again',
    date: 'G12 2023',
    palette: ['#3b5470', '#b88b62', '#ec9a5c'],
    copy: ['Same faces, bigger stakes, and a year that moved faster than we expected.'],
    photos: [
      { src: '/images/stories/back-again/1.jpg', caption: 'Teamwork' },
      { src: '/images/stories/back-again/2.jpg', caption: 'Tres Maria Again' },
      { src: '/images/stories/back-again/3.jpg', caption: '?????' },
      { src: '/images/stories/back-again/4.jpg', caption: 'Sir Kervs?' },
      { src: '/images/stories/back-again/5.jpg', caption: 'Ahhh' },
      { src: '/images/stories/back-again/6.jpg', caption: 'El Presidente' },
      { src: '/images/stories/back-again/7.jpg', caption: 'Selfeee' },
      { src: '/images/stories/back-again/8.jpg', caption: 'Yah ano number 1?' }
    ],
  },
  {
     id: 'the-grind',
    kind: 'story',
    title: 'The Grind',
    date: 'G12 2023',
    palette: ['#3b3358', '#a9546a', '#e8844f'],
    copy: ['Deadlines, research papers, and group chats that never slept.', 'We got through all of it together.'],
    photos: [
      { src: '/images/stories/the-grind/1.jpg', caption: 'Bossing' },
      { src: '/images/stories/the-grind/2.jpg', caption: 'Avengers?' },
      { src: '/images/stories/the-grind/3.jpg', caption: 'The Boyz' },
      { src: '/images/stories/the-grind/4.jpg', caption: 'Best in Research' },
      { src: '/images/stories/the-grind/5.jpg', caption: ':(' },
      { src: '/images/stories/the-grind/6.jpg', caption: 'Complete ICT A' },
      { src: '/images/stories/the-grind/7.jpg', caption: 'SleepWell' },
      { src: '/images/stories/the-grind/8.jpg', caption: 'Malupiton Numbah 1' }
    ],
  },
  {
    id: 'core-memories',
    kind: 'story',
    title: 'Core Memories',
    date: 'G12 2024',
    palette: ['#2c2750', '#7a4468', '#d46f56'],
    copy: ['The inside jokes and small moments that never made it into any report card.'],
    photos: [
      { src: '/images/stories/core-memories/1.jpg', caption: 'Recollection' },
      { src: '/images/stories/core-memories/2.jpg', caption: 'Kuya Sammie' },
      { src: '/images/stories/core-memories/3.jpg', caption: '.5 ni Ter' },
      { src: '/images/stories/core-memories/4.jpg', caption: 'Doc Arcee' },
      { src: '/images/stories/core-memories/5.jpg', caption: 'Baccalaureate Mass' },
      { src: '/images/stories/core-memories/6.jpg', caption: 'Bday ni Pat (2024)' },
      { src: '/images/stories/core-memories/7.jpg', caption: 'Sm Gala' },
      { src: '/images/stories/core-memories/8.jpg', caption: 'Bday ulit ni Pat (2024)' }
    ],
  },
  {
     id: 'plot-twists',
    kind: 'story',
    title: 'Plot Twists',
    date: 'G12 2024',
    palette: ['#262148', '#63395f', '#c05b4e'],
    copy: ['The unplanned, the unexpected, and the stories only we get.'],
    photos: [
      { src: '/images/stories/plot-twists/1.jpg', caption: 'Naloko na' },
      { src: '/images/stories/plot-twists/2.jpg', caption: 'Tumba' },
      { src: '/images/stories/plot-twists/3.jpg', caption: 'ICT Girls' },
      { src: '/images/stories/plot-twists/4.jpg', caption: 'Laban lng Eko' },
       { src: '/images/stories/plot-twists/5.webp', caption: 'Bday ni Pat (2026)' }, // <-- Updated to .webp
      { src: '/images/stories/plot-twists/6.webp', caption: 'Bday nya Ulit' }, // <-- Updated to .webp
      { src: '/images/stories/plot-twists/7.jpg', caption: 'Gary V???' },
      { src: '/images/stories/plot-twists/8.jpg', caption: 'M.I.L Legend' }
    ],
  },
  {
     id: 'graduation',
    kind: 'graduation',
    title: 'Graduation',
    date: '2024',
    palette: ['#2a2347', '#d08a4f', '#f6cd7a'],
    copy: [],
    photos: [
      { src: '/images/stories/graduation/1.jpg', caption: 'Congrats ICT A' },
      { src: '/images/stories/graduation/2.jpg', caption: 'Batch 2023-2024' },
      { src: '/images/stories/graduation/3.jpg', caption: 'Kaibigan ni Cabigan' },
      { src: '/images/stories/graduation/4.jpg', caption: 'Rimm Ulit?' },
      { src: '/images/stories/graduation/5.jpg', caption: 'Katakot' },
      { src: '/images/stories/graduation/6.jpg', caption: 'Benzhar and Friends' },
      { src: '/images/stories/graduation/7.jpg', caption: 'Forever ICT A' },
      { src: '/images/stories/graduation/8.jpg', caption: 'The End' }
    ],
  },
  {
    id: 'vault',
    kind: 'vault',
    title: 'The Tribute Vault',
    date: 'Rewind',
    palette: ['#0f1630', '#1e2a55', '#3a3f6f'],
    copy: ['One tribute for Grade 11, one for Grade 12.', 'Pick a tape to watch it again on Vimeo.'],
    photos: [],
  },
  {
    id: 'mentions',
    kind: 'mentions',
    title: 'Special Mentions',
    date: 'Thank you',
    palette: ['#0b1128', '#18224a', '#2d3566'],
    copy: ['For the people who made these years possible.'],
    photos: [],
  },
  {
    id: 'cast',
    kind: 'credits',
    title: 'The Cast',
    date: 'Credits',
    palette: ['#070a1a', '#0f1736', '#1b2350'],
    copy: [],
    photos: [],
  },
]
