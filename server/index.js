require('dotenv').config()
const express = require('express')
const cors = require('cors')
const {SERVER_PORT} = process.env
const app = express()

const { saveTrail, getTrails, deleteTrail, saveTrailApi } = require('./controller')
const {seed} = require('./seed')

app.use(express.json())
app.use(cors())

app.post('/seed', seed)
app.post('/save-trail', saveTrail)
app.post('/save-trail-api', saveTrailApi)
app.get('/trail', getTrails)
app.delete('/trail/:id', deleteTrail)

app.listen(SERVER_PORT, () => console.log(`Up on ${SERVER_PORT}`))