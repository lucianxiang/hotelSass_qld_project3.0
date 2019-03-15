<template>
  <div>
    <h1 class="wrapTitle">
      <span>日志查询</span>
    </h1>
    <div class="type">类型 :</div>
    <p>
      <el-radio-group size="small" v-model="log">
        <el-radio-button :label="item.label" :key="index" v-for="item,index in list"></el-radio-button>
      </el-radio-group>
    </p>
    <dl class="screen">
      <dd>
        <span>日期 :</span>
        <el-date-picker
          v-model="value1"
          type="date"
          placeholder="选择日期"
          size="mini"
          style="width:130px"
        ></el-date-picker>
        <em>至</em>
        <el-date-picker
          v-model="value1"
          type="date"
          placeholder="选择日期"
          size="mini"
          style="width:130px"
        ></el-date-picker>
      </dd>
      <dd>
        <span>姓名 :</span>
        <div>
          <el-input
            style="width:130px"
            type="text"
            v-model="input"
            placeholder="请输入姓名"
            size="mini"
            auto-complete="off"
          ></el-input>
        </div>
      </dd>
      <dd>
        <span>业务类型 :</span>
        <el-select v-model="value" placeholder="请选择" size="mini" style="width:150px">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </dd>
      <dd>
        <span>房间号 :</span>
        <div>
          <el-input
            style="width:160px"
            type="text"
            v-model="input"
            placeholder="请输入房间号"
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
      input: "",
      value: "",
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
      ],
      value1: "",
      log: "系统设置日志",
      list: [
        {
          label: "系统设置日志"
        },
        {
          label: "参数设置日志"
        },
        {
          label: "佣金策略日志"
        },
        {
          label: "中介日志"
        },
        {
          label: "单位日志"
        },
        {
          label: "会员配置日志"
        },
        {
          label: "佣金策略名称日志"
        },
        {
          label: "营业日志"
        },
        {
          label: "门锁日志"
        },
        {
          label: "会员日志"
        },
        {
          label: "异动日志"
        },
        {
          label: "入住日志"
        },
        {
          label: "账务日志"
        },
        {
          label: "价格体系日志"
        },
        {
          label: "预订日志"
        },
        {
          label: "房间日志"
        },
        {
          label: "退房日志"
        },
        {
          label: "黑名单日志"
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
.type {
  margin: 20px 0 10px 20px;
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
</style>

