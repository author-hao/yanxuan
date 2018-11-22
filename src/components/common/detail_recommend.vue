<template>
  <div id="recommend">
      <div v-html='status'>
          {{ status }}
      </div>
  </div>
</template>

<script>
export default {
  props: {
    status: String
  }
}
</script>

<style lang="scss" scoped>
@function rem($px) {
  @return $px / 67.5 + rem;
}

#recommend {
    width: 100%;
     box-sizing: border-box;

    padding: rem(20) 0;
}
#recommend div {
    width: 100%;
    padding: rem(13);

    img {
    max-width: 100%;
    padding-right: rem(13);
    height: auto;
}

}

</style>
