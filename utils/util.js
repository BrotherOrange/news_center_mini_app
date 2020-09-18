const formatTime1 = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatDate = date => {
  var date = new Date(date)
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()

  return year + ' 年 ' + month + ' 月 ' + day + ' 日'
}

const formatTime = date => {
  var date = new Date(date)
  const hour = date.getHours()
  const minute = date.getMinutes()

  return [hour].map(formatNumber) + ' : ' + [minute].map(formatNumber)
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

/**
 * 
 * {const locateNotices = department => {
  const db = wx.cloud.database()
  db.collection(department).get({
    success: function(res) {
      return res.data
    }
  })
}} department 
 */

const locateNotices = function(department) {
  const db = wx.cloud.database()
  db.collection(department).get({
    success: function(res) {
      return res.data
    }
  })
}

module.exports = {
  formatTime1: formatTime1,
  formatDate: formatDate,
  formatTime: formatTime,
  locateNotices: locateNotices
}
