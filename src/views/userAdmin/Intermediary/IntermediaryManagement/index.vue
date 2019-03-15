<template>
  <div>
    <h1 class="wrapTitle">
      <span>中介管理</span>
    </h1>
    <ul class="clearfix">
      <li>
        <span>&nbsp;&nbsp;&nbsp;中介名称 :</span>
        <el-input
          style="width:120px"
          type="text"
          v-model="input"
          placeholder="请输入关键字"
          size="mini"
          auto-complete="off"
        ></el-input>
      </li>
      <li>
        <span>状态 :</span>
        <el-select v-model="value" placeholder="请选择" size="mini" style="width:120px">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </li>
      <li>
        <el-button size="small" type="primary">查询</el-button>
      </li>
      <li>
        <em @click="senior">高级查询</em>
      </li>
      <li>
        <el-button size="small" type="primary">+新增</el-button>
      </li>
    </ul>
    <dl class="clearfix" v-if="seniorshow">
      <dd>
        <span>&nbsp;&nbsp;&nbsp;联 系 人 :</span>
        <el-input
          style="width:120px"
          type="text"
          v-model="input"
          placeholder="请输入关键字"
          size="mini"
          auto-complete="off"
        ></el-input>
      </dd>
      <dd>
        <span>销 售 员 :</span>
        <el-select v-model="value" placeholder="请选择" size="mini" style="width:120px">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </dd>
      <dd>
        <span>手机号码 :</span>
        <el-input
          style="width:130px"
          type="text"
          v-model="input"
          placeholder="请输入关键字"
          size="mini"
          auto-complete="off"
        ></el-input>
      </dd>
      <dd>
        <span> 挂账额度 :</span>
        <el-input
          style="width:130px"
          type="text"
          v-model="input"
          placeholder="请输入关键字"
          size="mini"
          auto-complete="off"
        ></el-input>
        <em>至</em>
        <el-input
          style="width:130px"
          type="text"
          v-model="input"
          placeholder="请输入关键字"
          size="mini"
          auto-complete="off"
        ></el-input>
      </dd>
    </dl>
    <el-table :data="tableData" style="width: 100%" size="mini">
      <el-table-column prop="date" label="预订人" width="150"></el-table-column>
      <el-table-column prop="name" label="预订方式" width="100"></el-table-column>
      <el-table-column prop="address" label="手机号码" width="100"></el-table-column>
      <el-table-column prop="name" label="预订时间" width="100"></el-table-column>
      <el-table-column prop="name" label="抵离时间" width="100"></el-table-column>
      <el-table-column prop="name" label="间数" width="100"></el-table-column>
      <el-table-column prop="name" label="订金(元)" width="100"></el-table-column>
      <el-table-column prop="name" label="总房费(元)" width="100"></el-table-column>
      <el-table-column prop="name" label="状态" width="100"></el-table-column>
      <el-table-column prop="name" label="入住类型" width="100"></el-table-column>
      <el-table-column prop="name" label="操作" width="100"></el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage4"
      :page-sizes="[100, 200, 300, 400]"
      :page-size="100"
      layout="total, sizes, prev, pager, next"
      :total="400"
    ></el-pagination>
  </div>
</template>
<script>
export default {
  data() {
    return {
      seniorshow:false,
      input: "",
      value: "",
currentPage4: 4,
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄"
        }
      ],
      options: [
        {
          value: "选项1",
          label: "黄金糕"
        },
        {
          value: "选项2",
          label: "双皮奶"
        },
        {
          value: "选项3",
          label: "蚵仔煎"
        },
        {
          value: "选项4",
          label: "龙须面"
        },
        {
          value: "选项5",
          label: "北京烤鸭"
        }
      ]
    };
  },
  methods:{
    senior(){
      this.seniorshow = !this.seniorshow;
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    }
  }
};
</script>
<style scoped>
ul {
  margin-top: 10px;
  margin-bottom:10px;
}
li {
  float: left;
  margin-right: 10px;
}
li:last-of-type {
  float: right;
}
li > span {
  margin-right: 5px;
}
li em {
  border-bottom: 1px solid #a0a0a0;
  color: #49a9ee;
  font: 14px/28px "微软雅黑";
  cursor: pointer;
}
dl {
  margin-top: 15px;
  margin-bottom:10px;
}
dd {
  float: left;
  margin-right: 10px;
}
dd > span {
  margin-right: 5px;
}
dd em {
  padding:0 5px;
}
</style>

