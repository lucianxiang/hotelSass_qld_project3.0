<template>
  <div>
    水表
  </div>
</template>
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
      return {}
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
