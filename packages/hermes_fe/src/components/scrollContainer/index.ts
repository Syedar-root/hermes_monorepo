import styles from './index.module.css';

/**
 * 自定义滚动容器组件
 * @param maxHeight 最大高度
 * @param content 初始内容元素
 * @param onHeightChange 高度变化时的回调函数
 * @returns 包含容器元素和操作方法的对象
 */
export function ScrollContainer(
  maxHeight?: number,
  content?: HTMLElement,
  onHeightChange?: (height: number) => void
) {
  // 创建容器元素
  const container = document.createElement('div');
  container.classList.add(styles['hermes-panel-content-scroll']);

  // 创建滚动条轨道
  const track = document.createElement('div');
  track.classList.add(styles['hermes-panel-content-scroll-track']);
  track.style.height = `${maxHeight}px`;

  // 创建滚动条
  const bar = document.createElement('div');
  bar.classList.add(styles['hermes-panel-content-scroll-bar']);
  bar.style.transition = 'opacity 0.3s ease-out'; // 添加过渡效果
  track.appendChild(bar);
  container.appendChild(track);

  /**
   * 设置容器内容
   * @param content 要设置的内容元素
   */
  function setContent(content: HTMLElement) {
    container.innerHTML = '';
    container.appendChild(content);
    container.appendChild(track);

    if (maxHeight) setMaxHeight(maxHeight);
  }

  /**
   * 设置容器最大高度
   * @param maxHeight 最大高度值
   */
  function setMaxHeight(maxHeight: number) {
    // 使用requestAnimationFrame确保浏览器完成重排
    requestAnimationFrame(() => {
      container.style.height = 'auto';
      const contentHeight = container.scrollHeight || 0;
      // 如果内容高度小于maxHeight，则使用内容高度，否则使用maxHeight
      const actualHeight = contentHeight < maxHeight ? contentHeight : maxHeight;
      container.style.height = `${actualHeight}px`;
      track.style.height = `${actualHeight}px`;

      // 根据内容高度决定是否显示滚动条
      if (contentHeight <= actualHeight) {
        bar.style.opacity = '0';
        track.style.display = 'none';
      } else {
        bar.style.opacity = '1';
        track.style.display = 'block';
      }
      if (onHeightChange) onHeightChange(actualHeight);
    });
  }

  /**
   * 设置高度变化回调
   * @param callback 回调函数
   */
  function setOnHeightChange(callback: (height: number) => void) {
    onHeightChange = callback;
    if (maxHeight) setMaxHeight(maxHeight);
  }

  // 初始化内容和高度
  if (content) setContent(content);
  if (maxHeight) setMaxHeight(maxHeight);
  else setMaxHeight(0);

  let barOffset = 0; // 滚动条偏移量
  let fadeTimeout: number | null = null; // 淡出计时器

  /**
   * 更新滚动条位置
   */
  const updateBarOffset = () => {
    const scrollHeight = container.scrollHeight;
    const clientHeight = container.clientHeight;

    if (clientHeight < scrollHeight) {
      const barHeight = (clientHeight / scrollHeight) * clientHeight;
      bar.style.height = `${barHeight}px`;
      const scrollTop = container.scrollTop;
      const offsetRatio = scrollTop / (scrollHeight - clientHeight);
      barOffset = offsetRatio * (clientHeight - barHeight);
      bar.style.transform = `translateY(${barOffset}px)`;
      // 确保滚动条和轨道可见
      bar.style.opacity = '1';
      track.style.display = 'block';
    } else {
      bar.style.height = '0px';
      // 隐藏滚动条和轨道
      bar.style.opacity = '0';
      track.style.display = 'none';
    }
  };

  // 初始化滚动条状态
  requestAnimationFrame(() => {
    updateBarOffset();
    const contentHeight = container.scrollHeight || 0;
    const clientHeight = container.clientHeight;
    if (contentHeight <= clientHeight) {
      bar.style.opacity = '0';
      track.style.display = 'none';
    } else {
      bar.style.opacity = '1';
      track.style.display = 'block';
    }
  });

  // 滚动事件监听
  container.addEventListener('scroll', updateBarOffset);
  track.addEventListener('scroll', updateBarOffset);

  // 拖动滚动条功能
  let isDragging = false;
  let startY = 0;
  let startBarY = 0;

  /**
   * 处理滚动条拖动
   * @param e 鼠标事件
   */
  const handleBarMove = (e: MouseEvent) => {
    if (!isDragging) return;
    e.preventDefault();

    const clientHeight = container.clientHeight;
    const scrollHeight = container.scrollHeight;
    const barHeight = parseFloat(bar.style.height || '0');

    // 计算鼠标移动距离和滚动条可移动的最大距离
    const deltaY = e.clientY - startY;
    const maxBarOffset = clientHeight - barHeight;
    const maxScrollOffset = scrollHeight - clientHeight;

    container.scrollTop = ((deltaY + startBarY) / maxBarOffset) * maxScrollOffset;
  };

  /**
   * 处理鼠标释放
   */
  const handleMouseUp = () => {
    isDragging = false;
    document.removeEventListener('mousemove', handleBarMove);
    document.removeEventListener('mouseup', handleMouseUp);
  };

  // 滚动条拖动事件
  bar.addEventListener('mousedown', e => {
    e.preventDefault();
    isDragging = true;
    startY = e.clientY;
    startBarY = barOffset;
    document.addEventListener('mousemove', handleBarMove);
    document.addEventListener('mouseup', handleMouseUp);
    bar.style.opacity = '1'; // 确保拖动时滚动条可见
  });

  /**
   * 重置淡入淡出计时器
   */
  const resetFadeTimer = () => {
    if (fadeTimeout !== null) {
      clearTimeout(fadeTimeout);
      fadeTimeout = null;
    }
  };

  /**
   * 启动淡出计时器
   */
  const startFadeTimer = () => {
    if (!isDragging) {
      fadeTimeout = window.setTimeout(() => {
        bar.style.opacity = '0';
      }, 1000);
    }
  };

  /**
   * 处理滚动显示
   */
  const handleScrollShow = () => {
    resetFadeTimer();
    updateBarOffset();
    bar.style.opacity = '1';
    startFadeTimer();
  };

  // 滚动条显示/隐藏事件监听
  container.addEventListener('scroll', handleScrollShow);
  track.addEventListener('mouseover', () => {
    resetFadeTimer();
    bar.style.opacity = '1';
  });
  track.addEventListener('mouseleave', () => {
    startFadeTimer();
  });
  container.addEventListener('mouseenter', handleScrollShow);

  // 初始化时设置滚动条可见
  bar.style.opacity = '1';

  return { container, setContent, setMaxHeight, setOnHeightChange };
}
