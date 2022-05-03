import Http from '../utils/http'

class Service {
	/**
	 * 分页获取服务列表
	 * @param page 页码
	 * @param count 每页数量
	 * @param category_id 分类 id
	 * @param type 服务类型
	 */
	getServiceList(page, count, category_id = null, type = null) {
		//	发起网络请求，获取数据
		//  尽量避免提供犯错的机会
		//  统一的响应，异常处理
		const res = Http.request({
			url: 'v1/service/list',
			data: {page, count}
		}, function (res) {
			console.log(res)
		})
		// console.log(res)
	}
}

export default Service