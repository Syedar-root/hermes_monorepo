import { renderMap } from './render'
import { type PanelContentItem } from './type'
import styles from './content.module.css'

export function PanelContent(items?: PanelContentItem[] | undefined) {
  const content = document.createElement('div')
  content.classList.add(styles['hermes-panel-content'])

  if (items) {
    setContent(items)
  }

  function setContent(items: PanelContentItem[]) {
    content.innerHTML = ''
    items?.forEach(item => {
      const itemContainer = document.createElement('div')
      itemContainer.classList.add(styles['hermes-panel-content-item'])
      const element = renderMap[item.type](item)
      if (item.align) {
        itemContainer.style.justifyContent = item.align
      }
      itemContainer.appendChild(element)
      content.appendChild(itemContainer)
    })
  }

  return { content, setContent }
}
