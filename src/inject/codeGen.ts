import ClipboardJS from 'clipboard'
import { YApiRequest, YApiResponseBody } from '../typings/apis'

export default class CodeGen {
  el: HTMLElement

  request: YApiRequest | void

  formatter: (arg: YApiResponseBody) => string | void

  static container: HTMLElement = CodeGen.initContainer()

  static apiOrigin = ''

  static injectBtn(innerHTML: string): HTMLElement {
    const btn = document.createElement('BUTTON')
    btn.innerHTML = innerHTML
    btn.style.marginRight = '10px'
    CodeGen.container.appendChild(btn)
    return btn
  }

  constructor({
    name,
    request,
    formatter = () => '',
  }: {
    name: string
    request?: YApiRequest
    formatter?: () => string
  }) {
    this.el = CodeGen.injectBtn(name)
    this.request = request
    this.formatter = formatter
  }

  static initContainer(): HTMLElement {
    const styles = {
      position: 'fixed',
      right: '10px',
      top: '65px',
      fontSize: '14px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
    }
    const div: HTMLElement = document.createElement('div')

    Object.entries(styles).forEach(([key, val]) => {
      div.style[key] = val
    })

    document.body.appendChild(div)
    return div
  }

  hide(): void {
    this.el.style.display = 'none'
  }

  async init(): Promise<void> {
    let result = ''
    try {
      const data = await this.request()
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
