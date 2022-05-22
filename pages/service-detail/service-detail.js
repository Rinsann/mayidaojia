import Service from '../../model/service'
import User from '../../model/user'
import Rating from '../../model/rating'

const rating = new Rating()

Page({
	data: {
		service: null, serviceId: null, isPublisher: false, ratingList: []
	}, onLoad: async function (options) {
		this.data.serviceId = options.service_id
		await this._getService()
		await this._getServiceRatingList()
		this._checkRole()
	},
	
	async _getService() {
		const service = await Service.getServiceByID(this.data.serviceId)
		this.setData({
			service
		})
	},
	
	async _getServiceRatingList() {
		const ratingList = await rating.reset().getServiceRatingList(this.data.serviceId)
		this.setData({
			ratingList
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