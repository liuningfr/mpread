<template>
  <div>
    <BookInfo :info="info" />
    <CommentList :comments="comments" />
    <div v-if="showAdd">
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
    <button class="btn" @click="addComment">
      评论
    </button>
    </div>
    <div v-else class="text-footer">
      未登陆或您已经评论过
    </div>
    <button open-type="share" class="btn">转发给好友</button>
  </div>
</template>

<script>
import { get, post, showModal } from '@/util';
import BookInfo from '@/components/BookInfo';
import CommentList from '@/components/CommentList';

export default {
  components: {
    BookInfo,
    CommentList
  },
  data () {
    return {
      id: '',
      info: {},
      location: '',
      phone: '',
      comment: '',
      userinfo: {},
      comments: [],
    }
  },
  computed: {
    showAdd() {
      if (!this.userinfo.openId) {
        return false;
      }
      if (this.comments.filter(item => item.openid === this.userinfo.openId).length > 0) {
        return false;
      }
      return true;
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
    },
    async addComment() {
      if (this.comment.length === 0) {
        return;
      }
      const data = {
        comment: this.comment,
        phone: this.phone,
        location: this.location,
        openid: this.userinfo.openId,
        bookid: this.id,
      };
      try {
        await post('/weapp/addcomment', data);
      } catch(e) {
        showModal('评论失败', e.msg);
      }
      this.comment = '';
      this.getComments();
    },
    async getComments() {
      const comments = await get('/weapp/getcomments', { bookid: this.id });
      this.comments = comments.list;
    }
  },
  onShareAppMessage(res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
    }
    return {
      title: '快来跟我一起读书',
      path: `/page/detail/main?id=${this.id}`
    }
  },
  mounted() {
    this.location = '';
    this.phone = '';
    this.id = this.$root.$mp.query.id;
    this.getDetail();
    this.getComments();
    const userinfo = wx.getStorageSync('userinfo');
    if (userinfo) {
      this.userinfo = userinfo;
    }
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