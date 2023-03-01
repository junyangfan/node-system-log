import { Context, Next } from 'koa'
import { logger } from '@/middleware/logger'

export default async (ctx: Context | any, next: Next) => {
	try {
    await next()
    if (ctx.status === 404) {
      // do something
    }
  } catch (err) {
    // handle error
		// 处理全局异常
		logger('global').error(err)
  }
}
