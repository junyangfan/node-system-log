import('./alias/index')
import Koa, { DefaultContext, DefaultState } from 'koa'
import env from '@/config/env'
import bodyParser from 'koa-bodyparser'
import { loggerMiddleware, logger } from '@/middleware/logger'
import cors from '@/middleware/cors'
import router from '@/router/index'
import output from '@/middleware/output'
import error from '@/middleware/error'

const app: Koa<DefaultState, DefaultContext> = new Koa()

// 挂载中间件
app
	.use(cors())
	.use(bodyParser({
		enableTypes: ['json', 'form', 'text']
	}))
	.use(output)
	.use(router())
	.use(error)

// 挂载日志中间件
loggerMiddleware(app)

app.listen(env.PORT, () => {
  logger('main.js').info(`服务启动成功，HOST: ${env.HOST}，端口：${env.PORT}`)
})
