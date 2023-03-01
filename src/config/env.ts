import { ENVType } from '@/enum/common'

const LOCAL = {
  HOST: '127.0.0.1',
  PORT: '7998'
}

const DEV = {
  HOST: '127.0.0.1',
  PORT: '7998'
}

const PROD = {
  HOST: '127.0.0.1',
  PORT: '7998'
}

const env = {
  local: LOCAL,
  dev: DEV,
  prod: PROD
}

export default env[process.env.NODE_ENV as ENVType ?? 'local']
