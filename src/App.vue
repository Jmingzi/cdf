<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
  export default {
    name: 'App'
  }
</script>

<style lang="scss">
  html, body {
    height: 100%;
  }
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-size: 14px;
  }
  .w200 { width: 200px; }
  .w600 { width: 600px; }

  .el-table {
    color: #333;
  }
  .el-table td, .el-table th.is-leaf {
    border-color: #ddd;
  }
  .expense {
    .el-table {
      th, td {
        font-size: 12px;
      }
    }
    .el-table td, .el-table th {
      padding: 4px 0;
    }
    .el-table .cell {
      overflow: hidden;
      display: -webkit-box;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
      word-break: break-all;
    }
    .el-table__header {
      th, tr {
        background-color: #f5f7fa;
      }
    }

    td.el-table_1_column_16.is-leaf .cell,
    td.el-table_1_column_4.is-leaf .cell {
      font-weight: bold;
      color: #d9534f;
    }
  }

  .el-tabs__item {
    font-weight: bold;
  }

</style>
