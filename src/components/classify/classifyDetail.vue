<template>
  <div class="classify">
      <header class="title">
          <span @click='Return'>〈</span>
          商品分类
      </header>
      <section class="classify_list">
            <div class="like">
             <section v-if='classifyData.length' class="rec-Sentiment_con">
                   <div>
                        <router-link to='/details/11'><img src="../../../static/images/img_25.png" alt=""></router-link>
                        <div>全场使用优惠券立减88元</div>
                        <p>清欢素雅小程序模板开课啦</p>
                        <div>
                            <span>￥299</span>
                            <i>已售 159</i>
                        </div>
                  </div>
                   <div>
                        <router-link to=''><img src="../../../static/images/img_25.png" alt=""></router-link>
                        <div>全场使用优惠券立减88元</div>
                        <p>清欢素雅小程序模板开课啦</p>
                        <div>
                            <span>￥299</span>
                            <i>已售 159</i>
                        </div>
                  </div>

                   <div>
                        <router-link to=''><img src="../../../static/images/img_25.png" alt=""></router-link>
                        <div>全场使用优惠券立减88元</div>
                        <p>清欢素雅小程序模板开课啦</p>
                        <div>
                            <span>￥299</span>
                            <i>已售 159</i>
                        </div>
                  </div>
                    <div>
                        <router-link to=''><img src="../../../static/images/img_25.png" alt=""></router-link>
                        <div>全场使用优惠券立减88元</div>
                        <p>清欢素雅小程序模板开课啦</p>
                        <div>
                            <span>￥299</span>
                            <i>已售 159</i>
                        </div>
                  </div>
              </section>
              <div v-else class="kong_di">
                  <p>还没有商品</p>
              </div>
        </div>
      </section>
  </div>
</template>

<script>
export default {
  data () {
    return {
      classifyData: ['az']
    }
  },
  mounted () {
    console.log(this.$route)
    // this.$http.get('').then(response => {
    //     console.log(response)
    // })
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
