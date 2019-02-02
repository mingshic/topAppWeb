<template>
  <div class="workBenchPartsOwnView">
    <div class="partsOwn">
      <el-table
        stripe
        :data="ownInfo"
        max-height="600"
        @row-click="rowClick"
        style="width: 100%">
        <template v-for="item in workBenchPartsOwnObj">
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
    name: 'workBenchPartsOwn',
    components: {
    }, 
    props: ["ownInfo"],
    data(){
        return{
            busy:true,
            loadall: false,
            tableData: [],
            workBenchPartsOwnObj:[               
                {
                    prop: 'PROVINCE_NAME',
                    label: '地点',
                    // fixed: true,
                    width: '33%'
                },
                {
                    prop: 'ZY_PART_NUMBER',
                    label: '数量',
                    // fixed: true,
                    width: '33%'
                },
                {
                    prop: 'ZY_PART_AMOUNT',
                    label: '金额',
                    // fixed: true,
                    width: '33%'
                }
            ],
        }
        
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
          console.log("row",row)
          this.$router.push({name: 'workBenchPartsOwnList', query: {provinceName:row.PROVINCE_NAME}})
        },
       
    
    }
}

</script>


<style scoped>
  .workBenchPartsOwnView{width:100%;}
  .partsOwn >>> .el-table th{border-top: 0.01rem solid #e1e1e1; line-height: 0.25rem; color: #333333;}
  .partsOwn >>> .el-table .cell{text-align: center; padding: 0}
  .partsOwn >>> .el-table tr{line-height: 0.25rem; color: #666666}
  .partsOwn >>> .el-table tr:nth-child(2n+1){background: #f7f7f7;}
  .partsOwn >>> .el-table tr:nth-child(2n){background: #ffffff;}
</style>