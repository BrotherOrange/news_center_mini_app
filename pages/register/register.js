// pages/register/register.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  formSubmit: function (e) {
    const db = wx.cloud.database()
    const form = e.detail.value
    const idGot = form.input2
    // var isExist = 1 // 全局变量
    // isExist: 学号是否已注册

    /**
     * res.data.length=0: 学号未被注册
     * res.data.length!=0: 学号已被注册
     */
    db.collection('users').where({
      _id: idGot
    }).get({
      success: function(res) {
        console.log(res.data.length)
        /**
         * 这里想把res.data.length的值赋给isExist
         * 但isExist是全局变量
         * 目前没想到办法改变isExist的值
         */
      }
    })

    // console.log(isExist)

    // 判断注册表是否完成
    if (!(form.input1&&form.input2&&form.input3&&form.input4&&form.checkbox)) {
      wx.showModal({
        title: '错误',
        content: '请完成注册表',
        showCancel: false,
        confirmText: "确认"
    })}
    // 判断两次密码是否相同
    else if (form.input3!==form.input4) {
      wx.showModal({
        title: '错误',
        content: '两次输入密码不相同',
        showCancel: false,
        confirmText: "确认"
    })}
    /**
     * 判断学号已注册
     * 因为isExist尚不能修改
     * 先取消学号是否已注册的判断
     */
    // else if (isExist) {
    //   wx.showModal({
    //     title: '错误',
    //     content: '该学生证号已被注册',
    //     showCancel: false,
    //     confirmText: "确认"
    // })}
    else {
      db.collection('users').add({
        /**
         * 更新数据库中的'users'集合
         * 向集合中添加一个新用户的信息
         */
        data:{
          _id: form.input2,
          name: form.input1,
          password: form.input4,
          department: form.checkbox,
          position: '部员' // 部员没有发布通知的权限
      }
    })
    }
  },

  formReset: function () {
    console.log('form发生了reset事件')
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