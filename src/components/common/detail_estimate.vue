<template>
  <div class="estimate">
      <p>还没有评价</p>
  </div>
</template>

<script>
export default {
  mounted () {
    this.$http.post(global.data.api + 'shop/goods/reputation', 'goodsId' + this.goodsId).then(res => {
      console.log(res)
    })
  }
}
</script>

<style lang="scss" scoped>
@function rem($px) {
  @return $px / 67.5 + rem;
}
  .estimate {
      width: 100%;

  }
 .estimate p {
          width: 100%;
          height: rem(1000);
          line-height: rem(300);
          font-size: rem(40);
          text-align: center;
      }
</style>
