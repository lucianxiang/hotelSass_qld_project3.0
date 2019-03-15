<template>
  <div>
    <div class="titleStrip">
      <strong>券查询</strong>
    </div>
    <!--券类型-->
    <el-form size="small" style="height: 40px;" :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="券类型:">
        <el-button-group>
          <el-button plain v-for="item , index in ticketTypeList" :key="index">{{item.ticketTypeName}}</el-button>
        </el-button-group>
      </el-form-item>
    </el-form>
    <!--券状态-->
    <el-form size="small" style="height: 40px;" :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="券状态:">
        <el-button-group>
          <el-button plain v-for="item , index in ticketStateList" :key="index">{{item.ticketStateName}}</el-button>
        </el-button-group>
      </el-form-item>
    </el-form>
    <!--会员名-->
    <el-form size="small" :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="会员名:">
        <el-input style="width:150px;" size="small" v-model="formInline.user"></el-input>
      </el-form-item>
      <el-form-item label="会员卡号:">
        <el-input style="width:150px;" size="small" v-model="formInline.user"></el-input>
      </el-form-item>
      <el-form-item label="券名:">
        <el-select style="width:150px;" size="small" v-model="formInline.region" placeholder="所有类型">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="券号:">
        <el-input style="width:150px;" size="small" v-model="formInline.user"></el-input>
      </el-form-item>
    </el-form>
    <!--获得日期-->
    <el-form size="small" :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="获得日期:">
        <div class="dateLabelChoice">
          <el-date-picker
            size="small"
            v-model="values6"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>
        </div>
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
        label="券名"
        width="180">
      </el-table-column>
      <el-table-column
        prop="name"
        label="券号"
        width="180">
      </el-table-column>
      <el-table-column
        prop="address"
        label="券类型">
      </el-table-column>
      <el-table-column
        prop="address"
        label="优惠额度">
      </el-table-column>
      <el-table-column
        prop="address"
        label="有效期">
      </el-table-column>
      <el-table-column
        prop="address"
        label="所属会员名">
      </el-table-column>
      <el-table-column
        prop="address"
        label="获得日期">
      </el-table-column>
      <el-table-column
        prop="address"
        label="状态">
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
          {ticketTypeName: "全部"},
          {ticketTypeName: "无门槛券"},
          {ticketTypeName: "赠房券"},
        ],
        ticketStateList: [
          {ticketStateName: "全部"},
          {ticketStateName: "未获取"},
          {ticketStateName: "未使用"},
          {ticketStateName: "占用中"},
          {ticketStateName: "已作废"},
          {ticketStateName: "已过期"},
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