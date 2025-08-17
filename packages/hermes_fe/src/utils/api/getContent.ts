import axios from 'axios'
import { Hermes } from '../hermes'
import type { PanelContentItem } from '../../components/panelContent/type'

export async function getContent(id: string): Promise<PanelContentItem[]> {
  const res = await axios
    .get(`${Hermes.requestBaseUrl}/hermes-dict/content`, { params: { id: id } })
    .then(res => {
      console.log(res)
      return res.data
    })
  return res.data
}
