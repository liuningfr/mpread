<template>
  <div class="container">
    <CommentList v-if="userinfo.openId" type="user" :comments="comments" />
    <div v-if="userinfo.openId">
      <div class="page-title">我的图书</div>
      <Card v-for="book in books" :key="book.id" :book="book" />
      <div v-if="books.length === 0">您还没有添加图书</div>
    </div>
  </div>
</template>

<script>
import { get, post, showModal } from '@/util';
import CommentList from '@/components/CommentList';
import Card from '@/components/Card';

export default {
  data() {
    return {
      comments: [],
      books: [],
      userinfo: {},
    };
  },
  components: {
    CommentList,
    Card
  },
  methods: {
    async getComments() {
      const comments = await get('/weapp/getcomments', { openid: this.userinfo.openId });
      this.comments = comments.list;
    },
    async getBooks() {
      const books = await get('/weapp/booklist', { openid: this.userinfo.openId });
      this.books = books.list;
    },
    init() {
      wx.showNavigationBarLoading();
      this.getComments();
      this.getBooks();
      wx.hideNavigationBarLoading();
    }
  },
  onPullDownRefresh() {
    this.init();
    wx.stopPullDownRefresh();
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