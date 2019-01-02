<template>
  <div>
    <Card v-for="book in books" :key="book.id" :book="book" />
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
      books: []
    };
  },
  methods: {
    async getList() {
      wx.showNavigationBarLoading();
      const books = await get('/weapp/booklist');
      this.books = books.list;
      wx.stopPullDownRefresh();
      wx.hideNavigationBarLoading();
    }
  },
  mounted() {
    this.getList();
  },
  onPullDownRefresh() {
    this.getList();
  }
};
</script>
<style>
</style>