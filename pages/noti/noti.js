// pages/noti/noti.js
var util = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    date: '',
    time: '',
    publisher: '',
    studentId: '',
    isShow: true,
    isHide: false
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

  formSubmitNoti: function (e) {
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
    const publisher = this.data.publisher
    const db = wx.cloud.database()
    const form = e.detail.value
    const thisPage = this
    for (var i=0; i<form.checkbox.length; i++) {
      // form.checkbox[i]为通知发送部门
      db.collection(form.checkbox[i]).add({
        data:{
          date: thisPage.data.date,
          title: form.input1,
          content: form.input2,
          deadlineDate: util.formatDate(form.picker1),
          deadlineTime: form.picker2,
          publisher: publisher
        }
      })
    }
    wx.showModal({
      title: '提交成功',
      showCancel: 'false',
      confirmText: '确定'
    })
    this.formResetNoti()
    this.onLoad()
  },

  formResetNoti: function () {
    console.log('form发生了reset事件')
  },

  formSubmitMemo: function (e) {
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
    const db = wx.cloud.database()
    const form = e.detail.value
    const thisPage = this
    db.collection('memo').add({
      data:{
        studentId: thisPage.data.studentId,
        content: form.input,
        deadlineDate: form.picker1,
        deadlineTime: form.picker2
      }
    })
    wx.showModal({
      title: '提交成功',
      showCancel: 'false',
      confirmText: '确定'
    })
    this.formResetMemo()
    this.onLoad()
  },

  formResetMemo: function () {
    console.log('form发生了reset事件')
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const thisPage = this
    const db = wx.cloud.database()
    this.setData({
      date: util.formatDate(new Date()),
      time: util.formatTime(new Date())
    }),
    db.collection('users').where({
      _id: wx.getStorageSync('studentId')
    }).get({
      success: function(res) {
        thisPage.setData({
          publisher: res.data[0].name
        })
        if (res.data[0].position=="部员") {
          thisPage.setData({
            isShow: false,
            isHide: true
          })
        }
      }
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