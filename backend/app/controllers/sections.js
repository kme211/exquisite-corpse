const mongoose = require('mongoose')
const Drawing = mongoose.model('Drawing')
const Artist = mongoose.model('Artist')
const Section = mongoose.model('Section')
const queue = require('../../jobs/client')
const isEqual = require('lodash/isEqual')

const getAdjacentPositions = (pos) => {
  const [ x, y ] = pos
  let adjacentPositions = [
    [x - 1, y],
    [x + 1, y],
    [x, y - 1],
    [x, y + 1]
  ]
  return adjacentPositions
    .filter(position => position.every(num => num >= 0))
}
exports.get = function(req, res) {
  let id = req.params.id
  let section = Section
    .findById(id)
    .populate('drawing')
    .then((drawing) => console.log('values', values))
}

exports.save = function(req, res) {
  console.log('save', req.params.id)
  let id = req.params.id
  let drawing = req.body.drawing
  let artistEmail = req.body.artist
  let image = req.body.image
  let status = req.body.status
  let r1 = Artist
    .findByEmail(artistEmail)
    .then(artist => {
      console.log('artist', artist)
      if(!artist) {
        artist = new Artist
        artist.email = artistEmail
      }
      artist.drawings.push(drawing)
      return artist.save()
    })
    .then(artist => {
      return Section
        .findById(id)
        .then(section => {
          console.log('section!', section)
          section.artist = artist
          section.image = image
          section.status = status
          return section.save()
        })
        .then(section => res.json(section))
    })
}

exports.getSurroundingSections = function(req, res) {
  let id = req.params.id
  let currentSection
  let x
  let y
  let surroundingPositions
  let width
  let height

  Section
    .findById(id)
    .then(section => {
      currentSection = section
       surroundingPositions = getAdjacentPositions([section.x, section.y])
       return Drawing.findById(section.drawing)
    })
    .then(drawing => {
      width = drawing.width
      height = drawing.height
      return drawing.sections
    })
    .then(sections => sections.filter(section => surroundingPositions.some(pos => isEqual(pos, [section.x, section.y]))))
    .then(sections => sections.map(section => Section.findById(section.id)))
    .then(promises => Promise.all(promises))
    .then(sections => {
      res.json({
        width: width,
        height: height,
        pos: [currentSection.x, currentSection.y],
        sections: sections.concat(currentSection)
      })
    })
}
