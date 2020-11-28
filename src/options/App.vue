<template>
  <div class="App">
    <h1>自定义配置页</h1>
    <el-form ref="form" :model="formData" :rules="rules" label-position="top">
      <el-form-item label="API 地址：" prop="apiOrigin">
        <el-input v-model="formData.apiOrigin"></el-input>
      </el-form-item>
      <el-form-item label="自定义 生成 API 代码：" prop="apiFormatterStr">
        <div id="api-formatter-str" class="editor-cont"></div>
      </el-form-item>
      <el-form-item
        label="自定义 生成 响应 Table 代码："
        prop="responseToTableConfStr"
      >
        <div
          id="response-to-table-conf-str"
          class="editor-cont editor-cont--height-small"
        ></div>
      </el-form-item>
      <el-form-item>
        <el-button @click="onReset">重置为插件默认值</el-button>
        <el-button @click="window.close()">取消</el-button>
        <el-button type="primary" @click="onSubmit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import * as monaco from 'monaco-editor/esm/vs/editor/editor.api'
import { IStandaloneCodeEditor } from 'monaco-editor'
import { Message } from 'element-ui'
import {
  API_ORIGIN,
  API_FORMATTER_STR,
  RESPONSE_TO_TABLE_CONF_STR,
} from '../constants'
import { Rules } from '../typings/element-ui'

let apiFormatterEditor = null
let responseToTableConfEditor = null

interface formData {
  apiOrigin: string
  apiFormatterStr: string
  responseToTableConfStr: string
}

interface InitialData {
  formData: formData
  rules: Rules
}

export default {
  name: 'App',
  data(): InitialData {
    return {
      formData: {
        apiOrigin: '',
        apiFormatterStr: '',
        responseToTableConfStr: '',
      },
      rules: {
        apiOrigin: [{ required: true, message: '必填！' }],
        apiFormatterStr: [{ required: true, message: '必填！' }],
        responseToTableConfStr: [{ required: true, message: '必填！' }],
      },
    }
  },
  mounted() {
    this.initFormData()
  },
  methods: {
    initFormData(): void {
      chrome.storage.sync.get(null, (data) => {
        const {
          apiOrigin = API_ORIGIN,
          apiFormatterStr = API_FORMATTER_STR,
          responseToTableConfStr = RESPONSE_TO_TABLE_CONF_STR,
        } = data
        Object.assign(this.formData, {
          apiOrigin,
          apiFormatterStr,
          responseToTableConfStr,
        })
        this.resetCodeEditor(this.formData)
      })
    },
    resetCodeEditor({
      apiFormatterStr,
      responseToTableConfStr,
    }: formData): void {
      if (apiFormatterEditor === null) {
        const el = document.getElementById('api-formatter-str')
        apiFormatterEditor = this.initCodeEditor({
          el,
          value: apiFormatterStr,
          onDidChangeContent: () => {
            this.formData.apiFormatterStr = apiFormatterEditor.getValue()
          },
        })
      } else {
        apiFormatterEditor.setValue(apiFormatterEditor)
      }
      if (responseToTableConfEditor === null) {
        const el = document.getElementById('response-to-table-conf-str')
        responseToTableConfEditor = this.initCodeEditor({
          el,
          value: responseToTableConfStr,
          onDidChangeContent: () => {
            this.formData.responseToTableConfStr = responseToTableConfEditor.getValue()
          },
        })
      } else {
        responseToTableConfEditor.setValue(responseToTableConfStr)
      }
    },
    initCodeEditor({ el, value, onDidChangeContent }): IStandaloneCodeEditor {
      const editor = monaco.editor.create(el, {
        value,
        language: 'javascript',
        minimap: { enabled: false },
      })
      editor.getModel().onDidChangeContent(onDidChangeContent)
      return editor
    },
    onSubmit(): void {
      this.$refs.form.validate((isValid) => {
        if (isValid === false) {
          return
        }
        this.submitForm()
      })
    },
    submitForm(): void {
      const {
        apiOrigin,
        apiFormatterStr,
        responseToTableConfStr,
      } = this.formData
      chrome.storage.sync.set(
        { apiOrigin, apiFormatterStr, responseToTableConfStr },
        () => {
          Message({
            type: 'success',
            message: '保存成功，请刷新原页面后重试！',
          })
        }
      )
    },
    onReset(): void {
      const formData = {
        apiOrigin: API_ORIGIN,
        apiFormatterStr: API_FORMATTER_STR,
        responseToTableConfStr: RESPONSE_TO_TABLE_CONF_STR,
      }
      chrome.storage.sync.set(formData, () => {
        this.initFormData()
        Message({ type: 'success', message: '重置成功！' })
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
.editor-cont {
  width: 100%;
  height: 300px;
  border: 1px solid $--border-color-base;
}
.editor-cont--height-small {
  height: 200px;
}
</style>
