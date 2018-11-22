<template>
    <!-- 首页 精选主题 -->
    <div class="theme">
         <h3><span @click='Return'><i>&lt;</i></span> 严选专栏</h3>
      <section class="theme_con" ref='theme_con'>
           <div class="theme_list">
              <div class="theme_list_con" ref='theme_list_con'>
                  <ul class="list_con">
                  <li>
                      <router-link to=''><img src="../../../static/images/img_04.png" alt=""><span>严选推荐</span></router-link>
                  </li>
                   <li>
                      <router-link to=''><img src="../../../static/images/img_04.png" alt=""><span>严选推荐</span></router-link>
                  </li>
                   <li>
                      <router-link to=''><img src="../../../static/images/img_04.png" alt=""><span>严选推荐</span></router-link>
                  </li>
                   <li>
                      <router-link to=''><img src="../../../static/images/img_04.png" alt=""><span>严选推荐</span></router-link>
                  </li>
                  <li>
                      <router-link to=''><img src="../../../static/images/img_04.png" alt=""><span>严选推荐</span></router-link>
                  </li>
              </ul>
              </div>
            <div class="list_tese">
                <ol>
                    <li v-for='item in themeData' :key='item.id'>
                        <img v-lazy="item.pic" alt="">
                        <router-link :to='{path:"/themeDetail", query: { id: item.id}}'>
                            <h4>{{ item.title }}</h4>
                            <p>{{ item.descript }}</p>
                            <span>查看详情</span>
                        </router-link>
                    </li>
                </ol>
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
      themeData: []
    }
  },
  methods: {
    Return () {
      this.$router.back()
    }
  },
  mounted () {
    this.$http.get(global.data.api + '/cms/news/list').then(res => {
      let {data} = res
      if (data.code === 0) {
        // console.log(data.data)
        this.themeData = data.data
      }
    })
    this.$nextTick(() => {
      this.scroll = new BScroll(this.$refs.theme_con, {
        scrollY: true, // 纵向滚动
        click: true
      })
    })
    this.$nextTick(() => {
      this.scroll = new BScroll(this.$refs.theme_list_con, {
        scrollY: false,
        scrollX: true, // 纵向滚动
        click: true
      })
    })
  }
}
</script>

<style>

</style>
