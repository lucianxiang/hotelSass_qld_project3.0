<template>
  <div>
    <div class="titleStrip">
      <strong>操作日志</strong>
    </div>
    <!--表单-->
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="卡号:">
        <el-input style="width:150px;" size="small" v-model="formInline.user"></el-input>
      </el-form-item>
      <el-form-item label="会员手机:">
        <el-input style="width:150px;" size="small" v-model="formInline.user"></el-input>
      </el-form-item>
      <el-form-item label="操作类型:">
        <el-select style="width:150px;" size="small" v-model="formInline.region" placeholder="全部">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="日期:">
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
              label="日期"
              width="180">
      </el-table-column>
      <el-table-column
              prop="name"
              label="姓名"
              width="180">
      </el-table-column>
      <el-table-column
              prop="address"
              label="地址">
      </el-table-column>
    </el-table>
    <!--分页-->
    <el-pagination
            background
            layout="prev, pager, next"
            :total="1000">
    </el-pagination>
  </div>
</template>
<script>
    import {mapGetters} from 'vuex'

    export default {
        computed: mapGetters([]),
        data() {
            return {
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
            },
            onSubmit() {
                console.log('submit!');
            },
        },
    }
</script>
<style scoped>
</style>