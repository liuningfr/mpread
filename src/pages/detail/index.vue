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

<style>

</style>