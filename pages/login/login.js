// pages/login/login.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    studentIdGot: 0,
    passwordGot: 0
  },

  login: function(e) {
    const db = wx.cloud.database()
    var passwordGot = this.data.passwordGot
    var studentIdGot = this.data.studentIdGot
    db.collection('users').where({
      _id: studentIdGot
    }).get({
      // 获取该学号对应用户的秘密
      success: function(res) {
        const user = res.data[0]
        if ((res.data.length==0)||(passwordGot!==user.password)) {
          wx.showModal({
            title: '错误',
            content: '错误账号或密码',
            showCancel: false,
            confirmText: "确认"
          })
        }
        else {
          wx.switchTab({
            url: '../home/home',
          })
        }
      }
    })
  },

  toForget: function(e) {
    wx.navigateTo({
      url: '../forget/forget',
    })
  },

  toRegister: function(e) {
    wx.navigateTo({
      url: '../register/register',
    })
  },

  // 获取学生证号
  studentIdInput: function(e) {
    this.setData ({
      studentIdGot: e.detail.value
    }),
    // 将获取的学号信息缓存至本地
    wx.setStorageSync('studentId', e.detail.value)
  },

  // 获取密码
  passwordInput: function(e) {
    this.setData ({
      passwordGot: e.detail.value
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})