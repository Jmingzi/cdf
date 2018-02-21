import { mapState, mapMutations, mapActions } from 'vuex'
import http from '../mixins/http'

export default {
  mixins: [http],
  computed: {
    ...mapState(['dept'])
  },
  mounted() {
    // get dept
    // this.initDept()
  },
  props: {
    isNeedUser: {
      type: Boolean,
      default: true
    }
  },
  filters: {
    getLabel(item) {
      return item.label.replace(` (${item.userNum})`, '')
    }
  },
  methods: {
    ...mapMutations(['setState']),

    initDept() {
      if (this.dept) {
        return void 0
      }

      this.http('getDept').then(res=> {
        res = _dealLabel(res)
        this.setState({
          key: 'array',
          value: {
            dept: res,
            currentDept: { ...res[0], children: null }
          }
        })
        // get dept callback
        this.getDeptCallback(res)

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
    }
  }
}
