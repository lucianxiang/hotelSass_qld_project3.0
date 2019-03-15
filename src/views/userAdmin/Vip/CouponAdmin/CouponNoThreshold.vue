<template>
  <div>
    <div class="titleStrip">
      <strong>无门槛券</strong>
    </div>
    <!--状态-->
    <el-form style="height: 40px;" :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="状态:" >
        <el-radio @change="custom(item,index)" v-for="item ,index in costTimeList" :key="index" v-model="radio" :label="index+''">{{item.typeName}}</el-radio>
        <el-button size="small" type="primary" @click="onSubmit">查询</el-button>
      </el-form-item>
    </el-form>
    <!--列表-->
    <el-table
            :data="tableData"
            style="width: 100%">
      <el-table-column
              prop="date"
              label="名称"
              width="180">
      </el-table-column>
      <el-table-column
              prop="name"
              label="有效期"
              width="180">
      </el-table-column>
      <el-table-column
              prop="address"
              label="优惠额度">
      </el-table-column>
      <el-table-column
              prop="address"
              label="剩余量/数量">
      </el-table-column>
      <el-table-column
              prop="address"
              label="获得次数/人数">
      </el-table-column>
      <el-table-column
              prop="address"
              label="已使用">
      </el-table-column>
      <el-table-column
              prop="address"
              label="状态">
      </el-table-column>
      <el-table-column
              fixed="right"
              label="操作"
              width="100">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small">详情</el-button>
          <el-button type="text" size="small">发放</el-button>
        </template>
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
                dateIsShow:false,
                radio: '0',
                value6: '',
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
                costTimeList:[
                    {typeName:"全部"},
                    {typeName:"正常"},
                    {typeName:"已失效"},
                    {typeName:"已过期"},
                ],
            }
        },
        methods: {
            initData() {
            },
            custom(item,index){
                console.log(111,index)
                if(index==5){
                    this.dateIsShow=true;
                }else{
                    this.dateIsShow=false;
                }
            },
            handleClick(row) {
                console.log(row);
            },
            onSubmit() {
                console.log('submit!');
            },
            search() {
                this.initData()
            }
        },
    }
</script>
<style scoped>
</style>