import APIConfig from '../config/api'
import exceptionMessage from '../config/exception-message'
import wxToPromise from './wx'
import cache from '../enum/cache'

class Http {
	// url: yminami.com
	// /token
	static async request ({url, data, method = 'GET'}) {
		const res = await wxToPromise('request', {
			url: APIConfig.baseURL + url,
			data,
			method,
			/* header: {
			 token: wx.getStorageSync(cache.TOKEN)
			 } */
		})

		//	全局统一响应、异常处理
		if (res.statusCode < 400) {
			// callback(res.data.data)
			return res.data.data
		}
		//	TODO 请求失败
		if (res.statusCode === 401) {
			//	TODO 令牌相关操作
			return
		}
		Http._showError(res.data.error_code, res.data.message)
		const error = Http._generateMessage(res.data.message)
		throw Error(error)
	}

	static _showError (errorCode, message) {
		let title = ''
		const errorMessage = exceptionMessage[errorCode]
		title = errorMessage || message || '未知异常'

		title = Http._generateMessage(title)

		wx.showToast({
			title, icon: 'none', duration: 2000
		})
	}

	static _generateMessage (message) {
		return typeof message === 'object'
			? Object.values(message).join(';')
			: message
	}
}

export default Http