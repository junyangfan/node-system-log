import fs from 'fs'
import path from 'path'
import compose from 'koa-compose'

// 模块路径
const _path = path.resolve(__dirname, './')

export default () => {
	const routers: any[] = []
	// 获取所有模块下的路由配置
	fs.readdirSync(_path)
		.filter(i => {
			const modulePath = path.resolve(__dirname, `./${i}`)
			if (i !== 'index.ts' && fs.lstatSync(modulePath).isFile()) {
				return i
			}
		})
		.forEach(moduleRouter => {
			const moduleRouterPath = path.resolve(_path, `./${moduleRouter}`)
			import(moduleRouterPath).then(module => {
				if (module.routerArray) {
					routers.push(...module.routerArray)
				}
			})
		})

	return compose(routers)
}
