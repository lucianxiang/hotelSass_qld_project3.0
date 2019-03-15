<template>
  <div>

    <div class="clearfix" id="wrap">

      <!--左边筛选栏-->

      <div class="leftScreenCondition" :class="{active: isActive}">

        <a href="javascript:;" :class="{active: isActive}" @click="isActive = !isActive"></a>
        <div>
          <div>
            <div class="screenBox">
              <div class="inputQuery">
                <el-input placeholder="客户姓名/房间号" size="mini" style="width: 125px;"></el-input>
                <el-tooltip class="item" effect="light" content="扫描身份证" placement="bottom">
                  <i class="readIdCard"></i>
                </el-tooltip>
                <el-button size="mini">清空</el-button>
              </div>
              <div class="someService">
                <nav class="serviceOperations clearfix">
                  <a href="javascript:;"
                     v-for="item,index in serviceList" :key="index"
                     :class="{active: index == serviceIndex}"
                  >{{item.label}}</a>
                </nav>
                <div class="serviceInformations clearfix">
                  <a href="javascript:;" v-for="item,idnex in 5">续住</a>
                </div>
              </div>
            </div>
            <div class="guestRoomInfo">
              <div class="roomMessage clearfix">
                <span>房间号：8937</span>
                <span>房态：维修</span>
              </div>
              <nav class="serviceOperations clearfix">

                <a href="javascript:;"
                   v-for="item,index in aboutRoomScreen"
                   :key="index"
                   :class="{active: index == serviceIndex}"
                >{{item.label}}</a>

              </nav>

              <!--入住信息-->

              <div class="checkInInfo" v-show="true">

                <ul class="clearfix">
                  <li class="fillLine">
                    <strong>会员名称 ：</strong>
                    <div>
                      <span>1</span>
                    </div>
                  </li>
                  <li>
                    <strong>门市价 ：</strong>
                    <div>
                      <span>￥100</span>
                    </div>
                  </li>
                  <li class="pointer">
                    <strong>房间价格 ：</strong>
                    <div>
                      <el-popover
                        placement="right"
                        width="740"
                        trigger="hover"
                        v-model="visible2">
                        <ul class="roomWeekPrice clearfix">
                          <li>周日</li>
                          <li>周一</li>
                          <li>周二</li>
                          <li>周三</li>
                          <li>周四</li>
                          <li>周五</li>
                          <li>周六</li>
                        </ul>
                        <ul class="roomDaysPrice clearfix">
                          <li>
                            <strong>03-09</strong>
                            <span>198</span>
                          </li>
                        </ul>
                        <span slot="reference">￥ <em>0</em></span>
                      </el-popover>
                    </div>
                  </li>
                  <li>
                    <strong>入住时间 ：</strong>
                    <div>
                      <span>02-28 15:25</span>
                    </div>
                  </li>
                  <li>
                    <strong>预离时间 ：</strong>
                    <div>
                      <span>03-07 16:28</span>
                    </div>
                  </li>
                  <li>
                    <strong>付款金额 ：</strong>
                    <div>
                      <span>￥222</span>
                    </div>
                  </li>
                  <li>
                    <strong>朝向 ：</strong>
                    <div>
                      <span>不靠马路</span>
                    </div>
                  </li>
                  <li>
                    <strong>楼栋 ：</strong>
                    <div>
                      <span>龙成山庄贵宾5楼</span>
                    </div>
                  </li>
                  <li>
                    <strong>有窗 ：</strong>
                    <div>
                      <span>否</span>
                    </div>
                  </li>
                  <li class="fillLine">
                    <strong>订单备注 ：</strong>
                    <div>
                      <span>千里达</span>
                    </div>
                  </li>

                </ul>

                <el-tooltip :disabled="true" placement="top" effect="light">

                  <div class="hardwareTitle" slot="content">
                    <strong>房间硬件信息</strong>

                    <ul class="hardwareList clearfix">

                      <li>
                        <strong>名称</strong>
                        <span>数量</span>
                      </li>

                      <li v-for="item,index in 3" :key="index">
                        <strong>农夫山泉</strong>
                        <span>1</span>
                      </li>

                    </ul>

                  </div>

                  <a href="javascript:;">房间硬件</a>

                </el-tooltip>

              </div>

              <!--远期房态-->

              <div class="forwardRoomState" v-show="false">

                <ul class="weekList clearfix">
                  <li>日</li>
                  <li>一</li>
                  <li>二</li>
                  <li>三</li>
                  <li>四</li>
                  <li>五</li>
                  <li>六</li>
                </ul>

                <ul class="daysList clearfix">

                  <li v-for="item,idnex in 42">
                    <strong>空</strong>
                    <span>{{item}}</span>
                  </li>

                </ul>

              </div>

              <!--房间日志-->

              <div class="roomJournal" v-show="false">
                <el-table
                  size="mini"
                  :data="tableData"
                  style="width: 100%">
                  <el-table-column
                    prop="date"
                    label="日期">
                  </el-table-column>
                  <el-table-column
                    prop="name"
                    label="姓名">
                  </el-table-column>
                  <el-table-column
                    prop="address"
                    label="地址">
                  </el-table-column>
                </el-table>
              </div>


            </div>
          </div>
        </div>


      </div>

      <!--客房-->

      <section>
        <div>
          <div class="guestRoomInfoList">

            <!--房间筛选-->

            <div class="guestRoomScreen">

              <div class="guestPosition clearfix">
                <div>
                  <span>楼栋:</span>
                  <el-select placeholder="请选择" v-model="changeTung" size="mini" style="width:160px;">
                    <el-option
                      v-for="item,index in aboutRoomScreen"
                      :key="item.value"
                      :value="item.value"
                      :label="item.label"
                    ></el-option>
                  </el-select>
                </div>
                <div>
                  <span>楼层:</span>
                  <el-select placeholder="请选择" v-model="changeFloor" size="mini" style="width:160px;">
                    <el-option
                      v-for="item,index in aboutRoomScreen"
                      :key="item.value"
                      :value="item.value"
                      :label="item.label"
                    ></el-option>
                  </el-select>
                </div>
                <div>
                  <span>房型:</span>
                  <el-select placeholder="请选择" v-model="changeRoomType" size="mini" style="width:160px;">
                    <el-option
                      v-for="item,index in aboutRoomScreen"
                      :key="item.value"
                      :value="item.value"
                      :label="item.label"
                    ></el-option>
                  </el-select>
                </div>
              </div>

            </div>

            <!--房态-->

            <div class="guestRoomState clearfix">

              <strong>房态:</strong>

              <!--allRoomState-->
              <!--emptyNet-->
              <!--emptyDirty-->
              <!--liveNet-->
              <!--liveDirty-->
              <!--repair-->
              <div>
                <a href="javascript:;" v-for="item,index in 6">全部(443)</a>
              </div>

            </div>

            <!--更多操作-->

            <div class="guestRoomMoreOperation" :class="{active: showMoreOperation}">
              <div class="guestRoomMoreOperationBox">

                <div class="guestPosition clearfix">
                  <div>
                    <span>团队总计:</span>
                    <el-select placeholder="请选择" v-model="changeTung" size="mini" style="width:160px;">
                      <el-option
                        v-for="item,index in aboutRoomScreen"
                        :key="item.value"
                        :value="item.value"
                        :label="item.label"
                      ></el-option>
                    </el-select>
                  </div>
                  <div>
                    <span>联房总计:</span>
                    <el-select placeholder="请选择" v-model="changeTung" size="mini" style="width:160px;">
                      <el-option
                        v-for="item,index in aboutRoomScreen"
                        :key="item.value"
                        :value="item.value"
                        :label="item.label"
                      ></el-option>
                    </el-select>
                  </div>
                </div>

                <div class="otherOperation clearfix">
                  <span>入住渠道:</span>
                  <div>
                    <a href="javascript:;" v-for="item,index in 7">全部</a>
                  </div>

                </div>

                <div class="otherOperation clearfix">
                  <span>客       源:</span>
                  <div>
                    <a href="javascript:;" v-for="item,index in 7">全部</a>
                  </div>

                </div>

                <div class="otherOperation clearfix">
                  <span>其       它:</span>
                  <div>
                    <a href="javascript:;" v-for="item,index in 7">全部</a>
                  </div>

                </div>
              </div>

              <!--操作-->

              <div class="guestRoomOpeartionBtn">

                <el-button size="mini">查询</el-button>

                <el-button size="mini">清空</el-button>

                <el-button size="mini"
                           @click="showMoreOperation = !showMoreOperation"
                >{{showMoreOperation ? '收起' : '更多'}}<i class="moreOperationIcon active"></i>
                </el-button>

              </div>

            </div>

          </div>

          <div class="guestRoomShowInfoList">

            <!--层-->

            <ul class="TungFloorList">

              <li v-for="item,index in 10" :key="index">

                <strong>龙成山庄贵宾5楼   1层</strong>

                <!--房间-->

                <ul class="floorRoomList clearfix"
                    :class="[
                      {big: roomState== 0},
                      {middle: roomState == 1},
                      {small: roomState == 2}
                    ]">

                  <!--emptyNet  空净-->
                  <!--emptyDirty  空脏-->
                  <!--liveNet   住净-->
                  <!--liveDirty   住脏-->
                  <!--roomRepair   维修-->
                  <li v-for="item,i in 10"
                      :class="[
                        {emptyNet:item%1 == 0},
                        {emptyDirty:item%2 == 0},
                        {liveNet:item%3 == 0},
                        {liveDirty:item%4 == 0},
                        {roomRepair:item%5 == 0},
                        {active: index == 0 && i==0}
                      ]">

                    <div class="shaowBox"></div>

                    <strong>8102 不靠马路</strong>

                    <div class="clearfix iconBox">
                      <!--男孩-->
                      <!--<i class="boyIcon"></i>-->
                      <!--女孩-->
                      <!--<i class="girlIcon"></i>-->
                      <!--联房-->
                      <!--<i class="jointHousingIcon"></i>-->
                      <!--锁房-->
                      <!--<i class="lockIcon"></i>-->
                      <!--打扫-->
                      <i class="clearIcon"></i>
                      <!--维修-->
                      <!--<i class="repairIcon"></i>-->
                      <!--订-->
                      <!--<i class="bookIcon"></i>-->
                      <span>散客</span>
                    </div>

                    <p>邓传金</p>

                    <div>
                      <!--住人打扫-->
                      <i class="havClearIcon"></i>

                    </div>

                  </li>

                </ul>

              </li>

            </ul>


          </div>

        </div>
      </section>

    </div>


    <!--房间操作-->

    <div class="roomBasicsOperation">

      <!--房态盘-->

      <div class="roomSetting">

        <span>房态盘</span>

        <el-radio-group v-model="roomState" size="mini" style="margin-right: 10px;">
          <el-radio-button :label="item.value" v-for="item,index in sizeList" :key="index">{{item.label}}
          </el-radio-button>
        </el-radio-group>
        <el-button size="mini">一键置赃</el-button>
        <el-button size="mini">一键置净</el-button>
        <el-button size="mini">打印房态盘</el-button>
        <el-button size="mini">批量维修</el-button>
      </div>

      <!--房间统计数据-->

      <div class="roomData">

        <a href="javascript:;">叫醒</a>

        <span>当前入住率：32.79%</span>

        <span>当前入住人数：142人</span>

        <span>总房间数：433间</span>


      </div>

    </div>

  </div>
</template>
<script>
  import {mapGetters} from 'vuex'

  export default {
    name: '',
    data() {
      return {
        visible2: false,
        isActive: false,
        serviceList: [
          {
            label: '服务',
            value: 0,
          },
          {
            label: '账务',
            value: 1,
          },
          {
            label: '单据',
            value: 2,
          },
          {
            label: '订单',
            value: 3,
          }
        ],
        aboutRoomScreen: [
          {
            label: '入住信息',
            value: 0
          },
          {
            label: '远期房态',
            value: 1
          },
          {
            label: '房间日志',
            value: 2
          }
        ],
        roomState: 1,
        sizeList: [
          {
            label: '大',
            value: 0
          },
          {
            label: '中',
            value: 1
          },
          {
            label: '小',
            value: 2
          },
        ],
        changeTung: '',
        changeFloor: '',
        changeRoomType: '',
        serviceIndex: 0,
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
        showMoreOperation: false,
      }
    },
    computed: mapGetters([]),
    created() {
    },
    methods: {},
  }
</script>
<style scoped>

  #wrap {
    position: fixed;
    top: 146px;
    left: 0;
    bottom: 0;
    right: 0;
    overflow: auto;
    background-color: #fff;
    padding: 10px;
  }

  /*-----------左边-------*/

  .leftScreenCondition {
    float: left;
    border: 1px solid #008cfa;
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    border-radius: 5px;
    position: relative;
    margin-right: 25px;
    margin-bottom: 40px;
  }

  .leftScreenCondition > div > div {
    width: 238px;
  }

  .leftScreenCondition > div {
    width: 238px;
    transition: .3s;
    overflow: hidden;
    transition-timing-function: linear;
    -moz-transition-timing-function: linear; /* Firefox 4 */
    -webkit-transition-timing-function: linear; /* Safari 和 Chrome */
    -o-transition-timing-function: linear; /* Opera */
  }

  .leftScreenCondition.active > div {
    width: 0;
    margin-right: 0;
  }

  .leftScreenCondition > a {
    position: absolute;
    top: 50%;
    right: -21px;
    background-color: #ccc;
    height: 80px;
    width: 20px;
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
    margin-top: -40px;
  }

  .leftScreenCondition > a:before {
    position: absolute;
    top: 36px;
    left: 5px;
    content: '';
    width: 8px;
    height: 8px;
    border-top: 1px solid #fff;
    border-right: 1px solid #fff;
    -webkit-transform: rotate(-135deg);
    -moz-transform: rotate(-135deg);
    -ms-transform: rotate(-135deg);
    -o-transform: rotate(-135deg);
    transform: rotate(-135deg);
    transform-origin: 60% 50%;
    transition: .3s;
    transition-timing-function: linear;
    -moz-transition-timing-function: linear; /* Firefox 4 */
    -webkit-transition-timing-function: linear; /* Safari 和 Chrome */
    -o-transition-timing-function: linear; /* Opera */
  }

  .leftScreenCondition > a.active:before {
    -webkit-transform: rotate(45deg);
    -moz-transform: rotate(45deg);
    -ms-transform: rotate(45deg);
    -o-transform: rotate(45deg);
    transform: rotate(45deg);
  }

  .screenBox {
    padding: 10px;
    border-bottom: 1px solid #008cfa;
  }

  .readIdCard {
    display: inline-block;
    width: 30px;
    height: 28px;
    position: relative;
    background-color: #409EFF;
    -webkit-border-radius: 3px;
    -moz-border-radius: 3px;
    border-radius: 3px;
    vertical-align: top;
    margin: 0 3px;
  }

  .readIdCard:before {
    position: absolute;
    top: 4px;
    left: 4px;
    content: '';
    width: 20px;
    height: 20px;
    background: url("../../../../../assets/img/homePage/sfz.png") no-repeat;
    -webkit-background-size: 100% 100%;
    background-size: 100% 100%;
  }

  .inputQuery {
    padding-bottom: 20px;
  }

  .serviceOperations {
    border-bottom: 1px solid #ddd;
    font: 14px/20px "微软雅黑";
    margin-bottom: 10px;
  }

  .serviceOperations > a {
    float: left;
    border: 1px solid #ddd;
    margin-right: 3px;
    padding: 5px;
    color: #666;
    margin-bottom: -1px;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
  }

  .serviceOperations > a.active,
  .serviceOperations > a:hover {
    border-bottom-color: #fff;
    color: #409EFF;
  }

  .serviceInformations {
    font: 12px/16px "微软雅黑";
  }

  .serviceInformations > a {
    float: left;
    margin-bottom: 10px;
    margin-right: 10px;
    padding: 5px 15px;
    border: 1px solid #ddd;
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    border-radius: 5px;
    color: #666;
  }

  .guestRoomInfo {
    padding: 10px 10px 30px;
  }

  .roomMessage {
    font: bold 12px/17px "微软雅黑";
    color: #666;
    margin-bottom: 10px;
  }

  .roomMessage > span {
    float: left;
    margin-right: 20px;
  }

  .checkInInfo {
    font: bold 12px/16px "微软雅黑";
    color: #666;
  }

  .checkInInfo .fillLine {
    width: 100%;
  }

  .checkInInfo li {
    float: left;
    min-width: 50%;
    padding: 5px 3px 5px 0;
  }

  .checkInInfo strong {
    float: left;
  }

  .checkInInfo ul div {
    overflow: hidden;
  }

  .checkInInfo span {
    float: left;
    width: 100%;
  }

  .checkInInfo em {
    color: #409EFF;
  }

  .checkInInfo a {
    display: inline-block;
    margin-top: 20px;
    color: #409EFF;
  }

  .forwardRoomState .weekList {
    background-color: #f0f0f0;
    font: 14px/2 "微软雅黑";
    color: #666;
  }

  .forwardRoomState li {
    float: left;
    width: 14.2222%;
    text-align: center;
  }

  .forwardRoomState .daysList {
    color: #999;
    font: 13px/19px "微软雅黑";
    box-shadow: -1px 1px 0px #999;
  }

  .forwardRoomState .daysList li {
    box-shadow: 1px 1px 0px #999;
  }

  .forwardRoomState .daysList strong,
  .forwardRoomState .daysList span {
    display: block;
  }

  /*---------右边--------*/

  section {
    overflow: hidden;
    margin-bottom: 45px;
    height: 100%;
  }

  section > div {
    float: left;
    width: 100%;
    height: 100%;
    padding: 10px;
    border: 1px solid #ddd;
    position: relative;
  }

  .guestRoomInfoList {
    position: relative;
    z-index: 3;
    padding-bottom: 10px;
  }

  .guestPosition {
    color: #666;
    font: bold 13px/28px "微软雅黑";
    padding-bottom: 10px;
  }

  .guestPosition > div {
    float: left;
    margin-right: 20px;
  }

  .guestPosition > div > span {
    float: left;
    margin-right: 5px;
  }

  .guestRoomState,
  .otherOperation {
    font: 13px/28px "微软雅黑";
    border-bottom: 1px solid #ddd;
    padding-bottom: 10px;
  }

  .guestRoomState *,
  .otherOperation * {
    float: left;
  }

  .guestRoomState > div,
  .otherOperation > div {
    border: 1px solid #ccc;
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    border-radius: 5px;
  }

  .guestRoomState > strong,
  .otherOperation > span {
    margin-right: 5px;
    color: #666;
    font-weight: bold;
    white-space: pre-wrap;
  }

  .guestRoomState a,
  .otherOperation a {
    padding: 0 20px;
    border-right: 1px solid #ccc;
  }

  .guestRoomState a:last-of-type,
  .otherOperation a:last-of-type {
    border-right: none;
  }

  .guestRoomMoreOperation {
    position: absolute;
    right: -10px;
    bottom: 0;
    left: -10px;
    transform: translateY(100%);
    padding: 0px;
    background-color: rgb(255, 255, 255);
  }

  .guestRoomMoreOperationBox {
    height: 0;
    overflow: hidden;
  }

  .guestRoomMoreOperation.active {
    padding: 10px;
  }

  .guestRoomMoreOperation.active > .guestRoomMoreOperationBox {
    overflow: visible;
    height: 100%;
  }

  .otherOperation {
    border-bottom: none;
  }

  .guestRoomOpeartionBtn {
    position: absolute;
    bottom: 20px;
    right: 10px;
    font: 13px/28px "微软雅黑";
  }

  .guestRoomOpeartionBtn a {
    display: inline-block;
    margin-right: 10px;
  }

  .moreOperationIcon {
    display: inline-block;
    width: 7px;
    height: 7px;
    border-top: 1px solid #999;
    border-right: 1px solid #999;
    -webkit-transform: rotate(135deg);
    -moz-transform: rotate(135deg);
    -ms-transform: rotate(135deg);
    -o-transform: rotate(135deg);
    transform: rotate(135deg);
    transform-origin: 75% 40%;
    vertical-align: middle;
    -webkit-transition: .3s;
    -moz-transition: .3s;
    -ms-transition: .3s;
    -o-transition: .3s;
    transition: .3s;
    transition-timing-function: linear;
    -moz-transition-timing-function: linear; /* Firefox 4 */
    -webkit-transition-timing-function: linear; /* Safari 和 Chrome */
    -o-transition-timing-function: linear; /* Opera */
    margin-left: 5px;
  }

  .guestRoomMoreOperation.active .moreOperationIcon {
    -webkit-transform: rotate(-45deg);
    -moz-transform: rotate(-45deg);
    -ms-transform: rotate(-45deg);
    -o-transform: rotate(-45deg);
    transform: rotate(-45deg);
  }

  /*房间操作*/

  .roomBasicsOperation {
    position: fixed;
    bottom: 0px;
    left: 0px;
    width: 100%;
    height: 50px;
    background-color: #fff;
    border-top: 1px solid #ddd;
    padding: 10px;
  }

  .roomSetting {
    float: left;
  }

  .roomSetting span {
    display: inline-block;
    font: 12px/30px "微软雅黑";
    margin-right: 10px;
    color: #666;
  }

  .roomData {
    float: right;
    font: 12px/30px "微软雅黑";
  }

  .roomData > * {
    float: right;
    color: #666;
    margin-left: 10px;
  }

  .roomData > a {
    padding-left: 15px;
    position: relative;
  }

  .roomData > a:before {
    position: absolute;
    content: '';
    left: 0;
    top: 8px;
    width: 14px;
    height: 14px;
    background: url("../../../../../assets/img/homePage/timeIcon.png") no-repeat;
    -webkit-background-size: 100% 100%;
    background-size: 100% 100%;
  }

  .guestRoomShowInfoList {
    position: absolute;
    top: 100px;
    bottom: 10px;
    right: 10px;
    left: 10px;
    overflow: auto;
  }

  .TungFloorList > li {
    border-bottom: 1px solid #ddd;
    padding: 10px 0;
  }

  .TungFloorList > li:last-of-type {
    border-bottom: none;
  }

  .TungFloorList > li > strong {
    font: bold 12px/18px "微软雅黑";
    color: #666;
    display: block;
    margin-bottom: 10px;
  }

  .floorRoomList {
    color: #fff;
  }

  .floorRoomList li {
    float: left;
    margin: 10px;
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    border-radius: 5px;
    padding: 3px;
    position: relative;
    cursor: pointer;
  }

  .floorRoomList.big li {
    width: 153px;
    height: 110px;
    font: 14px/20px "微软雅黑";
  }

  .floorRoomList.middle li {
    width: 128px;
    height: 100px;
    font: 13px/18px "微软雅黑";
  }

  .floorRoomList.small li {
    width: 110px;
    height: 80px;
    font: 12px/16px "微软雅黑";
  }

  .emptyNet {
    background-color: rgb(143, 195, 31);
  }

  .emptyDirty {
    background-color: rgb(250, 190, 60);
  }

  .liveNet {
    background-color: rgb(16, 160, 255);
  }

  .liveDirty {
    background-color: rgb(201, 160, 99);
  }

  .roomRepair {
    background-color: rgb(181, 28, 73);
  }

  .floorRoomList > li > strong {
    display: block;
    white-space: nowrap;
  }

  .floorRoomList .iconBox > * {
    display: inline-block;
    vertical-align: top;
    margin-right: 3px;
  }

  .floorRoomList.big .iconBox > i {
    width: 30px;
    height: 30px;
  }

  .floorRoomList.middle .iconBox > i {
    width: 23px;
    height: 23px;
  }

  .floorRoomList.small .iconBox > i {
    width: 15px;
    height: 15px;
  }

  .floorRoomList .iconBox {
    text-align: center;
    margin-top: 15px;
  }

  .floorRoomList .iconBox > span {
    float: right;
    text-align: right;
    white-space: nowrap;
  }

  .floorRoomList.big .iconBox > span {
    line-height: 30px;
  }

  .floorRoomList.middle .iconBox > span {
    line-height: 23px;
  }

  .floorRoomList.small .iconBox > span {
    line-height: 15px;
  }

  .boyIcon {
    background: url(../../../../../assets/img/homePage/boyIcon.png) no-repeat;
    -webkit-background-size: 100% 100%;
    background-size: 100% 100%;
  }

  .girlIcon {
    background: url(../../../../../assets/img/homePage/girlIcon.png) no-repeat;
    -webkit-background-size: 100% 100%;
    background-size: 100% 100%;
  }

  .jointHousingIcon {
    background: url(../../../../../assets/img/homePage/jointHousingIcon.png) no-repeat;
    -webkit-background-size: 100% 100%;
    background-size: 100% 100%;
  }

  .lockIcon {
    background: url(../../../../../assets/img/homePage/lockIcon.png) no-repeat;
    -webkit-background-size: 100% 100%;
    background-size: 100% 100%;
  }

  .clearIcon {
    background: url(../../../../../assets/img/homePage/clearIcon.png) no-repeat;
    -webkit-background-size: 100% 100%;
    background-size: 100% 100%;
  }

  .repairIcon {
    background: url(../../../../../assets/img/homePage/repairIcon.png) no-repeat;
    -webkit-background-size: 100% 100%;
    background-size: 100% 100%;
  }

  .bookIcon {
    background: url(../../../../../assets/img/homePage/bookIcon.png) no-repeat;
    -webkit-background-size: 100% 100%;
    background-size: 100% 100%;
  }

  .floorRoomList > li > p {
    text-align: center;
    margin-top: 10px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }

  .floorRoomList > li.active .shaowBox {
    z-index: -1;
    position: absolute;
    top: -5px;
    left: -5px;
    right: -5px;
    bottom: -5px;
    background-image: -webkit-linear-gradient(45deg, rgba(181, 181, 181, 1) 25%, transparent 25%, transparent 50%, rgba(181, 181, 181, 1) 50%, rgba(181, 181, 181, 1) 75%, transparent 75%, transparent);
    background-image: -moz-linear-gradient(45deg, rgba(181, 181, 181, 1) 25%, transparent 25%, transparent 50%, rgba(181, 181, 181, 1) 50%, rgba(181, 181, 181, 1) 75%, transparent 75%, transparent);
    background-image: linear-gradient(45deg, rgb(181, 181, 181) 25%, transparent 25%, transparent 50%, rgb(181, 181, 181) 50%, rgb(181, 181, 181) 75%, transparent 75%, transparent);
    -webkit-animation: barberpole 0.5s linear infinite;
    -moz-animation: barberpole 0.5s linear infinite;
    animation: barberpole 0.5s linear infinite;
    transition: opacity 0.3s ease;
    background-size: 30px 30px;
  }

  @keyframes barberpole {
    0% {
      background-position: 0 0;
    }
    100% {
      background-position: 60px 30px;
    }
  }

  .pointer {
    cursor: pointer;
  }

  .roomWeekPrice {
    font: 16px/3 "微软雅黑";
    background-color: #f0f0f0;
    color: #666;
  }

  .roomWeekPrice > li {
    float: left;
    width: 100px;
    text-align: center;
  }

  .roomDaysPrice > li {
    float: left;
    font: 14px/1.5 "微软雅黑";
    width: 100px;
    padding: 5px 0;
    height: 52px;
  }

  .roomDaysPrice strong {
    display: block;
    text-align: center;
    color: #666;
  }

  .roomDaysPrice span {
    display: block;
    text-align: center;
    color: #409EFF;
  }

  .hardwareTitle {
    width: 250px;
    font: 12px/20px "微软雅黑";
    color: #666;
  }

  .hardwareTitle > strong {
    display: block;
    border-bottom: 1px solid #666;
    font-weight: bold;
  }

  .hardwareList > li {
    float: left;
    width: 100%;
    line-height: 18px;
    padding: 5px 0;
    border-bottom: 1px solid #f0f0f0;
  }

  .hardwareList strong {
    float: left;
    width: 60%;
    text-align: center;
  }

  .hardwareList span {
    float: left;
    width: 40%;
    text-align: center;
  }

  .hardwareList > li:first-of-type {
    font-weight: bold;
  }

</style>