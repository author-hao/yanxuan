<template>
  <div class="themeDetail">
      <header class="themeDetail_head">
          <span @click='Return'><i>&lt;</i></span>
          <p>主题专栏</p>
      </header>
      <section class="themeDetail_wapper" ref='themeDetail_wapper'>
          <div class="themeDetail_content">
              <h3>{{ themeData.title }}</h3>
              <p>{{ themeData.descript }}</p>
              <img :src="themeData.pic" alt="">
              <div v-html="themeData.content">
                  {{ themeData.content }}
              </div>
          </div>
      </section>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
export default {
  data () {
    return {
      themeData: {}
    }
  },
  mounted () {
    let { id } = this.$route.query
    this.$http.get(global.data.api + '/cms/news/detail?id=' + id).then(res => {
      let { data } = res
      // console.log(data)
      if (data.code === 0) {
        this.themeData = data.data
      }
    })
    this.$nextTick(() => {
      this.scrill = new BScroll(this.$refs.themeDetail_wapper, {
        click: true
      })
    })
  },
  methods: {
    Return () {
      this.$router.back()
    }
  }

}
</script>

<style>

</style>
