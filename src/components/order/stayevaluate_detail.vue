<template>
    <!-- 评价订单 -->
    <div class='evaluate'>
        <div><span @click='Return'>&lt;</span></div>
        <p><span>评价有利《 </span> <marquee behavior="scroll" width='100%' height='37'
         direction="right"  scrolldelay="30" scrollamount="5" loop='-1'>评价灰常免役酱油大力丸吃</marquee></p>
         
        
        <ul class='evaluate_pin'>
            <li>
                <img src='../../../static/images/img_06.png' alt='' />
            </li>
            <li>
                <p>商品评分</p>
                <ol>
                    <li v-for='i in pingjia' :class='{"reds":i.type === getNum}' @click='getData(i.type)' :key='i.type'>{{ i.name }}</li>
                </ol>
            </li>
        </ul>
        <div class='txt'><textarea maxlength="200"></textarea> <i>最多200字</i></div>
        
        <div><button>发表评论</button></div>
    </div>
</template>

<script>
export default {
    data () {
        return {
            pingjia : [
                {
                    name: '不满意',
                    type: 0
                },
                {
                    name: '满意',
                    type: 1
                },
                {
                    name: '非常满意',
                    type: 2
                }
            ],
            getNum: 2
        }
    },
    methods: {
        Return () {
            this.$router.back()
        },
        getData (i) {
            this.getNum = i
        }
    }

}
</script>

<style lang="scss" scoped>
@function rem($px) {
  @return $px / 67.5 + rem;
}
.evaluate {
    width: 100%;
    div:first-child {
        width: 100%;
        height: rem(150);
        padding: rem(30);
        span {
            display: block;
            width: rem(100);
            height: rem(100);
            line-height: rem(105);
            text-align: center;
            font-size: rem(60);
            border-radius: 50%;
            border: 1px solid #ccc;
        }
    }
    > p {
        font-size: rem(45);
        width:100%;
        line-height: rem(150);
        display: flex;
        padding:0 rem(20);
        color: #666;
        span {
            display: block;
            width: 28%;
            color: red;
            font-family: '楷体';
        }
    }
    .evaluate_pin {
        width: 100%;
        height: rem(370);
        margin-top: rem(25);
        display: flex;
        padding: rem(20);
        font-size: rem(40);
        border-top: 1px solid #eee;
        background: #fff;
       > li:first-child {
            width: 30%;
            img {
                width: 100%;
            }

        }
       > li:last-child {
            width: 70%;
            padding-left: rem(20);
            p {
                width: 100%;
                margin-top: rem(20);
                padding-left: rem(30);
                font-size: rem(50);
                color: #999;
            }
            >ol {
                display: flex;
                 margin-top: rem(70);
                >li {
                    padding: rem(10) rem(20);
                    border-radius: rem(5);
                    font-size: rem(34);
                    border: 1px solid #ccc;
                    margin: 0 rem(20);
                    color: #666;
                }
                .reds {
                    border: 1px solid red;
                    color: red;
                }
            }
        }
    }
    .txt {
        width:100%;
        padding: 0;
        height: rem(400);
        font-size: rem(40);
        background: #f1f1f1;
        position: relative;
        textarea {
            width:100%;
            height: rem(400);
            resize: none;
            outline: none;
            padding: rem(30);
            font-size: rem(40);
            background: #f1f1f1;
            border: 0;
        }
        i {
            position: absolute;
            right:rem(20);
            bottom: rem(5);
            font-style: normal;
            font-size: rem(27);
            color: #999;
        }
    }
    > div {
        width: 100%;
        text-align:right;
        padding: rem(30);
        button {
            font-size: rem(40);
            padding: rem(10) rem(20);
            outline: none;
            border:0;
            border-radius: rem(10);
            background: red;
            color: #fff;
        }
    }
}

</style>
