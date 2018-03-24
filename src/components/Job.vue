<template>
  <div class="job height-100 bg-fff position-r">
    <div class="px-line-50 px-padding-lr10 bd-gray-lighter-b">
      <el-button type="danger" size="mini" @click="addJob()">添加岗位</el-button>
      <template v-if="currJob">
        <el-button type="info" size="mini" @click="addJob(true)">编辑岗位</el-button>
        <el-button type="info" size="mini" @click="delJob()">删除岗位</el-button>
        <el-button type="info" size="mini" @click="addUserToJob">添加人员</el-button>
      </template>
    </div>
    <div class="job__list position-a px-top-50 bottom-0 bd-gray-lighter-r overflow-a">
      <p class="px-line-40 text-center color-c999">岗位列表</p>
      <div
        v-for="item in jobList"
        @click="currJob = item"
        :key="item.id"
        :class="`bd-gray-lighter-b px-line-40 px-padding-lr10 cursor-p ${currJob.id === item.id ? 'curr' : ''}`">
        {{item.name}}
        <span class="fr el-icon-arrow-right color-ccc px-margin-t15"></span>
      </div>
    </div>
    <div class="job__user position-a px-top-50 bottom-0 right-0">
      <div class="bd-gray-lighter-b">
        <div class="px-line-40 text-center w200 color-c999 ib-middle bd-gray-lighter-r">人员列表</div>
        <div class="px-line-40 text-center w200 color-c999 ib-middle bd-gray-lighter-r">所属部门</div>
        <div class="px-line-40 text-center w200 color-c999 ib-middle bd-gray-lighter-r">操作</div>
      </div>
      <div
        v-if="currJob && currJob.users.length > 0"
        class="bd-gray-lighter-b"
        v-for="user in currJob ? currJob.users : []">
        <div class="px-line-40 bd-gray-lighter-r px-padding-lr10 w200 ib-middle">{{user.name}}</div>
        <div class="px-line-40 bd-gray-lighter-r px-padding-lr10 w200 ib-middle">{{user.deptName}}</div>
        <div class="px-line-40 bd-gray-lighter-r px-padding-lr10 w200 ib-middle">
          <a href="javascript:" @click="delJobUser(user)">删除</a>
        </div>
      </div>
    </div>

    <el-dialog
      :title="dialogTitle"
      :visible.sync="dialogVisible"
      width="400px">
      <el-form ref="form" :rules="rules" :model="form" label-width="80px">
        <el-form-item label="岗位名称" prop="label">
          <el-input v-model="form.label">
          </el-input>
        </el-form-item>
        <el-form-item label="岗位排序">
          <el-input v-model="form.sequence">
          </el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirmAdd">确 定</el-button>
      </span>
    </el-dialog>

    <select-tree
      ref="selectTree"
      :selectedDept="[]"
      :selectedUser="[]"
      :selectType="2"
      @confirm="confirmSelect">
    </select-tree>
  </div>
</template>

<script>
  import http from '../mixins/http'

  export default {
    name: 'job',
    data() {
      return {
        jobList: [],
        currJob: null,
        isEdit: false,
        dialogTitle: '',
        dialogVisible: false,
        form: {
          label: '',
          sequence: ''
        },
        rules: {
          label: [
            { required: true, message: '请输入岗位名称', trigger: 'blur' },
            { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' }
          ],
        }
      }
    },
    mixins: [http],
    created() {
      this.getJobList()
    },
    methods: {
      getJobList() {
        this.http('jobList').then(res=> {
          if (res.length > 0) {
            this.jobList = res
            this.currJob = res[0]
          }
        })
      },
      addJob(isEdit) {
        this.isEdit = isEdit
        this.dialogVisible = true
        this.dialogTitle = isEdit ? `编辑岗位 - ${this.currJob.name}` : '添加岗位'
      },
      delJob() {
        this.http('delJob', { id: this.currJob.id }).then(() => {
          this.$message.success('删除岗位成功')
          this.getJobList()
        })
      },
      confirmAdd() {
        this.$refs['form'].validate((valid) => {
          if (valid) {
            let data = { ...this.form }
            if (this.isEdit) {
              data.id = this.currJob.id
            }
            this.http('addJob', this.form).then(()=> {
              this.$message({
                message: this.isEdit ? '编辑岗位成功' : '添加岗位成功',
                type: 'success'
              })
              this.getJobList()
            })
            this.dialogVisible = false
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },
      addUserToJob() {
        this.$refs.selectTree.show()
      },
      confirmSelect(dept, user) {
        if (user.length === 0) {
          this.$message('请选择人员')
          return
        }
        this.http('addUserToJob', {
          userIds: JSON.stringify(user.map(x => x.userId)),
          jobId: this.currJob.id
        }).then(()=> {
          this.$message({
            message: `${this.currJob.name}岗位添加人员成功`,
            type: 'success'
          })
          this.getJobList()
        })
      },
      delJobUser(user) {
        this.$confirm('确定要删除吗？').then(()=> {
          this.http('delJobUser', { ...user, jobId: this.currJob.id }).then(res=> {
            this.$message({
              message: `${this.currJob.name}岗位删除人员成功`,
              type: 'success'
            })
            this.getJobList()
          })
        })
      }
    }
  }
</script>

<style lang="scss">
  .job__list {
    width: 200px;
    .curr {
      background-color: #f2f2f2;
    }
  }
  .job__user {
    left: 200px;
  }
</style>
