import 'dotenv/config'
import * as joi from 'joi'

interface Env {
  PORT: number
  DATABASE_URL: string
}

const Scheme = joi.object({
  PORT: joi.number().default(8000),
  DATABASE_URL: joi.string().required(),
}).unknown(true)

const { error, value } = Scheme.validate(process.env)
if (error)
  throw new Error(`Config validation error: ${error.message}`)

const env : Env = value

export const _env = {
  PORT: env.PORT,
  DATABASE_URL: env.DATABASE_URL,
}