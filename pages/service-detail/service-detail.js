import Service from '../../model/service'
import User from '../../model/user'


Page({
	data: {
		service: null,
		serviceId: null,
		isPublisher: false
	},
	onLoad: async function (options) {
		this.data.serviceId = options.service_id
		await this._getService()
		this._checkRole()
	},
	
	async _getService() {
		const service = await Service.getServiceByID(this.data.serviceId)
		this.setData({
			service
		})
	},
	
	_checkRole() {
		const userInfo = User.getUserInfoByLocal()
		if (userInfo && userInfo.id === this.data.service.publisher.id) {
			this.setData({
				isPublisher: true
			})
		}
	}
});