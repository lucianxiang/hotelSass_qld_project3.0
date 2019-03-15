<template>
  <div>
    <div class="titleStrip">
      <strong>房型维护</strong>
    </div>
    <!--查询-->
    <el-form ref="form" :model="options" label-width="80px" inline>
      <el-form-item>
        <span>筛选:</span>
      </el-form-item>
      <el-form-item>
        <el-input v-model="options.Name" size="mini" placeholder="房型名称"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button size="mini" type="primary">查 询</el-button>
        <el-button size="mini" icon="el-icon-plus" type="success">添 加</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="roomList" style="width: 100%" size="mini">
      <el-table-column prop="Name" label="房型" width="130"></el-table-column>
      <el-table-column prop="ShortName" label="简称" width="100"></el-table-column>
      <el-table-column prop="StardandPrice" label="门市价" width="100"></el-table-column>
      <el-table-column prop="CanOverCount" label="可超预订数" width="100"></el-table-column>
      <el-table-column prop="FrontMoney" label="押金" width="100"></el-table-column>
      <el-table-column prop="BedCount" label="床位数" width="100"></el-table-column>
      <el-table-column prop="CanInCount" label="可入住人数" width="100"></el-table-column>
      <el-table-column prop="BreakCount" label="早餐券数" width="100"></el-table-column>
      <el-table-column prop="IsOpen" label="状态" width="100"></el-table-column>
      <el-table-column prop="Remark" label="备注" width="100"></el-table-column>
      <el-table-column prop="name" label="操作" width="100"></el-table-column>
    </el-table>
  </div>
</template>
<script>
  import {mapGetters} from 'vuex'

  export default {
    computed: mapGetters([
      'queryObj',
      'roomTypeList'
    ]),
    data() {
      return {
        roomList:[],
        options: {
          "Token": "",
          "PageIndex": 1,//页码
          "PageSize": 10,//每页显示张数
          "HotelId": "",//酒店编码
          "Name": "",//房型名称
          "IsOpen": 0,//启用状态(0未启用 1已启用)
        },
      }
    },
    created() {

      if( this.queryObj.token ){
        this.options.Token = this.queryObj.token;
        this.options.HotelId = this.queryObj.hotelID;
      }

      this.initData();


    },
    methods: {
      initData() {
        this.$store.dispatch('initRoomType',this.options)
        .then(data=>{
          this.roomList = data;
          console.log(data);
        },err=>{
          console.log(err);
          
        })
      },
      search() {
        this.initData()
      }
    },
  }
</script>
<style scoped>
</style>