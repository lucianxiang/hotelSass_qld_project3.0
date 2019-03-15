import {isCardID, isPhone} from '@/assets/js/public'

export default {
  data() {
    return {
      guestFromDialog: false,
      guestTypeList: [
        '会 员',
        '合作企业',
        '散 客'
      ],
      guestTypeIndex: 0,
      vipNum: '',
      cooperativeEnterpriseName: '',//合作企业名称
      vipTotal: 0,
      vipGuestData: [],
      cooperativeTotal: 0,
      cooperativeGuestData: [],
      guestName: '',

    }
  },
  created() {
  },
  methods: {
    //选择客源类型
    changeGuestType(index) {
      this.guestTypeIndex = index;

      if (index == 0) {
        this.clickChangeGuest();
      }

      if (index == 1) {
        this.searchCooperative();
      }

      if (index == 2) {
        this.updateObj.ht_bi_MemberType = 0;
        this.updateObj.ht_bi_CustomerType = 0;
        this.addOptions.data.ht_bi_MemberType = 0;
        this.addOptions.data.ht_bi_CustomerType = 0;
        this.guestFromDialog = false;
        this.guestName = '';
        //查询房型可订数
        this.initRoomTypeOrdered()

      }

    },

    //出现客源弹窗

    clickChangeGuest(num) {

      this.guestFromDialog = true;

      this.guestTypeIndex = 0;

      let options = {
        "loginUserID": "huileyou",
        "loginUserPass": "123",
        "operateUserID": "",
        "operateUserName": "",
        "pcName": "",
        "ht_mi_ID": "",//
        "ht_mi_HotelID": this.hotelID,//酒店编码会员ID
        "ht_mi_CardTypeID": "",//卡类型编码
        "ht_mi_CardNo": this.vipNum,//卡号
        "ht_mi_Name": "",//姓名
        "ht_mi_Birthday": "",//生日
        "ht_mi_Tel": "",//手机号
        "ht_mi_MakerID": "",//办理员编码
        "ht_mi_CardState": "",//卡状态
        "ht_mi_CertNo": "",//证件号
        "ht_mi_CreateFrom": "",//发卡日期从
        "ht_mi_CreateTo": "",//发卡日期到
        "page": num ? num : 1,
        "rows": 10,
      };
      this.$store.dispatch('initAdminMenberVipAction', options)
        .then(data => {
          this.vipTotal = Number(data.totalrows);
          this.vipGuestData = data.data;
        }, err => {
          this.$notify({
            message: err,
            type: 'error'
          })
        })
        .catch(err => {
          this.$notify({
            message: err,
            type: 'error'
          })
        })

    },

    //会员分页

    changeVipPage(num) {
      this.clickChangeGuest(num)
    },

    //会员查询

    searchVipNum() {
      this.clickChangeGuest();
    },

    //合作企业

    searchCooperative(num) {

      let options = {
        "loginUserID": "huileyou",
        "loginUserPass": "123",
        "operateUserID": "",
        "operateUserName": "",
        "pcName": "",
        // "ht_ui_ID": 1,//单位信息编码
        "ht_ui_HotelID": this.hotelID,//酒店编码
        "ht_ui_Name": this.cooperativeEnterpriseName,//名称
        // "ht_ui_ConnectName": "饶",//联系人
        // "ht_ui_Phone": "18111729770",//电话
        // "ht_ui_Tel": "18111729770",//手机号
        // "ht_ui_UserCode": 1,//销售员编码
        "ht_ui_UserState": 0,//客户状态(0有效 1冻结)
        // "ht_ui_PassState": 0,//是否房价保密(0不保密  1保密)
        "ht_ui_State": 1,//审核状态(0未审核 1已审核)
        "page": num ? num : 1,
        "rows": 10
      }
      this.$store.dispatch('initHotelEnterprise', options)
        .then(data => {
          this.cooperativeTotal = Number(data.totalrows);
          this.cooperativeGuestData = data.data;
        }, err => {
          this.$notify({
            message: err,
            type: 'error'
          })
        })
        .catch(err => {
          this.$notify({
            message: err,
            type: 'error'
          })
        })

    },

    //合作企业分页

    changeCoopetivePage(num) {
      this.searchCooperative(num);
    },

    //选择会员

    changeVipGuest(item) {
      this.updateObj.ht_bi_MemberType = 1;
      this.updateObj.ht_bi_CustomerType = item.ht_mi_ID;
      this.addOptions.data.ht_bi_MemberType = 1;
      this.addOptions.data.ht_bi_CustomerType = item.ht_mi_ID;
      this.guestName = item.ht_mi_Name;
      let options = {
        "loginUserID": "huileyou",
        "loginUserPass": "123",
        "operateUserID": "",
        "operateUserName": "",
        "pcName": "",
        "hotelID": this.hotelID,
        "cardTypeID": item.ht_mi_CardTypeID ? item.ht_mi_CardTypeID : '',
      }
      this.$store.dispatch('searchSetVipRoomTypePrice', options)
        .then(data => {
          let arr = data.data;

          //添加

          for (let i = 0; i < this.roomTypeOrderedList.length; i++) {
            for (var j = 0; j < arr.length; j++) {
              if (this.roomTypeOrderedList[i].rpp_id == arr[j].ht_mp_RoomGoodID) {
                this.roomTypeOrderedList[i].ht_re_RoomTypePrice = arr[j].ht_mp_FullPrice
              }
            }
          }
          for (var i = 0; i < this.selectRoomList.length; i++) {
            for (var j = 0; j < arr.length; j++) {
              if (this.selectRoomList[i].rpp_id == arr[j].ht_mp_RoomGoodID) {
                this.selectRoomList[i].ht_re_RoomTypePrice = arr[j].ht_mp_FullPrice
              }
            }
          }


          //修改

          //改左面房型价格
          for (var i = 0; i < this.updateRoomTypeOrderedList.length; i++) {
            for (var j = 0; j < arr.length; j++) {
              if (this.updateRoomTypeOrderedList[i].rpp_id == arr[j].ht_mp_RoomGoodID) {
                this.updateRoomTypeOrderedList[i].ht_re_RoomTypePrice = arr[j].ht_mp_FullPrice
              }
            }
          }
          //改右面房型价格
          for (var i = 0; i < this.updateSelectRoomList.length; i++) {
            for (var j = 0; j < arr.length; j++) {
              if (this.updateSelectRoomList[i].ht_bri_RppID == arr[j].ht_mp_RoomGoodID) {
                this.updateSelectRoomList[i].ht_re_RoomTypePrice = arr[j].ht_mp_FullPrice
              }
            }
          }

          this.guestFromDialog = false;

        }, err => {
          this.$notify({
            type: 'error',
            message: err,
          });
        })
    },

    //选择合作企业

    changeGuest(item) {
      this.updateObj.ht_bi_MemberType = 2
      this.updateObj.ht_bi_CustomerType = item.ht_ui_ID;
      this.addOptions.data.ht_bi_MemberType = 2;
      this.addOptions.data.ht_bi_CustomerType = item.ht_ui_ID;
      this.guestName = item.ht_ui_ConnectName;
      let options = {
        "loginUserID": "huileyou",
        "loginUserPass": "123",
        "operateUserID": "",
        "operateUserName": "",
        "pcName": "",
        "hotelID": this.hotelID,
        "unitID": item.ht_ui_ID
      }
      this.$store.dispatch('initHotelCooperationRoom', options)
        .then(data => {
          let arr = data;

          //添加
          for (let i = 0; i < this.roomTypeOrderedList.length; i++) {
            for (var j = 0; j < arr.length; j++) {
              if (this.roomTypeOrderedList[i].rpp_id == arr[j].ht_up_RoomGoodID) {
                this.roomTypeOrderedList[i].ht_re_RoomTypePrice = arr[j].ht_up_FullPrice
              }
            }
          }
          for (var i = 0; i < this.selectRoomList.length; i++) {
            for (var j = 0; j < arr.length; j++) {
              if (this.selectRoomList[i].rpp_id == arr[j].ht_up_RoomGoodID) {
                this.selectRoomList[i].ht_re_RoomTypePrice = arr[j].ht_up_FullPrice
              }
            }
          }

          //修改

          //改左面房型价格
          for (var i = 0; i < this.updateRoomTypeOrderedList.length; i++) {
            for (var j = 0; j < arr.length; j++) {
              if (this.updateRoomTypeOrderedList[i].rpp_id == arr[j].ht_up_RoomGoodID) {
                this.updateRoomTypeOrderedList[i].ht_re_RoomTypePrice = arr[j].ht_up_FullPrice
              }
            }
          }
          //改右面房型价格
          for (var i = 0; i < this.updateSelectRoomList.length; i++) {
            for (var j = 0; j < arr.length; j++) {
              if (this.updateSelectRoomList[i].ht_bri_RppID == arr[j].ht_up_RoomGoodID) {
                this.updateSelectRoomList[i].ht_re_RoomTypePrice = arr[j].ht_up_FullPrice
              }
            }
          }

          this.guestFromDialog = false;
        }, err => {
          this.$notify({
            type: 'error',
            message: err,
          });
        })
    },

    //预定保存

    reserveConfirm() {
      this.addOptions.msgType = Number(this.addOptions.msgType);
      if (!this.addOptions.data.ht_bi_BookName) {
        this.$notify({
          message: '请将必填项填写完整',
          type: 'error'
        })
        return
      }

      if (!isPhone(this.addOptions.data.ht_bi_Telphone)) {
        this.$notify({
          message: '手机号格式不正确',
          type: 'error'
        })
        return
      }

      if (!isCardID(this.addOptions.data.ht_bi_CertNo)) {
        this.$notify({
          message: '身份证号格式不正确',
          type: 'error'
        })
        return
      }

      if (this.addOptions.data.ht_bi_MemberType == "") {
        this.addOptions.data.ht_bi_MemberType = 0;
        this.addOptions.data.ht_bi_CustomerType = 0;
      }
      let arr = [];
      arr = this.roomTypeOrderedList.filter(item => {
        if (item.bookCount) {
          return true;
        }
        return false;
      })
      if (!arr.length) {
        this.$notify({
          message: '请选择预订房间!',
          type: 'error'
        })
        return
      }
      for (let i = 0; i < arr.length; i++) {
        this.addOptions.data.roomTypeIDList.push({
          "roomTypeID": arr[i].rpp_id,
          "count": arr[i].bookCount,
          "roomDataList": []
        })
      }
      let newArr = [];
      for (let i = 0; i < this.addOptions.data.roomTypeIDList.length; i++) {
        newArr = [];
        newArr = this.selectRoomList.filter(item => {
          if (item.rpp_id == this.addOptions.data.roomTypeIDList[i].roomTypeID) {
            return true
          }
          return false
        })

        for (let j = 0; j < newArr.length; j++) {
          if (newArr[j].id) {
            this.addOptions.data.roomTypeIDList[i].roomDataList.push({
              "ht_re_Id": newArr[j].id
            })
          }
        }
      }

      this.$store.dispatch('reserveConfirm', this.addOptions)
        .then(suc => {
          this.$notify({
            message: suc,
            type: 'success'
          })
          this.reserveDialog = false;
          setTimeout(() => {
            window.location.reload();
          }, 1500)
          // this.initData(this.hotelID);
        }, err => {
          this.$notify({
            message: err,
            type: 'error'
          })
        })
        .catch(err => {
          this.$notify({
            message: err,
            type: 'error'
          })
          this.reserveDialog = false;
        })
    },


  }


}