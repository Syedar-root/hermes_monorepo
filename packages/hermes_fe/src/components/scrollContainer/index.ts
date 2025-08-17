import styles from './index.module.css'

export function ScrollContainer(maxHeight?: number, content?: HTMLElement) {
  const container = document.createElement('div')
  container.classList.add(styles['hermes-panel-content-scroll'])

  const track = document.createElement('div')
  track.classList.add(styles['hermes-panel-content-scroll-track'])
  track.style.height = `${maxHeight}px`

  const bar = document.createElement('div')
  bar.classList.add(styles['hermes-panel-content-scroll-bar'])
  // 添加过渡效果
  bar.style.transition = 'opacity 0.3s ease-out'
  track.appendChild(bar)
  container.appendChild(track)

  function setContent(content: HTMLElement) {
    container.innerHTML = ''
    container.appendChild(content)
    container.appendChild(track)
  }

  function setMaxHeight(maxHeight: number) {
    container.style.height = `${maxHeight}px`
    track.style.height = `${maxHeight}px`
  }

  if (content) setContent(content)
  if (maxHeight) setMaxHeight(maxHeight)
  else setMaxHeight(0)

  let barOffset = 0

  // 计算滚动条位置
  const updateBarOffset = () => {
    const scrollHeight = container.scrollHeight
    const clientHeight = container.clientHeight
    if (clientHeight <= scrollHeight) {
      const barHeight = (clientHeight / scrollHeight) * clientHeight
      bar.style.height = `${barHeight}px`
      const scrollTop = container.scrollTop
      const offsetRatio = scrollTop / (scrollHeight - clientHeight)
      barOffset = offsetRatio * (clientHeight - barHeight)
      bar.style.transform = `translateY(${barOffset}px)`
    } else {
      bar.style.height = '0px'
    }
  }

  updateBarOffset()
  container.addEventListener('scroll', updateBarOffset)
  track.addEventListener('scroll', updateBarOffset)

  // 拖动滚动条功能
  let isDragging = false
  let startY = 0
  let startBarY = 0

  const handleBarMove = (e: MouseEvent) => {
    if (!isDragging) return
    e.preventDefault()

    const clientHeight = container.clientHeight
    const scrollHeight = container.scrollHeight
    const barHeight = parseFloat(bar.style.height || '0')

    // 计算鼠标移动距离
    const deltaY = e.clientY - startY
    // 计算滚动条可以移动的最大距离
    const maxBarOffset = clientHeight - barHeight // c-h
    const maxScrollOffset = scrollHeight - clientHeight // s-c

    container.scrollTop =
      ((deltaY + startBarY) / maxBarOffset) * maxScrollOffset
  }

  const handleMouseUp = () => {
    isDragging = false
    document.removeEventListener('mousemove', handleBarMove)
    document.removeEventListener('mouseup', handleMouseUp)
  }

  bar.addEventListener('mousedown', e => {
    e.preventDefault()
    isDragging = true
    startY = e.clientY
    startBarY = barOffset
    // 添加全局鼠标事件监听
    document.addEventListener('mousemove', handleBarMove)
    document.addEventListener('mouseup', handleMouseUp)

    // 确保拖动时滚动条可见
    bar.style.opacity = '1'
  })

  // 滚动条显示/隐藏逻辑
  let fadeTimeout: number | null = null
  const handleScrollShow = () => {
    resetFadeTimer()
    updateBarOffset()
    bar.style.opacity = '1'
    startFadeTimer()
  }

  // 重置计时器
  const resetFadeTimer = () => {
    if (fadeTimeout !== null) {
      clearTimeout(fadeTimeout)
      fadeTimeout = null
    }
  }

  // 启动计时器
  const startFadeTimer = () => {
    if (!isDragging) {
      fadeTimeout = window.setTimeout(() => {
        bar.style.opacity = '0'
      }, 1000)
    }
  }

  container.addEventListener('scroll', handleScrollShow)
  track.addEventListener('mouseover', () => {
    resetFadeTimer()
    bar.style.opacity = '1'
  })
  track.addEventListener('mouseleave', () => {
    console.log('mouseleave')
    startFadeTimer()
  })
  container.addEventListener('mouseenter', () => {
    handleScrollShow()
  })
  // 初始化时设置滚动条可见
  bar.style.opacity = '1'

  return { container, setContent, setMaxHeight }
}
