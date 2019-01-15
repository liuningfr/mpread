<template>
  <div class="container">
    <CommentList type="user" :comments="comments" />
  </div>
</template>

<script>
import { get, post, showModal } from '@/util';
import CommentList from '@/components/CommentList';

export default {
  data() {
    return {
      comments: [],
      userinfo: {},
    };
  },
  components: {
    CommentList
  },
  methods: {
    async getComments() {
      const comments = await get('/weapp/getcomments', { openid: this.userinfo.openId });
      this.comments = comments.list;
    },
    init() {
      wx.showNavigationBarLoading();
      this.getComments();
      wx.hideNavigationBarLoading();
    }
  },
  onShow() {
    if(!this.userinfo.openId) {
      const userinfo = wx.getStorageSync('userinfo');
      if (userinfo) {
        this.userinfo = userinfo;
        this.init();
      }
    }
  },
};
</script>
<style>
</style>