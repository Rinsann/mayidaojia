import User from '../../model/user'

Page({
	data: {},
	onLoad: function (options) {

	},

	handleLogin: async function () {
		const res = await wx.getUserProfile({
			desc: "完善用户信息"
		})
		// 异常，会中断后续代码的执行
		// 错误，不会中断后续代码的执行
		wx.showLoading({
			title: '正在授权',
			mask: true
		})

		try {
			await User.login()
			await User.updateUserInfo(res.userInfo)
			wx.navigateBack()
		} catch (e) {
			wx.showModal({
				title: '登录失败，请稍后重试'
			})
			console.log(e)
		}
		wx.hideLoading()
	},

	handleToHome: function () {

	},
});