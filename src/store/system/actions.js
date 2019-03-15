/**
 * Created by LiuXiang on 18/04/09.
 */
// import request from "request";
import {getNewStr,getNewStr1} from '@/assets/js/public'

export default {
  //房型维护
  initRoomType(store, data) {
    return new Promise((relove, reject) => {
      axios.post(getNewStr1 + '/HotelRoomType/Select', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }).then(data => {
        var data = data.data;
        if (Number(data.resultcode) == 200) {
          store.commit('initRoomType', data.data)
          relove(data.data)
        } else {
          reject(data.resultcontent)
        }
      })
    })
  },
  //楼栋楼层条件
  initTungConditionData(store, data) {
    return new Promise(function (relove, reject) {
      axios.post(getNewStr1 + '/HotelBuildLevel/Select', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(data => {
          var data = data.data;
          if (Number(data.resultcode) == 200) {
            relove(data.data)
          } else {
            reject(data.resultcontent)
          }
        })
    })

  },
  //添加酒店楼栋
  addHotelTungSubmit(store, data) {
    return new Promise(function (relove, reject) {
      axios.post(getNewStr1 + '/HotelBuildLevel/Insert', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(data => {
          var data = data.data;
          if (Number(data.resultcode) == 200) {
            relove(data.resultcontent)
          } else {
            reject(data.resultcontent)
          }
        })
    })

  },
  //添加酒店楼层
  addHotelFloorSubmit(store, data) {
    return new Promise(function (relove, reject) {
      axios.post(getNewStr1 + '/HotelBuildLevel/LevelInsert', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(data => {
          var data = data.data;
          if (Number(data.resultcode) == 200) {
            relove(data.resultcontent)
          } else {
            reject(data.resultcontent)
          }
        })
    })

  },
  //修改酒店楼栋
  updateHotelTungSubmit(store, data) {
    return new Promise(function (relove, reject) {
      axios.post(getNewStr1 + '/HotelBuildLevel/Update', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(data => {
          var data = data.data;
          if (Number(data.resultcode) == 200) {
            relove(data.resultcontent)
          } else {
            reject(data.resultcontent)
          }
        })
    })

  },


}
