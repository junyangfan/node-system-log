import log4js from 'log4js'
import { LogPath } from '@/config/constant'
import Koa, { DefaultContext, DefaultState } from 'koa'

// 日志类型
type LevelsType = 'trace' | 'debug' | 'info' | 'warn' | 'error' | 'fatal';
const LEVELS = {
  trace: log4js.levels.TRACE,
  debug: log4js.levels.DEBUG,
  info: log4js.levels.INFO,
  warn: log4js.levels.WARN,
  error: log4js.levels.ERROR,
  fatal: log4js.levels.FATAL
}

log4js.configure({
  appenders: {
    cheese: {
      // 设置类型为 dateFile
      type: 'dateFile',
			layout: {
				type: "pattern",
				pattern: '[%d{yyyy-MM-dd hh:mm:ss}] [%p] %c %h %m'
			},
      // 配置文件名
      filename: LogPath,
      // 指定编码格式为 utf-8
      encoding: 'utf-8',
      // 配置 layout，此处使用自定义模式 pattern
      // layout: 'basic',
      // 日志文件按日期（天）切割
      pattern: 'yyyy-MM-dd',
      // 回滚旧的日志文件时，保证以 .log 结尾 （只有在 alwaysIncludePattern 为 false 生效）
      keepFileExt: true,
      // 输出的日志文件名是都始终包含 pattern 日期结尾
      alwaysIncludePattern: true,
			// 默认压缩老日志
			compress: true,
			// 旧日志最大数量
			backups: 100,
    }
  },
  categories: {
    // 设置默认的 categories
    default: { appenders: ['cheese'], level: 'debug' }
  }
})

export const logger = (name?: string) => {
	const logger = log4js.getLogger(name || 'default')
	return logger
}

// logger中间件
export const loggerMiddleware = (app: Koa<DefaultState, DefaultContext>, level?: LevelsType, name?: string) => {
	//加载中间件
	app.use(log4js.connectLogger(log4js.getLogger(name || 'logInfo'), {
		level: (level ? LEVELS[level] : LEVELS['debug']) as unknown as string,
		//格式化http相关信息
		format: ':method :url :status'
	}));
}
