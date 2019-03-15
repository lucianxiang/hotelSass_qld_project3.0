<template>
  <div>
    <div  class="headNav">
      <el-menu style="padding-left: 40%;" align="center" :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
        <el-menu-item :index="index+''" v-for="item,index in navList" :key="index">{{item.navName}}</el-menu-item>
      </el-menu>
      <div v-show="navIndex==0" class="content">
        <RoomStateCalendar></RoomStateCalendar>
      </div>
      <div v-show="navIndex==1" class="content">
        <RoomStateSummarySheet></RoomStateSummarySheet>
      </div>
      <div v-show="navIndex==2" class="content">
        <RoomDetailTabel></RoomDetailTabel>
      </div>
    </div>
  </div>
</template>
<script>
    import {mapGetters} from 'vuex'
    import RoomDetailTabel from './RoomDetailTabel'
    import RoomStateCalendar from './RoomStateCalendar'
    import RoomStateSummarySheet from './RoomStateSummarySheet'
    export default{
        components:{
            RoomDetailTabel,
            RoomStateCalendar,
            RoomStateSummarySheet
        },
        name: '',
        data(){
            return {
                activeName:'房态日历',
                activeIndex: '0',
                navIndex: 0,
                navList:[
                    {navName:'房态日历'},
                    {navName:'房型汇总表'},
                    {navName:'房间明细表'},
                ],
            }
        },
        computed: mapGetters([]),
        created(){
        },
        methods: {
            handleSelect(key, keyPath) {
                console.log(111,typeof key,key, keyPath);
                switch (key){
                    case "0" :
                        console.log(0)
                        this.navIndex=0;
                        return;
                    case "1" :
                        this.navIndex=1;
                        return;
                    case "2" :
                        console.log(2)
                        this.navIndex=2;
                        return;
                };
            },
        },
    }
</script>
<style scoped>
.content{
  padding: 20px;
}
</style>