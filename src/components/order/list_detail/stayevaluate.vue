<template>
	<!-- 待评价 -->
  <div class='stayevaluate'>
     <section class='stayevaluate_warpper'>
			 	<div class='stayevaluate_con'>
					 		<!-- <div class='kong'>
								还没有商品，去购买吧
							</div> -->
							<div class='content'>
								<ul class='Nopay_pingjia'>
										<li><span>下单时间</span>
												<span>待评价</span>
										</li>
										<li>订单号：</li>
										<li>
												<div>
														<img src='../../../../static/images/img_06.png' alt='' />
														<img src='../../../../static/images/img_04.png' alt='' />
												</div>
										</li>
										<li class='last'>
												<span>合计：</span>
												<button @click='Stayevaluatedetail'>评价订单</button>
										</li>
								</ul>
								<ul class='Nopay_pingjia'>
										<li><span>下单时间</span>
												<span>待评价</span>
										</li>
										<li>订单号：</li>
										<li>
												<div>
														<img src='../../../../static/images/img_06.png' alt='' />
														<img src='../../../../static/images/img_04.png' alt='' />
												</div>
										</li>
										<li class='last'>
												<span>合计：</span>
												<button>评价订单</button>
										</li>
								</ul>
							</div>
				 </div>
		 </section>
  </div>
</template>

<script>
export default {
	data () {
		return {
			status: 3
		}
	},
	methods: {
		pingjia () { // 评价
			this.$http.post(global.data.api + 'order/reputation').then(res => {
				console.log(res)
			})
		},
		Stayevaluatedetail () {
			this.$router.push('/stayevaluatedetail')
		}
	},
	mounted () { // 待评价列表
		let token = this.$cookie.get('token')
        let query = new URLSearchParams()
        console.log(token)
        query.append('token', token)
        query.append('status', this.status)
        this.$http.post(global.data.api + '/order/list', query ).then(res => {
          let { data } = res
          console.log(data)
        })
	}
}
</script>

<style lang="scss" scoped>
@function rem($px) {
  @return $px / 67.5 + rem;
}
.stayevaluate {
	width: 100%;
	.stayevaluate_warpper {
			.stayevaluate_con {
				>.kong {
					width:100%;
					line-height: rem(500);
					font-size:rem(40);
					text-align:center;
					color: #999;
				}
				.content {
					width: 100%;
					.Nopay_pingjia {
					width:100%;
					padding-top: rem(25);
					background: #f5f5f5;
					> li {
						font-size:rem(27);
						color: #000;
						padding: 0 rem(44);
						background:#fff;
						border-top:1px solid #f3f3f3;
					}
					li:first-child, li:nth-child(2) {
						height:rem(100);
						line-height:rem(100);
						display: flex;
						justify-content: space-between;
						> span:last-child {
							float:right;
							color: #ba1324;
						}
					}
					li:nth-child(3) {
						height:rem(245);
						padding-top:rem(25);
						> div {
							width:100%;
							display:flex;
							img {
								display:block;
								width:rem(171);
								height:rem(171);
								margin-right:rem(25);
							}
						}
					}
					> li.last {
						width:100%;
						font-size:rem(34);
						line-height: rem(150);
						display: flex;
						justify-content: space-between;
						> span {
							font-size:rem(36);
							padding-top:rem(20);
							display:block;
						}
							> button {
								margin-top:rem(50);
								width: rem(238);
								height:rem(84);
								border:1px solid #c8c8c8;
								border-radius: rem(10);
								color: #9d9d9d;
								background:#fff;
								outline: none;
						}
					}
				}
				}
			}
	}
}
</style>
