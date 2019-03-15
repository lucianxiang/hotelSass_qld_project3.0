<template>
    <div>
        <div class="titleStrip">
            <strong>积分查询</strong>
        </div>
        <!--消费时间-->
        <el-form style="height: 40px;" :inline="true" :model="formInline" class="demo-form-inline">
            <el-form-item label="消费时间:" >
                <el-radio @change="custom(item,index)" v-for="item ,index in costTimeList" :key="index" v-model="radio" :label="index+''">{{item.typeName}}</el-radio>
                <el-date-picker
                        v-show="dateIsShow"
                        size="small"
                        v-model="value6"
                        type="daterange"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期">
                </el-date-picker>
            </el-form-item>
        </el-form>
        <!--操作类型-->
        <el-form style="height: 40px;" :inline="true" :model="formInline" class="demo-form-inline">
            <el-form-item label="操作类型:">
                <el-select style="width:150px;" size="small" v-model="formInline.region" placeholder="全部">
                    <el-option label="区域一" value="shanghai"></el-option>
                    <el-option label="区域二" value="beijing"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="会员卡号:">
                <el-input style="width:150px;" size="small" v-model="formInline.user"></el-input>
            </el-form-item>
            <el-form-item label="姓名:">
                <el-input style="width:150px;" size="small" v-model="formInline.user"></el-input>
            </el-form-item>
            <el-form-item label="手机:">
                <el-input style="width:150px;" size="small" v-model="formInline.user"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button size="small" type="primary" @click="onSubmit">查询</el-button>
            </el-form-item>
            <el-form-item>
                <el-button plain size="small">读会员卡</el-button>
            </el-form-item>
        </el-form>
        <!--列表-->
        <el-table
                :data="tableData"
                style="width: 100%">
            <el-table-column
                    prop="date"
                    label="卡号"
                    width="180">
            </el-table-column>
            <el-table-column
                    prop="name"
                    label="姓名"
                    width="180">
            </el-table-column>
            <el-table-column
                    prop="address"
                    label="手机">
            </el-table-column>
            <el-table-column
                    prop="address"
                    label="增加">
            </el-table-column>
            <el-table-column
                    prop="address"
                    label="扣除">
            </el-table-column>
            <el-table-column
                    prop="address"
                    label="发生日期">
            </el-table-column>
            <el-table-column
                    prop="address"
                    label="操作员">
            </el-table-column>
            <el-table-column
                    prop="address"
                    label="发生门店">
            </el-table-column>
            <el-table-column
                    prop="address"
                    label="备注">
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
                    {typeName:"不限"},
                    {typeName:"今日"},
                    {typeName:"昨日"},
                    {typeName:"本周"},
                    {typeName:"本月"},
                    {typeName:"自定义"},
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