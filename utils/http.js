import APIConfig from '../config/api'
import exceptionMessage from '../config/exception-message'
import wxToPromise from './wx'
import cache from '../enum/cache'
import User from '../model/user'

class Http {
	// url: yminami.com
	// token
	static async request ({url, data, method = 'GET', refetch = true}) {
		let res
		try {
			res = await wxToPromise('request', {
				url: APIConfig.baseURL + url,
				data,
				method,
				header: {
					token: wx.getStorageSync(cache.TOKEN)
				}
			})
		} catch (e) {
			Http._showError(-1)
			throw new Error(e.errMsg)
		}
		// 1.代码写错
		// 2.无网络
		// 3.服务端超时


		//	全局统一响应、异常处理
		if (res.statusCode < 400) {
			// callback(res.data.data)
			return res.data.data
		}
		//	TODO 请求失败
		if (res.statusCode === 401) {
			//	TODO 令牌相关操作
			if (res.data.error_code === 10001) {
				wx.navigateTo({
					url: '/pages/login/login'
				})
				throw Error('请求为携带令牌')
			}
			if (refetch) {
				return await Http._refetch({url, data, method, refetch})
			}
		}

		Http._showError(res.data.error_code, res.data.message)
		const error = Http._generateMessage(res.data.message)
		throw Error(error)
	}

	static async _refetch (data) {
		await User.login()
		data.refetch = false
		return await Http.request(data)
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
		return typeof message === 'object' ? Object.values(message).join(';') : message
	}
}

export default Http