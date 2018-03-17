<template>
  <div class="setting">
    <div v-if="setting.process === null"></div>

    <div class="px-padding-tb50 text-center" v-else-if="setting.process.length === 0">
      <p class="px-margin-b20 color-c666">你还没有配置流程哦~</p>
      <el-button type="danger" @click="newProcess">新建流程</el-button>
    </div>

    <div class="w600" v-else-if="isNewProcess">
      <el-form ref="form" :rules="rules" :model="form" label-width="110px">
        <el-form-item label="流程名称" prop="processName">
          <el-input type="text" v-model="form.processName">
          </el-input>
        </el-form-item>
        <el-form-item label="流程环节" prop="process">
          <div class="color-c666">
            <i class="el-icon-info color-c999" @click="toMessage('msg1')"></i>
            <span>{{form.process.map(x=> x.name).join('->')}}</span>
            <span class="cursor-p color-info" @click="toSelect('processNode')">请选择</span>
            <span class="cursor-p color-error" @click="clear(1)">清空</span>
          </div>
        </el-form-item>
        <el-form-item label="流程管理范围" prop="target">
          <div class="color-c666">
            <i class="el-icon-info color-c999" @click="toMessage('msg2')"></i>
            <span>{{form.target | formatDeptUser}}</span>
            <span class="cursor-p color-info" @click="toSelect('processRange')">请选择</span>
            <span class="cursor-p color-error" @click="clear(2)">清空</span>
          </div>
        </el-form-item>
        <el-form-item>
          <el-button type="danger" @click="submitForm('form')">确认添加</el-button>
          <el-button @click="isNewProcess = false">返回列表</el-button>
        </el-form-item>
      </el-form>
    </div>

    <div class="w1000" v-else>
      <el-button type="danger" @click="newProcess">新建流程</el-button>
      <div class="" v-if="setting.process">
        <el-card class="box-card px-margin-t20" v-for="item in setting.process" :key="item.id">
          <div slot="header" class="clearfix">
            <span class="color-c999">流程名称: </span>
            <span>{{item.processName}}</span>
            <el-button style="float: right; padding: 3px 0; color: red;" type="text" @click="delProcess(item)">删除</el-button>
            <el-button style="float: right; padding: 3px 5px" type="text" @click="editProcess(item)">编辑</el-button>
          </div>
          <p>
            <span class="color-c999">流程环节: </span>
            <span>{{item.process.map(x=> x.name).join(' -> ')}}</span>
          </p>
          <p>
            <span class="color-c999">流程管理范围: </span>
            <span>{{item.target | formatDeptUser}}</span>
          </p>
        </el-card>
      </div>
    </div>

    <select-tree
      ref="selectTree"
      :selectedDept="selectedDept"
      :selectedUser="selectedUser"
      :selectType="selectType"
      :isNeedUser="true"
      @confirm="confirmSelectDept">
    </select-tree>
  </div>
</template>

<script>
  import http from '../mixins/http'
  import { mapState } from 'vuex'

  export default {
    name: 'money-system-setting',
    created() {
      this.getSetting()
    },
    data() {
      return {
        setting: {
          process: null
        },
        form: {
          processName: '',
          target: {
            dept: [],
            user: []
          },
          process: []
        },
        rules: {
          processName: [
            { required: true, processName: '请流程名称', trigger: 'blur' },
            { min: 2, max: 100, message: '长度在 2 到 100 个字符', trigger: 'blur' }
          ],
          target: [
            { required: true }
          ],
          process: [
            { required: true }
          ]
        },
        isNewProcess: false,
        editProcessId: null,

        // 选人树变量
        currentSelect: '',
        selectedDept: [],
        selectedUser: [],
        selectType: 0
      }
    },
    mixins: [http],
    watch: {
      isActive(val) {
        if (val) {
          this.getSetting()
        }
        return val
      }
    },
    computed: {
      ...mapState(['userInfo'])
    },
    methods: {
      getSetting() {
        this.http('getSetting', {
          userId: this.userInfo.userId,
          deptId: this.userInfo.dept.id
        }).then(res=> {
          this.setting.process = res.processList
        })
      },
      toMessage(type) {
        let msg1 = '流程环节是指：流程从A到B再到C等等的节点，此处点击按顺序添加即是流程的顺序。'
        let msg2 = '流程管理范围是指：这条流程对哪些人或部门生效，人的优先级要高于部门。例如：A在技术部，对技术部设置了x流程，对A又设置了y流程，此时对A来说生效的是y流程。'
        this.$msgbox.alert(eval(`${type}`))
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            if (this.form.target.dept.length === 0 && this.form.target.user.length === 0) {
              this.$msgbox.alert('请选择流程管理范围')
            } else {
              let data = { ...this.form }
              if (this.editProcessId) {
                data.id = this.editProcessId
              }
              this.http('addProcess', data).then(()=> {
                this.$message.success(data.id ? '编辑成功' : '添加成功')
              })
            }
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },
      toSelect(field) {
        this.currentSelect = field
        if (field === 'processRange') {
          this.selectedDept = this.form.target.dept
          this.selectedUser = this.form.target.user
          this.selectType = 0
        } else {
          this.selectedDept = []
          this.selectedUser = this.form.process
          this.selectType = 2
        }
        this.$refs.selectTree.show()
      },
      confirmSelectDept(dept, user) {
        if (this.currentSelect === 'processRange') {
          this.form.target.dept = dept
          this.form.target.user = user
        } else {
          this.form.process = user
        }
      },
      delProcess(item) {
        this.$msgbox.confirm('确定要删除该条流程吗？').then(()=> {
          this.http('delProcess', { id: item.id }).then(()=> {
            this.$message.success('删除成功')
          })
        })
      },
      newProcess() {
        this.editProcessId = null
        this.isNewProcess = true
      },
      editProcess(item) {
        this.editProcessId = item.id
        this.form.processName = item.processName
        this.form.target = { ...item.target }
        this.form.process = [ ...item.process ]
        this.isNewProcess = true
      },
      clear(type) {
        if (type === 1) {
          this.form.process = []
        } else {
          this.form.target = {
            dept: [],
            user: []
          }
        }
      }
    },
    props: {
      isActive: false
    }
  }
</script>

<style lang="scss">
  .w1000 {
    width: 1000px;
  }
</style>
