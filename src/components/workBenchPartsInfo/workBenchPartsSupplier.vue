<template>
  <div class="workBenchPartsSupplierView">
    <div class="partsSupplier">
      <el-table
        :data="supplierInfo"
        max-height="600"
        @row-click="rowClick"
        style="width: 100%">
        <template v-for="item in workBenchPartsSupplierObj">
            <el-table-column
              :key="item.id"
              :prop="item.prop"
              :label="item.label"
              :min-width="item.width">
            </el-table-column>
        </template>
      </el-table>
    </div>
  </div>
</template>

<script>
import fetch from '../../utils/ajax'
export default {
    name: 'workBenchPartsSupplier',
    components: {
    }, 
    props: ["supplierInfo"],
    data(){
        return{
            busy:true,
            loadall: false,
            tableData: [],
            workBenchPartsSupplierObj:[               
                {
                    prop: 'PROVINCE_NAME',
                    label: '地点',
                    // fixed: true,
                    width: '33%'
                },
                {
                    prop: 'GYS_PART_NUMBER',
                    label: '数量',
                    // fixed: true,
                    width: '33%'
                },
                {
                    prop: 'GYS_PART_AMOUNT',
                    label: '金额',
                    // fixed: true,
                    width: '33%'
                }
            ],
        }
        
    },
    created () {
        // fetch.get("?action=GetPartStat",{}).then(res=>{
        //   this.tableData = res.data;
        //   console.log(this.tableData)
        //   this.busy= false;
        //   this.loadall = true;
        //   // console.log(this.tableData);
        // });
    },

    methods: {
        getSummaries (param) {
            const { columns, data } = param
            const sums = []
            columns.forEach((column, index) => {
              // console.log("1111111111111111", param, column, index)
              if (index === 0) {
                sums[index] = '合计'
                return
              }
              const values = data.map(item => Number(item[column.property]));
              if (!values.every(value => isNaN(value))) {
                sums[index] = values.reduce((prev, curr) => {
                  const value = Number(curr)
                  if (!isNaN(value)) {
                    return prev + curr
                  } else {
                    return prev
                  }
                }, 0)
              } else {
                sums[index] = 'N/A'
              }
            })

            return sums
        },
        rowClick (row) {
            console.log(row)
            this.$router.push({name: 'workBenchPartsSupplierList', query: {provinceName:row.PROVINCE_NAME}})
        },
       
    
    }
}

</script>


<style scoped>
  .workBenchPartsSupplierView{width:100%;}
  .partsSupplier >>> .el-table th{border-top: 0.01rem solid #e1e1e1; line-height: 0.25rem; color: #333333;}
  .partsSupplier >>> .el-table .cell{text-align: center; padding: 0}
  .partsSupplier >>> .el-table tr{line-height: 0.25rem; color: #666666}
  .partsSupplier >>> .el-table tr:nth-child(2n+1){background: #f7f7f7;}
  .partsSupplier >>> .el-table tr:nth-child(2n){background: #ffffff;}
</style>