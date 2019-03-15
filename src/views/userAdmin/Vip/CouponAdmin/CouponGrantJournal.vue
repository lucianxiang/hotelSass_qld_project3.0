<template>
  <div>
    <div class="titleStrip">
      <strong>发放日志</strong>
    </div>
    <!--发券日期-->
    <el-form size="small" style="height: 40px;" :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="发券日期:">
        <el-button-group>
          <el-button plain v-for="item , index in ticketTypeList" :key="index">{{item.ticketTypeName}}</el-button>
        </el-button-group>
      </el-form-item>
    </el-form>
    <!--券类型-->
    <el-form size="small" style="height: 40px;" :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="券状态:">
        <el-button-group>
          <el-button plain v-for="item , index in ticketStateList" :key="index">{{item.ticketStateName}}</el-button>
        </el-button-group>
      </el-form-item>
      <el-form-item>
        <el-button size="small" type="primary" @click="onSubmit">查询</el-button>
      </el-form-item>
    </el-form>
    <!--列表-->
    <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        prop="date"
        label="券名称"
        width="180">
      </el-table-column>
      <el-table-column
        prop="name"
        label="券类型"
        width="180">
      </el-table-column>
      <el-table-column
        prop="address"
        label="发放日期">
      </el-table-column>
      <el-table-column
        prop="address"
        label="操作人">
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
  import {mapGetters} from 'vuex'

  export default {
    computed: mapGetters([]),
    data() {
      return {
        ticketTypeList: [
          {ticketTypeName: "本周"},
          {ticketTypeName: "本月"},
          {ticketTypeName: "自定义"},
        ],
        ticketStateList: [
          {ticketStateName: "无门槛"},
          {ticketStateName: "赠房券"},
        ],
        formInline: {
          user: '',
          region: ''
        },
        tableData: [{
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
      }
    },
    methods: {
      initData() {
      },
      search() {
        this.initData()
      }
    },
  }
</script>
<style scoped>
</style>