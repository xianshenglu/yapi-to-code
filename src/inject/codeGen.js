import ClipboardJS from 'clipboard'

export default class CodeGen {
  constructor({ name, request = function () {}, formatter = function () {} }) {
    this.el = CodeGen.injectBtn(name)
    this.request = request
    this.formatter = formatter
  }

  static initContainer() {
    const styles = {
      position: 'fixed',
      right: '10px',
      top: '65px',
      fontSize: '14px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
    }
    const div = document.createElement('div')

    Object.entries(styles).forEach(([key, val]) => {
      div.style[key] = val
    })

    document.body.appendChild(div)
    return div
  }

  static injectBtn(innerHTML) {
    const btn = document.createElement('BUTTON')
    btn.innerHTML = innerHTML
    btn.style.marginRight = '10px'
    CodeGen.container.appendChild(btn)
    return btn
  }

  hide() {
    this.el.style.display = 'none'
  }

  async init() {
    const { data } = await this.request()
    let result = ''
    try {
      result = this.formatter(data)
    } catch (error) {
      result = '请检查数据结构 或 自定义的 生成代码！'
    }
    this.el.dataset.clipboardText = result
    new ClipboardJS(this.el).on('error', function () {
      // eslint-disable-next-line no-alert
      alert('复制失败！')
    })
  }
}
CodeGen.apiOrigin = ''
CodeGen.container = CodeGen.initContainer()
