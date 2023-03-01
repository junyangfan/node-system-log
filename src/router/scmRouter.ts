import Router from 'koa-router'
import { routerPrefix } from '@/config/index'
const router = new Router({ prefix: routerPrefix })
import { systemName, writeLog, checkLog } from '@/controller/scm'

router
	.post(`/${systemName}/writeLog`, writeLog)
	.get(`/${systemName}/checkLog`, checkLog)

export const routerArray = [router.routes(), router.allowedMethods()] || []
