const monq = require('monq')
const config = require('../config')

const client = monq(`mongodb://${config.db_user}:${config.db_pass}@${config.db_host}`, { safe: true })
const queue = client.queue('process-images')

module.exports = queue
