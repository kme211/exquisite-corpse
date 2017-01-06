exports.app = require('./server')

exports.dropCollection = function (Model) {
  return Model.remove({})
}