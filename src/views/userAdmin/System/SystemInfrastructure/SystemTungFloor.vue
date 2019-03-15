<template>
  <div v-loading="isLoading">
    <h1 class="wrapTitle">
      <span>楼栋楼层</span>
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

    <div class="tungInfoWrap clearfix">

      <div class="tungInfo">

        <strong>楼栋名：{{floorName}} 共 <em>{{tungFloorList.length}}</em> 层 共有客房 ： <em>126</em> 间 </strong>

        <div>

          <a href="javascript:;" @click="updateTungDialog = true">修改</a>
          <a href="javascript:;">删除</a>

        </div>

      </div>

      <div class="tungOperation">

        <el-button icon="el-icon-plus" size="mini" type="primary" @click="addHotelTung">添加楼栋</el-button>
        <el-button icon="el-icon-plus" size="mini" type="primary" @click="addHotelFloor">添加楼层</el-button>

      </div>

    </div>

    <ul class="floorList clearfix">

      <li v-for="item,index in tungFloorList" :key="index" :class="{active: floorIndex == index}">

        <a href="javascript:;" @click="floorIndex = index">{{item.Name}}</a>

        <div class="floorOperation">

          <a href="javascript:;" @click="updateFloor(item)">修改</a>
          <a href="javascript:;">删除</a>

        </div>

        <div class="floorInfo">

          <div class="floorInfoBox">

            <div class="floorTitle">

              <strong>{{floorName}} {{item.Name}}</strong>

              <a href="javascript:;">查看楼层房间</a>

            </div>

            <el-table
              :data="tableData"
              size="mini"
              style="width: 100%">
              <el-table-column
                align="center"
                prop="date"
                label="房型">
              </el-table-column>
              <el-table-column
                prop="name"
                align="center"
                label="房间数">
              </el-table-column>
            </el-table>

            <div class="floorRemarks">
              <strong>楼层备注</strong>
              <p>一堆备注一堆备注一堆备注一堆备注</p>
            </div>

          </div>

        </div>


      </li>

      <li style="text-align: center;color: #999;" v-show="!tungFloorList.length">暂无数据</li>

    </ul>

    <!--添加酒店楼栋-->

    <el-dialog
      title="添加楼栋"
      :visible.sync="addTungDialog"
      :append-to-body="true"
      :close-on-click-modal="false"
      width="500px">
      <el-form ref="form" :model="addTungObj" label-width="120px" size="mini">
        <el-form-item label="楼栋名称:">
          <el-input v-model="addTungObj.Name" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="备注:">
          <el-input v-model="addTungObj.Remark" type="textarea" placeholder="请输入"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addTungDialog = false" size="small">取 消</el-button>
        <el-button type="primary" @click="addHotelTungSubmit" size="small">提 交</el-button>
      </span>
    </el-dialog>

    <!--修改酒店楼栋-->

    <el-dialog
      title="修改楼栋"
      :visible.sync="updateTungDialog"
      :append-to-body="true"
      :close-on-click-modal="false"
      width="500px">
      <el-form ref="form" :model="updateTungObj" label-width="120px" size="mini">
        <el-form-item label="楼栋名称:">
          <el-input v-model="updateTungObj.Name" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="备注:">
          <el-input v-model="updateTungObj.Remark" type="textarea" placeholder="请输入"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="updateTungDialog = false" size="small">取 消</el-button>
        <el-button type="primary" @click="updateHotelTungSubmit" size="small">提 交</el-button>
      </span>
    </el-dialog>

    <!--添加酒店楼层-->

    <el-dialog
      title="添加楼层"
      :visible.sync="addFloorDialog"
      :append-to-body="true"
      :close-on-click-modal="false"
      width="500px">
      <el-form ref="form" :model="addFloorObj" label-width="120px" size="mini">
        <el-form-item label="选择楼栋:">
          <el-select
            v-model="addFloorObj.Id"
            placeholder="请选择"
            size="mini"
          >
            <el-option
              v-for="item in conditionList"
              :key="item.Id"
              :label="item.Name"
              :value="item.Id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="楼层:">
          <el-input
            v-model="addFloorObj.fromLevel"
            style="width: 100px;"
            type="number"
          ></el-input>
          --
          <el-input
            v-model="addFloorObj.toLevel"
            style="width: 100px;"
            type="number"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-checkbox v-model="isFour">楼层数不含数字4</el-checkbox>
        </el-form-item>
        <el-form-item label="备注:">
          <el-input v-model="addFloorObj.remark" type="textarea" placeholder="请输入"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addFloorDialog = false" size="small">取 消</el-button>
        <el-button type="primary" @click="addHotelFloorSubmit" size="small">提 交</el-button>
      </span>
    </el-dialog>

    <!--修改酒店楼层-->

    <el-dialog
      title="修改楼层"
      :visible.sync="updateFloorDialog"
      :append-to-body="true"
      :close-on-click-modal="false"
      width="500px">
      <el-form ref="form" :model="updateFloorObj" label-width="120px" size="mini">
        <el-form-item label="楼层名称:">
          <el-input v-model="updateFloorObj.Name" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="备注:">
          <el-input v-model="updateFloorObj.remark" type="textarea" placeholder="请输入"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="updateFloorDialog = false" size="small">取 消</el-button>
        <el-button type="primary" @click="updateFloorSubmit" size="small">提 交</el-button>
      </span>
    </el-dialog>


  </div>
</template>
<script>
  import {mapGetters} from 'vuex'
  import {deepClone} from '@/assets/js/public'

  export default {
    computed: mapGetters([
      'queryObj'
    ]),
    data() {
      return {
        conditionList: [],
        tungFloorList: [],
        conditionIndex: 0,
        userInfo: {},
        floorIndex: -1,
        tableData: [
          {
            date: '2016-05-02',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄'
          }, {
            date: '2016-05-04',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1517 弄'
          }, {
            date: '2016-05-01',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1519 弄'
          }, {
            date: '2016-05-03',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1516 弄'
          }],
        floorName: '',
        floorId: '',
        addTungObj: {
          "HotelId": "",//酒店编码
          "Name": "",//楼栋楼层名称
          "Remark": "",//备注
        },
        addTungDialog: false,
        isLoading: false,
        addFloorDialog: false,
        addFloorObj: {
          "Token": "",
          "Id": "",//酒店楼栋编码
          "fromLevel": "",//楼层
          "toLevel": "",//楼层
          "exceptfour": "",//0包含四楼  1不包含四楼
          "remark": ""//备注
        },
        isFour: false,
        updateTungObj: {},
        updateTungDialog: false,
        updateFloorDialog: false,
        updateFloorObj: {},
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
        this.floorName = item.Name;
        this.floorId = item.Id;
        this.updateTungObj = deepClone(item);
        this.floorIndex = -1;
        this.initData();
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
            if (!this.floorId) {
              this.floorName = data[0].Name;
              this.floorId = data[0].Id;
              this.updateTungObj = deepClone(data[0]);
            }
            this.isLoading = false;
            this.initData();
          }, err => {
            this.$message({
              message: err,
              type: 'error'
            })
            this.isLoading = false;
          })
      },
      //初始化数据
      initData() {
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
      //添加酒店楼栋
      addHotelTung() {
        for (let attr in this.addTungObj) {
          this.addTungObj[attr] = '';
        }
        this.addTungDialog = true;
      },
      //添加酒店楼栋提交
      addHotelTungSubmit() {
        if (!this.addTungObj.Name) {
          this.$message({
            message: '请输入楼栋名称',
            type: 'warning'
          })
          return
        }
        this.addTungObj.HotelId = this.queryObj.hotelID;
        let options = {
          "Token": this.queryObj.token,
          "data": this.addTungObj
        }
        this.$store.dispatch('addHotelTungSubmit', options)
          .then(suc => {
            this.$message({
              message: suc,
              type: 'success'
            })
            this.initConditionData();
            this.addTungDialog = false;
          }, err => {
            this.$message({
              message: err,
              type: 'error'
            })
            this.addTungDialog = false;
          })
      },
      //添加酒店楼栋楼层
      addHotelFloor() {
        for (let attr in this.addFloorObj) {
          this.addFloorObj[attr] = '';
        }
        this.isFour = false;
        this.addFloorDialog = true;
      },
      //添加酒店楼栋楼层提交
      addHotelFloorSubmit() {
        this.addFloorObj.Token = this.queryObj.token;
        if (this.isFour) {
          this.addFloorObj.exceptfour = 1;
        } else {
          this.addFloorObj.exceptfour = 0;
        }
        this.$store.dispatch('addHotelFloorSubmit', this.addFloorObj)
          .then(suc => {
            this.$message({
              message: suc,
              type: 'success'
            })
            this.initData();
            this.addFloorDialog = false;
          }, err => {
            this.$message({
              message: err,
              type: 'error'
            })
            this.addFloorDialog = false;
          })


      },
      //修改楼栋提交
      updateHotelTungSubmit() {
        let options = {
          "Token": this.queryObj.token,
          "data": this.updateTungObj
        };
        this.$store.dispatch('updateHotelTungSubmit', options)
          .then(suc => {
            this.$message({
              message: suc,
              type: 'success'
            })
            this.initConditionData();
            this.updateTungDialog = false;
          }, err => {
            this.$message({
              message: err,
              type: 'error'
            })
            this.updateTungDialog = false;
          })
      },
      //修改楼层
      updateFloor(item) {
        this.updateFloorObj = deepClone(item);
        this.updateFloorDialog = true;
      },
      //修改楼层提交
      updateFloorSubmit(){
        let options = {
          "Token": this.queryObj.token,
          "data": this.updateFloorObj
        };
        this.$store.dispatch('updateHotelTungSubmit', options)
          .then(suc => {
            this.$message({
              message: suc,
              type: 'success'
            })
            this.initData();
            this.updateFloorDialog = false;
          }, err => {
            this.$message({
              message: err,
              type: 'error'
            })
            this.updateFloorDialog = false;
          })
      },


    },
  }
</script>
<style scoped>

  .el-checkbox, .el-radio {
    margin: 0;
  }

  .title {
    font: bold 12px/48px "微软雅黑";
    margin-left: 15px;
  }

  .title strong {
    color: #008cf0;
  }

  .floorName {
    margin-left: 15px;
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

  .floorList {
    width: 820px;
    padding-top: 30px;
    margin: 0 auto;
  }

  .floorList > li {
    float: left;
    width: 100%;
  }

  .floorList > li > a {
    float: left;
    width: 220px;
    border: 1px solid #ddd;
    text-align: center;
    font: 14px/40px "微软雅黑";
    color: #666;
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    border-radius: 5px;
    margin-right: 35px;
  }

  .floorList > li.active > a {
    border-color: #008cf0;
  }

  .floorList > li.active .floorOperation,
  .floorList > li.active .floorInfo {
    display: block;
  }

  .floorOperation {
    float: left;
    padding: 10px 5px;
    font: 12px/16px "微软雅黑";
    border: 1px solid #ddd;
    position: relative;
    display: none;
  }

  .floorOperation:before {
    position: absolute;
    left: -6px;
    top: 12px;
    content: '';
    border-top: 1px solid #ddd;
    border-left: 1px solid #ddd;
    background-color: #fff;
    width: 10px;
    height: 10px;
    transform: rotate(-45deg);
  }

  .floorOperation > a {
    float: left;
    color: #108ee9;
    padding: 0 5px;
    border-right: 1px solid #ddd;
  }

  .floorOperation > a:last-of-type {
    border-right: none;
  }

  .floorInfo {
    display: none;
    float: right;
    width: 300px;
    height: 40px;
    position: relative;
    margin-top: -12px;
  }

  .floorInfoBox {
    position: absolute;
    top: 0;
    left: 0;
    padding: 10px;
    border: 1px solid #108ee9;
  }

  .floorInfoBox:before {
    position: absolute;
    left: -11px;
    top: 24px;
    content: '';
    border-top: 1px solid #108ee9;
    border-left: 1px solid #108ee9;
    background-color: #fff;
    width: 20px;
    height: 20px;
    transform: rotate(-45deg);
  }

  .floorTitle {
    font: bold 12px/16px "微软雅黑";
    margin-bottom: 10px;
    position: relative;
    z-index: 1;
  }

  .floorTitle strong {
    float: left;
    color: #666;
  }

  .floorTitle a {
    float: right;
    color: #06c;
  }

  .floorRemarks {
    font: 12px/16px "微软雅黑";
  }

  .floorRemarks > strong {
    display: block;
    color: #666;
    margin: 10px 0;
    font-weight: bold;
  }

  .floorRemarks > p {
    border: 1px solid #666;
    color: #555;
    padding: 5px;
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    border-radius: 5px;
    min-height: 80px;
  }

  .tungInfoWrap {
    font: bold 12px/28px "微软雅黑";
    padding: 20px 0 0 15px;
  }

  .tungInfo {
    float: left;
  }

  .tungInfo > strong {
    float: left;
    color: #333;
  }

  .tungInfo > div {
    float: left;
    margin-left: 40px;
  }

  .tungInfo > div > a {
    float: left;
    margin-top: 6px;
    padding: 0 10px;
    border-right: 1px solid #666;
    line-height: 16px;
    color: #008cf0;
  }

  .tungInfo > div > a:last-of-type {
    border-right: none;
  }

  .tungInfo em {
    color: #008cf0;
  }

  .tungOperation {
    float: right;
  }

</style>