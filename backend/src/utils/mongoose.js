import mongoose from 'mongoose'
import { config } from '../config'
import bunyan from './bunyan'

mongoose.Promise = global.Promise

mongoose.set('debug', function (coll, method, query, doc, options) {
  bunyan.trace({mongooseQuery: {coll, method, query, doc}}, 'mongoose query')
})

export let modelConnection = mongoose.createConnection()

modelConnection.on('connected', () => {
  bunyan.trace({
    readyState: modelConnection.readyState
  }, 'modelConnection connected')
})
modelConnection.on('connecting', () => {
  bunyan.trace({
    readyState: modelConnection.readyState
  }, 'modelConnection connecting')
})
modelConnection.on('disconnecting', () => {
  bunyan.trace({
    readyState: modelConnection.readyState
  }, 'modelConnection disconnecting')
})
modelConnection.on('disconnected', () => {
  bunyan.trace({
    readyState: modelConnection.readyState
  }, 'modelConnection disconnected')
})
modelConnection.on('error', (e) => {
  bunyan.error(e, 'modelConnection.on error')
})

export const init = () => {
  modelConnection.open(config.databaseUrl)
  bunyan.trace('mongoose init done')
}
