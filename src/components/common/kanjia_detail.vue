<template>
	<!-- 砍价详情 -->
	<div class="kanjiaDetail">
		<header class="kanjia_title">
        	<span @click='Return'><i>&lt;</i></span>
    	</header>
    	<section class="kanjia_warpper" ref='kanjia_warpper'>
    		<div class="kanjia_con">
    			<dl class='kanjia_ge'>
    				<dt><img src="../../../static/images/img_04.png" alt=''></dt>
    				<dd>
    					<h3>我是你的小太阳</h3>
    					<p>我发现一件好货，快来帮我砍价</p>
    				</dd>
    			</dl>
    			<div class="kanjia_shangpin">
    				<dl>
    					<dt><img :src="myData.pic" alt=''></dt>
    					<dd>
    						<h2>{{ myData.name }}</h2>
    						<p><span>底价￥ {{ myData.kanjiaPrice }}</span> <s>原价￥ {{ myData.originalPrice }}</s></p>
    					</dd>
    				</dl>
    			</div>
    			<div class="kanjia_price">
    				<ul>
    					<li>当前{{ myData.originalPrice }}元，已砍{{ num }}元</li>
    					<li>
    						<button class='Btn1' v-if='!isUser' @click='upkanjia(myData.id)'>自己先砍一刀</button>
    						<button class='Btn2' v-if='isUser'>当前价购买</button>
    						<button class='Btn3'>邀请好友砍价</button>
    					</li>
    					<li>
    						<span>{{ time }}</span> :
    						<span>{{ time2 }}</span> :
    						<span>{{ time3 }}</span> 
    					</li>
    				</ul>
    				<p><span></span></p>
    			</div>
    			<div class="kanjia_haoyou">
    				<p><span>{{ helps.length }}</span>名好友帮砍</p>
    				<ul v-for='ii in helps' :key='ii.id'>
    					<li><img src='../../../static/images/img_04.png' alt=''/></li>
    					<li>
    						<h3>小苹果</h3>
    						<p>{{ ii.dateAdd }}</p>
    					</li>
    					<li><img src='../../../static/images/img_03.png' alt='' /> <span>砍掉{{ ii.cutPrice }}元</span></li>
    				</ul>
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
  			isUser: 0,
  			userList: [],
  			num: 0.00,
  			uid: '',
  			helps: [],
  			time: 72,
  			time2: '00',
  			time3: '00'
  		}
  	},
  	computed: {
  		myData () {
  			return this.$store.state.kanjiaId
  		}
  	},
  	methods: {
  		Return () {
  			this.$router.back()
  		},
  		MySwiper () {
    		this.scroll = new BScroll(this.$refs.kanjia_warpper, {
	          scrollY: true, // 纵向滚动
	          click: true,
	          probeType: 3 // 派发滚动事件
	    })
      },
      upkanjia (id) { // 自己先砍一刀
      	console.log(this.myData)
      	this.$http.post(global.data.api + '/shop/goods/kanjia/join',
          'kjid=' + id +
          '&token=' + this.$cookie.get('token')
        ).then(res => {
        console.log(res)
        let { data } = res
        if (data.code === 0) {
			this.isUser = data.data.helpNumber
			this.uid = data.data.uid
			this.num = (this.myData.originalPrice - data.data.curPrice).toFixed(2)
			this.kanjia_dao()
			let ti = 3 * 24 * 60 * 60
			setInterval (() => { // 砍价倒计时
				ti --
			  	let shi = parseInt(ti/60/60)
				let fen = parseInt(ti/60/24/3)
				let miao = parseInt(ti%60)
				shi < 10 ? '0' + shi : shi
				fen < 10 ? '0' + fen : fen
				miao < 10 ? '0' + miao : miao
				this.time = shi
				this.time2 = fen 
				this.time3 = miao
			}, 1000)
          }
         })
      },
      kanjia_dao () { // 获取砍价详情
      	this.$http.post(global.data.api + '/shop/goods/kanjia/info', 'kjid=' + this.myData.id + '&joiner=' + this.uid).then(res => {
      		console.log(res)
      		let { data } = res
      		if(data.code === 0) {
      			this.helps = data.data.helps
      		}
      	})
      }
  	},
  	mounted () {
  		console.log(this.myData)
  		let token = this.$cookie.get('token')
  		console.log(token)
  		this.$http.post(global.data.api + '/shop/goods/kanjia/my', 'token=' + token + '&kjid=' + this.myData.id ).then(res => {
  			let { data } = res
  			console.log(data)
  		})
  		this.$nextTick (() => {
  			this.MySwiper()
  		})
  	}
 }
</script>

<style >
	
</style>