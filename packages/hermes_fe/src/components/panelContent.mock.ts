import {
  PanelContentItemType,
  type PanelContentItem,
} from './panelContent/type'

export const mockPanelContentItems: PanelContentItem[] = [
  {
    type: PanelContentItemType.FIRST_TITLE,
    content: 'Hermes赫尔墨斯',
    marginVertical: [12],
  },
  {
    type: PanelContentItemType.SECOND_TITLE,
    content: '为什么叫Hermes',
  },
  {
    type: PanelContentItemType.TEXT,
    content:
      'Hermes是一个基于React的组件库，它的设计目标是提供一套简单、易用的组件，帮助开发者快速构建出美观、功能完善的界面。',
  },
  {
    type: PanelContentItemType.TEXT,
    content:
      '它的组件库包含了常用的组件，如按钮、输入框、弹窗等，同时也支持自定义组件的开发。',
  },
  {
    type: PanelContentItemType.TEXT,
    content:
      '它的组件库包含了常用的组件，如按钮、输入框、弹窗等，同时也支持自定义组件的开发。',
  },
  {
    type: PanelContentItemType.TEXT,
    content:
      '它的组件库包含了常用的组件，如按钮、输入框、弹窗等，同时也支持自定义组件的开发。',
  },
  {
    type: PanelContentItemType.TEXT,
    content:
      '它的组件库包含了常用的组件，如按钮、输入框、弹窗等，同时也支持自定义组件的开发。',
  },
  {
    type: PanelContentItemType.TEXT,
    content:
      '它的组件库包含了常用的组件，如按钮、输入框、弹窗等，同时也支持自定义组件的开发。',
  },
  {
    type: PanelContentItemType.LINK,
    content: '链接',
  },
]
