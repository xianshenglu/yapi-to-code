<template>
  <div class="App">
    <h1>自定义配置页</h1>
    <el-form ref="form" :model="formData" :rules="rules" label-position="top">
      <el-form-item label="API 地址：" prop="apiOrigin">
        <el-input v-model="formData.apiOrigin"></el-input>
      </el-form-item>
      <el-form-item
        label="自定义前端 API 代码："
        prop="apiFormatterStr"
        class="form-item--code-editor"
      >
        <div id="api-formatter-str" class="code-editor-cont"></div>
      </el-form-item>
      <el-form-item>
        <el-button @click="onReset">重置为插件默认值</el-button>
        <el-button @click="window.close()">取消</el-button>
        <el-button type="primary" @click="onSubmit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import * as monaco from 'monaco-editor'
import { API_ORIGIN, API_FORMATTER_STR } from '../constants'

let editor = null
export default {
  name: 'App',
  data() {
    return {
      formData: {
        apiOrigin: '',
        apiFormatterStr: '',
      },
      rules: {
        apiOrigin: [{ required: true, message: '必填！' }],
        apiFormatterStr: [{ required: true, message: '必填！' }],
      },
    }
  },
  mounted() {
    this.initFormData()
  },
  methods: {
    initFormData() {
      chrome.storage.sync.get(null, (data) => {
        const {
          apiOrigin = API_ORIGIN,
          apiFormatterStr = API_FORMATTER_STR,
        } = data
        Object.assign(this.formData, { apiOrigin, apiFormatterStr })
        this.resetCodeEditor(apiFormatterStr)
      })
    },
    resetCodeEditor(value) {
      if (editor === null) {
        this.initCodeEditor(value)
        return
      }
      editor.setValue(value)
    },
    initCodeEditor(value) {
      const el = document.getElementById('api-formatter-str')
      editor = monaco.editor.create(el, {
        value,
        language: 'javascript',
        minimap: { enabled: false },
      })
      editor.getModel().onDidChangeContent(() => {
        this.formData.apiFormatterStr = editor.getValue()
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
      const { apiOrigin, apiFormatterStr } = this.formData
      chrome.storage.sync.set({ apiOrigin, apiFormatterStr }, () => {
        this.$message.success('保存成功，请刷新原页面后重试！')
      })
    },
    onReset() {
      const formData = {
        apiOrigin: API_ORIGIN,
        apiFormatterStr: API_FORMATTER_STR,
      }
      chrome.storage.sync.set(formData, () => {
        this.initFormData()
        this.$message.success('重置成功！')
      })
    },
  },
}
</script>

<style lang="scss" scoped>
@import '../styles/common/variables.scss';
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
.form-item--code-editor ::v-deep .el-form-item__content {
  height: 300px;
}
.code-editor-cont {
  width: 100%;
  height: 100%;
  border: 1px solid $--border-color-base;
}
</style>
