import Service from '../../model/service'
import Category from '../../model/category'

const service = new Service()

Page({
	data: {
		tabs: ['全部服务', '在提供', '正在找'],
		currentTabIndex: 0,
		categoryList: []
	},
	onLoad: function (options) {
		this._getServiceList()
		//	总的入口，执行函数1 执行函数2
		this._getCategoryList()
	},
	
	async _getServiceList() {
		const serviceList = await service.getServiceList(1, 10)
		console.log(serviceList)
		this.setData({
			serviceList: serviceList.data
		})
	},
	
	async _getCategoryList() {
		const categoryList = await Category.getCategoryListWithAll();
		this.setData({
			categoryList
		})
	},
	
	handleTabChange: function (event) {
	},
	handleCategoryChange: function (event) {
		const id = event.currentTarget.dataset.id
	}
});