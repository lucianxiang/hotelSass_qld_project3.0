<template>
  <div>
    <!--识别身份证中弹窗-->

    <div class="distinguishIngWrap" v-if="showCancelTime">

      <div class="distinguishIng">

        <strong>身份证识别中...</strong>

        <span>{{cancelTime}}s未识别自动关闭</span>

        <div>

          <a href="javascript:;" @click.stop="closeTimerBtn">取消</a>

        </div>

      </div>

    </div>
  </div>
</template>
<script>
  import {mapGetters} from 'vuex'
  import {ReadCarId, CancelRead} from './js/CardReader'

  export default {
    computed: mapGetters([]),
    data() {
      return {
        showCancelTime: false,
        cancelTime: 30,
        cancelTimer: null,
      }
    },
    props: {
      value: {
        type: Boolean,
        defult: false,
      }
    },
    watch: {
      value(val) {
        this.showCancelTime = val;
        if( val ){
          this.closeCancelTimer();
          this.readIdCard();
        }
      },
      showCancelTime(val) {
        if (!val) {
          this.$emit('input', false);
        }
      }
    },
    methods: {

      //重置定时器

      closeCancelTimer() {
        this.showCancelTime = true;
        this.cancelTimer = setInterval(() => {
          if (this.cancelTime < 1) {
            clearInterval(this.cancelTimer);
            this.showCancelTime = false;
            this.$emit('input', false);
            CancelRead();
            this.cancelTime = 30;
          }
          this.cancelTime--;
        }, 1000)
      },

      //开始读卡

      readIdCard() {
        ReadCarId(30000, (data) => {
          if (Number(data.resultcode) == 200) {
            var data = data.data;
            clearInterval(this.cancelTimer);
            this.cancelTime = 30;
            this.showCancelTime = false;
            this.$emit('input', false);
            CancelRead();
            this.$emit('readCardVal', data)
          } else {
            this.$notify({
              message: data.resultcontent,
              type: 'error'
            })
            clearInterval(this.cancelTimer);
            this.cancelTime = 30;
            this.showCancelTime = false;
            this.$emit('input', false);
            CancelRead();
          }
        })
      },
      //取消
      closeTimerBtn() {
        clearInterval(this.cancelTimer);
        this.showCancelTime = false;
        CancelRead();
        this.cancelTime = 30;
      },
    },
  }
</script>
<style scoped>

  .distinguishIngWrap {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background-color: rgba(0, 0, 0, .3);
    z-index: 900000;
  }

  .distinguishIng {
    position: absolute;
    top: 50%;
    left: 50%;
    background-color: #fff;
    padding: 0 30px 10px;
    width: 300px;
    transform: translate(-150px, -50%);
  }

  .distinguishIng > strong {
    display: block;
    font: 16px/3 "微软雅黑";
    text-align: center;
    color: #3a8ee6;
  }

  .distinguishIng > span {
    display: block;
    font: 16px/2 "微软雅黑";
    text-align: center;
    color: red;
  }

  .distinguishIng > div {
    text-align: right;
    margin-top: 20px;
  }

  .distinguishIng a {
    display: inline-block;
    font: 16px/24px "微软雅黑";
    padding: 0 8px;
    background-color: #3a8ee6;
    color: #fff;
    -webkit-border-radius: 3px;
    -moz-border-radius: 3px;
    border-radius: 3px;
  }

</style>