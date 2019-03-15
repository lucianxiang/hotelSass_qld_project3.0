<template>
  <div v-loading="isLoading">
    <h1 class="wrapTitle">
      <span>房间信息</span>
    </h1>
    <p class="title">{{userInfo.companyName}} 共有 <strong>{{conditionList.length}}</strong> 栋楼</p>
    <ul class="floorName clearfix">
      <li
        v-for="item,index in conditionList"
        @click="changeTungType(item,index)"
        :key="index"
        :class="{active: conditionIndex == index}"
      >{{item.Name}}
      </li>
    </ul>
    <!--查询-->
    <el-form ref="form" :model="options" label-width="80px" size="mini" inline>
      <el-form-item label="楼层:">
        <el-select
          style="width: 120px;"
          v-model="options.LevelID"
          placeholder="请选择"
        >
          <!--<el-option></el-option>-->
        </el-select>
      </el-form-item>
      <el-form-item label="房型:">
        <el-select
          style="width: 120px;"
          v-model="options.RoomTypeID"
          size="mini"
          placeholder="请选择"
        >
          <!--<el-option></el-option>-->
        </el-select>
      </el-form-item>
      <el-form-item label="房型:">
        <el-input placeholder="请输入" style="width: 150px;"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary">查询</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-plus">批量新增房间</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-plus">新增房间</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary">批量启用</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary">批量禁用</el-button>
      </el-form-item>
    </el-form>


  </div>
</template>
<script>
  import {mapGetters} from 'vuex'

  export default {
    computed: mapGetters([
      'queryObj'
    ]),
    data() {
      return {
        conditionList: [],
        isLoading: false,
        userInfo: {},
        conditionIndex: 0,
        floorName: '',
        floorId: '',
        options: {
          "Token": "",
          "PageIndex": 1,//页码
          "PageSize": 10,//每页显示张数
          "Id": "",//房间标识
          "LevelID": "",//楼栋楼层编码
          "HotelId": "",//酒店编码
          "RoomTypeID": "",//酒店房型编码
          "RoomID": "",//房间号
          "IsOpen": "",//启用状态 0未启用  1启用
        }
      }
    },
    created() {
      this.userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
      this.initConditionData();
    },
    methods: {
      //选择楼栋
      changeTungType(item, index) {
        this.conditionIndex = index;
      },
      //初始化筛选条件
      initConditionData() {
        let options = {
          "Token": this.queryObj.token,
          "Id": "",//酒店楼栋楼层编码
          "HotelId": this.queryObj.hotelID,//酒店编码
          "Name": "",//楼栋楼层名称
          "ParentID": 0,//父编码
          "PageIndex": 1,
          "PageSize": 1000
        };
        this.isLoading = true;
        this.$store.dispatch('initTungConditionData', options)
          .then(data => {
            this.conditionList = data;
            this.isLoading = false;
          }, err => {
            this.$message({
              message: err,
              type: 'error'
            })
            this.isLoading = false;
          })
      },
      //初始化楼层
      initFloorData() {
        let options = {
          "Token": this.queryObj.token,
//          "Id": "",//酒店楼栋楼层编码
//          "HotelId": this.queryObj.hotelID,//酒店编码
//          "Name": this.floorName,//楼栋楼层名称
          "ParentID": this.floorId,//父编码
          "PageIndex": 1,
          "PageSize": 1000
        }
        this.isLoading = true;
        this.$store.dispatch('initTungConditionData', options)
          .then(data => {
            this.tungFloorList = data;
            this.isLoading = false;
          }, err => {
            this.$message({
              message: err,
              type: 'error'
            })
            this.isLoading = false;
          })
      },
    },
  }
</script>
<style scoped>

  .title {
    font: bold 12px/48px "微软雅黑";
    margin-left: 15px;
  }

  .title strong {
    color: #008cf0;
  }

  .floorName {
    margin-left: 15px;
    margin-bottom: 10px;
  }

  .floorName li {
    float: left;
    height: 28px;
    padding: 0 10px;
    border: 1px solid #d9d9d9;
    font: 12px/28px "微软雅黑";
    margin: 0 10px 7px 0;
    border-radius: 5px;
    cursor: pointer;
  }

  .floorName li:hover {
    color: #108ee9;
  }

  .floorName li.active {
    border-color: #108ee9;
    color: #108ee9;
  }
</style>