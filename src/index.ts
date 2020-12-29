import * as dotenv from 'dotenv'
dotenv.config()

import express, { Request, Response } from 'express'
import mongoose from 'mongoose'
import { Controller } from './Controller'
import { log } from './Middleware/Log'

mongoose.connect('mongodb://localhost:27017', {
    dbName: 'ecommerce',
    useUnifiedTopology: true,
    useNewUrlParser: true,
    autoCreate: true
})

const app = express()

app.use(express.json())

app.use(log)

app.get('/ping', (req: Request, res: Response) => [
    res.json({'msg': 'pong'})
])

app.use('/v1', Controller())

app.listen(5000, () => console.log('Listening on port 5000...'))
