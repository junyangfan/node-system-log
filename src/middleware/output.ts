import { Context, Next } from 'koa'

export default async (ctx: Context | any, next: Next) => {
	ctx.response.output = ctx.output = (code: number, data: any) => {
		const result = {
			code,
			data: null,
			msg: '',
		}

		if (typeof data === 'object') {
				result['data'] = data
		}

		if (typeof code === 'number' || code !== 0) {
				result['msg'] = data
		}

		ctx.set('Content-Type', 'application/json')
		ctx.body = result
	}

	await next()
}
