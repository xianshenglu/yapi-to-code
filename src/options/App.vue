<template>
  <div class="App">
    <h1>自定义配置页</h1>
    <el-form :model="formData" ref="form" :rules="rules">
      <el-form-item label="API 地址：" prop="apiOrigin">
        <el-input v-model="formData.apiOrigin"></el-input>
      </el-form-item>
      <el-form-item label="自定义前端 API 代码：" prop="apiFormatterBody">
        <el-input
          v-model="formData.apiFormatterBody"
          type="textarea"
          :rows="10"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="onReset">重置成初始值</el-button>
        <el-button @click="window.close()">取消</el-button>
        <el-button type="primary" @click="onSubmit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      formData: {
        apiOrigin: '',
        apiFormatterBody: '',
      },
      rules: {
        apiOrigin: [{ required: true, message: '必填！' }],
        apiFormatterBody: [{ required: true, message: '必填！' }],
      },
    }
  },
  created() {
    this.initFormData()
  },
  methods: {
    initFormData() {
      chrome.storage.sync.get(null, (data) => {
        Object.assign(this.formData, data)
      })
    },
    onSubmit() {
      this.$refs.form.validate((isValid) => {
        if (isValid === false) {
          return
        }
        this.submitForm()
      })
    },
    submitForm() {
      const { apiOrigin, apiFormatterBody } = this.formData
      chrome.storage.sync.set({ apiOrigin, apiFormatterBody }, () => {
        this.$message.success('保存成功，请刷新原页面后重试！')
      })
    },
    onReset() {      
      this.$message.warning('暂未实现！')
    },
  },
}
</script>

<style lang="scss" scoped>
.App {
  display: flex;
  flex-flow: column;
  align-items: center;
}
.el-form {
  width: 600px;
}
.el-form-item:last-child {
  text-align: center;
}
</style>
