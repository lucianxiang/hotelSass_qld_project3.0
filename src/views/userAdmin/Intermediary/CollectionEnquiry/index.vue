<template>
  <div>
    <h1 class="wrapTitle">
      <span>收款查询</span>
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
        <span>&nbsp;&nbsp;&nbsp;收款类型 :</span>
        <el-radio-group size="small" v-model="Settlement">
          <el-radio-button :label="item.label" :key="index" v-for="item,index in list"></el-radio-button>
        </el-radio-group>
      </li>
      <li>
        <span>&nbsp;&nbsp;&nbsp;支付方式 :</span>
        <el-radio-group size="small" v-model="mode">
          <el-radio-button :label="item.label" :key="index" v-for="item,index in list2"></el-radio-button>
        </el-radio-group>
      </li>
    </ul>
    <dl>
      <dd>
        <span>&nbsp;&nbsp;&nbsp;收款时间 :</span>
        <el-radio-group size="small" v-model="time">
          <el-radio-button :label="item.label" :key="index" v-for="item,index in list3"></el-radio-button>
        </el-radio-group>
      </dd>
      <dd>
        <el-date-picker
          v-model="value1"
          type="date"
          size="mini"
          style="width:140px"
          placeholder="选择日期"
        ></el-date-picker>
        <em>至</em>
        <el-date-picker
          v-model="value1"
          type="date"
          size="mini"
          style="width:140px"
          placeholder="选择日期"
        ></el-date-picker>
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
      value: "",
      time: "不限",
      list3: [
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
      mode: "不限",
      list2: [
        {
          label: "不限"
        },
        {
          label: "现金"
        },
        {
          label: "银行卡"
        },
        {
          label: "支票"
        },
        {
          label: "会员卡"
        },
        {
          label: "支付宝"
        },
        {
          label: "微信"
        }
      ],
      Settlement: "结算",
      list: [
        {
          label: "结算"
        },
        {
          label: "预收款"
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
  margin-top: 15px;
}
li span {
  margin-right: 5px;
}
li {
  margin-bottom: 15px;
}

li em {
  padding: 0 5px;
}
.cx {
  float: right;
  margin-right: 100px;
}
dd {
  float: left;
  margin-right: 5px;
}
dd>span {
  margin-right: 5px;
}
dd em {
  padding: 0 5px;
}
</style>
