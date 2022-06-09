import serviceType from '../../enum/service-type'

Component({
	properties: {
		form: Object
	},
	data: {
		typeList: [
			{
				id: serviceType.PROVIDE,
				name: '提供服务'
			},
			{
				id: serviceType.SEEK,
				name: '找服务'
			}
		],
		typePickerIndex: null
	},
	lifetimes: {
		attached () {
			this._init()
		}
	},
	methods: {
		_init () {
			//	ES6
			// 找不到的时候，返回-1
			const index = this.data.typeList.findIndex(item => this.form.type === item.id)
			this.setData({
				typePickerIndex: index !== -1 ? index : null
			})
		},
		handleTypeChange: function (event) {
			console.log(event)
		}
	}
});
