// pages/home/home.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    studentId: "",
    department: [],
    notifications: [],
    test: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const db = wx.cloud.database()
    const thisPage = this
    this.setData({
      studentId: wx.getStorageSync('studentId')
    })
    db.collection('users').where({
      _id: this.data.studentId
    }).get({
      success: function(res) {
        thisPage.setData({
          department:res.data[0].department
        })
      }
    })
    if (this.data.department[0]=="微博部") {
      this.setData({
        test: "yes"
      })
    }
    else {
      console.log(this.data)
      // console.log(this.data.department)
    }
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