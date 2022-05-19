import {throttle} from '../../utils/utils'

Component({
	options: {
		multipleSlots: true
	},
	properties: {
		tabs: {
			type: Array,
			value: []
		}
	},
	data: {
		currentTabIndex: 0
	},
	methods: {
		//	1.传入一个数组，按数组元素内容渲染我们的标签月选项
		//	2.能够监听点击事件,并且通知使用组件的页面或者父组件,通过事件通知我们选择了什么
		//	通用组件
		// 父组件（页面）通过属性给自定义组件传递参数
		// 自定义组件通过自定义事件给父组件(页面)传递参数
		
		handleTabChange: throttle(function (event) {
			const index = event.currentTarget.dataset.index
			if (index === this.data.currentTabIndex) {return}
			this.setData({
				currentTabIndex: index
			})
			this.triggerEvent('change', {index})
		}),
		
		handleTouchMove(event) {
			const direction = event.direction
			const currentTabIndex = this.data.currentTabIndex
			const targetTabIndex = currentTabIndex + direction
			if (targetTabIndex < 0 || targetTabIndex > this.data.tabs.length - 1) {
				return
			}
			const customEvent = {
				currentTarget: {
					dataset: {
						index: targetTabIndex
					}
				}
			}
			this.handleTabChange(customEvent)
		},
	}
});
