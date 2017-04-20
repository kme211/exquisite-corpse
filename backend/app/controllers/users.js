const mongoose = require('mongoose')
const User = mongoose.model('User')

function createNewUser(auth0_id, email) {
    let user = new User
    user.auth0_id = auth0_id
    user.email = email
    return user.save()
}

function getUser(auth0_id) {
    return User.findOne({ auth0_id }).populate('drawings').exec()
}

module.exports = {
    new: createNewUser,
    get: getUser
}