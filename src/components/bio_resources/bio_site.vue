<template>
  <div class="bio_site">
        <!-- 地址 -->
        <header class='site_title'>
               <span @click="Return">&lt;</span>
           地址详情
        </header>
      <section class="site_list">
          <div class="site_con">
              <dl v-for='item in user_site' :key='item.id'>
                  <dt>
                      <span>
                          <i :class='{"default": item.isDefault }'></i>
                      </span>
                  </dt>
                  <dd>
                      <p><span>{{ item.linkMan }}</span><span>{{ item.mobile }}</span></p>
                      <i @click='revamp(item.id)'>删除</i>
                  </dd>
              </dl>
          </div>
      </section>
      <footer class="set_site">
          <div @click='setSite'>
              + 新增地址
          </div>
      </footer>
  </div>
</template>

<script>
import { getCookie } from '@/components/util/cookie.js'
export default {
  data () {
    return {
      token: getCookie('token'),
      user_site: []
    }
  },
  methods: {
    Return () {
      this.$router.back()
    },
    setSite () {
      this.$router.push('/newsite')
    },
    revamp (id) { // // 删除地址
      let params = new URLSearchParams()
      params.append('token', this.token)
      params.append('id', id)
      this.$http.post(global.data.api + '/user/shipping-address/delete', params).then(res => {
        let { data } = res
        if (data.code === 0) {
          alert('删除成功')
        }
        this.sitelist()
      })
    },
    sitelist () { // 地址列表
      let params = new URLSearchParams()
      params.append('token', this.token)
      this.$http.post(global.data.api + '/user/shipping-address/list', params).then(res => {
        let { data } = res
        console.log(data)
        if (data.code === 0) {
          this.user_site = data.data
          // this.$store.commit('setDizhi', data.data)
        } else if (data.code === 700) {
          this.user_site = []
        }
      })
    },
    isDefault () { // 点击默认选中
        // thi.post(global.data.api + '/user/shipping-address/add')
    }
  },
  mounted () {
    this.sitelist()
  }
}
</script>

<style>

</style>
