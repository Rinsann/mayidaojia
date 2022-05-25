/**
 * @name: service-status
 * @author: Rin
 * @date: 2022/5/25 17:42
 * @description：service-status
 * @update: 2022/5/25 17:42
 */

const serviceStatus = {
	//	待审核
	PENDING: 0,

	// 待发布
	UNPUBLISHED: 1,

	// 已发布
	PUBLISHED: 2,

	//	已下架
	OFF_SHELVES: 3,

	//	已取消
	CANCELED: 4,

	//	审核不通过
	DENY: 5
}

export default serviceStatus