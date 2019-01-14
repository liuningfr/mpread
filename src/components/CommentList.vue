<template>
  <div class="comment-list">
    <div class="page-title" v-if="comments.length">评论</div>
    <div class="comment" :key="comment.id" v-for="comment in comments">
      <div class="user">
        <div class="inline">
          <img :src="comment.user_info.avatarUrl" class="avatar" mode="aspectFit"/>
          {{comment.user_info.nickName}}
        </div>
        <div class="right">
          {{comment.location || '未知地点'}}
          <span class="text-primary">--</span>
          {{comment.phone || '未知型号'}}
        </div>
        <div class="content">
          {{comment.comment}}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['comments']
};
</script>

<style lang="scss">
.comment-list {
  background-color: #eee;
  font-size: 14px;
  .comment {
    background: #fff;
    margin-bottom: 10px;
    margin-top: 0;
    padding: 5px 20px;
    .content {
      margin: 10px 0;
    }
    .user {
      .inline {
        display: inline;
        .avatar {
        width: 20px;
        height: 20px;
        border-radius: 50%;
        vertical-align: middle;
      }
      }
    }
  }

}
</style>
