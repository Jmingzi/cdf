<template>
  <el-pagination
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
    :current-page.sync="currentPage"
    :page-sizes="[20, 30, 40, 50, 100]"
    :page-size="20"
    background
    layout="prev, pager, next, sizes, jumper"
    :total="userList.length">
  </el-pagination>
</template>

<script>
  import { mapState, mapGetters, mapMutations } from 'vuex'

  export default {
    name: 'page',
    methods: {
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`)
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`)
      }
    },
    data() {
      return {
        currentPage: 1
      }
    },
    computed: {
      ...mapGetters(['userList']),
    }
  }
</script>

<style>
  .wrap-common ul li {
    border: none!important;
  }
</style>
