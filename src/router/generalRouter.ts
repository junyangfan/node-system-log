// 通用路由
import Router from 'koa-router'
import { routerPrefix } from '@/config/index'
const router = new Router({ prefix: routerPrefix })
import { systemName, delLog } from '@/controller/general'

router
	.post(`/${systemName}/delLog`, delLog)

export const routerArray = [router.routes(), router.allowedMethods()] || []
