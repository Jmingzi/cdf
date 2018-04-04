<template>
  <el-pagination
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
    :current-page.sync="currentPage"
    :page-sizes="[20, 30, 40, 50, 100]"
    :page-size="pageSize"
    background
    layout="prev, pager, next, sizes, jumper"
    :total="total">
  </el-pagination>
</template>

<script>
  // import { mapGetters } from 'vuex'

  export default {
    name: 'page',

    data() {
      return {
        currentPage: 1,
        pageSize: 20
      }
    },

    methods: {
      handleSizeChange(val) {
        this.$emit('change-size', val)
      },
      handleCurrentChange(val) {
        this.$emit('change-page', val)
      }
    },

    computed: {
      // ...mapGetters(['userList']),
    },

    props: ['currPage', 'size', 'total']
  }
</script>

<style>
  .wrap-common ul li {
    border: none!important;
  }
</style>
