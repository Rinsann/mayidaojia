import serviceStatus from '../../../../enum/service-status'
import serviceAction from '../../../../enum/service-action'
import behavior from '../behavior'

Component({
	behaviors:[behavior],
	properties: {},
	data: {
		serviceStatusEnum: serviceStatus,
		serviceActionEnum: serviceAction
	},
	methods: {
		handleUpdateStatus: function (event) {
			console.log(event)
		},
		handleEditService: function (event) {
			console.log(event)
		}
	}
});
