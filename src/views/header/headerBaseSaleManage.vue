<!--首页-事件详情头部-带搜索-->
<template>
  <div class="headerView">
    <header>
      <div class="headerLeft"  v-on:click="back"><i class="el-icon-arrow-left"></i></div>
      <h2>{{title}}</h2>
      <div class="headerRight">
      <el-select v-model="value1" placeholder="请选择" @change="currentSel">
        <el-option
        v-for="item in dateRangeList"
        :key="item.value"
        :label="item.label"
        :value="item.value">
        </el-option>
      </el-select>
      </div>
    </header>
  </div>
</template>

<script>
export default {
  name: 'headerBaseSaleManage',

  components: {
  },

  data () {
    return {
      dateRangeList: [],
      value1: this.currentData(),
      selVal: ''
    }
  },

  props:['title','queryData'],

  watch: {
  },

  created () {
    this.dateRange()
  },

  methods: {
    searchData (data) {
      this.$emit('searchPro', data)
    },

    back: function (event) {
      this.$router.back(-1)
    },

    dateRange () {
        var date = new Date();
        this.dateRangeList = []
        for (var i = 0; i < 8; i++) {
            let currentDate = date.getFullYear();
            let dateDict = {}
            dateDict.value = currentDate-i
            dateDict.label = currentDate-i
            currentDate = currentDate-i
            this.dateRangeList.push(dateDict)
        }
        console.log(this.dateRangeList)
    },
    currentData () {
        var date = new Date();
        return date.getFullYear();
    },
    currentSel(selVal) {
        this.selVal = selVal;
        this.$emit("dateToFilterData", this.selVal)
    }


  }
}
</script> 

<style scoped>
  header{position:fixed; top: 0; left: 0; right: 0; z-index: 999;display: flex; justify-content: space-between; background: #2698d6; height: 0.45rem; line-height: 0.45rem; padding: 0 0.1rem; color: #ffffff}
  h2{display: flex; background: #2698d6;font-size: 0.16rem;}
  .headerLeft{display: flex; flex-direction: column; justify-content: center; align-items: center; width: 0.45rem; height: 0.45rem; font-size: 0.14rem;}
  .headerRight{display: flex; flex-direction: column; justify-content: center; align-items: center; width: 0.8rem; height: 0.45rem; font-size: 0.14rem;}
  .headerLeft i{font-size: 0.2rem;}
</style>