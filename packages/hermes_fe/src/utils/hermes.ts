import type { PanelContentItem } from '../components/panelContent/type'
import { PopPanel, type PopPanelObj } from '../components/popPanel'
import { getContent } from './api/getContent'
import { cache } from './cache'

export class Hermes {
  private markId: string = 'hermes-id'
  private hermesDoms: Set<HTMLElement>
  private domObserver: MutationObserver | null
  private popPanel: PopPanelObj | null

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

  constructor(markId: string, requestBaseUrl: string) {
    this.markId = markId
    this.hermesDoms = new Set()
    this.domObserver = null
    this.popPanel = null

    if (requestBaseUrl) Hermes.requestBaseUrl = requestBaseUrl

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
              }
            })
        }
      })
    })
    this.domObserver.observe(document.querySelector('body')!, this.CONFIG)
    this.setHoverActions()
  }

  private setHoverActions() {
    document.addEventListener('mouseover', e => {
      if (
        e.target instanceof HTMLElement &&
        e.target.hasAttribute(`data-${this.markId}`)
      ) {
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
      if (
        (e.target instanceof HTMLElement &&
          !e.target.hasAttribute(`data-${this.markId}`)) ||
        (e.target instanceof HTMLElement &&
          !e.target.hasAttribute(`data-hermes-panel`))
      ) {
        if (this.popPanel) {
          this.popPanel.hidePanel()
        }
      }
    })
  }
}
