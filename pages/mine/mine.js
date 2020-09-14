// pages/mine/mine.js
var util = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: "",
    studentId: "",
    department: "",
    position: "",
    memo: [],
    date: "",
    time: ""
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
    }),
    this.setData({
      date: util.formatDate(new Date()),
      time: util.formatTime(new Date())
    })
    this.setData({
      studentId: wx.getStorageSync('studentId')
    })
    db.collection('memo').where({
      studentId: this.data.studentId
    }).get({
      success: function(res) {
        thisPage.setData({
          memo: res.data
        })
      }
    })
  },

  deleteMemo: function (e) {
    const db = wx.cloud.database()
    db.collection('memo').doc(e.currentTarget.dataset.id).remove()
    this.onLoad()
  },

  bindTimeChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      time: e.detail.value
    })
  },

  bindDateChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date: e.detail.value
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
    this.onLoad()
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