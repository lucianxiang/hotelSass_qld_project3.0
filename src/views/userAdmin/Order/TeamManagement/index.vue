<template>
  <div>
    <h1 class="wrapTitle">
      <span>团队管理</span>
    </h1>
    <ul>
      <li>
        <strong>订单类型 :</strong>
        <el-radio-group size="small" v-model="Unlimited">
          <el-radio-button :label="item.label" :key="index" v-for="item,index in list"></el-radio-button>
        </el-radio-group>
      </li>
      <li>
        <strong>订单类型 :</strong>
        <el-radio-group size="small" v-model="SameDay">
          <el-radio-button :label="item.label" :key="index" v-for="item,index in list2"></el-radio-button>
        </el-radio-group>
        <el-date-picker
          v-model="value1"
          type="date"
          placeholder="选择日期"
          size="mini"
          style="width:160px"
        ></el-date-picker>
        <em>至</em>
        <el-date-picker
          v-model="value1"
          type="date"
          placeholder="选择日期"
          size="mini"
          style="width:160px"
        ></el-date-picker>
      </li>
      <li>
        <strong>订单类型 :</strong>
        <el-radio-group size="small" v-model="Unlimited">
          <el-radio-button :label="item.label" :key="index" v-for="item,index in list3"></el-radio-button>
        </el-radio-group>
      </li>
    </ul>
    <dl class="screen">
      <dd>
        <span>入住日期 :</span>
        <el-date-picker
          v-model="value1"
          type="date"
          placeholder="选择日期"
          size="mini"
          style="width:160px"
        ></el-date-picker>
        <em>至</em>
        <el-date-picker
          v-model="value1"
          type="date"
          placeholder="选择日期"
          size="mini"
          style="width:160px"
        ></el-date-picker>
      </dd>
      <dd>
        <span>&nbsp;&nbsp;&nbsp;团名 :</span>
        <div>
          <el-input
            style="width:160px"
            type="text"
            v-model="input"
            placeholder="请输入团名"
            size="mini"
            auto-complete="off"
          ></el-input>
        </div>
      </dd>
      <dd>
        <el-button size="small" type="primary">查询</el-button>
      </dd>
    </dl>
    <el-table :data="tableData" style="width: 100%" size="mini">
      <el-table-column prop="date" label="姓名" width="150"></el-table-column>
      <el-table-column prop="name" label="手机号码" width="100"></el-table-column>
      <el-table-column prop="address" label="入住时间 ~ 预离时间" width="150"></el-table-column>
      <el-table-column prop="name" label="房号" width="100"></el-table-column>
      <el-table-column prop="name" label="证件号" width="100"></el-table-column>
      <el-table-column prop="name" label="客源类别" width="100"></el-table-column>
      <el-table-column prop="name" label="在住状态" width="100"></el-table-column>
      <el-table-column prop="name" label="结账状态" width="100"></el-table-column>
      <el-table-column prop="name" label="订单号" width="100"></el-table-column>
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
      input: "",
      value1: "",
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
      list3: [
        {
          label: "不限"
        },
        {
          label: "已结"
        },
        {
          label: "未结"
        }
      ],
      SameDay: "当天",
      list2: [
        {
          label: "当天"
        },
        {
          label: "昨天"
        },
        {
          label: "明天"
        },
        {
          label: "后三天"
        },
        {
          label: "近三天"
        },
        {
          label: "近七天"
        },
        {
          label: "上月"
        },
        {
          label: "本月"
        },
        {
          label: "下月"
        },
        {
          label: "自定义"
        }
      ],
      list: [
        {
          label: "不限"
        },
        {
          label: "未入住"
        },
        {
          label: "在住"
        },
        {
          label: "离店"
        }
      ],
      Unlimited: "不限"
    };
  },
  methods: {
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
section li {
  margin-top: 10px;
}
section li strong {
  margin-right: 10px;
}
.screen {
  margin-top: 10px;
}
.screen dd {
  float: left;
  margin-right: 20px;
  margin-bottom: 15px;
}
.screen dd em {
  font: 14px/27px "微软雅黑";
  float: right;
  padding: 0 5px;
}
.screen dd span {
  margin-right: 10px;
  float: left;
  font: 14px/27px "微软雅黑";
}
.screen dd div {
  float: right;
}
li em {
  font: 14px/27px "微软雅黑";
  padding: 0 5px;
}
</style>

