<template>
  <div class="index">
      <section>
            <router-view />
      </section>

      <!-- 页尾 -->
      <Footer />
  </div>
</template>

<script>
import Footer from '@/components/common/footer'
export default {
  components: {
    Footer
  }
}
</script>

<style lang="scss" scoped>

html, body, .index {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
}
.index section {
    width: 100%;
    flex: 1;
    overflow: auto;
}
</style>
