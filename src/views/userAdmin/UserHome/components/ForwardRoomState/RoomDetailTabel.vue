<template>
  <div>
    <el-popover placement="top" width="160" v-model="tipVisibles">
      <p>确定删除吗</p>
      <div style="text-align: right; margin: 0">
        <el-button size="mini" type="text" @click="canelDelete(index)">取消</el-button>
        <el-button size="mini" type="text" @click="deleteBucket(index)">确定</el-button>
      </div>
      <i slot="reference" class="el-icon-delete delete-bucket"></i>
    </el-popover>
  </div>
</template>d
<script>
  import {mapGetters} from 'vuex'

  export default {
    name: '',
    components: {},
    beforeRouteLeave(to, from, next) {
      next()
    },
    watch: {
      //监听路由
      '': 'route',
      //方法
      watchMethods() {
      },
    },
    conputed: Object.assign({}, mapGetters([])),
    data() {
      return {
        tipVisibles: false,
      }
    },
    methods: {
      route(to, from) {
        console.log(to, from)
      },
    },
    created() {

    },
    mounted() {

    },
  }
</script>
<style scoped>
</style>
