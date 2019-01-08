<template>
  <div class="swiper">
    <swiper
    indicator-dots="true"
    indicator-color="#EA5A49"
    auto-play="true"
    interval="6000"
    duration="1000"
    circular="true"
    >
      <div :key="index" v-for="(top,index) in imgUrls">
        <swiper-item>
          <img
            @click="bookDetail(img)"
            class="slide-img"
            mode="aspectFit"
            :key="imgIndex"
            v-for="(img, imgIndex) in top"
            :src="img.image"
            alt=""
            />
        </swiper-item>
      </div>
    </swiper>
  </div>
</template>

<script>
export default {
  props: ['tops'],
  computed: {
    imgUrls() {
      const res = this.tops;
      return [res.slice(0,3), res.slice(3)];
    }
  },
  methods: {
    bookDetail(item) {
      wx.navigateTo({
        url: `/pages/detail/main?id=${item.id}`,
        success: function(res){
          // success
        },
        fail: function() {
          // fail
        },
        complete: function() {
          // complete
        }
      })
    }
  }
};
</script>

<style lang="scss">
.swiper {
  margin-top: 5px;
  .slide-img {
    width: 33%;
    height: 240rpx;
  }
}
</style>
