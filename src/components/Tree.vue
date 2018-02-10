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
  import resource from '../resource'
  import { mapState, mapMutations, mapActions } from 'vuex'

  export default {
    name: 'tree',

    created() {
      // get dept
      if (this.dept) {
        return void 0
      }

      resource.getDept().then(res=> {
        res = _dealLabel(res.data)
        this.setState({
          key: 'array',
          value: {
            dept: res,
            currentDept: { ...res[0], children: null }
          }
        })
        // setCurrentKey
        this.$nextTick(()=> {
          this.$refs.tree2.setCurrentKey(res[0].id)
        })

        // get current dept user
        if (this.isNeedUser) {
          this.getUserById(res[0].id)
        }

        function _dealLabel(arr) {
          arr.forEach((item, i)=> {
            arr[i] = { ...item, label: `${item.label} (${item.userNum})` }

            if (item.children && item.children.length > 0) {
              _dealLabel(item.children)
            }
          })
          return arr
        }
      })
    },

    mounted() {

    },

    watch: {
      filterText(val) {
        this.$refs.tree2.filter(val)
      }
    },

    methods: {
      ...mapMutations(['setState']),
      ...mapActions(['getUserById']),

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

    props: {
      isNeedUser: {
        type: Boolean,
        default: true
      }
    },

    computed: {
      ...mapState([
        'dept',
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
