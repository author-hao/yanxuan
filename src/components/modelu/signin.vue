<template>
  <!-- 签到 -->
    <div class="signin">
        <header class="signin_title">
            <span @click='Return'>&lt;</span>
        </header>
        <section class="signin_content">
            <div class="signin_num">
                  <p>您的可用的积分</p>
                  <h3>21</h3>
            </div>
            <ul>
                <li :class="{'signed_in':show==i+1 }" v-for='(item, i) in data_count' :key='i+1'>
                    <span>+{{ item.score }}</span>
                    <p>{{ item.continuous }} 天</p>
                </li>
            </ul>

        </section>
        <div class="button">
            <input type="button" @click="getData" value="签到">
        </div>
    </div>
</template>

<script>
export default {
  data () {
    return {
      data_count: [],
      show: 1
    }
  },
  mounted () {
    this.$http.get(global.data.api + '/score/sign/rules').then(res => {
      let { data } = res
      if (data.code === 0) { // 获取积分规则
        if (data.data.length > 7) {
          data.data.length = 7
          this.data_count = data.data
        }
      } else {
        alert('错误操作')
      }
    })
    // 积分明细记录
    this.$http.post(global.data.api + '/score/sign/logs').then(res => {
      console.log(res)
    })
  },
  methods: {
    getData () {
      this.open()
      this.$http.post('').then(response => {
        let { data } = response
        console.log(data)
      })
    },
    open () {
      this.$alert('签到成功', {
        confirmButtonText: '确定'

      })
    },
    Return () {
      this.$router.back()
    }
  }
}
</script>

<style>

</style>
