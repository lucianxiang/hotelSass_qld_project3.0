<template>
  <div>
    <div class="container">
      <div class="dateChoice clearfix">
        <div class="clearfix" :class="{backActive:backIndex}" @click.stop="back"><i :class="{backActive:backIndex}"></i><span>往后10天</span>
        </div>
        <strong>03<span> 月</span> 12<span> 日</span></strong>
        <div class="roomState">房态</div>
        <strong>03<span> 月</span> 21<span> 日</span></strong>
        <div class="clearfix" :class="{aheadActive:aheadIndex}" @click.stop="goAhead"><i
          :class="{aheadActive:aheadIndex}"></i><span>往前10天</span></div>
      </div>
      <div class="content clearfix">
        <el-popover
          v-for="item,index in 10"
          placement="top-start"
          trigger="hover"
          :key="index"
        >
          <div class="roomStatePop">
            <div class="bookDetail">预订详情</div>
            <div class="bookDetailContent clearfix">
              <div class="bookLeft">
                <div class="circle"></div>
                <div class="line"></div>
              </div>
              <div class="bookRight">
                <div class="bookDate">2019-03-13</div>
                <div class="bookOrderNum">预定订单: 0</div>
                <div class="restRoomNum">剩余房量: 358</div>
                <div class="sigleBed">单床</div>
                <ul class="sigleBedContent clearfix">
                  <li v-for="item,index in 15" :key="index"><span>棋牌娱乐双床房: 10</span><span></span></li>
                </ul>
                <div class="doubleBed">双床</div>
                <ul class="doubleBedContent clearfix">
                  <li v-for="item,index in 1" :key="index"><span>棋牌娱乐双床房: 1</span><span></span></li>
                </ul>
                <div class="other">其他</div>
                <ul class="otherContent clearfix">
                  <li v-for="item,index in 2" :key="index"><span>棋牌娱乐双床房: 2</span><span></span></li>
                </ul>
              </div>
            </div>
          </div>
          <div slot="reference" class="detailBox clearfix">
            <div class="boxHead">12号</div>
            <div class="csale clearfix"><span>可售数</span><span>预定出租率</span></div>
            <div class="csaleNum clearfix"><strong>336<span>间</span></strong><strong>2.73<span>%</span></strong></div>
            <div class="now">当日在住 <span>115</span>间</div>
            <div class="reLeave">预离<span>105</span>间  |  预抵<span>0</span>间</div>
            <div class="remain">当日在住 <span>115</span>间</div>
            <div class="buttonDetail">详情</div>
          </div>
        </el-popover>

      </div>
    </div>
  </div>
</template>
<script>
  import {mapGetters} from 'vuex'

  export default {
    name: '',
    components: {},
    beforeRouteLeave(to, from, next) {
      next()
    },
    watch: {
      //监听路由
      '': 'route',
      //方法
      watchMethods() {
      },
    },
    conputed: Object.assign({}, mapGetters([])),
    data() {
      return {
        backIndex: false,
        aheadIndex: false,
      }
    },
    methods: {
      route(to, from) {
      },
      back() {
        this.backIndex = true;
      },
      goAhead() {
        this.aheadIndex = true;
      },
    },
    created() {

    },
    mounted() {

    },
  }
</script>
<style scoped>
  .container {
    text-align: center;
  }

  .dateChoice {
    margin: 0 auto;
    display: inline-block;
  }

  .dateChoice > strong {
    float: left;
    font-size: 20px;
    font-weight: 500;
    line-height: 30px;
  }

  .dateChoice > strong > span {
    font-weight: 400;
    font-size: 12px;
    line-height: 30px;
  }

  .dateChoice > div:nth-of-type(1),
  .dateChoice > div:nth-of-type(3) {
    float: left;
    color: #9e9e9e;
    background-color: #f1f1f1;
    height: 30px;
    line-height: 30px;
    font-size: 12px;
    border: 1px solid #d2d2d2;
  }

  .dateChoice > div:nth-of-type(1) {
    border-bottom-left-radius: 45px;
    border-top-left-radius: 45px;
    padding: 0 10px 0 10px;
    margin-right: 15px;
  }

  .dateChoice > div:nth-of-type(1).backActive {
    color: #008CFA;
  }

  .dateChoice > div:nth-of-type(3).aheadActive {
    color: #008CFA;
  }

  .dateChoice > div:nth-of-type(1) > i {
    display: block;
    height: 6px;
    width: 6px;
    border-left: 1px solid #848484;
    border-bottom: 1px solid #848484;
    float: left;
    transform: rotate(45deg);
    margin-top: 12px;
    margin-right: 10px;
  }

  .dateChoice > div:nth-of-type(1) > i.backActive {
    border-left: 1px solid #008CFA;
    border-bottom: 1px solid #008CFA;
  }

  .dateChoice > div:nth-of-type(3) > i.aheadActive {
    border-right: 1px solid #008CFA;
    border-bottom: 1px solid #008CFA;
  }

  .dateChoice > div:nth-of-type(3) {
    border-bottom-right-radius: 45px;
    border-top-right-radius: 45px;
    padding: 0 10px 0 10px;
    margin-left: 15px;
  }

  .dateChoice > div:nth-of-type(3) > i {
    display: block;
    height: 6px;
    width: 6px;
    border-right: 1px solid #848484;
    border-bottom: 1px solid #848484;
    float: right;
    transform: rotate(-45deg);
    margin-top: 12px;
    margin-left: 10px;
  }

  .roomState {
    float: left;
    font-size: 12px;
    border-bottom: 1px solid silver;
    padding-bottom: 5px;
    margin: 0 5px;
    color: #7f7f7f;
  }

  .content {
    width: 1300px;
    margin: 0 auto;
  }

  .detailBox {
    float: left;
    width: 240px;
    height: 310px;
    font-size: 14px;
    border: 1px solid #c9caca;
    border-radius: 10px;
    color: #333;
    margin: 10px;
    padding: 10px 20px;
  }

  .boxHead {
    border-bottom: 1px solid silver;
    line-height: 50px;
    font-size: 14px;
    color: #999;
    text-align: left;
  }

  .csale {
    line-height: 40px;
    font-size: 14px;
    color: #999;
  }

  csaleNum {
    line-height: 40px;
    font-size: 14px;
    color: #999;
  }

  .now {
    text-align: left;
    line-height: 30px;
    margin-top: 10px;
  }

  .buttonDetail {
    background-color: #108ee9;
    color: #fff;
    border-radius: 4px;
    width: 120px;
    height: 30px;
    line-height: 30px;
    text-align: center;
  }

  .remain {
    line-height: 30px;
    margin: 20px 20px 20px 0px;
    text-align: left;
  }

  .reLeave {
    text-align: left;
  }

  .now > span {
    color: #e30000;
    font-weight: 600;
  }

  .remain > span {
    color: #e30000;
    font-weight: 600;
  }

  .csaleNum > strong {
    font-weight: 600;
  }

  .csaleNum > strong > span {
    font-weight: 500;
  }

  .csaleNum > strong:nth-of-type(1) {
    float: left;
  }

  .csaleNum > strong:nth-of-type(2) {
    float: right;
  }

  .csale > span:nth-of-type(1) {
    float: left;
  }

  .csale > span:nth-of-type(2) {
    float: right;
  }

  .roomStatePop {
    width: 520px;
    min-height: 50px;
  }

  .bookDetail {
    border-bottom: 1px solid silver;
    height: 25px;
    width: 100%;
  }

  .bookDetailContent {
    position: relative;
  }

  .bookLeft {
    float: left;
    width: 40px;
    position: relative;
  }

  .circle {
    width: 10px;
    height: 10px;
    border-radius: 45px;
    border: 1px solid #008cfa;
    position: absolute;
    top: 13px;
    right: 5px;
  }

  .line {
    width: 1px;
    height: 350px;
    border-right: 1px solid #008cfa;
    position: absolute;
    top: 23px;
    right: 9px;
  }

  .bookRight {
    float: right;
    width: 480px;
    height: 100%;
    overflow: scroll;
    padding-bottom: 20px;
  }

  .bookDate {
    line-height: 40px;
  }

  .bookOrderNum {
    background-color: #008cfa;
    border-bottom-right-radius: 45px;
    border-top-right-radius: 45px;
    width: 150px;
    height: 30px;
    line-height: 30px;
    color: #ffffff;
    text-align: center;
    margin: 0px 0px 0px 10px;
  }

  .restRoomNum {
    background-color: #9fa0a0;
    border-bottom-right-radius: 45px;
    border-top-right-radius: 45px;
    width: 150px;
    height: 30px;
    line-height: 30px;
    color: #ffffff;
    text-align: center;
    margin: 20px 0px 0px 10px;
  }

  .sigleBed {
    color: #000;
    text-align: center;
  }

  .doubleBed {
    color: #000;
    text-align: center;
  }

  .other {
    color: #000;
    text-align: center;
  }

  .sigleBedContent {
    float: left;
    width: 100%;
  }

  .doubleBedContent {
    float: left;
    width: 100%;
  }

  .other {
    float: left;
    width: 100%;
  }

  .sigleBedContent > li {
    float: left;
    width: 50%;
    color: #909090;
  }


</style>
