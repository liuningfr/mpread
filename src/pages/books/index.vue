<template>
  <div>
    <TopSwiper :tops="tops" />
    <Card v-for="book in books" :key="book.id" :book="book" />
    <p class="text-footer" v-if="end">
      没有更多数据
    </p>
  </div> 
</template>

<script>
import { get } from '@/util';
import Card from '@/components/Card';
import TopSwiper from '@/components/TopSwiper';

export default {
  components: {
    Card,
    TopSwiper
  },
  data() {
    return {
      books: [],
      page: 0,
      end: false,
      tops: []
    };
  },
  methods: {
    async getList(init) {
      if (init) {
        this.page = 0;
        this.end = false;
      }
      wx.showNavigationBarLoading();
      const books = await get('/weapp/booklist', { page: this.page });
      if (books.list.length < 10 && this.page > 0) {
        this.end = true;
      }
      if (init) {
        this.books = books.list;
        wx.stopPullDownRefresh();
      } else {
        this.books = [...this.books, ...books.list];
      }
      wx.hideNavigationBarLoading();
    },
    async getTop() {
      const tops =  await get('/weapp/top');
      this.tops = tops.list;
    }
  }, 
  mounted() {
    this.getList(true);
    this.getTop();
  },
  onPullDownRefresh() {
    this.getList(true);
    this.getTop();
  },
  onReachBottom() {
    if (this.end) {
      return;
    }
    this.page = this.page + 1;
    this.getList();
  }
};
</script>
<style>
</style>