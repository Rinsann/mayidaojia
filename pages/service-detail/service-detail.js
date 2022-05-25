import Service from '../../model/service'
import User from '../../model/user'
import Rating from '../../model/rating'
import serviceType from '../../enum/service-type'
import serviceStatus from '../../enum/service-status'

const rating = new Rating()

Page({
	data: {
		service: null,
		serviceId: null,
		isPublisher: false,
		ratingList: [],
		serviceTypeEnum: serviceType,
		serviceStatusEnum: serviceStatus
	},
	onLoad: async function (options) {
		this.data.serviceId = options.service_id
		await this._getService()
		await this._getServiceRatingList()
		this._checkRole()
	},

	async _getService () {
		const service = await Service.getServiceByID(this.data.serviceId)
		this.setData({
			service
		})
	},

	async _getServiceRatingList () {
		const ratingList = await rating.reset().getServiceRatingList(this.data.serviceId)
		this.setData({
			ratingList
		})
	},

	handleUpdate: function (event) {
		console.log(1)
	},

	handleEdit: function () {
		console.log(2)

	},

	handleChat: function () {
		console.log(3)

	},

	handleOrder: function () {
		console.log(4)

	},

	_checkRole () {
		const userInfo = User.getUserInfoByLocal()
		if (userInfo && userInfo.id === this.data.service.publisher.id) {
			this.setData({
				isPublisher: true
			})
		}
	}
});