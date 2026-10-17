// The credits roll in this order, top to bottom.
//
// PHOTOS: name each photo by the student's number in this list and put it in public/images/cast/
//   Agregado is number 1  ->  public/images/cast/01.jpg
//   Tuazon is number 38   ->  public/images/cast/38.jpg
// Use small square photos (about 300 x 300 px). If your files are not .jpg, change EXT below.
// If a photo is missing, the student's initial is shown instead (nothing breaks).
//
// Each line is ['Name', 'optional note', 'optional custom photo path'].
const EXT = 'jpg'

const people = [
  ['Agregado, Franchezka Jean'],
  ['Alcoriza, Joanna Marie'],
  ['Aldave, Kurt Wenson'],
  ['Apin, Dan Gabe'],
  ['Azarcon, Carmela'],
  ['Bacani, Kennedy'],
  ['Baldoza, Anna Marie'],
  ['Bansig, Carl Vincent', 'Grade 11 classmate'],
  ['Baylon, EJ'],
  ['Cabigan, John Patrick'],
  ['Cavite, James'],
  ['Cereno, Jairo'],
  ['Dela Cruz, Jania'],
  ['Delos Santos, Rimmuel'],
  ['Esparas, Christian Josh'],
  ['Estosane, Mariel'],
  ['Evardo, Dinalyn'],
  ['Galupo, Ner Brian'],
  ['Garcia, Everic John'],
  ['Gasulas, Armay', 'Grade 11 classmate'],
  ['Gatbonton, Genhiskhan', 'Grade 12 classmate'],
  ['Japson, Ella Mae'],
  ['Juvida, Raiza Joy'],
  ['Lebanto, Nathaline Joy'],
  ['Lumiguid, Cassandra', 'Grade 11 classmate'],
  ['Mamaril, Angelyn'],
  ['Mercado, Joshua Miguel'],
  ['Montemayor, Jake Aljon'],
  ['Morales, Kea Crystel'],
  ['Muros, Elaine'],
  ['Pagatpat, Jenivie'],
  ['Pajaron, Jericho'],
  ['Penasales, John Michael'],
  ['Serran, Terrenz'],
  ['Solomon, Rowell', 'Grade 11 classmate'],
  ['Tandigan, Drei', 'Grade 11 classmate'],
  ['Tangente, John Adrian'],
  ['Tuazon, Melchi'],
]

export const classmates = people.map(([name, note = '', photo = ''], i) => ({
  name,
  note,
  nickname: '',
  photo: photo || `/images/cast/${String(i + 1).padStart(2, '0')}.${EXT}`,
}))
