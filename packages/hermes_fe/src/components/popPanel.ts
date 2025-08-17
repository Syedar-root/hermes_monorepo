import styles from './index.module.css'
import { Loading } from './loading'
// import { mockPanelContentItems } from './panelContent.mock'
import { PanelContent } from './panelContent/panelContent'
import type { PanelContentItem } from './panelContent/type'
import { ScrollContainer } from './scrollContainer'

function isPromise(obj: object) {
  return Object.prototype.toString.call(obj) === '[object Promise]'
}

export interface PopPanelObj {
  panel: HTMLElement
  showPanel: (
    target: HTMLElement,
    contents: PanelContentItem[] | Promise<PanelContentItem[]>
  ) => void

  hidePanel: () => void
}

const POP_PANEL_OFFSET = 4

export function PopPanel(delay: number = 800, maxHeight: number = 400) {
  const panel = document.createElement('div')
  panel.classList.add(styles['hermes-panel'])
  panel.setAttribute('data-hermes-panel', '')
  // panel.appendChild(PanelContent(mockPanelContentItems))
  const { content: panelContent, setContent: setPanelContent } = PanelContent()
  const loading = Loading()
  const {
    container: scrollContainer,
    setContent: setScrollContainer,
    setOnHeightChange,
  } = ScrollContainer(maxHeight, loading)
  panel.appendChild(scrollContainer)

  let timer: number | null = null
  let eventsSetUp = false

  // 添加面板鼠标事件监听，确保只设置一次
  const setupPanelEvents = () => {
    if (eventsSetUp) return
    eventsSetUp = true
    // 鼠标进入面板时取消隐藏计时器
    panel.addEventListener('mouseover', () => {
      if (timer !== null) {
        clearTimeout(timer)
        timer = null
      }
    })

    // 鼠标离开面板时设置隐藏计时器
    panel.addEventListener('mouseleave', () => {
      hidePanel()
    })
  }

  const calculatePosition = (target: HTMLElement) => {
    const { width, height } = panel.getBoundingClientRect()
    const targetRect = target.getBoundingClientRect()
    const viewportWidth = window.innerWidth
    const viewportHeight = window.innerHeight

    // 计算垂直位置
    let topPosition: number
    let arrowOffset: number

    if (targetRect.top < height + POP_PANEL_OFFSET) {
      // 显示在目标下方
      topPosition = targetRect.top + targetRect.height + POP_PANEL_OFFSET
      arrowOffset = -4
    } else {
      // 显示在目标上方
      topPosition = targetRect.top - height - POP_PANEL_OFFSET
      arrowOffset = height - 4
    }

    // 确保垂直方向不超出视口
    if (topPosition < 0) {
      topPosition = 0
    } else if (topPosition + height > viewportHeight) {
      topPosition = viewportHeight - height
    }

    panel.style.top = `${topPosition}px`

    // 计算水平位置
    let leftPosition = targetRect.left + targetRect.width / 2 - width / 2

    // 确保水平方向不超出视口
    if (leftPosition < 0) {
      leftPosition = 0
    } else if (leftPosition + width > viewportWidth) {
      leftPosition = viewportWidth - width
    }

    panel.style.left = `${leftPosition}px`

    // 设置css变量（箭头位置）
    panel.style.setProperty('--arrow-offset', `${arrowOffset}px`)
  }

  const showPanel = async (
    target: HTMLElement,
    contents: PanelContentItem[] | Promise<PanelContentItem[]>
  ) => {
    // 确保事件监听被设置
    setupPanelEvents()
    setOnHeightChange(() => {
      calculatePosition(target)
    })

    if (isPromise(contents)) {
      panel.style.display = 'block'
      panel.style.opacity = '1'

      setScrollContainer(loading)
      calculatePosition(target)
      const startTime = new Date()

      const contentItems = await contents
      const currTime = new Date()
      const waitLoadingTime =
        currTime.getTime() - startTime.getTime() < 1000
          ? 1000 - (currTime.getTime() - startTime.getTime())
          : 0
      setTimeout(() => {
        setPanelContent(contentItems)
        setScrollContainer(panelContent)
        calculatePosition(target)
      }, waitLoadingTime)
    } else {
      panel.style.display = 'block'
      panel.style.opacity = '1'
      setPanelContent(contents as PanelContentItem[])
      setScrollContainer(panelContent)
      calculatePosition(target)
    }

    if (timer !== null) {
      clearTimeout(timer)
    }
  }

  const hidePanel = () => {
    // 只有当鼠标不在面板上时才隐藏
    if (!panel.matches(':hover')) {
      if (timer !== null) {
        clearTimeout(timer)
      }

      timer = window.setTimeout(() => {
        panel.style.display = 'none'
        timer = null
      }, delay)
    }
  }

  // 初始化时隐藏面板
  hidePanel()

  return {
    panel,
    showPanel,
    hidePanel,
  } as PopPanelObj
}
