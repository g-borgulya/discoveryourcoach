import 'babel-polyfill'
import express from 'express'
import fileUpload from 'express-fileupload'
import cors from 'cors'
import bodyParser from 'body-parser'
import * as mongoose from './utils/mongoose'
import { config } from './config'
import bunyan from './utils/bunyan'
import restApiRouter from './restApiRouter'

mongoose.init()

const app = express()

app.enable('trust proxy')
app.use(cors())
app.use(bodyParser.json({limit: '10mb'}))
app.use(fileUpload())
app.use('/uploadedAssets', express.static(config.pathToUploadedAssets))
app.use('/rest', restApiRouter)
app.listen(config.port)
bunyan.info(`DYC backend listening to ${config.port} in ${process.env.NODE_ENV} mode`)
