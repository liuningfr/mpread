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
  <div class="detail">
    <img class="avatar" :src="user_info.avatarUrl" mode="aspectFit" />
    {{user_info.nickName}}
    <div class="right text-primary">
      {{info.rate}}分
      <Rate :value="info.rate" />
    </div>
  </div>
  <div class="detail">
    {{info.publisher}}
    <div class="right">
      {{info.price}}
    </div>
  </div>
</div>
</template>

<script>
import Rate from '@/components/Rate';

export default {
  components: {
    Rate
  },
  props: ['info'],
  computed: {
    user_info() {
      return this.info.user_info || {};
    }
  }
};
</script>

<style lang="scss">
.bookinfo {
  font-size: 14px;
  .right {
    float: right;
  }
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
  .detail {
    padding: 5px 10px;
    .avatar {
      height: 20px;
      width: 20px;
      border-radius: 50%;
      vertical-align: middle;
    }
  }
}
</style>