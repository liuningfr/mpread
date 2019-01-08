<template>
  <BookInfo :info="info" />
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
      info: {}
    }
  },
  methods: {
    async getDetail() {
      const info =  await get('/weapp/bookdetail', { id: this.id });
      this.info = info;
      wx.setNavigationBarTitle({
        title: info.title
      });
    }
  },
  mounted() {
    this.id = this.$root.$mp.query.id;
    this.getDetail();
  },
};
</script>

<style>

</style>