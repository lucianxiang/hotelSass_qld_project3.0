import {deepClone, uniq} from "../js/public";

export default {
  computed: Object.assign({

    //已选合计
    updateRoomNum() {
      this.updateSelectedRoomList = [];
      let num = 0;
      for (let i = 0; i < this.updateRoomDialogList.length; i++) {
        num += this.updateRoomDialogList[i].roomList.length;
        if (this.updateRoomDialogList[i].roomList.length) {
          for (let j = 0; j < this.updateRoomDialogList[i].roomList.length; j++) {
            this.updateSelectedRoomList.push(this.updateRoomDialogList[i].roomList[j]);
          }
        }
      }
      return num;
    }
  }),
  data() {
    return {
      updateObj: {},
      updateDialog: false,
      updateRoomTypeOrderedList: [],//房型列表
      updateSelectRoomList: [],//已选中列表
      updateRoomDialogList: [],//可订房间列表
      updateCanSelectRoomList: [],//选中的房间
      updateOtherRoomList: [],//未选中的放间
      updateSelectRoomDialog: false,//选择房间弹窗
      updateCanSelectRoomNum: 0,//需选择房间数量
      updateRoomTypeName: '',//房型名称
      updateSelectedRoomList: [],//已选房间


    }
  },
  created() {
  },
  methods: {
    //修改取消
    updateCancelChangeRoom(obj) {
      obj.ht_bri_RoomID = '';
      obj.ht_bri_EntityID = '';
    },
    //修改删除
    deleteUpdateChangeRoom(obj) {
      // ht_bri_RppID: obj.rpp_id,
      //   ht_re_RoomTypePrice: obj.ht_re_RoomTypePrice,
      //   ht_rpp_Name: obj.name,
      //   book_count: obj.book_count,
      let newObj = {}
      newObj.rpp_id = obj.ht_bri_RppID
      newObj.ht_re_RoomTypePrice = obj.ht_bri_RppID
      newObj.ht_rpp_Name = obj.ht_rpp_Name
      this.updateBookCount(newObj)
      this.updateRoomTypeOrderedList = this.updateRoomTypeOrderedList.map(item => {
        if (item.rpp_id == obj.ht_bri_RppID) {
          item.book_count--
          return item
        }
        return item
      })
    },
    //修改预订信息

    updateSeserveInfo(obj) {
      const loading = this.$loading({
        lock: true,
        text: '加载中',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      });

      this.updateObj = deepClone(obj);

      console.log(obj)


      this.searchOneSeserveInfo(obj.ht_bi_ID)
        .then(data => {
          loading.close();
          this.updateRoomTypeOrderedList = data.resultList;
          this.updateSelectRoomList = data.bookList;
          // if (obj.ht_bi_MemberType == 1) {
          //   this.changeVipGuest({
          //     ht_mi_ID: obj.ht_bi_CustomerType,
          //     ht_mi_Name: ''
          //   })
          // }
          this.$nextTick(() => {
            this.updateDialog = true;
          })
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

    //查询单个预订信息

    searchOneSeserveInfo(id) {
      let options = {
        "loginUserID": "huileyou",
        "loginUserPass": "123",
        "operateUserID": "",
        "operateUserName": "",
        "pcName": "",
        "ht_bi_ID": id,//预定标识
      }
      return this.$store.dispatch('searchOneSeserveInfo', options)
    },

    //修改提交

    updateConfirm() {
      let options = {
        "loginUserID": "huileyou",
        "loginUserPass": "123",
        "operateUserID": "",
        "operateUserName": "",
        "pcName": "",
        "data": {
          "ht_bi_ID": this.updateObj.ht_bi_ID,
          "ht_bi_Telphone": this.updateObj.ht_bi_Telphone,//手机号码
          "ht_bi_FrontMoney": this.updateObj.ht_bi_FrontMoney,//预订金
          "ht_bi_Group": this.updateObj.ht_bi_Group,//团队
          "ht_bi_BookName": this.updateObj.ht_bi_BookName,//预订人
          "ht_bi_CertNo": this.updateObj.ht_bi_CertNo,//证件号
          "ht_bi_ReachDate": this.updateObj.ht_bi_ReachDate,//预抵日期
          "ht_bi_LeaveTime": this.updateObj.ht_bi_LeaveTime,//预离日期
          "ht_bi_KeepTime": this.updateObj.ht_bi_KeepTime,//保留时间
          "ht_bi_MemberType": this.updateObj.ht_bi_MemberType,//0散户 1会员 2合作企业
          "ht_bi_CustomerType": this.updateObj.ht_bi_CustomerType,//会员卡类型编号(散户填0/用户标识号/合作企业标识号)
          "roomTypeIDList": []
        }
      }
      let arr = [];
      arr = uniq(this.updateSelectRoomList)
      for (let i = 0; i < arr.length; i++) {
        options.data.roomTypeIDList.push({
          "roomTypeID": arr[i].ht_bri_RppID,
          "count": 1,
          "roomDataList": []
        })
      }
      let newArr = [];
      for (let i = 0; i < options.data.roomTypeIDList.length; i++) {
        newArr = [];
        newArr = this.updateSelectRoomList.filter(item => {
          if (item.ht_bri_RppID == options.data.roomTypeIDList[i].roomTypeID) {
            return true
          }
          return false
        })

        for (let j = 0; j < newArr.length; j++) {
          options.data.roomTypeIDList[i].roomDataList.push({
            "ht_re_Id": newArr[j].ht_bri_EntityID
          })
        }
      }
      let newRoomTypeIDList = options.data.roomTypeIDList
      for (var i = 0; i < newRoomTypeIDList.length; i++) {
        newRoomTypeIDList[i].count = options.data.roomTypeIDList[i].roomDataList.length
      }

      this.$store.dispatch('UpdateCashierReserve', options)
        .then(suc => {
          this.$notify({
            message: suc,
            type: 'success'
          })
          this.updateDialog = false
          this.initData()
        }, err => {
          this.$notify({
            message: err,
            type: 'error'
          })
          this.updateDialog = false
        })

    },

    //加减预订数
    updateBookCount(obj) {
      let newObj = {
        ht_bri_BookID: '',
        ht_bri_EntityID: '',
        ht_bri_RoomID: '',
        ht_bri_RppID: obj.rpp_id,
        ht_re_RoomTypePrice: obj.ht_re_RoomTypePrice,
        ht_rpp_Name: obj.name,
        book_count: obj.book_count,
      }

      let l = this.updateSelectRoomList.filter(item => {
        if (item.ht_bri_RppID == newObj.ht_bri_RppID) {
          return true
        }
        return false
      }).length

      if (newObj.book_count > l) {
        newObj.id = '';
        this.updateSelectRoomList.push(newObj);
      } else {
        //减

        let data = this.updateSelectRoomList.filter((item, index) => {
          if (item.ht_bri_RppID == newObj.ht_bri_RppID) {
            return true
          }
          return false
        })
        this.updateSelectRoomList = this.updateSelectRoomList.filter((item, index) => {
          if (item.ht_bri_RppID == newObj.ht_bri_RppID) {
            return false
          }
          return true
        })
        data.pop()
        this.updateSelectRoomList = this.updateSelectRoomList.concat(data)
      }
      this.updateSelectRoomList.sort((a, b) => {
        return a.ht_bri_RppID - b.ht_bri_RppID
      })
    },


    //查询房间名对应可订房间
    initUpdateRoomTypeDetails(item) {
      this.updateRoomDialogList = [];
      let options = {
        "loginUserID": "huileyou",
        "loginUserPass": "123",
        "operateUserID": "",
        "operateUserName": "",
        "pcName": "",
        "rpp_ID": item.ht_bri_RppID,//房间价格编码
        "reachDate": this.updateObj.ht_bi_ReachDate,//预抵日期
        "leaveDate": this.updateObj.ht_bi_LeaveTime//预离日期
      }
      this.$store.dispatch('initRoomTypeDetails', options)
        .then(data => {
          if (data.length) {
            //处理返回数据
            for (let i = 0; i < data.length; i++) {
              for (let j = 0; j < data[i].levelList.length; j++) {
                data[i].levelList[j].ht_re_BuildNo = data[i].ht_re_BuildNo;
                data[i].levelList[j].roomList = [];
                this.updateRoomDialogList.push(data[i].levelList[j]);
              }
            }
            //当前点击的房型
            this.updateCanSelectRoomList = this.updateSelectRoomList.filter(v => {
              if (v.ht_bri_RppID == item.ht_bri_RppID) {
                return true
              }
              return false
            });
            //其他房型
            this.updateOtherRoomList = this.updateSelectRoomList.filter(v => {
              if (v.ht_bri_RppID == item.ht_bri_RppID) {
                return false;
              }
              return true;
            });
            //应该选多少房间数
            this.updateCanSelectRoomNum = this.updateCanSelectRoomList.length;
            //房型名称
            this.updateRoomTypeName = item.ht_rpp_Name;

            this.updateSelectRoomDialog = true;
            return
          }
          this.$notify({
            message: '该房型暂无可订房间!',
            type: 'error'
          })

          this.updateRoomDialogList = [];

          this.updateSelectRoomDialog = false;

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

    //全选
    updateShowAll(arr) {
      if (arr.length) {
        for (let i = 0; i < arr.length; i++) {
          arr[i].roomList = arr[i].roomList = arr[i].entityList.map(v => {
            return v
          })
        }
      } else {
        for (let i = 0; i < this.updateRoomDialogList.length; i++) {
          this.updateRoomDialogList[i].roomList = [];
        }
      }
    },

    //单行全选
    updateCheckAll(arr, obj) {
      if (obj.roomList.length == obj.entityList.length) {
        obj.roomList = [];
      } else {
        obj.roomList = obj.entityList.map(v => {
          return v
        })
      }
    },

    //房间单选
    updateOneCheck(obj) {
      if (obj.roomList.length == obj.entityList.length) {
        this.$refs.updateMultipleTable.toggleRowSelection(obj);
      } else {
        this.$refs.updateMultipleTable.toggleRowSelection(obj, false);
      }
    },

    //选择房间确认
    updateRoomConfirm() {
      if (this.updateSelectedRoomList.length < this.updateCanSelectRoomNum) {

        this.$notify({
          message: '请至少选择' + this.updateCanSelectRoomNum + '间房间',
          type: 'error'
        })

        return
      }

      let arr = [];
      for (let i = 0; i < this.updateCanSelectRoomList.length; i++) {
        this.updateCanSelectRoomList[i].ht_bri_RoomID = this.updateSelectedRoomList[i].ht_re_RoomID;
        this.updateCanSelectRoomList[i].id = this.updateSelectedRoomList[i].ht_re_Id;
        this.updateCanSelectRoomList[i].ht_bri_EntityID = this.updateSelectedRoomList[i].ht_re_Id;
      }
      arr = [...this.updateCanSelectRoomList, ...this.updateOtherRoomList];
      arr.sort((a, b) => {
        return a.ht_bri_RppID - b.ht_bri_RppID
      })
      this.updateSelectRoomList = arr;
      this.updateSelectRoomDialog = false;
    },

    //取消预订

    cancelSeserveInfo(id, state) {
      let options = {
        "loginUserID": "huileyou",
        "loginUserPass": "123",
        "operateUserID": "",
        "operateUserName": "",
        "pcName": "",
        "ht_bi_ID": id,//预定标识码
        "type": state,//0恢复  1取消
      };
      this.$store.dispatch('cancelSeserveInfo', options)
        .then(suc => {
          this.$notify({
            message: suc,
            type: 'success'
          })
          this.initData()
        }, err => {
          this.$notify({
            message: err,
            type: 'error'
          })
        })
    },


  },
  mounted() {
  },
}