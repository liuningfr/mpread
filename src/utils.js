// 工具函数库
import config from './config';

export function get(url) {
  return new Promise((resolve, reject) => {
    wx.request({
      url: config.host + url,
      data: {},
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function(res){
        if (res.data.code === 0) {
          resolve(res.data.data);
        } else {
          reject(res.data);
        }
      },
      fail: function() {
        // fail
      },
      complete: function() {
        // complete
      }
    })
  });
};