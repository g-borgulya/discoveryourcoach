import * as configDev from './config.docker-dev'
import * as configProd from './config.docker-prod'

export const config = {
  dev: configDev,
  prod: configProd
}[`${process.env.NODE_ENV}`]
