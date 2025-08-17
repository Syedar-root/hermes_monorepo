import styles from './index.module.css'
export function Loading() {
  const loading = document.createElement('div')
  loading.classList.add(styles['hermes-panel-content-loading'])
  return loading
}
