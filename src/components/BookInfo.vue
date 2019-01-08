<template>
<div class="bookinfo">
  <div class="thumb">
    <img class="background" :src="info.image" mode="aspectFill"/>
    <img class="img" :src="info.image" mode="aspectFit"/>
    <div class="info">
      <div class="title">
        {{info.title}}
      </div>
      <div class="author">
        {{info.author}}
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  props: ['info']
};
</script>

<style lang="scss">
.bookinfo {
  .thumb {
    width: 750rpx;
    height: 500rpx;
    position: relative;
    overflow: hidden;
    .background {
      filter: blur(15px);
      width: 100%;
    }
    .img {
    position: absolute;
    height: 300rpx;
    width: 100%;
    left: 0;
    top: 30rpx;
    }
    .info {
      color: #fff;
      position: absolute;
      width: 100%;
      left: 0;
      top: 330rpx;
      text-align: center;
      .title {
        font-size: 20px;
      }
      .author {
        font-size: 14px;
      }
    }
  }
}
</style>