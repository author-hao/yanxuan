<template>
  <div class="index">
      <section>
        <transition :name='transitionName'>
          <keep-alive>
            <router-view />
          </keep-alive>
        </transition>
      </section>

      <!-- 页尾 -->
      <Footer />
  </div>
</template>

<script>
import Footer from '@/components/common/footer'
export default {
  data () {
    return {
      transitionName: 'slide-right'
    }
  },
  components: {
    Footer
  },
  watch: {
  '$route' (to, from) {
    const toDepth = to.meta.num
    const fromDepth = from.meta.num
    
    this.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left'
  }
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
.slide-right-enter-active,
  .slide-right-leave-active,
  .slide-left-enter-active,
  .slide-left-leave-active {
    will-change: transform;
    transition: all 100ms;
    height: 100%;
    top: 0;
    position: absolute;
    backface-visibility: hidden;
    perspective: 1000;
  }

  .slide-right-enter {
    opacity: 0;
    transform: translate3d(-100%, 0, 0);
  }

  .slide-right-leave-active {
    opacity: 0;
    transform: translate3d(100%, 0, 0);
  }

  .slide-left-enter {
    opacity: 0;
    transform: translate3d(100%, 0, 0);
  }

  .slide-left-leave-active {
    opacity: 0;
    transform: translate3d(-100%, 0, 0);
  }

</style>
