Page({

  /**
   * 页面的初始数据
   */
  data: {
    longitude: 120.62,
    latitude: 27.8
  },
  bindcontroltap: function(e){
    console.log(e);
    switch(e.controlId){
      case 1: 
        this.movetoCenter();
        break;
      case 2:
        if(this.timer){
          wx.navigateBack({
            delta: 1  
            //如果栈里只有a b两个页面则1为返回b页面,
            //如果有a b c三个页面,则2为返回c页面
          })
        }else{
          //微信扫码API
          wx.scanCode({
            success: () => {
              wx.showLoading({
                title: '正在获取密码',
              })
              console.log('扫码成功');
              wx.request({
                url: 'https://www.easy-mock.com/mock/5acb94ede2e56a7daf0d9655/ofo/password',
                success: (res) => {
                  wx.hideLoading();
                  //扫码成功后跳转到另一个页面
                  wx.redirectTo({
                    url: '../scanResult/index?password=' + res.data.data.password + '&number='
                    + res.data.data.number,  //为了将获取到的data数据一起跳转到另一个页面,采用字符串拼接的方法
                    success: () => {
                      //页面成功跳转前弹出提示
                      wx.showToast({
                        title: '获取密码成功',
                        //停留时间
                        duration: 1000
                      })
                    }
                  })
                }
              })
            }
          })
        };
        break;
      case 3:
        wx.navigateTo({
          url: '../warn/index',
        });
        break;
      case 4:
        wx.navigateTo({
          url: '../my/index',
        })
        
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.timer = options.timer //获取到计时页面的timer

    // var self = this;
    //微信获取当前位置API
    wx.getLocation({
      //this指向改变 回调函数会拿到外面去
      //执行,就像setTimeout的this指向window
      // success: function(res) {
      //   self.setData({
      //     longitude: res.longitude,
      //     latitude: res.latitude
      //   })
      // },

      //使用箭头函数可以使this指向当前作用域
      success: (res) => {
        this.setData({
          longitude: res.longitude,
          latitude: res.latitude
        })
      }
    })

    //微信获取当前设备信息API
    wx.getSystemInfo({
      success: (res) => {
        this.setData({
          controls: [{
            id: 1,
            iconPath: "/images/location.png",
            position: {
              width: 50,
              height: 50,
              top: res.windowHeight - 80,
              left: 20
            },
            clickable: true
          },{
            id: 2,
            iconPath: "/images/use.png",
            position: {
              width: 90,
              height: 90,
              top: res.windowHeight - 100,
              left: res.windowWidth/2 - 45
            },
            clickable: true
          },{
            id: 3,
            iconPath: "/images/warn.png",
            position: {
              width: 50,
              height: 50,
              top: res.windowHeight - 80,
              left: res.windowWidth - 70              
            },
            clickable: true
          },{
            id: 4,
            iconPath: "/images/avatar.png",
            position: {
              width: 50,
              height: 50,
              top: res.windowHeight - 155,
              left: res.windowWidth - 70
            },
            clickable: true
          },{
            id: 5,
            iconPath: "/images/marker.png",
            position: {
              width: 30,
              height: 50,
              top: res.windowHeight/2 - 45,
              left: res.windowWidth/2 - 15
            },
          }]
        })
      },
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  movetoCenter: function () {
    //将map移动到当前定位点
    this.mapctx.moveToLocation();
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    //创建一个map的上下文,传入map所设置的id
    this.mapctx = wx.createMapContext("ofo-map");
    this.movetoCenter();
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