require('dotenv').config()
const config = require('./config')
const monq = require('monq')
const client = monq(`mongodb://${config.db_user}:${config.db_pass}@${config.db_host}`, { safe: true })
const worker = client.worker(['process-images'])
const db = require('./db')
const jobs = require('./jobs')
db.once('open', console.log.bind(console, 'worker connected to mongoose'))

worker.register(jobs)

worker.on('dequeued', function (data) {
  console.log('Dequeued:')
  console.log(data)
})

worker.on('failed', function (data) {
  console.log('Failed:')
  console.log(data)
})

worker.on('complete', function (data) {
  console.log('Complete:')
  console.log(data)
})

worker.on('error', function (err) {
  console.log('Error:')
  console.log(err)
  worker.stop()
})

worker.start()
