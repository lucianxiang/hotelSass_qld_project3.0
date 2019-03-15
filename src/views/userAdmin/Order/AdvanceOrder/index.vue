<template>
  <div>
    <h1 class="wrapTitle">
      <span>预订</span>
    </h1>
    <ul>
      <!-- 预抵日期 -->
      <li>
        <strong>预抵时间 :</strong>
        <el-radio-group size="small" v-model="time">
          <el-radio-button :label="item.label" :key="index" v-for="item,index in list"></el-radio-button>
        </el-radio-group>
        <el-date-picker
          v-model="value1"
          type="date"
          size="mini"
          style="width:140px"
          placeholder="选择日期"
        ></el-date-picker>
        <el-date-picker
          v-model="value1"
          type="date"
          size="mini"
          style="width:140px"
          placeholder="选择日期"
        ></el-date-picker>
      </li>
      <!-- 预订时间 -->
      <li>
        <strong>预订时间 :</strong>
        <el-radio-group size="small" v-model="time">
          <el-radio-button :label="item.label" :key="index" v-for="item,index in list"></el-radio-button>
        </el-radio-group>
        <el-date-picker
          v-model="value1"
          type="date"
          size="mini"
          style="width:140px"
          placeholder="选择日期"
        ></el-date-picker>
        <el-date-picker
          v-model="value1"
          type="date"
          size="mini"
          style="width:140px"
          placeholder="选择日期"
        ></el-date-picker>
      </li>
    </ul>
    <!-- 筛选 -->
    <dl class="screen">
      <dd>
        <span>入住类型 :</span>
        <el-select v-model="value" placeholder="请选择" size="mini" style="width:200px">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </dd>
      <dd>
        <span>预订方式 :</span>
        <el-select v-model="value" placeholder="请选择" size="mini" style="width:200px">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </dd>
      <dd>
        <span>&nbsp;&nbsp;&nbsp;&nbsp;预订人 :</span>
        <div>
          <el-input
            style="width:200px"
            type="text"
            v-model="input"
            placeholder="请输入预订人"
            size="mini"
            auto-complete="off"
          ></el-input>
        </div>
      </dd>
      <dd>
        <span>&nbsp;&nbsp;&nbsp;团名 :</span>
        <div>
          <el-input
            style="width:200px"
            type="text"
            v-model="input"
            placeholder="请输入团名"
            size="mini"
            auto-complete="off"
          ></el-input>
        </div>
      </dd>
      <dd>
        <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;状态 :</span>
        <el-select v-model="value" placeholder="请选择" size="mini" style="width:200px">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </dd>
      <dd>
        <span>预订单号 :</span>
        <div>
          <el-input
            style="width:200px"
            type="text"
            v-model="input"
            placeholder="请输入预订单号"
            size="mini"
            auto-complete="off"
          ></el-input>
        </div>
      </dd>
      <dd>
        <span>外部单号 :</span>
        <div>
          <el-input
            style="width:200px"
            type="text"
            v-model="input"
            placeholder="请输入外部单号"
            size="mini"
            auto-complete="off"
          ></el-input>
        </div>
      </dd>
      <dd>
        <span>手机号 :</span>
        <div>
          <el-input
            style="width:200px"
            type="text"
            v-model="input"
            placeholder="请输入手机号"
            size="mini"
            auto-complete="off"
          ></el-input>
        </div>
      </dd>
      <dd>
        <span>&nbsp;&nbsp;&nbsp;&nbsp;房间号 :</span>
        <div>
          <el-input
            style="width:200px"
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
        <el-button size="small" type="primary">重置</el-button>
        <el-button size="small" type="primary">导出</el-button>
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
import { mapGetters } from "vuex";
export default {
  name: "",
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
      value: "",
      input: "",
      time: "今天", //预抵时间
      list: [
        {
          label: "上周"
        },
        {
          label: "今天"
        },
        {
          label: "明天"
        },
        {
          label: "后天"
        },
        {
          label: "本周"
        },
        {
          label: "下周"
        },
        {
          label: "自定义"
        }
      ]
    };
  },
  computed: mapGetters([]),
  created() {},
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
  margin-bottom: 10px;
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