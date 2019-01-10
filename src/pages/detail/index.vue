<template>
  <div>
    <BookInfo :info="info" />
    <div class="comment">
      <textarea
        v-model="comment"
        class="textarea"
        maxlength="100"
        placeholder="请输入您的评论"
      />
    </div>
    <div class="location">
      地理位置
      <switch color="#EA5A49" @change="getLocation" />
      <span class="text-primary">{{location}}</span>
    </div>
    <div class="phone">
      手机型号
      <switch color="#EA5A49" @change="getPhone" />
      <span class="text-primary">{{phone}}</span>
    </div>
  </div>
</template>

<script>
import { get } from '@/util';
import BookInfo from '@/components/BookInfo';

export default {
  components: {
    BookInfo,
  },
  data () {
    return {
      id: '',
      info: {},
      location: '',
      phone: ''
    }
  },
  methods: {
    async getDetail() {
      const info =  await get('/weapp/bookdetail', { id: this.id });
      this.info = info;
      wx.setNavigationBarTitle({
        title: info.title
      });
    },
    getLocation(e) {
      const ak = 't8xiL6WjQ5pvp7e5NSHfgcnfPyuaCKbD';
      const url = 'http://api.map.baidu.com/geocoder/v2/';
      const _this = this;
      if (e.target.value) {
        wx.getLocation({
          type: 'wgs84',
          success(res) {
            wx.request({
              url,
              data: {
                location: `${res.latitude},${res.longitude}`,
                output: 'json',
                ak,
              },
              method: 'GET',
              success: function(res){
                if (res.data.status === 0) {
                  _this.location = res.data.result.addressComponent.city;
                } else {
                  _this.location = '未知地点';
                }
              },
            })
          }
        });
      } else {
        this.location = '';
      }
    },
    getPhone(e) {
      if (e.target.value) {
        const phoneInfo = wx.getSystemInfoSync();
        this.phone = phoneInfo.model;
      } else {
        this.phone = '';
      }
    }
  },
  onShareAppMessage(res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: '快来跟我一起读书',
      path: `/page/detail/main?id=${this.id}`
    }
  },
  mounted() {
    this.id = this.$root.$mp.query.id;
    this.getDetail();
  },
};
</script>

<style lang="scss">
.comment {
  margin-top: 10px;
  .textarea {
    background: #eee;
    padding: 10rpx;
    width: 730rpx;
    height: 200rpx;
  }
}
.location {
  margin-top: 10px;
}
.phone {
  margin-top: 10px;
}
</style>