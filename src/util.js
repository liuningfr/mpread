// 工具函数库
import config from './config';

export function get(url) {
  return request(url, 'GET');
};

export function post(url, data) {
  return request(url, 'POST', data);
};

function request(url, method, data) {
  return new Promise((resolve, reject) => {
    wx.request({
      url: config.host + url,
      data,
      method,
      success: function(res){
        if (res.data.code === 0) {
          resolve(res.data.data);
        } else {
          showModal('失败', res.data.data.msg)
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
}
export function showSuccess(text) {
  wx.showToast({
    title: text,
    icon: 'success'
  });
};

export function showModal(title, content) {
  wx.showModal({
    title,
    content,
    showCancel: false
  });
};