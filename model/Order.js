/**
 * @name: Order
 * @author: Rin
 * @date: 2022/5/26 21:54
 * @description：Order
 * @update: 2022/5/26 21:54
 */
import Http from '../utils/http'

class Order {
	static createOrder (serviceId, address) {
		return Http.request({
			url: 'v1/order',
			data: {
				service_id: serviceId,
				address: address
			},
			method: 'POST'
		})
	}
}

export default Order