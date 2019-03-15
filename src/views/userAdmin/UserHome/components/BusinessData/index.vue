<template>
  <div>
    <!--表1-->
    <el-table
            :data="tableData6"
            border
            :summary-method="getSummaries"
            show-summary
            style="width: 100%;">
      <el-table-column
              prop="id"
              label="房型">
      </el-table-column>
      <el-table-column
              prop="amount1"
              label="房间数">
      </el-table-column>
      <el-table-column
              prop="amount1"
              label="锁房数"
      >
      </el-table-column>
      <el-table-column
              prop="amount2"
              label="维修房数">
      </el-table-column>
      <el-table-column
              prop="amount2"
              label="可售数">
      </el-table-column>
      <el-table-column
              prop="amount3"
              label="订房数">
      </el-table-column>
      <el-table-column
              prop="amount3"
              label="可订房数">
      </el-table-column>
      <el-table-column
              prop="amount3"
              label="超订房数">
      </el-table-column>
      <el-table-column
              prop="amount3"
              label="空脏">
      </el-table-column>
      <el-table-column
              prop="amount3"
              label="空净">
      </el-table-column>
      <el-table-column
              prop="amount3"
              label="今日预抵">
      </el-table-column>
      <el-table-column
              prop="amount3"
              label="今日预离">
      </el-table-column>
      <el-table-column
              prop="amount3"
              label="在住">
      </el-table-column>
      <el-table-column
              prop="amount3"
              label="自用房">
      </el-table-column>
      <el-table-column
              prop="amount3"
              label="预定出租率">
      </el-table-column>
    </el-table>
    <!--表2-->
    <el-table
            :data="tableData6"
            border
            :summary-method="getSummaries"
            show-summary
            style="width: 100%; margin-top: 20px;">
      <el-table-column
              prop="id"
              label="序号">
      </el-table-column>
      <el-table-column
              prop="amount1"
              label="类别">
      </el-table-column>
      <el-table-column
              prop="amount1"
              label="数量"
      >
      </el-table-column>
      <el-table-column
              prop="amount2"
              label="金额">
      </el-table-column>
      <el-table-column
              prop="amount2"
              label="OCC">
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
  import {mapGetters} from 'vuex'
  export default{
    name: '',
    data(){
      return {
          tableData6: [{
              id: '12987122',
              name: '王小虎',
              amount1: '234',
              amount2: '3.2',
              amount3: 10
          }, {
              id: '12987123',
              name: '王小虎',
              amount1: '165',
              amount2: '4.43',
              amount3: 12
          }, {
              id: '12987124',
              name: '王小虎',
              amount1: '324',
              amount2: '1.9',
              amount3: 9
          }, {
              id: '12987125',
              name: '王小虎',
              amount1: '621',
              amount2: '2.2',
              amount3: 17
          }, {
              id: '12987126',
              name: '王小虎',
              amount1: '539',
              amount2: '4.1',
              amount3: 15
          }],
      }
    },
    computed: mapGetters([]),
    created(){
    },
    methods: {
        getSummaries(param) {
            const { columns, data } = param;
            const sums = [];
            columns.forEach((column, index) => {
                if (index === 0) {
                    sums[index] = '总价';
                    return;
                }
                const values = data.map(item => Number(item[column.property]));
                if (!values.every(value => isNaN(value))) {
                    sums[index] = values.reduce((prev, curr) => {
                        const value = Number(curr);
                        if (!isNaN(value)) {
                            return prev + curr;
                        } else {
                            return prev;
                        }
                    }, 0);
                    sums[index] += ' 元';
                } else {
                    sums[index] = 'N/A';
                }
            });

            return sums;
        },
    },
  }
</script>
<style scoped>
  .el-table{
    background: oldlace;
  }
</style>