<template>
<div class="progressbar">
  <progress :percent="percent" activeColor="#EA5A49" />
  <p>{{year}}已经过去了{{day}}天 {{percent}}%</p>
</div>
</template>

<script>
export default {
  methods: {
    isLeapYear() {
      const year  = new Date().getFullYear();
      if (year % 400 ===0) {
        return true;
      }
      if (year % 4 === 0 && year % 100 !== 0) {
        return true;
      }
      return false;
    },
    getDayOfYear() {
      return this.isLeapYear() ? 366 : 365;
    }
  },
  computed: {
    year() {
      return new Date().getFullYear();
    },
    day() {
      const start = new Date();
      start.setMonth(0);
      start.setDate(1);
      return (new Date().getTime() - start.getTime()) / 1000 / 60 / 60 / 24 + 1;
    },
    percent() {
      return ((this.day / this.getDayOfYear()) * 100).toFixed(1);
    }
  }
};
</script>

<style lang="scss">
.progressbar {
  text-align: center;
  margin-top: 10px;
  margin-bottom: 40px;
  progress {
    margin-bottom: 10px;
  }
}
</style>