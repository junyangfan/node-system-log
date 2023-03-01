import cors from 'koa2-cors'
import { Context } from 'koa'
import { isProd } from '@/utils/index'

export default () => {
	return cors({
		origin: (ctx: Context) => {
			if (!isProd) {
				return '*'
			}
			// 可跨域白名单
			const whiteOriginList = [
					'https://test.e-chuhai.com',
					'https://merchant.e-chuhai.com',
			]

			const host = ctx.header.host as string

			if (whiteOriginList.includes(host)) {
					return host
			}

			return false
		},
		maxAge: 5, // 指定本次预检请求的有效期，单位为秒。
		credentials: true, // 是否允许发送Cookie
		allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // 设置所允许的HTTP请求方法
		allowHeaders: ['Content-Type', 'Authorization', 'Accept'], // 设置服务器支持的所有头信息字段
		exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'], //设置获取其他自定义字段
	})
}
