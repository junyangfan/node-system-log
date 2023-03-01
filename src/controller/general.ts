import { Context } from 'koa'
import { logger } from '@/middleware/logger'
import path from 'path'
import { systemRootFolderName } from '@/config/index'
import { delFile, checkType } from '@/utils/index'
import { systemName as name1 } from './scm'
import { MD5 } from 'crypto-js'

export const systemName = 'general'
const generalPath = path.resolve(__dirname,`../../${systemRootFolderName}`)

const AllName = [name1]

// 删除日志
export const delLog = async (ctx: Context) => {
	try {
		const { secretKey, systemName, keepNum = 30 } = ctx.request.body as Record<string, any>

		if (!secretKey || MD5(secretKey).toString() !== '4142047431f5f974ef182c6f3a4982f6') {
			return ctx.output(2, '无权限操作')
		}

		const bol = (systemName || []).some((name: string) => AllName.includes(name))

		if ((systemName && !bol) || checkType(keepNum) !== 'number') {
			return ctx.output(1, '参数异常，格式：{ systemName?: string[], keepNum: number }')
		}

		if (systemName) {
			(systemName || []).forEach((name: string) => {
				delFile(`${generalPath}/${name}`, keepNum)
			})
		}
		else {
			(AllName || []).forEach((name: string) => {
				delFile(`${generalPath}/${name}`, keepNum)
			})
		}
		ctx.body = ''
		logger('general -> delLog').info(ctx.request.body)
	} catch (error) {
		logger('general delLog').error('delLog')
	}
}
