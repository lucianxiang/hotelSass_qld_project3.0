<template>
  <div>
    <h1 class="wrapTitle">
      <span>账务处理</span>
    </h1>
    <ul>
      <li>
        <span>&nbsp;&nbsp;&nbsp;中介名称 :</span>
        <el-select v-model="value" placeholder="请选择" size="mini" style="width:200px">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </li>
      <li>
        
      </li>
    </ul>
  </div>
</template>
<script>
export default {};
</script>
<style scoped>
</style>
