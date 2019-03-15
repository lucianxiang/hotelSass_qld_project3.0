<template>
    <div>
        <div class="titleStrip">
            <strong>会员信息管理</strong>
        </div>
        <!--表单-->
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
            <el-form-item label="会员类型:">
                <el-select style="width:150px;" size="small" v-model="formInline.region" placeholder="所有类型">
                    <el-option label="区域一" value="shanghai"></el-option>
                    <el-option label="区域二" value="beijing"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="手机:">
                <el-input style="width:150px;" size="small" v-model="formInline.user"></el-input>
            </el-form-item>
            <el-form-item label="卡号:">
                <el-input style="width:150px;" size="small" v-model="formInline.user"></el-input>
            </el-form-item>
            <el-form-item label="姓名:">
                <el-input style="width:150px;" size="small" v-model="formInline.user"></el-input>
            </el-form-item>
            <el-form-item label="状态:">
                <el-select size="small" style="width:80px;" v-model="formInline.region" placeholder="正常">
                    <el-option label="区域一" value="shanghai"></el-option>
                    <el-option label="区域二" value="beijing"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button size="small" type="primary" @click="onSubmit">查询</el-button>
            </el-form-item>
            <el-form-item>
                <el-button plain size="small">读会员卡</el-button>
            </el-form-item>
            <el-form-item>
                <el-button size="small" type="primary" @click="onSubmit">新增</el-button>
            </el-form-item>
            <el-form-item>
                <el-button size="small" type="primary" @click="onSubmit">下载模板</el-button>
            </el-form-item>
            <el-form-item>
                <el-button size="small" plain icon="el-icon-upload2">导入</el-button>
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
                    label="会员类型">
            </el-table-column>
            <el-table-column
                    prop="address"
                    label="手机号">
            </el-table-column>
            <el-table-column
                    prop="address"
                    label="剩余积分">
            </el-table-column>
            <el-table-column
                    prop="address"
                    label="可用余额">
            </el-table-column>
            <el-table-column
                    prop="address"
                    label="消费次数">
            </el-table-column>
            <el-table-column
                    prop="address"
                    label="状态">
            </el-table-column>
            <el-table-column
                    prop="address"
                    label="开卡酒店">
            </el-table-column>
            <el-table-column
                    prop="address"
                    label="开卡日期">
            </el-table-column>
            <el-table-column
                    fixed="right"
                    label="操作"
                    >
                <template slot-scope="scope">
                    <div class="copBox clearfix">
                        <div><el-button @click="handleClick(scope.row)" type="text" size="small">详情</el-button></div>
                        <div></div>
                        <div><el-button type="text" size="small">修改</el-button></div>
                        <div></div>
                        <div><el-dropdown>
  <span class="el-dropdown-link">
    更多<i class="el-icon-arrow-down el-icon--right"></i>
  </span>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item>充值</el-dropdown-item>
                                <el-dropdown-item>拉黑</el-dropdown-item>
                                <el-dropdown-item>发票抬头</el-dropdown-item>
                                <el-dropdown-item>收件信息</el-dropdown-item>
                                <el-dropdown-item>出行人</el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
                        </div>
                    </div>
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
    .el-dropdown-link {
        cursor: pointer;
        color: #409EFF;
        font: 500 12px/14px '微软雅黑';
    }
    .el-icon-arrow-down {
        font-size: 12px;
    }
    .copBox>div{
        float: left;
    }
    .copBox>div:nth-of-type(2),
    .copBox>div:nth-of-type(4){
        float: left;
        border-left: 1px solid #439ad9;
        height: 12px;
        margin: 10px 5px 0px 5px;
    }
    .copBox>div:nth-of-type(5){
        padding-top: 3px;
    }
</style>