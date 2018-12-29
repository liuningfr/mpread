<template>
  <div class="book-card">
    <div class="thumb">
      <img :src="book.image" class="image" />
    </div>
    <div class="detial">
      <div class="row">
        <div class="left">
          {{book.title}}
        </div>
        <div class="right">
          {{book.rate}}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
   props: ['book'],
};
</script>

<style>
</style>