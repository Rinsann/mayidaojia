import APIConfig from '../config/api'
import exceptionMessage from '../config/exception-message'
import wxToPromise from './wx'

class Http {
	// url: yminami.com
	// /token
	static async request({url, data, method = 'GET'}) {
		const res = await wxToPromise('request', {url: APIConfig.baseURL + url, data, method})
		
		//	全局统一响应、异常处理
		//	TODO 请求成功
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
		//	接口错误信息，一定要看清楚文档，那些适合直接展示出去，那些不适合
		
	}
	
	static _showError(errorCode, message) {
		let title = ''
		const errorMessage = exceptionMessage[errorCode]
		title = errorMessage || message || '未知异常'
		title = typeof title === 'object' ? Object.values(title).join(';') : title
		
		wx.showToast({
			title, icon: 'none', duration: 2000
		})
	}
}

export default Http