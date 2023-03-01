import fs from 'fs'
import path from 'path'
import dayjs from 'dayjs'
import { systemRootFolderName, logFileFormat } from '@/config/index'
import { logger } from '@/middleware/logger'

// 环境
export const isProd = process.env.NODE_ENV === 'prod'

// 判断传递过来的参数是否符合规范
export const isCheckParams = (params: any): boolean => {
	if (checkType(params) !== 'object') {
		return false
	}
	const { type, data } = params
	if (!type || !data || !['error', 'info'].includes(type)) {
		return false
	}
	return true
}

// 错误信息
export const paramsErrorMsg = '参数错误，请按照规范传递 { type: "error" | "info", data: string }'

// 组装信息（加上systemName）
export const assembleLogInfo = (systemName: string, params: Record<string, any>) => {
	return JSON.stringify({
		time: dayjs().format('YYYY-MM-DD HH:mm:ss'),
		systemName,
		...params
	}) + '\n'
}

// 校验类型
export const checkType = (para: unknown) => {
  return Object.prototype.toString.call(para).slice(8, -1).toLocaleLowerCase()
}

// 删除文件
export const delFile = async (dirPath: string, num = 30) => {
  try {
    let fileInfo = []
    const fileList = fs.readdirSync(dirPath)
    const fileListLen = (fileList || []).length
    if (fileListLen < num) {
      return
    }
    for (const file of fileList) {
      const filePath = `${dirPath}/${file}`
      const stats = fs.statSync(filePath);
      if (stats.isFile()) {
        fileInfo.push({
          filePath,
          birthtime: dayjs(stats.birthtime).valueOf()
        })
      }
    }
    fileInfo = fileInfo.sort((m, n) => m.birthtime - n.birthtime)
    const cutLen = fileListLen - num
    const curList = fileInfo.slice(0, cutLen)
    curList.forEach((file) => {
      fs.unlink(file.filePath, (err) => {
				logger('delFile -> unlink').error(err)
      })
    })
  } catch (error) {
		logger('delFile').error(error)
  }
}

// 写入文件
export const writeFile = async (path: string, errorMsg: string) => {
	await isExistSystemFolder()
	await isExistFolder(path)
	const fileName = dayjs().format('YYYY-MM-DD') + logFileFormat
	const filePath = `${path}/${fileName}`
	// 判断是否存在文件
	const isHaveFile = await isExistFile(filePath)
	// 存在文件则追加内容
	if (isHaveFile) {
		fs.appendFileSync(filePath, errorMsg);
	}
	// 不存在文件则创建文件并写入内容
	else {
		fs.writeFile(filePath, errorMsg, (err) => {
			if (err) {
				logger('writeLog -> writeFile').error(err)
			}
		})
	}
}

// 判断是否存在系统日志文件夹，没有则创建
export const isExistSystemFolder = () => {
	const systemLogPath = path.resolve(__dirname, `../../${systemRootFolderName}`)
	return new Promise((resolve, reject) => {
    fs.stat(systemLogPath, async(err) => {
      if (err) {
				fs.mkdirSync(systemLogPath);
				resolve(false);
        // reject(false);
      } else {
        resolve(true);
      }
    })
  })
}

// 判断文件夹是否存在，没有则创建
export const isExistFolder = (path: string) => {
	return new Promise((resolve, reject) => {
    fs.stat(path, async (err) => {
      if (err) {
				fs.mkdirSync(path);
        // reject(false);
				resolve(false);
      } else {
        resolve(true);
      }
    })
  })
}

// 判断文件是否存在
export const isExistFile = (path: string) => {
	return new Promise((resolve, reject) => {
    fs.access(path, (err) => {
      if (err) {
        resolve(false);
      } else {
        resolve(true);
      }
    })
  })
}
