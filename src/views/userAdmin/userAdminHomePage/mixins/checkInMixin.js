import {deepClone, isCardID, isPhone} from '@/assets/js/public'

export default {
  data() {
    return {
      showReadCard: false,
      total: 0,
      getData: {},
      checkInOptions: {
        "loginUserID": "huileyou",
        "loginUserPass": "123",
        "operateUserID": "",
        "operateUserName": "",
        "pcName": "",
        "ht_bi_ID": "",//预订单号
        "endDate": "",//预离日期
        "name": "",//预订人姓名
        "idcard": "",//预订人身份证号
        "phone": "",//预订人手机号码
        "specialNeed": "",//特殊需求
        "roomInfoData": []
      },
      routerList: [],
      isActive: -1,
      childrenIndex: -1,
      routerLeftList: [],
    }
  },
  created() {
    if (sessionStorage.getItem('routerLeftList')) {
      this.routerLeftList = JSON.parse(sessionStorage.getItem('routerLeftList'));
    }
    this.routerList = this.$router.options.routes.filter(item => {
      if (item.name == 'Home') {
        return true;
      }
      return false;
    })[0].children;
    this.initRouter();
  },
  methods: {

    changeRouter(index) {
      if (this.isActive == index) {
        this.isActive = -1;
        return
      }
      this.isActive = index;
    },

    initRouter() {
      let arr = this.$route.path.split('/');
      for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < this.routerList.length; j++) {
          if ((arr[i].slice(0, 1).toUpperCase() + arr[i].slice(1)) == this.routerList[j].name) {
            this.routerNavIndex = j;
            break;
          }
        }
      }
      if (this.$route.meta.systemShow) {
        this.routerNavIndex = 5;
      }
      if (!this.routerLeftList.length) {
        this.routerLeftList = [this.routerList[this.routerNavIndex]];
      }
    },

    //选择header部分路由
    changeRouterNav(item, index) {
      this.routerLeftList = [item];
      this.routerNavIndex = index;
      this.$router.push({name: item.name});
      this.isActive = false;
      sessionStorage.setItem('routerLeftList', JSON.stringify(this.routerLeftList));
    },

    changeChildren(item, index) {
      console.log(item)
      this.childrenIndex = index;
      //预订入住弹窗
      if (item.path == 'yuDing' && item.name == 'CashierReserve') {
        this.initReservation();
        return
      }
      this.$router.push({name: item.name})

    },


    readCardVal(val) {
      this.getData.name = val.Name;
      this.getData.idcard = val.Id;
    },

    getOtherIdCardInfo(obj) {
      this.showReadCard = true;
      this.getData = obj;
    },

    //添加同来人

    addSameBearer(item, index) {
      item.otherPersonInfo.push({
        "name": "",//住户姓名
        "idcard": "",//身份证号
        "phone": "",//手机号码
      })
    },

    //取消添加同来人
    cancelSameBearer(item, ite, i) {
      item.otherPersonInfo = item.otherPersonInfo.filter((v, index) => {
        if (index == i) {
          return false;
        }
        return true;
      })
    },
    //入住
    checkIn(obj) {
      this.checkInObj = deepClone(obj);
      this.checkInOptions.roomInfoData = [];
      this.checkInOptions.ht_bi_ID = this.checkInObj.ht_bi_ID;
      this.checkInOptions.endDate = this.checkInObj.ht_bi_LeaveTime;
      this.checkInOptions.name = this.checkInObj.ht_bi_BookName;
      this.checkInOptions.idcard = this.checkInObj.ht_bi_CertNo;
      this.checkInOptions.phone = this.checkInObj.ht_bi_Telphone;

      for (let i = 0; i < this.checkInObj.bookRoomInfoList.length; i++) {
        this.checkInOptions.roomInfoData.push({
          "roomEntityID": this.checkInObj.bookRoomInfoList[i].ht_bri_EntityID,//房间实体编码
          "roomId": this.checkInObj.bookRoomInfoList[i].ht_bri_RoomID,
          "mainPersonInfo": {//住户信息
            "name": "",//住户姓名
            "idcard": "",//身份证号
            "phone": "",//手机号码
          },
          "otherPersonInfo": []
        })
      }

      this.checkInDialog = true;
    },

    //入住提交

    checkInConfirm() {
      if (!isCardID(this.checkInOptions.idcard)) {

        this.$notify({
          message: '预订人身份证号格式不正确',
          type: 'error'
        })

        return
      }

      if (!isPhone(this.checkInOptions.phone)) {

        this.$notify({
          message: '预订人手机号格式不正确',
          type: 'error'
        })

        return
      }

      for (let i = 0; i < this.checkInOptions.roomInfoData.length; i++) {
        //验证住户身份证号码
        if (!isCardID(this.checkInOptions.roomInfoData[i].mainPersonInfo.idcard)) {
          this.$notify({
            message: '房间' + this.checkInOptions.roomInfoData[i].roomId + '身份证号格式不正确',
            type: 'error'
          })
          return
        }
        //验证住户手机号码
        if (!isPhone(this.checkInOptions.roomInfoData[i].mainPersonInfo.phone)) {
          this.$notify({
            message: '房间' + this.checkInOptions.roomInfoData[i].roomId + '手机号格式不正确',
            type: 'error'
          })
          return
        }
        //验证同来人
        if (this.checkInOptions.roomInfoData[i].otherPersonInfo.length) {
          for (let j = 0; j < this.checkInOptions.roomInfoData[i].otherPersonInfo.length; j++) {
            if (!isCardID(this.checkInOptions.roomInfoData[i].otherPersonInfo[j].idcard)) {

              this.$notify({
                message: '房间' + this.checkInOptions.roomInfoData[i].roomId + '第' + (j + 1) + '个身份证号格式不正确',
                type: 'error'
              })
              return

            }
            if (!isPhone(this.checkInOptions.roomInfoData[i].otherPersonInfo[j].phone)) {
              this.$notify({
                message: '房间' + this.checkInOptions.roomInfoData[i].roomId + '第' + (j + 1) + '个手机号格式不正确',
                type: 'error'
              })
              return

            }
          }
        }
      }

      this.$store.dispatch('reserveCheckInConfirm', this.checkInOptions)
        .then(suc => {
          this.$notify({
            message: suc,
            type: 'success'
          })
          this.initReservation();
          this.checkInDialog = false;
        }, err => {
          this.$notify({
            message: err,
            type: 'error'
          })
          this.checkInDialog = false;
        })
    },


  },
  mounted() {
  }
}