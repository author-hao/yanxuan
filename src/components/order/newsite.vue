<template>
  <div class="newsite">
      <header class="site_title">
          <span @click='Return'><img src="../../../static/images/lefttou.svg" alt=""></span>
          新增地址
      </header>
      <section class="site_con">
          <ul>
              <li>
                  <label for="">联系人</label><input type="text" v-model='linkMan' placeholder="姓名">
              </li>
              <li>
                  <label for="">手机号</label><input type="text" v-model='mobile' placeholder="11位手机号">
              </li>
              <li>
                  <label>选择地区</label>
                  <select @change='sheng' v-model='province'>
                      <option value="">请选择</option>
                      <option v-for='item in shengfen' :key='item.id' :value="item">{{item.name}}</option>
                  </select>
                  <select @change='Citys' v-model='cityS'>
                      <option value="">请选择</option>
                      <option v-for='item in city' :value="item" :key='item.id'>{{ item.name }}</option>
                  </select>
                  <select v-model='region'>
                      <option value="">请选择</option>
                      <option v-for='item in quxian' :key='item.id' :value="item">{{ item.name }}</option>
                  </select>
              </li>
              <li>
                  <label for="">详细地址</label><input type="text" v-model='address' placeholder="街道门牌信息">
              </li>
              <li>
                  <label for="">邮政编码</label><input type="text" v-model='code' >
              </li>
          </ul>
          <div class="buttonBtn">
              <button @click='setSite'>保存</button>
              <button>取消</button>
          </div>
      </section>
  </div>
</template>

<script>
import { getCookie } from '@/components/util/cookie.js'
export default {
  data () {
    return {
      shengfen: [], // 省份列表
      city: [], // 城市列表
      quxian: [], // 区县列表
      address: '', // 详细地址
      code: '', // 邮编
      linkMan: '', // 联系人
      mobile: '', // 手机号码
      token: getCookie('token'), // 登录接口返回的token
      province: '', // 省份
      cityS: '', // 城市
      region: '', // 区县
      isDefault: true // 设置为默认地址
    }
  },
  mounted () {
    this.getShengfen()
  },

  methods: {
    Return () { // 返回上一页
      this.$router.back()
    },
    getShengfen () {
      this.$http.post('https://api.it120.cc/common/region/province').then(res => {
        let { data } = res
        if (data.code === 0) {
          this.shengfen = data.data
        } else {
          alert('出错了')
        }
      })
    },
    sheng () {
      let id = this.province.id
      this.cityS = ''
      this.region = ''
      this.$http.post('https://api.it120.cc/common/region/child', 'pid=' + id).then(res => {
        let { data } = res
        if (data.code === 0) {
          this.city = data.data
        }
      })
    },
    Citys () {
      let id = this.cityS.id
      this.$http.post('https://api.it120.cc/common/region/child', 'pid=' + id).then(res => {
        let { data } = res
        if (data.code === 0) {
          this.quxian = data.data
        }
      })
    },
    setSite () {
      if (!this.address & !this.code & !this.cityS & !this.linkMan) {
        alert('请完善资料')
      } else {
        let params = new URLSearchParams() // query 请求方式
        params.append('address', this.address)
        params.append('cityId', this.cityS.id)
        params.append('code', this.code)
        params.append('linkMan', this.linkMan)
        params.append('mobile', this.mobile)
        params.append('provinceId', this.province.id)
        params.append('token', this.token)
        params.append('districtId', this.region.id)
        params.append('isDefault', this.isDefault)
        this.$http.post(global.data.api + '/user/shipping-address/add', params).then(res => {
          let { data } = res
          if (data.code === 0) {
            this.$store.commit('setDizhi', data.data)
            this.$router.back()
          } else {
            alert('请完善资料啊')
          }
        })
      }
    }
  }
}
</script>

<style>

</style>
