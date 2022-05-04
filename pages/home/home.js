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
	/**
	 * 下拉刷新
	 */
	onPullDownRefresh() {
		console.log('下拉刷新')
	},
	
	/**
	 * 上拉触底加载更多
	 */
	async onReachBottom() {
		// 获取下一页的数据并且和当前的数据合并
		console.log('上拉触底')
		if (!service.hasMoreData) {return}
		const serviceList = await service.getServiceList()
		this.setData({
			serviceList
		})
	},
	
	async _getServiceList() {
		const serviceList = await service.getServiceList()
		console.log(serviceList)
		this.setData({
			serviceList: serviceList
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