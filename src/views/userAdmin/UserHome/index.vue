<template>
  <div>
    <el-tabs v-model="activeName" type="card">
      <el-tab-pane label="实时房态" name="实时房态">
        <RealTimeRoomState></RealTimeRoomState>
      </el-tab-pane>
      <el-tab-pane label="远期房态" name="远期房态">
        <ForwardRoomState></ForwardRoomState>
      </el-tab-pane>
      <el-tab-pane label="经营数据" name="经营数据">
        <BusinessData></BusinessData>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
  import {mapGetters} from 'vuex'
//  经营数据
  import BusinessData from './components/BusinessData'

//  实时房态
  import RealTimeRoomState from './components/RealTimeRoomState'
//  远期房态
  import ForwardRoomState from './components/ForwardRoomState'
  export default{
    name: '',
    components:{
      BusinessData,
      RealTimeRoomState,
      ForwardRoomState
    },
    data(){
      return {
        activeName:'实时房态',
        routerList: [
          {
            title: '实时房态',
            routerName: 'UserHome'
          },
          {
            title: '远期房态',
            routerName: 'dad'
          },
          {
            title: '经营数据',
            routerName: 'BusinessData'
          },
        ]
      }
    },
    computed: mapGetters([]),
    created(){
    },
    methods: {},
  }
</script>
<style scoped>

</style>