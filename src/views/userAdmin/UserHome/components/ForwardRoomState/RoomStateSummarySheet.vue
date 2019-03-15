<template>
  <div>
    <div>
      <!--订单类型-->
      <div class="orderType">订单类型:</div>
      <ul class="detailOrderList clearfix">
        <li v-for="item,index in 30"
            :key="index"
            @click.stop="clickOrderType(item,index)"
            :class="{orderTypeActive:orderTypeIndex==index}">所有
        </li>
      </ul>
      <!--时间筛选-->
      <div class="timeSelect clearfix">
        <div>时间筛选:</div>
        <el-radio
          style="height:40px; line-height:40px;float:left;"
          v-model="radio"
          v-for="item,index in selectList"
          :key="index"
          :label="index+''"
          @change="radioChange(item,index)"
        >{{item.selectName}}
        </el-radio>
        <el-date-picker
          style="float:left;"
          size="small"
          v-show="dateIsShow"
          v-model="value6"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期">
        </el-date-picker>
        <el-button style="float:left;margin-top: 10px;margin-left: 20px;" type="primary" size="mini">查询</el-button>
      </div>
    </div>
    <!--表数据-->
    <el-table
      :data="tableData6"
      :span-method="objectSpanMethod"
      border
      style="width: 100%; margin-top: 20px">
      <el-table-column
        prop="id"
        label="ID"
        width="180">
      </el-table-column>
      <el-table-column
        prop="name"
        label="姓名">
      </el-table-column>
      <el-table-column
        prop="amount1"
        label="数值 1（元）">
      </el-table-column>
      <el-table-column
        prop="amount2"
        label="数值 2（元）">
      </el-table-column>
      <el-table-column
        prop="amount3"
        label="数值 3（元）">
      </el-table-column>
    </el-table>
    <!--数据标题-->
    <div class="dataTitle clearfix">
      <div class="dataTitleLeftBox">房态与客户类型交叉分析 (所有房型)</div>
      <div class="dataTitleRightBox">房态与订单类型交叉分析 (所有房型)</div>
    </div>
    <!--echarts-->
    <div id="main" style="width: 600px;height:400px;"></div>
  </div>
</template>
<script>
  import {mapGetters} from 'vuex'

  export default {
    name: '',
    components: {},
    beforeRouteLeave(to, from, next) {
      next()
    },
    watch: {
      //监听路由
      '': 'route',
      //方法
      watchMethods() {
      },
    },
    conputed: Object.assign({}, mapGetters([])),
    data() {
      return {
        orderTypeIndex: 1,
        value6: '',
        dateIsShow: false,
        radio: '1',
        selectList: [
          {selectName: '7天'},
          {selectName: '30天'},
          {selectName: '自定义'},
        ],
        tableData6: [{
          id: '12987122',
          name: '王小虎',
          amount1: '234',
          amount2: '3.2',
          amount3: 10
        }, {
          id: '12987123',
          name: '王小虎',
          amount1: '165',
          amount2: '4.43',
          amount3: 12
        }, {
          id: '12987124',
          name: '王小虎',
          amount1: '324',
          amount2: '1.9',
          amount3: 9
        }, {
          id: '12987125',
          name: '王小虎',
          amount1: '621',
          amount2: '2.2',
          amount3: 17
        }, {
          id: '12987126',
          name: '王小虎',
          amount1: '539',
          amount2: '4.1',
          amount3: 15
        }],
      }
    },
    methods: {
      initEcharts() {
        console.log(1)
      },
      route(to, from) {
        console.log(to, from)
      },
      clickOrderType(item, index) {
        this.orderTypeIndex = index;
      },
      radioChange(item, index) {
        if (index == 2) {
          this.dateIsShow = true;
        } else if (index == 0) {
          this.dateIsShow = false;
        } else if (index == 1) {
          this.dateIsShow = false;
        }
        ;
        console.log(index)
      },
      arraySpanMethod({row, column, rowIndex, columnIndex}) {
        if (rowIndex % 2 === 0) {
          if (columnIndex === 0) {
            return [1, 2];
          } else if (columnIndex === 1) {
            return [0, 0];
          }
        }
      },

      objectSpanMethod({row, column, rowIndex, columnIndex}) {
        if (columnIndex === 0) {
          if (rowIndex % 2 === 0) {
            return {
              rowspan: 2,
              colspan: 1
            };
          } else {
            return {
              rowspan: 0,
              colspan: 0
            };
          }
        }
      },
    },
    created() {
      this.initEcharts();
    },
    mounted() {


    },
  }
</script>
<style scoped>
  .orderType {
    font-size: 14px;
    color: rgba(0, 0, 0, 0.65);
    margin-bottom: 2px;
  }

  .timeSelect > div {
    float: left;
    height: 50px;
    line-height: 50px;
    margin-right: 10px;
    color: rgba(0, 0, 0, 0.65);
  }

  .detailOrderList > li {
    float: left;
    padding: 8px 10px;
    border: 1px solid #dbdbdb;
    height: 30px;
    font-size: 14px;
    line-height: 14px;
    text-align: center;
    color: rgba(0, 0, 0, 0.65);
    border-radius: 4px;
    margin-right: 3px;
    margin-bottom: 2px;
  }

  .detailOrderList > li.orderTypeActive {
    color: #108ee9;
    border: 1px solid #108ee9;
  }

  .dataTitle {
    margin-top: 20px;
  }

  .dataTitleLeftBox {
    float: left;
    border-bottom: 1px solid #e8e8e8;
    width: 48%;
    line-height: 40px;
    margin-right: 2%;
  }

  .dataTitleRightBox {
    float: left;
    border-bottom: 1px solid #e8e8e8;
    width: 48%;
    line-height: 40px;
    margin-right: 2%;
  }

  .timeSelect > div {
    float: left;
    height: 50px;
    line-height: 50px;
    margin-right: 10px;
    color: rgba(0, 0, 0, 0.65);
  }

  .detailOrderList > li {
    float: left;
    padding: 8px 10px;
    border: 1px solid #dbdbdb;
    height: 30px;
    font-size: 14px;
    line-height: 14px;
    text-align: center;
    color: rgba(0, 0, 0, 0.65);
    border-radius: 4px;
    margin-right: 3px;
    margin-bottom: 2px;
  }

  .detailOrderList > li.orderTypeActive {
    color: #108ee9;
    border: 1px solid #108ee9;
  }
</style>
