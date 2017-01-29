const mongoose = require('mongoose')
const Drawing = mongoose.model('Drawing')
const Artist = mongoose.model('Artist')
const Section = mongoose.model('Section')
const queue = require('../../jobs/client')


exports.get = function(req, res) {
  let id = req.params.id
  let section = Section
    .findById(id)
    .populate('drawing')
    .then((drawing) => console.log('values', values))
}


exports.save = function(id) {

}

exports.getSurroundingSections = function(req, res) {
  console.log('getSurroundingSections')
  let positions = getAdjacentPositions([x, y])
  // need to get surrounding sections and return them to the user
  let sections = drawing.sections
    .filter(section => positions.some(pos => isEqual(pos, [section.x, section.y])))
    .map(section => Section.findById(section.id))
  })

  Promise.all(sections).then(sections => )
}
