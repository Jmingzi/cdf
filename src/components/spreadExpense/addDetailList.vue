<template>
  <div class="add-detail-list">
    <template v-for="(item, i) in form">
      <p class="px-font-12 color-c999 bg-f2 px-line-40 px-padding-lr10 px-margin-b10">
        明细({{i+1}})
        <span class="color-error fr cursor-p" v-if="i > 0" @click="form.splice(i ,1)">删除明细</span>
      </p>
      <el-form :ref="`form-${i}`" :model="item" label-width="80px">
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="日期">
              <el-date-picker
                v-model="item.date"
                type="date"
                placeholder="选择日期">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="消费金额">
              <el-input type="number" v-model.number="item.money">
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="项目">
              <el-select v-model="item.project" placeholder="请选择">
                <el-option
                  v-for="item in project"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="说明">
              <el-input type="textarea" v-model="item.desc" placeholder="请输入">
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="图片">
          <el-upload
            class="upload-demo"
            action="/upload/"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :on-success="handleSuccess"
            :file-list="item.imagesList"
            list-type="picture">
            <el-button size="small" type="danger">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">tips: 1-9张，只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
        </el-form-item>
      </el-form>
    </template>
    <div class="text-right">
      <el-button type="danger" @click="addDetail">添加明细</el-button>
      <el-button type="primary" @click="confirm">确认添加</el-button>
    </div>
  </div>
</template>

<script>
  import {SPREAD_PROJECT} from '../../constant'
  export default {
    data() {
      return {
        project: SPREAD_PROJECT,
        form: []
      }
    },

    created() {
      this.addDetail()
    },

    methods: {
      handleRemove(file, fileList) {
        let index = this.form.imagesList.findIndex(x => x.id || x.uid === file.id || file.uid)
        this.form.imagesList.splice(index, 1)
      },

      handlePreview(file) {
        window.open(file.url)
      },

      handleSuccess(file, fileList) {
        this.form.imagesList.push(file.data)
      },

      addDetail() {
        this.form.push({
          date: '',
          money: '',
          project: 1,
          imagesList: [],
          desc: ''
        })
      },

      confirm() {
        for(let i = 0; i < this.form.length; i++) {
          const item = this.form[i]
          if (!item.date) {
            this.$message.error('请选择日期')
            return
          } else if (!item.money) {
            this.$message.error('请输入消费金额')
            return
          }/* else if (item.imagesList.length === 0) {
            this.$message.error('请上传图片')
            return
          } */else if (!item.desc) {
            this.$message.error('请输入说明')
            return
          }
        }

        this.$emit('confirm', this.form.map(item => {
          return {
            ...item,
            date: item.date.getTime()
          }
        }))
      }
    }
  }
</script>
