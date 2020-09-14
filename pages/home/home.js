// pages/home/home.js
var util = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    studentId: "",
    department: [],
    notifications: [],
    position: "",
    isShow: false,
    id: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const db = wx.cloud.database()
    const thisPage = this
    this.setData({
      studentId: wx.getStorageSync('studentId'),
      department: wx.getStorageSync('department')
    })
    db.collection('users').where({
      _id: this.data.studentId
    }).get({
      success: function(res) {
        thisPage.setData({
          position: res.data[0].position
        })
      }
    })
    if (this.data.position!=="部员") {
      this.setData({
        isShow: true
      })
    }
    if (this.data.department[0]=="微博部") {
      db.collection('notices-wb').get({
        success: function(res) {
          thisPage.setData({
            notifications: res.data
          })
        }
      })
    }
    else if (this.data.department[0]=="通讯部") {
      db.collection('notices-tx').get({
        success: function(res) {
          thisPage.setData({
            notifications: res.data
          })
        }
      })
    }
    else if (this.data.department[0]=="技术部") {
      db.collection('notices-js').get({
        success: function(res) {
          thisPage.setData({
            notifications: res.data
          })
        }
      })
    }
    else if (this.data.department[0]=="办公室") {
      db.collection('notices-bgs').get({
        success: function(res) {
          thisPage.setData({
            notifications: res.data
          })
        }
      })
    }
    db.collection('users').where({
      _id: wx.getStorageSync('studentId')
    }).get({
      success: function(res) {
        if (res.data[0].position!=="部员") {
          thisPage.setData({
            isRead: true
          })
        }
      }
    })
  },

  showDetail: function (e) {
    this.setData({
      id: e.currentTarget.dataset.id
    })
  },

  hideDetail: function () {
    this.setData({
      id: ""
    })
  },

  deleteNoti: function (e) {
    const db = wx.cloud.database()
    const thisPage = this
    this.setData({
      id: e.currentTarget.dataset.id
    })
    if (this.data.department[0]=="微博部") {
      db.collection('notices-wb').doc(thisPage.data.id).remove()
    }
    else if (this.data.department[0]=="通讯部") {
      db.collection('notices-tx').doc(thisPage.data.id).remove()
    }
    else if (this.data.department[0]=="技术部") {
      db.collection('notices-js').doc(thisPage.data.id).remove()
    }
    else if (this.data.department[0]=="办公室") {
      db.collection('notices-bgs').doc(thisPage.data.id).remove()
    }
    this.onLoad()
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