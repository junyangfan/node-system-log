import { Context } from 'koa'
import { logger } from '@/middleware/logger'
import path from 'path'
import { systemRootFolderName } from '@/config/index'
import { assembleLogInfo, paramsErrorMsg, isCheckParams, writeFile } from '@/utils/index'

export const systemName = 'scm'
const scmPath = path.resolve(__dirname, `../../${systemRootFolderName}/${systemName}`)

// 日志写入
export const writeLog = async (ctx: Context) => {
  try {
    const params = JSON.parse((ctx.request.body as string) || '{}')
    if (!isCheckParams(params)) {
      return ctx.output(1, paramsErrorMsg)
    }
    const errorMsg = assembleLogInfo(systemName, params)
    // 写日志
    writeFile(scmPath, errorMsg)
    ctx.body = ''
    logger('scm writeLog -> writeFile').info(errorMsg)
  } catch (error) {
    logger('scm writeLog').error(error)
  }
}

// 查看日志
export const checkLog = async (ctx: Context) => {
  ctx.body = 'checkLog'
  logger('scm').info('查看日志')
}
