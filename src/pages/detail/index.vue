<template>
  <div>{{id}}</div>
</template>

<script>
import { get } from '@/util';

export default {
  data () {
    return {
      id: ''
    }
  },
  methods: {
    async getDetail() {
      const info =  await get('/weapp/bookdetail', { id: this.id });
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