// pages/mine/mine.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: "",
    studentId: "",
    department: "",
    position: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const thisPage = this
    const db = wx.cloud.database()
    this.setData({
      // 读取本地缓存，同步学号信息
      studentId: wx.getStorageSync('studentId')
    })
    // 从数据库中读取该学号对应的用户信息
    db.collection('users').where({
      _id: this.data.studentId
    }).get({
      success: function(res) {
        thisPage.setData({
          name: res.data[0].name,
          department: res.data[0].department,
          position: res.data[0].position
        })
      }
    })
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