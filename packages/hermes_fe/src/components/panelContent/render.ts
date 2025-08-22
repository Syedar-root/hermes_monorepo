import { PanelContentItemType, type PanelContentItem } from './type'
import styles from './item.module.css'
import katex from 'katex'
import 'katex/dist/katex.min.css'

function renderTitle(item: PanelContentItem) {
  const { type, content, marginVertical } = item
  const titleElement = document.createElement('div')
  titleElement.classList.add(styles['hermes-panel-content-title'])
  switch (type) {
    case PanelContentItemType.FIRST_TITLE:
      titleElement.classList.add(styles['hermes-panel-content-title-1'])
      break
    case PanelContentItemType.SECOND_TITLE:
      titleElement.classList.add(styles['hermes-panel-content-title-2'])
      break
    case PanelContentItemType.THIRD_TITLE:
      titleElement.classList.add(styles['hermes-panel-content-title-3'])
      break
    default:
      break
  }
  titleElement.innerHTML = content
  if (marginVertical) {
    if (marginVertical.length === 2) {
      titleElement.style.margin = `${marginVertical[0]}px 0 ${marginVertical[1]}px 0`
    } else if (marginVertical.length === 1) {
      titleElement.style.margin = `${marginVertical[0]}px 0`
    }
  }
  return titleElement
}

function renderText(item: PanelContentItem) {
  const { content, marginVertical } = item
  const textElement = document.createElement('p')
  textElement.classList.add(styles['hermes-panel-content-text'])
  textElement.innerHTML = content
  if (marginVertical) {
    if (marginVertical.length === 2) {
      textElement.style.margin = `${marginVertical[0]}px 0 ${marginVertical[1]}px 0`
    } else if (marginVertical.length === 1) {
      textElement.style.margin = `${marginVertical[0]}px 0`
    }
  }
  return textElement
}

function renderLink(item: PanelContentItem) {
  const { content, marginVertical } = item
  const linkElement = document.createElement('div')
  linkElement.classList.add(styles['hermes-panel-content-link'])
  linkElement.textContent = content
  if (marginVertical) {
    if (marginVertical.length === 2) {
      linkElement.style.margin = `${marginVertical[0]}px 0 ${marginVertical[1]}px 0`
    } else if (marginVertical.length === 1) {
      linkElement.style.margin = `${marginVertical[0]}px 0`
    }
  }
  linkElement.addEventListener('click', e => {
    e.preventDefault()
    window.open(content, '_blank')
  })
  linkElement.style.cursor = 'pointer'

  return linkElement
}

function renderImage(item: PanelContentItem) {
  const { content, marginVertical } = item
  const imageElement = document.createElement('img')
  imageElement.classList.add(styles['hermes-panel-content-image'])
  imageElement.src = content
  if (marginVertical) {
    if (marginVertical.length === 2) {
      imageElement.style.margin = `${marginVertical[0]}px 0 ${marginVertical[1]}px 0`
    } else if (marginVertical.length === 1) {
      imageElement.style.margin = `${marginVertical[0]}px 0`
    }
  } else {
    imageElement.style.margin = '8px 0'
  }
  return imageElement
}

function renderFormula(item: PanelContentItem) {
  const { content, marginVertical } = item
  const formulaElement = document.createElement('div')
  formulaElement.classList.add(styles['hermes-panel-content-formula'])
  if (marginVertical) {
    if (marginVertical.length === 2) {
      formulaElement.style.margin = `${marginVertical[0]}px 0 ${marginVertical[1]}px 0`
    } else if (marginVertical.length === 1) {
      formulaElement.style.margin = `${marginVertical[0]}px 0`
    }
  } else {
    formulaElement.style.margin = '8px 0'
  }
  katex.render(content, formulaElement)
  return formulaElement
}

export const renderMap = {
  [PanelContentItemType.FIRST_TITLE]: renderTitle,
  [PanelContentItemType.SECOND_TITLE]: renderTitle,
  [PanelContentItemType.THIRD_TITLE]: renderTitle,
  [PanelContentItemType.TEXT]: renderText,
  [PanelContentItemType.LINK]: renderLink,
  [PanelContentItemType.IMAGE]: renderImage,
  [PanelContentItemType.FORMULA]: renderFormula,
}
