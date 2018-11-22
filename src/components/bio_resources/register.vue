<template>
  <!-- 登录 -->
  <div class='register'>
    <header class='register_title'>严选商城</header>
    <section class='register_warpper'>
      <div class='register_con'>
        <ul>
					<li><label for="">手机号：</label><input @blur='Mymobile' v-model='mobile' type="text" placeholder="请输入手机号" ></li>
					<li>
						<label for="">图形码：</label><input @blur='MyimgSrc' @focus='Mytuxing' v-model='imgS' type="text" placeholder='输入手机号获取图形'>
						<img @click='key_sui' v-show='iSmobile' :src="'https://api.it120.cc/small4/verification/pic/get?key='+key"/>
					</li>
					<li>
						<label for="">验证码：</label><input  @focus='Mytuxing' @blur='Mycode' v-model='code' type="text" placeholder='输入手机号获取验证码'>
						<button :disabled="!red" :class="{'red':red }" @click='timeOut'>{{ con }}</button>
					</li>
					<li><label for="">密码：</label><input @blur='Mypass' v-model='pwd' type="text" placeholder='密码6-18位数字或字母'></li>
				</ul>
				<div><span>{{ msg }}</span></div>
				<div><input type='checkbox' v-model='check'/> 我同意遵循大王的《协议》</div>
				<p><button :class='{"Btn":check}' @click='register_in'>注册</button></p>
				<p class='login_out'><span @click='loginOut'>已有账号，去登陆</span></p>
			</div>
    </section>
    </div>
</template>

<script>
export default {
  data () {
    return {
      msg: '', // 提示
      mobile: '', // 手机号
      iSmobile: 0, // 图形隐藏与显示
      pwd: '', // 密码
      code: '', // 短信验证码
      nick: new Date().getTime(), // 随机昵称
      key: Math.random(), // 图形随机数
      imgS: '', // 验证图形
      red: false, // 获取验证码按钮
      con: '获取验证码', //  获取验证码按钮的内容
      time: 60, // 时间秒
      check: false, // 协议
      timerUP: true, // 判断获取验证码的按钮
      yanma: false, // 信息
      pass: false // 密码
    }
  },
  methods: {
    register_in () { // 注册
      var reg = /^1[3|4|5|7|8|9][0-9]{9}$/ // 验证规则
      var pass = /^[a-zA-Z0-9]{6,18}$/ // 密码验证
      if (this.iSmobile === 0) {
        this.msg = '请正确填写手机号'
      } else if (this.yanma === false) {
        this.msg = '请正确填写短信验证码'
      } else if (this.imgS == '') {
        this.msg = '请正确填写图形码'
      } else if (this.pass === false) {
        this.msg = '请正确输入密码'
      } else if (this.check === false) {
        this.msg = '请勾选协议'
      } else {
        console.log('zhuce')
        let query = new URLSearchParams()
        query.append('mobile', this.mobile)
        query.append('pwd', this.pwd)
        query.append('code', this.code)
        query.append('nick', this.nick)
        this.$http.post(global.data.api + '/user/m/register', query).then(res => {
          let { data } = res
          if (data.code === 0) {
          		alert('注册成功')
          } else if (data.code === 10000) {
            this.msg = '用户名已存在'
          }
          console.log(data)
        })
      }
    },
    key_sui () { // 点击图形切换
      this.key = Math.random()
    },
    Mymobile () { // 验证手机号
      var reg = /^1[3|4|5|7|8|9][0-9]{9}$/ // 手机号验证规则
      if (!this.mobile) {
        this.msg = '手机号内容不能为空'
        this.iSmobile = 0
        this.red = false
      } else if (!reg.test(this.mobile)) {
        this.msg = '请输入正确手机号'
        this.iSmobile = 0
        this.red = false
      } else if (reg.test(this.mobile)) {
        this.msg = ''
        this.iSmobile = 1
        this.red = true
      } else {
        this.iSmobile = 0
        this.red = false
      }
    },
    Mytuxing () { // 确认手机是否输入
      var reg = /^1[3|4|5|7|8|9][0-9]{9}$/ // 手机号验证规则
      if (!this.mobile) {
        this.msg = '请先输入手机号'
      } else if (!reg.test(this.mobile)) {
        this.msg = '请输入正确手机号'
      }
    },
    MyimgSrc () { // 图形失去焦点验证
      if (!this.mobile) {
        this.msg = '请先输入手机号'
      } else if (!this.imgS) {
        this.msg = '内容不能为空'
      } else if (thsi.imgS != '') {
      	console.log('ok')
        this.msg = ''
      }
    },
    Mycode () { // 验证短信信息
      if (!this.mobile) {
        this.msg = '请先输入手机号'
      } else if (!this.code) {
        this.msg = '请输入验证码'
      } else if (this.code !== '') {
        console.log('yes')
        let query = new URLSearchParams()
        query.append('mobile', this.mobile)
        query.append('code', this.code)
        this.$http.post(global.data.api + '/verification/sms/check', query).then(res => {
          console.log(res.data)
          let { data } = res
          if (data.code === 0) {
              this.msg = ''
              this.yanma = true
          } else if (data.code === 10000) {
              this.msg = data.msg
          }
        })
      }
    },
    Mypass () { // 验证密码
      var reg = /^[a-zA-Z0-9]{6,18}$/ // 密码验证
      var user = /^1[3|4|5|7|8|9][0-9]{9}$/ // 手机号验证规则
      if (!this.pwd) {
        this.msg = '密码不能为空'
      } else if (this.pwd.length <= 5 || this.pwd.length > 18) {
        this.msg = '密码长度6-18位字母或数字组成'
      } else if (this.pwd !== '' && !reg.test(this.pwd)) {
        this.msg = '密码含有非法字符'
      } else if (reg.test(this.pwd)) {
        this.msg = ''
        this.pass = true
      }
    },
    timeOut () { // 获取验证码
      this.time = 60
      let clert = window.setInterval(() => {
        this.red = false
        this.timerUP = true
        this.time--
        this.time = parseInt(this.time % 60)
        this.con = this.time + 's后重新获取'
        if (this.time <= 0) {
          window.clearInterval(clert)
          this.con = '请重新获取'
          this.red = true
        }
      }, 1000)
       this.$http.post(global.data.api + '/verification/sms/get?mobile=' + this.mobile + '&key=' + this.key + '&picCode=' + this.imgS).then(res => {
        	console.log(res)
        })
    },
    // 返回登录
    loginOut () {
      this.$router.push('/login')
    }
  },
  watch: {

  }
}
</script>

<style lang="scss" scoped>
@function rem($px) {
  @return $px / 67.5 + rem;
}
.register {
	width: 100%;
	.register_title {
		width: 100%;
		font-size: rem(48);
		font-weight: 700;
		line-height: rem(150);
		text-align:center;
		color: #fff;
		background: red;
	}

	.register_warpper {
		width: 100%;
		.register_con {
			width: 100%;
			margin-top: rem(50);
			>ul {
				font-size:rem(50);
				padding:rem(40);
				li {
					display:flex;
					font-size:rem(40);
					margin-top: rem(30);
					padding: rem(10) 0;
					border-bottom: 1px solid #ccc;
					label {
						display:block;
						width: 19%;
						line-height:rem(120);
						color: #666;
					}
					input {
						height: rem(120);
						width: 70%;
						border: 0;
						outline: none;
					}
				}
				li:nth-child(2) {
					input {
						width: 44%;
					}
					img {
						width: rem(380);
						height: rem(120);
            border:1px solid #ccc;
					}
				}
				li:nth-child(3) {
					input {
						width: 50%;
					}
					button {
						height: rem(100);
						width: 30%;
						border-radius: rem(50);
						border: 0;
						background: #ccc;
						color: #fff;
						outline:none;
					}
					.red {
						background: red;
					}
				}
			}

			> div {
				width: 100%;
				height: rem(100);
				line-height:rem(100);
				padding: 0 rem(30);
				font-size: rem(40);
				span {
					color: red;
				}
			}

			> p {
				width:100%;
				text-align:center;
				margin-top: rem(50);
				button {
					width: 70%;
					font-size: rem(40);
					border: 0;
					outline: none;
					background: rgba(9,9,9, .8);
					border-radius: rem(10);
					color: #fff;
					height: rem(120);
				}
        .Btn {
          background: blue;
        }
			}
			.login_out {
				font-size: rem(40);
				color: red;
				padding: 0 rem(30);
				text-align:right;
			}
		}

	}
}
</style>
