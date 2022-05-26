/**
 * @name: token
 * @author: Rin
 * @date: 2022/5/26 10:43
 * @description：token
 * @update: 2022/5/26 10:43
 */
import APIConfig from '../config/api'
import Http from '../utils/http'

class Token {
	static async getToken () {
		const res = await Http.request({
			url: 'v1/token', data: {
				i_code: APIConfig.i_code,
				order_no: APIConfig.orderNo
			},
			method: 'POST'
		})
		return res.token
	}
}

export default Token