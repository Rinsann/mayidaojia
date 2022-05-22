import service from '../../model/service'
import Service from '../../model/service'

Page({
	data: {
		service: null,
		serviceId: null
	},
	onLoad: function (options) {
		this.data.serviceId = options.service_id
		this._getService()
	},
	async _getService() {
		const service = await Service.getServiceByID(this.data.serviceId)
		this.setData({
			service
		})
	}
});