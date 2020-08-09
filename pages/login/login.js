// pages/login/login.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userList: [
      {"ID": "U201916970", 
      "atr": {name: "刘逸康",
      password: "abclyk15973",
      department: "技术部"
      }},
      {"ID": "U123", 
      "atr": {name: "马云",
      password: "123",
      department: "技术部"
      }}
    ],
    idList: [
      "U201916970",
      "U123"
    ],
    studentIdGot: 0,
    passwordGot: 0
  },

  login: function(e) {
    var passwordGot = this.data.passwordGot
    var studentIdGot = this.data.studentIdGot
    var idList = this.data.idList
    var user = false
    var x = 1
    while (x <= idList.length) {
      if (studentIdGot==idList[x-1]) {
        if (passwordGot==this.data.userList[x-1].atr.password) {
          var user = true}
        break}
      else {
        x+=1}}
    if (!user) {
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

  studentIdInput: function(e) {
    this.setData ({
      studentIdGot: e.detail.value
    })
  },

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