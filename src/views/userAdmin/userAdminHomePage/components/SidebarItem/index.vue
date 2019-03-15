<template>
  <div class="menu-wrapper">
    <template v-for="item in routes" v-if="!item.hidden&&item.children">


      <!--<router-link v-if="hasOneShowingChildren(item.children) && !item.children[0].children&&!item.alwaysShow"-->
      <!--:to="item.children[0].name"-->
      <!--:key="item.children[0].name">-->
      <a href="javascript:;"
         v-if="hasOneShowingChildren(item.children) && !item.children[0].children&&!item.alwaysShow"
         @click="$router.push({name: item.children[0].name})"
         :key="item.children[0].name">
        <el-menu-item :index="item.children[0].name" :class="{'submenu-title-noDropdown':!isNest}">
          <svg-icon v-if="item.children[0].meta&&item.children[0].meta.icon"
                    :icon-class="item.children[0].meta.icon"></svg-icon>
          <span v-if="item.children[0].meta&&item.children[0].meta.title"
                slot="title">{{item.children[0].meta.title}}</span>
        </el-menu-item>
      </a>
      <!--</router-link>-->

      <el-submenu v-else :index="item.name||item.path" :key="item.name">
        <template slot="title">
          <svg-icon v-if="item.meta&&item.meta.icon" :icon-class="item.meta.icon"></svg-icon>
          <span v-if="item.meta&&item.meta.title" slot="title">{{item.meta.title}}</span>
        </template>

        <template v-for="child in item.children" v-if="!child.hidden">
          <sidebar-item :is-nest="true" class="nest-menu" v-if="child.children&&child.children.length>0"
                        :routes="[child]" :key="child.name"></sidebar-item>
          <a href="javascript:;" v-else :key="child.name" @click="$router.push({name: child.name})">
            <el-menu-item :index="child.name">
              <svg-icon v-if="child.meta&&child.meta.icon" :icon-class="child.meta.icon"></svg-icon>
              <span v-if="child.meta&&child.meta.title" slot="title">{{child.meta.title}}</span>
            </el-menu-item>
          </a>
          <!--<router-link v-else :to="child.name" :key="child.name">-->
          <!--<el-menu-item :index="child.name">-->
          <!--<svg-icon v-if="child.meta&&child.meta.icon" :icon-class="child.meta.icon"></svg-icon>-->
          <!--<span v-if="child.meta&&child.meta.title" slot="title">{{child.meta.title}}</span>-->
          <!--</el-menu-item>-->
          <!--</router-link>-->
        </template>
      </el-submenu>

    </template>
  </div>
</template>
<script>
  import {mapGetters} from 'vuex'

  export default {
    name: 'SidebarItem',
    props: {
      routes: {
        type: Array
      },
      isNest: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {}
    },
    computed: mapGetters([]),
    created() {
    },
    methods: {
      hasOneShowingChildren(children) {
        const showingChildren = children.filter(item => {
          return !item.hidden
        })
        if (showingChildren.length === 1) {
          return true
        }
        return false
      },
    },
  }
</script>
<style scoped>

</style>