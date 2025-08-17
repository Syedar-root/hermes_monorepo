import type { PanelContentItem } from '../components/panelContent/type'
import { PopPanel, type PopPanelObj } from '../components/popPanel'
import { getContent } from './api/getContent'
import { cache } from './cache'

interface HermesOptions {
  markId?: string
  requestBaseUrl?: string
  popPanelMaxHeight?: number
  triggerId?: string
}

export class Hermes {
  private markId: string = 'hermes-id'
  private triggerId: string = 'hermes-trigger'
  public hermesDoms: Set<HTMLElement>
  private domObserver: MutationObserver | null
  private popPanel: PopPanelObj | null
  private popPanelMaxHeight: number = 400

  public static requestBaseUrl: string =
    'http://127.0.0.1:4523/m1/4854404-4509875-default'

  private static BASE_CONFIG = {
    childList: true,
    subtree: true,
    attributes: true,
  }

  private CONFIG = {
    ...Hermes.BASE_CONFIG,
    attributeFilter: [`data-${this.markId}`],
  } as MutationObserverInit

  constructor(options: HermesOptions) {
    this.markId = options.markId || this.markId
    this.triggerId = options.triggerId || this.triggerId
    this.hermesDoms = new Set()
    this.domObserver = null
    this.popPanel = null

    if (options.requestBaseUrl) Hermes.requestBaseUrl = options.requestBaseUrl
    this.popPanelMaxHeight = options.popPanelMaxHeight || this.popPanelMaxHeight

    window.addEventListener('popstate', () => {
      this.domObserver?.disconnect()
      this.init()
    })
  }

  private createPopPanel() {
    const panel = document.querySelector(`[data-hermes-panel]`)
    if (panel) {
      document.body.removeChild(panel)
    }
    this.popPanel = PopPanel()
    document.body.appendChild(this.popPanel.panel)
    this.popPanel.hidePanel()
  }

  public init() {
    this.hermesDoms = new Set(
      document.querySelectorAll(`[data-${this.markId}]`)
    )
    this.createPopPanel()

    this.domObserver = new MutationObserver(mutations => {
      mutations.forEach(mutation => {
        if (mutation.target instanceof HTMLElement) {
          mutation.target
            .querySelectorAll(`[data-${this.markId}]`)
            .forEach(item => {
              if (item instanceof HTMLElement && !this.hermesDoms.has(item)) {
                this.hermesDoms.add(item)
                if (
                  !item.hasAttribute(`data-${this.triggerId}`) ||
                  !item.getAttribute(`data-${this.triggerId}`)
                ) {
                  item.setAttribute(`data-${this.triggerId}`, 'hover')
                }
              }
            })
        }
      })
    })
    this.domObserver.observe(document.querySelector('body')!, this.CONFIG)
    this.setHoverActions()
    this.setClickActions()
  }

  private setHoverActions() {
    document.addEventListener('mouseover', e => {
      if (!(e.target instanceof HTMLElement)) return
      const triggerType = e.target.getAttribute(`data-${this.triggerId}`)
      if (triggerType !== 'hover') return
      if (e.target.hasAttribute(`data-${this.markId}`)) {
        if (this.popPanel) {
          this.popPanel.hidePanel()
          const hermesId = e.target.getAttribute(`data-${this.markId}`)
          if (!hermesId) return
          let content: PanelContentItem[] | Promise<PanelContentItem[]>
          if (cache.has(hermesId)) {
            content = cache.get(hermesId) ?? []
          } else {
            content = getContent(hermesId)
          }
          console.log('content', content)
          this.popPanel.showPanel(e.target, content)
        }
      }
    })

    document.addEventListener('mouseout', e => {
      if (!(e.target instanceof HTMLElement)) return
      // const triggerType = e.target.getAttribute(`data-${this.triggerId}`)
      // if (triggerType !== 'hover') return
      if (
        !e.target.hasAttribute(`data-${this.markId}`) ||
        !e.target.hasAttribute(`data-hermes-panel`)
      ) {
        if (this.popPanel) {
          this.popPanel.hidePanel()
        }
      }
    })
  }

  private setClickActions() {
    document.addEventListener('click', e => {
      if (!(e.target instanceof HTMLElement)) return
      const triggerType = e.target.getAttribute(`data-${this.triggerId}`)
      if (triggerType !== 'click') return
      if (e.target.hasAttribute(`data-${this.markId}`)) {
        e.preventDefault()
        if (this.popPanel) {
          this.popPanel.hidePanel()
          const hermesId = e.target.getAttribute(`data-${this.markId}`)
          if (!hermesId) return
          let content: PanelContentItem[] | Promise<PanelContentItem[]>
          if (cache.has(hermesId)) {
            content = cache.get(hermesId) ?? []
          } else {
            content = getContent(hermesId)
          }
          this.popPanel.showPanel(e.target, content)
        }
      } else if (
        !e.target.closest(`[data-${this.markId}]`) &&
        !e.target.closest(`[data-hermes-panel]`)
      ) {
        if (this.popPanel) {
          this.popPanel.hidePanel()
        }
      }
    })
  }
}
