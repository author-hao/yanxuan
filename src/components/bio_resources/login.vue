<template>
    <!-- 登录 -->
    <div class="login">
        <h2><span @click="Return" >&lt;</span> 登录</h2>
        <div>
              <label for="">用户名：</label>
              <input type="text" v-model='user' placeholder="请输入手机号"><br>
              <label for="">密码：</label>
              <input type="password" v-model='pass' placeholder="请输入密码">
              <button @click='login_in'>登录</button>
        </div>
        <p><button @click='outRegister'>没有账号，注册</button></p>
    </div>
</template>

<script>
import { setCookie } from '@/components/util/cookie.js'
export default {
  data () {
    return {
      user: '',
      pass: ''
    }
  },
  methods: {
    login_in () { // 登录数据
      if (!this.pass && !this.user) {
        alert('请输入用户名和密码')
      } else {
          this.$http.post(global.data.api + '/user/m/login?deviceId=007&deviceName=monkey&mobile=' + this.user + '&pwd=' + this.pass).then(res => {
            let { data } = res
            console.log(data)
            var reg = /^1[3|4|5|7|8|9][0-9]{9}$/ // 手机号验证规则
            if (data.code === 0) {
            // console.log(data.data.token)
            this.$cookie.set('token', data.data.token, 30)
            setCookie('token', data.data.token, 30)
            setCookie('user', this.user)
             this.$router.push('/')
          } else if (!reg.test(this.user)) {
            alert('请输入正确手机号')
          } else {
            alert('密码错误')
          }
        })
      }
    },
    Return () { // 返回上一页
      alert('请登录')
      // this.$router.back()
    },
    outRegister () {
      console.log('aa')
      this.$router.push('/register') // 注册页面
    }
  }
}
</script>

<style lang="scss" scoped>
@function rem($px) {
  @return $px / 67.5 + rem;
}

  .login {
      width: 100%;
      height: 100%;
      padding: rem(40);
      h2 {
          width: 100%;
          text-align: center;
          line-height: rem(120);
          font-size: rem(50);
          position: relative;
          span {
              position: absolute;
              left: rem(20);
              top: rem(17);
              display: block;
              width: rem(80);
              height: rem(80);
              border-radius: 50%;
              border: 1px solid #ccc;
              line-height: rem(80);
              font-size: rem(60);
          }
      }
      div {
          margin-top: rem(250);
          font-size: rem(40);
          label {
              display: inline-block;
              margin-top: rem(50);
              width:rem(200);
          }
          input {
              width: 70%;
              height: rem(100);
              border: 1px solid #333;
              outline: none;
              padding-left: rem(30);
              border-radius: rem(10);
          }
          button {
              display: block;
              width: 70%;
              height: rem(110);
              margin: rem(50) auto;
              background: blue;
              color: #fff;
              border:0;
              outline: none;
              border-radius: rem(10);
          }
      }
      >p {
        width:100%;
        padding-top:rem(50);
        text-align:right;
        font-size:rem(40);
        button {
          padding: rem(10) rem(20);
          height:rem(110);
          color: red;
          border: 0;
          outline:none;
          background: #fff;
        }
      }
  }
</style>
