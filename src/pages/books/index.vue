<template>
  <div>
    <Card v-for="book in books" :key="book.id" :book="book" />
    <p class="text-footer" v-if="end">
      没有更多数据
    </p>
  </div> 
</template>

<script>
import { get } from '@/util';
import Card from '@/components/Card';

export default {
  components: {
    Card
  },
  data() {
    return {
      books: [],
      page: 0,
      end: false
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
    }
  }, 
  mounted() {
    this.getList(true);
  },
  onPullDownRefresh() {
    this.getList(true);
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