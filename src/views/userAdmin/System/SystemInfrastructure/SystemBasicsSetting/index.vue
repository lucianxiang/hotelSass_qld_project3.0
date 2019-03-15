<template>
  <div>
    <!--导航菜单-->
    <el-menu router :default-active="this.$route.path" class="el-menu-demo" mode="horizontal" @select="handleSelect">
      <el-menu-item :index="item.navName" v-for="item,index in navList" :key="index" >{{item.navItem}}</el-menu-item>
    </el-menu>
    <!--    &lt;!&ndash;分隔条&ndash;&gt;
        <div class="dividingStrip"></div>
        &lt;!&ndash;电费计费&ndash;&gt;
        <el-form style="margin-top: 20px;" size="small" :inline="true" :model="formInline" class="demo-form-inline">
          <el-form-item label="电费计费:" labelWidth="150px">
            <el-button-group>
              <el-button plain>普通计费</el-button>
              <el-button plain>阶梯计费</el-button>
            </el-button-group>
          </el-form-item>
        </el-form>-->
    <router-view name="energyBase"></router-view>
  </div>
</template>
<script>
  import {mapGetters} from 'vuex'

  export default {
    computed: mapGetters([]),
    data() {
      return {
        routerViewName:"",
        navList:[
          {navId:1,navItem:"电表",navName:'/system/systemInfrastructure/SystemBasicsSetting/Ammeter'},
          {navId:2,navItem:"水表",navName:'/system/systemInfrastructure/WaterMeter'},
          {navId:3,navItem:"气表",navName:'/system/systemInfrastructure/GasMeter'},
          {navId:4,navItem:"配置费用",navName:'/system/systemInfrastructure/ConfigCost'},
        ],
        formInline: {
          user: '',
          region: ''
        },
      }
    },
    methods: {
      initData() {
      },
      handleSelect(key, keyPath) {
        switch (Number(key)){
          case 0:
            this.$router.push({name:"Ammeter"});
            break;
          case 1:
            this.$router.push({name:"WaterMeter"});
            break;
          case 2:
            this.$router.push({name:"GasMeter"});
            break;
          case 3:
            this.$router.push({name:"ConfigCost"});
            break;
        }
      },
      search() {
        this.initData()
      },
      clickNav(item,index){
        switch (item.navId){
          case 1:
            this.$router.push({name:"SystemBasicsSetting"})
            break;
        }
      },
    },
  }
</script>
<style scoped>
  .dividingStrip{
    height: 18px;
    width: 100%;
    border: 1px solid #d2eafb;
    background-color: #ecf6fd;
    border-radius: 4px;
    margin-top: 20px;
  }














</style>