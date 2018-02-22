<template>
  <div class="tree">
    <el-input
      placeholder="输入部门名称"
      v-model="filterText">
    </el-input>
    <div class="px-margin-t10">
      <el-tree
        class="filter-tree"
        node-key="id"
        @node-click="handleClick"
        :data="dept"
        :props="defaultProps"
        :default-expanded-keys="[0]"
        :filter-node-method="filterNode"
        :highlight-current="true"
        ref="tree2">
      </el-tree>
    </div>
  </div>
</template>

<script>
  // import resource from '../resource'
  import { mapState, mapMutations, mapActions } from 'vuex'
  import dept from '../mixins/dept'

  export default {
    name: 'tree',
    mixins: [dept],
    mounted() {
      this.initDept()
    },
    watch: {
      filterText(val) {
        this.$refs.tree2.filter(val)
      }
    },

    methods: {
      ...mapMutations(['setState']),
      ...mapActions(['getUserById']),

      getDeptCallback(deptArr) {
        // setCurrentKey
        this.$nextTick(()=> {
          this.$refs.tree2.setCurrentKey(deptArr[0].id)
        })

        // get current dept user
        if (this.isNeedUser) {
          this.getUserById(deptArr[0].id)
        }
      },

      filterNode(value, data) {
        if (!value) return true
        return data.label.indexOf(value) !== -1
      },

      handleClick(item) {
        if (item.id !== this.currentDept.id) {
          this.setState({
            key: 'currentDept',
            value: { ...item, children: null }
          })

          if (this.isNeedUser) {
            this.getUserById(item.id)
          }
        }
      }
    },

    computed: {
      ...mapState([
        'currentDept',
        'userMap'
      ])
    },

    data() {
      return {
        filterText: '',
        defaultProps: {
          children: 'children',
          label: 'label'
        }
      }
    }
  }
</script>

<style scoped>

</style>
