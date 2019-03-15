<template>
  <div>
    <h1 class="wrapTitle">
      <span>发票查询</span>
    </h1>
    <ul>
      <li>
        <strong>财务类型 :</strong>
        <el-radio-group size="small" v-model="Unlimited">
          <el-radio-button :label="item.label" :key="index" v-for="item,index in list"></el-radio-button>
        </el-radio-group>
      </li>
      <li>
        <strong>开票类型 :</strong>
        <el-radio-group size="small" v-model="Unlimited">
          <el-radio-button :label="item.label" :key="index" v-for="item,index in list2"></el-radio-button>
        </el-radio-group>
      </li>
      <li>
        <strong>开票日期 :</strong>
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
        <i>
          <el-button size="small" type="primary">查询</el-button>
        </i>
      </li>
    </ul>
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
      value1: "",
      list2: [
        {
          label: "不限"
        },
        {
          label: "增值税专用发票"
        },
        {
          label: "增值税普通发票"
        },
        {
          label: "增值税电子发票"
        }
      ],
      Unlimited: "不限",
      list: [
        {
          label: "不限"
        },
        {
          label: "客人账务"
        },
        {
          label: "团队账务"
        }
      ]
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
section li em {
  font: 14px/27px "微软雅黑";
  padding: 0 5px;
}
section li i {
  margin-left: 20px;
}
</style>

