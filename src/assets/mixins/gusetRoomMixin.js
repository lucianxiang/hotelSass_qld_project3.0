import {ReadCarId, CancelRead} from '../js/CardReader'
import {newUniq} from '@/assets/js/public'
import {deepClone} from "../js/public";

export default {
  data() {
    return {
      showReadCard: false,
      exchangeHousesDialog: false,
      exchangeOptions: [],
      exchangeObj: {},
      exchangeInTime: '',
      exchangeOutTime: '',
      roomList: [],
      exchangeReason: '',
      getData: {},

    }
  },
  created() {
  },
  methods: {

    readCardVal(val) {
      this.getData.name = val.Name;
      this.getData.idcard = val.Id;
    },

    getOtherIdCardInfo(obj) {
      this.showReadCard = true;
      this.getData = obj;
    },

    initExchangesRoomTypeDetails(id) {
      let options = {
        "loginUserID": "huileyou",
        "loginUserPass": "123",
        "operateUserID": "",
        "operateUserName": "",
        "pcName": "",
        "rpp_ID": id,//房间价格编码
        "reachDate": this.exchangeInTime,//预抵日期
        "leaveDate": this.exchangeOutTime//预离日期
      }
      return this.$store.dispatch('initRoomTypeDetails', options)
    },

    //换房

    exchangeHouses(item) {
      this.$store.commit('showLoading');
      this.exchangeObj = item;
      this.initExchangesRoomTypeDetails(item.ht_rpp_ID)
        .then(data => {
          var arr = [];
          data = newUniq(data) //没重复
          for (let i = 0; i < data.length; i++) {
            arr.push({})
            arr[i].label = data[i].ht_re_BuildNo + '栋';
            arr[i].value = data[i].ht_re_BuildNo;
            arr[i].children = data[i].levelList;
            for (let j = 0; j < data[i].levelList.length; j++) {
              arr[i].children[j].label = data[i].levelList[j].ht_re_BuildLevel + '层';
              arr[i].children[j].value = data[i].levelList[j].ht_re_BuildLevel;
              arr[i].children[j].children = data[i].levelList[j].entityList;
              for (let k = 0; k < data[i].levelList[j].entityList.length; k++) {
                arr[i].children[j].children[k].label = data[i].levelList[j].entityList[k].ht_re_RoomID;
                arr[i].children[j].children[k].value = data[i].levelList[j].entityList[k].ht_re_Id;
              }
            }

          }
          this.exchangeOptions = arr;
          this.$store.commit('hideLoading');
          this.exchangeHousesDialog = true;
        }, err => {
          this.$notify({
            message: err,
            type: 'error'
          })
          this.$store.commit('hideLoading');
        })
    },

    //换房提交

    exchangeHousesConfirm() {
      let options = {
        "loginUserID": "huileyou",
        "loginUserPass": "123",
        "operateUserID": this.userInfo.Id,
        "operateUserName": "",
        "pcName": "",
        "hotelID": this.hotelId,//酒店编码
        "oldEntityID": this.exchangeObj.ht_re_Id,//老房间实体编码
        "newEntityID": this.roomList[this.roomList.length - 1],//新房间实体编码
        "changeReason": this.exchangeReason//换房原因
      }
      this.$store.dispatch('exchangeHousesConfirm', options)
        .then(suc => {
          this.$notify({
            message: suc,
            type: 'success'
          })
          this.exchangeHousesDialog = false;
        }, err => {
          this.$notify({
            message: err,
            type: 'error'
          })
        })
    },

  },
  mounted() {
  }
}