// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import SelectTree from './components/SelectTree'
import {
  Button,
  Select,
  Form,
  FormItem,
  Input,
  InputNumber,
  Radio,
  RadioGroup,
  Checkbox,
  CheckboxGroup,
  Switch,
  TimePicker,
  Option,
  Col,
  Row,
  DatePicker,
  Loading,
  MessageBox,
  Notification,
  Message,
  Tree,
  Table,
  TableColumn,
  Pagination,
  Dialog,
  Collapse,
  CollapseItem
} from 'element-ui'

Vue.config.productionTip = false
// Vue.component(Button.name, Button)
Vue.use(Button)
Vue.use(Form)
Vue.use(Collapse)
Vue.use(CollapseItem)
Vue.use(Dialog)
Vue.use(Select)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(InputNumber)
Vue.use(Radio)
Vue.use(Row)
Vue.use(Option)
Vue.use(Checkbox)
Vue.use(CheckboxGroup)
Vue.use(Switch)
Vue.use(TimePicker)
Vue.use(Col)
Vue.use(DatePicker)
Vue.use(RadioGroup)
Vue.use(Tree)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Pagination)
Vue.use(Loading.directive)

Vue.prototype.$loading = Loading.service
Vue.prototype.$msgbox = MessageBox
Vue.prototype.$alert = MessageBox.alert
Vue.prototype.$confirm = MessageBox.confirm
Vue.prototype.$prompt = MessageBox.prompt
Vue.prototype.$notify = Notification
Vue.prototype.$message = Message

Vue.component(SelectTree.name, SelectTree)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
  // render: h => h(App)
})
