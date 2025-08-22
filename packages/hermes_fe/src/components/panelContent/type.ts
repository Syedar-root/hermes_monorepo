export enum PanelContentItemType {
  FIRST_TITLE = 'firstTitle',
  SECOND_TITLE = 'secondTitle',
  THIRD_TITLE = 'thirdTitle',
  TEXT = 'text',
  LINK = 'link',
  IMAGE = 'image',
  FORMULA = 'formula',
}

export interface PanelContentItem {
  type: PanelContentItemType
  order?: number
  content: string
  marginVertical?: number[]
  align?: 'start' | 'center' | 'end'
  [key: string]: any
}
