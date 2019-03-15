<template>
  <div>
    <h1 class="wrapTitle">
      <span>账务查询</span>
    </h1>
    <ul class="clearfix">
      <li>
        <span>&nbsp;&nbsp;&nbsp;挂账中介 :</span>
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
        <span>结账状态 :</span>
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
    <div v-if="seniorshow">
      <p class="liveTime">
        <strong>&nbsp;&nbsp;&nbsp;入住时间 :</strong>
        <el-radio-group size="small" v-model="time">
          <el-radio-button :label="item.label" :key="index" v-for="item,index in list"></el-radio-button>
        </el-radio-group>
        <span>消费时间 :</span>
          <el-date-picker
            v-model="value1"
            type="date"
            size="mini"
            style="width:150px"
            placeholder="选择日期"
          ></el-date-picker>
          <em>至</em>
          <el-date-picker
            v-model="value1"
            type="date"
            size="mini"
            style="width:150px"
            placeholder="选择日期"
          ></el-date-picker>
      </p>
      <dl class="clearfix">
        <dd>
          <span>&nbsp;&nbsp;&nbsp;姓名 :</span>
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
          <span>房号 :</span>
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
          <span>消费时间 :</span>
          <el-date-picker
            v-model="value1"
            type="date"
            size="mini"
            style="width:150px"
            placeholder="选择日期"
          ></el-date-picker>
          <em>至</em>
          <el-date-picker
            v-model="value1"
            type="date"
            size="mini"
            style="width:150px"
            placeholder="选择日期"
          ></el-date-picker>
        </dd>
      </dl>
    </div>
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
      seniorshow: false,
      value1: "",
      input: "",
      value: "",
      currentPage4: 4,
      time: "不限",
      list: [
        {
          label: "不限"
        },
        {
          label: "今天"
        },
        {
          label: "昨天"
        },
        {
          label: "上周"
        },
        {
          label: "本周"
        },
        {
          label: "上月"
        },
        {
          label: "本月"
        },
        {
          label: "自定义"
        }
      ],
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
  methods: {
    senior() {
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
  margin-bottom: 10px;
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
  margin-bottom: 10px;
}
dd {
  float: left;
  margin-right: 10px;
}
dd > span {
  margin-right: 5px;
}
dd em {
  padding: 0 5px;
}
.liveTime strong {
  margin-right: 5px;
}
</style>

