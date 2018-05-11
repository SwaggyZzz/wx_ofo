// pages/billing/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    number: 123456,
    hours: 0,
    minutes: 0,
    seconds: 0,
    actionText: '正在计费',
    clickBtn: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      number: options.number
    });
    let h = 0, m = 0, s = 0;
    this.timer = setInterval(() => {
      this.setData({
        seconds: s++
      })
      if(s == 60){
        s = 0;
        m++;
        setTimeout(() => {
          this.setData({
            minutes: m
          })
        },1000)
        if(m == 60){
          m = 0;
          h++;
          setTimeout(() => {
            this.setData({
              hours: h
            })
          },1000)
        }
      }
    },1000)
  },

  endride: function(){
    clearInterval(this.timer);
    this.timer = '';
    this.setData({
      actionText: '本次骑行时间',
      clickBtn: true
    })
  },

  movetoindex: function(){
    if(this.timer == ''){

      //在小程序中所有页面的路由全部由框架进行管理。
      //框架以栈的形式维护了当前所有页面

      //wx.redirectTo 相当于使老页面出栈,新页面入栈,老页面就被销毁了,
      //栈里只有一个新页面

      //wx.navigateTo 相当于新页面入栈,老页面仍在栈底运行,栈里同时拥有
      //新页面和老页面两个页面,在新页面点击返回老页面,就使新页面出栈,被销毁,
      //栈里只有老页面一个页面
      wx.redirectTo({
        url: '../index/index',
      })
    }else{
      wx.navigateTo({
        url: '../index/index?timer=' + this.timer, //将timer拼接到url上从而传送到index页面中
      })
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