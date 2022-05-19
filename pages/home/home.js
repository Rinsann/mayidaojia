import Service from '../../model/service'
import Category from '../../model/category'
import {throttle} from '../../utils/utils'

const service = new Service()

Page({
	data: {
		tabs: ['全部服务', '在提供', '正在找'],
		categoryList: [],
		tabIndex: 0,
		categoryId: 0
	},
	onLoad: function (options) {
		this._getServiceList()
		//	总的入口，执行函数1 执行函数2
		this._getCategoryList()
	},
	
	async _getServiceList() {
		const serviceList = await service.reset().getServiceList(this.data.categoryId, this.data.tabIndex)
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
	
	handleTabChange: throttle(function (event) {
		this.data.tabIndex = event.detail.index
		this._getServiceList()
	}),
	
	handleCategoryChange: throttle(function (event) {
		if (this.data.categoryId === event.currentTarget.dataset.id) {
			return
		}
		this.data.categoryId = event.currentTarget.dataset.id
		this._getServiceList()
	}),
	
	/**
	 * 下拉刷新
	 */
	async onPullDownRefresh() {
		const serviceList = await service.reset().getServiceList()
		this.setData({
			serviceList
		})
		wx.stopPullDownRefresh()
	},
	
	/**
	 * 上拉触底加载更多
	 */
	async onReachBottom() {
		// 获取下一页的数据并且和当前的数据合并
		if (!service.hasMoreData) {return}
		const serviceList = await service.getServiceList(this.categoryId, this.data.tabIndex)
		this.setData({
			serviceList
		})
	},
	
});