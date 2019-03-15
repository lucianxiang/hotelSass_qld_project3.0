<template>
  <div id="wrap">

    <div id="hearder">

      <div class="hearderTop">

        <img src="../../../assets/img/home/qldLogo.png" alt="">
        <div class="hearderTopOperation">
          <div class="businessDay">
            <span>{{userInfo.companyName}}</span>
          </div>
          <div class="adminInfo">
            <el-dropdown @command="selectOperation" :show-timeout="0">
              <span class="el-dropdown-link">
                <i></i>
                <span>{{userInfo.Nickname}}</span>
              </span>
              <el-dropdown-menu slot="dropdown" size="small">
                <el-dropdown-item
                  v-for="item,index in adminOperation"
                  :command="index"
                  :key="index"
                >{{item}}
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>

          <div class="messageInfo">

            <i></i>

          </div>

          <div class="businessDay">

            <span>营业日：{{date}}</span>

          </div>

        </div>

      </div>

      <ul class="headerNav clearfix">
        <li class="allType">
          <i></i>
          <span>所有分类</span>
        </li>
        <li v-for="item,index in routerList" v-if="!item.meta.systemShow">
          <a href="javascript:;"
             :class="{active: index == routerNavIndex}"
             @click="changeRouterNav(item,index)"
          >{{item.meta.title}}</a>
        </li>
      </ul>

    </div>

    <div class="clearfix wrapContent">
      <!--左导航-->
      <div id="leftNav" v-show="leftWrap">
        <el-scrollbar wrapClass="scrollbar-wrapper">
          <el-menu
            mode="vertical"
            :show-timeout="200"
            :default-active="$route.name"
            :collapse="isCollapse"
            class="el-menu-vertical-demo"
            background-color="#304156"
            text-color="#bfcbd9"
            active-text-color="#409EFF"
          >
            <sidebar-item :routes="routerLeftList"></sidebar-item>
          </el-menu>
        </el-scrollbar>
      </div>
      <!--右边内容-->
      <div id="rightContent">
        <div>
          <section>
            <div id="sectionWrap">
              <keep-alive>
                <router-view :key="key"></router-view>
              </keep-alive>
            </div>
          </section>

        </div>
      </div>
    </div>

    <audio src="http://hly.1000da.com.cn/audio/ordervoice.mp3" ref="messageAudio">
      您的浏览器不支持 audio 标签。
    </audio>

    <audio src="http://hly.1000da.com.cn/audio/roomstatechange.wav" ref="roomstatechange">
      您的浏览器不支持 audio 标签。
    </audio>
    <audio src="http://hly.1000da.com.cn/audio/bookdeal.mp3" ref="bookdealAudio">
      您的浏览器不支持 audio 标签。
    </audio>
    <!-- 密码 -->
    <el-dialog title="修改密码" :modal-append-to-body="false" :visible.sync="updatePasswordDialog"
               :close-on-click-modal="false"
               width="50%">
      <span>输入新密码: </span>
      <el-input v-model="newPassword" type="password" placeholder="输入新密码" style="width: 200px;"
                size="small"></el-input>
      <br>
      <br>
      <br>
      <span>确认密码: </span>
      <el-input v-model="repeatNewPassword" type="password" placeholder="输入新密码" style="width: 200px;"
                size="small"></el-input>
      <div slot="footer" class="dialog-footer">
        <el-button @click="updatePasswordDialog = false">取 消</el-button>
        <el-button type="primary" @click="updatePasswordSub">确 定</el-button>
      </div>
    </el-dialog>


    <ReadIdCard v-model="showReadCard" @readCardVal="readCardVal"></ReadIdCard>


  </div>
</template>
<script>
  import {mapGetters} from 'vuex'
  import {toZear2, getDateValue, getToday, deepClone, getDateName} from '@/assets/js/public'
  import ReadIdCard from '@/components/ReadIdCard'
  //入住
  import checkInMixin from './mixins/checkInMixin'
  import SidebarItem from './components/SidebarItem'

  export default {
    mixins: [
      checkInMixin,
    ],
    components: {
      ReadIdCard,
      SidebarItem
    },
    computed: Object.assign({
      key() {
        return this.$route.fullPath
      }
    }, mapGetters([])),
    data() {
      return {
        isCollapse: false,
        leftWrap: true,
        newPassword: '',
        repeatNewPassword: '',
        updatePasswordDialog: false,
        adminOperation: [
          '修改密码',
          '注 销'
        ],
        date: ''
      }
    },
    beforeRouteLeave(to, from, next) {
      this.isWebsocketclose = false;
      this.websocketclose();
      sessionStorage.removeItem('routerLeftList');
      next();
    },
    created() {
      let d = new Date();
      this.date = getDateName(d, '-')
      if (sessionStorage.getItem('userInfo')) {
        this.userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
      } else {
        this.$router.push({name: 'Login'})
      }
      let hotelID = sessionStorage.getItem('hotelID')
      if (hotelID) {
      }
      if (this.$route.name == 'UserHome') {
        this.leftWrap = false;
      } else {
        this.leftWrap = true;
      }
    },
    watch: {
      '$route'(to, from) {
        if (to.name == 'UserHome') {
          this.leftWrap = false;
        } else {
          this.leftWrap = true;
        }
//        if (to.name != 'CashierGuestRoom' && to.name != 'CashierOrder') {
//          this.initWebSocket()
//        }
//        console.log(to)
//        if( to.children ){
//          console.log(1)
//          this.routerObj = to;
//        }
      }
    },
    methods: {

      //修改密码
      updatePasswordSub() {

        if (!this.newPassword) {
          this.$notify({
            message: '请输入修改密码',
            type: 'error'
          })
          return
        }

        if (this.newPassword && (this.newPassword != this.repeatNewPassword)) {
          this.$notify({
            message: '两次密码不一致',
            type: 'error'
          })
          return
        }

        let options = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "Id": this.userInfo.Id,//
          "PassWord": this.newPassword,//新密码
        }
        this.isLoading = true;
        this.$store.dispatch('updateHotelStaffAdminPassword', options)
          .then(suc => {
            this.$notify({
              message: suc,
              type: 'success'
            })
            this.updatePasswordDialog = false;
            sessionStorage.removeItem('userInfo');
            setTimeout(() => {
              this.$router.push({name: 'Login'})
            }, 300)

          }, err => {
            this.$notify({
              message: err,
              type: 'error'
            })
            this.isLoading = false;
          })
      },

      //选择操作菜单
      selectOperation(val) {
        switch (val) {
          case 0:
            this.updatePasswordDialog = true;
            break;
          case 1:
            sessionStorage.removeItem('userInfo');
            this.$router.push({name: 'Login'})
            break;
        }
      },
//      常连接
      initWebSocket() { //初始化weosocket
        this.Newloading = this.$loading({
          lock: true,
          text: '正在连接服务器....',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
        const wsuri = "ws://140.143.87.152:6767/";
        this.websock = new WebSocket(wsuri);
        this.websock.onmessage = this.websocketonmessage;
        this.websock.onopen = this.websocketonopen;
        this.websock.onerror = this.websocketonerror;
        this.websock.onclose = this.websocketclose;
      },
      websocketonopen() { //连接建立之后执行send方法发送数据
        this.Newloading.close();
        let actions = {
          action: "Login",
          UserName: this.userInfo.serviceName,
          SystemName: '酒店SASS',
          DataType: this.userInfo.CompanyID
        };
        this.websocketsend(JSON.stringify(actions));
      },
      websocketonerror() {//连接建立失败重连
        this.initWebSocket();
      },
      websocketonmessage(e) { //数据接收
        let data = JSON.parse(e.data)
        if (Number(data.resultcode) == 200) {
          //登录成功
          console.log('链接服务器成功')
        } else {
          //接受数据
          if (data) {
            if (data.NotifyMessage) {
              let obj = JSON.parse(data.NotifyMessage)
              this.MessageType = Number(obj.msgType)
              console.log(obj);
              switch (Number(obj.msgType)) {
                case 2:
                  //订单
                  if (this.$refs.messageAudio) {
                    this.$refs.messageAudio.play()
                  }
                  break;
                case 3:
                  //房态
                  if (this.$refs.roomstatechange) {
                    this.$refs.roomstatechange.play()
                  }
                  break;
                case 11:
                  //有新的预订订单
                  if (this.$refs.bookdealAudio) {
                    this.$refs.bookdealAudio.play()
                  }
//                  this.$router.push({name:'CashierReserve'})
                  break;
              }
            }
          }
        }
      },
      websocketsend(Data) {//数据发送
        this.websock.send(Data);
      },
      websocketclose(e) {  //关闭
        console.log('断开连接', e);
        if (this.isWebSocket) {
          this.initWebSocket();
          this.isWebSocket = false
        } else {
          if (this.isWebsocketclose) {
            const loading = this.$loading({
              lock: true,
              text: '正在连接服务器',
              spinner: 'el-icon-loading',
              background: 'rgba(0, 0, 0, 0.7)'
            });
            setTimeout(() => {
              console.log('5秒')
              this.initWebSocket();
            }, 5000)
          }
        }
      },
    },
    mounted() {
      this.initWebSocket()
      this.$nextTick(() => {
        setInterval(() => {
          if (this.websock) {
            this.websocketsend('来了');
          }
        }, 60000)
      })
    }
  }
</script>
<style scoped>
  /*.el-menu-vertical-demo:not(.el-menu--collapse) {*/
    /*width: 200px;*/
    /*min-height: 400px;*/
  /*}*/
  .reserveInfo {
    margin-top: 20px;
  }

  .reserveInfo h1 {
    font: bold 16px/2 "微软雅黑";
    text-align: center;
  }

  .reserveInfo p {
    font: bold 16px/2 "微软雅黑";
    color: #007dff;
  }

  .reserveInfo > ul > li {
    border-bottom: 1px dashed #f0f0f0;
    padding: 20px 0;
  }

  .reserveInfo > ul > li > div {
    float: left;
    width: 33.333%;
    margin-top: 10px;
  }

  .reserveInfo span {
    display: inline-block;
    width: 120px;
    text-align: right;
    margin-right: 10px;
    font-size: 14px;
    font-family: "微软雅黑";
  }

  .reserveInfo > ul > li > .peopleInfo {
    width: 100%;
    margin-top: 20px;
    padding-left: 60px;
  }

  .reserveInfo > ul > li .addPeopleBtn {
    width: 100%;
    padding-left: 60px;
    margin-top: 20px;
  }

  .peopleInfo strong {
    color: #409EFF;
    display: block;
    font: 14px/2 "微软雅黑";
  }

  .peopleInfo li {
    margin-top: 20px;
  }

  .peopleInfo li > div {
    float: left;
  }

  .peopleInfo li > .cancelBtn {
    width: 100%;
    margin-bottom: 10px;
    text-align: right;
  }

  .peopleInfo div div {
    display: inline-block;
    width: 33.333%;
  }

  .menu-wrapper {
    width: 200px;
  }

  #wrap {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background-color: #eee;
  }

  section {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 1px;
  }

  #sectionWrap {
    width: 100%;
    height: 100%;
    background-color: #fff;
    padding: 10px;
    overflow: auto;
    position: relative;
  }

  .footerMessage {
    position: absolute;
    bottom: 0;
    right: 35px;
    height: 35px;
    font: 15px/35px "微软雅黑";
  }

  .footerMessage .messageBtn {
    float: right;
  }

  .footerMessage .messageBtn i {
    float: left;
    width: 28px;
    height: 28px;
    background: url("http://hly.1000da.com.cn/assets/hotelsasswaiterandcleaner_project/img/hotelBackstage/messageICon.png");
    -webkit-background-size: 100% 100%;
    background-size: 100% 100%;
    margin-top: 3px;
    margin-right: 8px;
  }

  .footerMessage .messageBtn span {
    float: left;
    font: 16px/27px "微软雅黑";
    background-color: #f91717;
    color: #fff;
    margin-top: -14px;
    margin-left: -10px;
    padding: 0 9px;
    -webkit-border-radius: 13px;
    -moz-border-radius: 13px;
    border-radius: 13px;
  }

  .footerMessage .messageBtn strong,
  .footerMessage .receptionAssistant strong {
    float: left;
    color: #000;
  }

  .footerMessage .receptionAssistant {
    float: right;
    margin-right: 20px;
  }

  .footerMessage .receptionAssistant i {
    float: left;
    width: 28px;
    height: 28px;
    background: url("http://hly.1000da.com.cn/assets/hotelsasswaiterandcleaner_project/img/hotelBackstage/phoneIcon.png");
    -webkit-background-size: 100% 100%;
    background-size: 100% 100%;
    margin-top: 5px;
    margin-right: 5px;
  }

  #receptionOperation {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0);
    z-index: 10;
    padding: 100px 0;
    overflow: auto;
    z-index: 1000;
  }

  .receptionOperationWrap {
    width: 1200px;
    margin: 0 auto;
    background-color: #fff;
    box-shadow: 0 0 20px #000;
    -webkit-border-radius: 10px;
    -moz-border-radius: 10px;
    border-radius: 10px;
    overflow: hidden;
  }

  .operTitle {
    height: 60px;
    background-color: #f6bc4c;
    position: relative;
  }

  .operTitle > strong {
    display: block;
    font: 20px/3 "微软雅黑";
    color: #fff;
    text-align: center;
  }

  .operTitle > i {
    position: absolute;
    right: 20px;
    top: 20px;
    width: 20px;
    height: 20px;
    background: url("http://hly.1000da.com.cn/assets/hotelsasswaiterandcleaner_project/img/HotelBackstage/closeCallIcon.png") no-repeat;
    -webkit-background-size: 100% 100%;
    background-size: 100% 100%;
    cursor: pointer;
  }

  .operWrap {
    padding: 20px 60px;
  }

  .operList > li {
    float: left;
    width: 33.3333%;
    background-color: #f5f5f5;
    border-right: 5px solid #fff;
    cursor: pointer;
  }

  .operList > li.active {
    background-color: #fff;
  }

  .operList > li > span {
    font: 14px/22px "微软雅黑";
    color: #c2c2c2;
    display: block;
    text-align: center;
  }

  .callWaiter > i {
    display: block;
    width: 42px;
    height: 48px;
    background: url("http://hly.1000da.com.cn/assets/hotelsasswaiterandcleaner_project/img/roomReservation/peopleW.png") no-repeat;
    margin: 8px auto 0;
  }

  .callWaiter.active > i {
    background: url("http://hly.1000da.com.cn/assets/hotelsasswaiterandcleaner_project/img/roomReservation/peopleC.png") no-repeat;
  }

  .callCleaner > i {
    display: block;
    width: 47px;
    height: 48px;
    background: url("http://hly.1000da.com.cn/assets/hotelsasswaiterandcleaner_project/img/roomReservation/saodiW.png") no-repeat;
    margin: 8px auto 0;
  }

  .callCleaner.active > i {
    background: url("http://hly.1000da.com.cn/assets/hotelsasswaiterandcleaner_project/img/roomReservation/saodiC.png") no-repeat;
  }

  .callParking > i {
    display: block;
    width: 48px;
    height: 38px;
    background: url("http://hly.1000da.com.cn/assets/hotelsasswaiterandcleaner_project/img/roomReservation/carW.png") no-repeat;
    margin: 18px auto 0;
  }

  .callParking.active > i {
    background: url("http://hly.1000da.com.cn/assets/hotelsasswaiterandcleaner_project/img/roomReservation/carC.png") no-repeat;
  }

  .callContent {
    margin-top: 20px;
    padding: 10px;
    border: 1px solid #666;
    -webkit-border-radius: 10px;
    -moz-border-radius: 10px;
    border-radius: 10px;
  }

  .callContent > textarea {
    width: 100%;
    height: 200px;
    border: none;
    font: 14px/20px "微软雅黑";
    color: #666;
  }

  .sendCallContent {
    margin-top: 20px;
  }

  .sendCallContent > a {
    width: 100px;
    font: 14px/3 "微软雅黑";
    text-align: center;
    background-color: #f6bc4c;
    float: right;
    color: #fff;
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    border-radius: 5px;
  }

  .roleBox {
    margin-top: 20px;
  }

  /*系统开始*/

  .systemWrap {
    position: fixed;
    top: 95px;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #fff;
    z-index: 20;
    overflow: auto;
  }

  .systemList {
    padding-top: 40px;
    width: 1250px;
    margin: 0 auto;
  }

  .systemList > li {
    float: left;
    margin: 10px;
    border: 1px solid #dcdddd;
    background: #efefef;
    height: 160px;
    text-align: center;
    cursor: pointer;
    font: 16px/30px "微软雅黑";
    color: #333;
    padding-top: 50px;
  }

  .systemList > li:hover {
    background: -webkit-gradient(linear, left top, left bottom, from(#2eb9f2), to(#008cfa));
    background: linear-gradient(#2eb9f2, #008cfa);
    color: #fff;
    border: none;
    -webkit-box-shadow: 0 0 10px 0 #5bd0ff;
    box-shadow: 0 0 10px 0 #5bd0ff;
  }

  .infrastructure,
  .shiftSetting,
  .invoiceMaintenance,
  .rentalGoods,
  .roomConditionSetting,
  .hotelHardware,
  .printSetup,
  .nightTrialSettings,
  .stockSettings {
    width: 160px;
  }

  .finance,
  .compensationForDamage,
  .priceSystem,
  .hotelServices,
  .businessSettings,
  .vipSettings {
    width: 334px;
  }

  .infrastructure i {
    background: url("../../../assets/img/system/basics.png") no-repeat;

  }

  .infrastructure:hover i {
    background: url("../../../assets/img/system/basics2.png") no-repeat;
  }

  .finance i {
    background: url("../../../assets/img/system/finance.png") no-repeat;
  }

  .finance:hover i {
    background: url("../../../assets/img/system/finance2.png") no-repeat;
  }

  .shiftSetting i {
    background: url("../../../assets/img/system/hand.png") no-repeat;
  }

  .shiftSetting:hover i {
    background: url("../../../assets/img/system/hand2.png") no-repeat;
  }

  .compensationForDamage i {
    background: url("../../../assets/img/system/compensate.png") no-repeat;
  }

  .compensationForDamage:hover i {
    background: url("../../../assets/img/system/compensate2.png") no-repeat;
  }

  .invoiceMaintenance i {
    background: url("../../../assets/img/system/invoice.png") no-repeat;
  }

  .invoiceMaintenance:hover i {
    background: url("../../../assets/img/system/invoice2.png") no-repeat;
  }

  .priceSystem i {
    background: url("../../../assets/img/system/price.png") no-repeat;
  }

  .priceSystem:hover i {
    background: url("../../../assets/img/system/price2.png") no-repeat;
  }

  .rentalGoods i {
    background: url("../../../assets/img/system/lease.png") no-repeat;
  }

  .rentalGoods:hover i {
    background: url("../../../assets/img/system/lease2.png") no-repeat;
  }

  .roomConditionSetting i {
    background: url("../../../assets/img/system/roomState.png") no-repeat;
  }

  .roomConditionSetting:hover i {
    background: url("../../../assets/img/system/roomState2.png") no-repeat;
  }

  .hotelServices i {
    background: url("../../../assets/img/system/serviceAdmin.png") no-repeat;
  }

  .hotelServices:hover i {
    background: url("../../../assets/img/system/serviceAdmin2.png") no-repeat;
  }

  .hotelHardware i {
    background: url("../../../assets/img/system/hardware.png") no-repeat;
  }

  .hotelHardware:hover i {
    background: url("../../../assets/img/system/hardware2.png") no-repeat;
  }

  .printSetup i {
    background: url("../../../assets/img/system/printing.png") no-repeat;
  }

  .printSetup:hover i {
    background: url("../../../assets/img/system/printing2.png") no-repeat;
  }

  .businessSettings i {
    background: url("../../../assets/img/system/data.png") no-repeat;
  }

  .businessSettings:hover i {
    background: url("../../../assets/img/system/data2.png") no-repeat;
  }

  .nightTrialSettings i {
    background: url("../../../assets/img/system/night.png") no-repeat;
  }

  .nightTrialSettings:hover i {
    background: url("../../../assets/img/system/night2.png") no-repeat;
  }

  .stockSettings i {
    background: url("../../../assets/img/system/stock.png") no-repeat;
  }

  .stockSettings:hover i {
    background: url("../../../assets/img/system/stock2.png") no-repeat;
  }

  .stockSettings i {
    background: url("../../../assets/img/system/stock.png") no-repeat;
  }

  .stockSettings:hover i {
    background: url("../../../assets/img/system/stock2.png") no-repeat;
  }

  .vipSettings i {
    background: url("../../../assets/img/system/vipPIcon.png") no-repeat;
  }

  .vipSettings:hover i {
    background: url("../../../assets/img/system/vipPIcon2.png") no-repeat;
  }

  .systemList i {
    display: block;
    width: 32px;
    height: 32px;
    -webkit-background-size: 100% 100%;
    background-size: 100% 100%;
    margin: 0 auto;
  }

  .systemList li:hover i {
    -webkit-background-size: 100% 100%;
    background-size: 100% 100%;
  }

  /*系统结束*/

</style>
