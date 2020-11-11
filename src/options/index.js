// eslint-disable-next-line no-unused-vars
const app = new Vue({
  el: '#app',
  data: {
    formData: {
      apiOrigin: '',
      apiFormatterBody: '',
    },
    rules: {
      apiOrigin: [{ required: true, message: '必填！' }],
      apiFormatterBody: [{ required: true, message: '必填！' }],
    },
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
})
