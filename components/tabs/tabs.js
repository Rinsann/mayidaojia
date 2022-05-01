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
		
		handleTabChange: function (event) {
			const index = event.currentTarget.dataset.index
			this.setData({
				currentTabIndex: index
			})
			
			this.triggerEvent('change', {index})
		},
		handleTouchstart: function (event) {
			console.log(event)
			//	数据绑定，记录触摸开始的x轴的位置
		},
		handleTouchend: function (event) {
			console.log(event)
			//	把结束时x轴的位置 - 触摸开始时的位置
			//	做判断，判断是往左划还是往右划
			//	做数据绑定，改变currentTabIndex的值
		},
	}
});
