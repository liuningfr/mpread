<template>
  <div>
    <p>图书列表</p>
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
      const books = await get('/weapp/booklist');
      this.books = books.list;
    }
  },
  mounted() {
    this.getList();
  }
};
</script>
<style>
</style>