import { useState, useEffect } from 'react'
import styles from './PropertyForm.module.css'

// 間取りの選択肢
const LAYOUT_OPTIONS = ['1R', '1K', '1DK', '1LDK', '2K', '2DK', '2LDK', '3DK', '3LDK', '4LDK以上']

const EMPTY_FORM = { name: '', rent: '', area: '', layout: '1LDK' }

// 物件の新規登録・編集に使うモーダルフォーム
export default function PropertyForm({ property, onSubmit, onClose }) {
  const isEdit = Boolean(property)
  const [form, setForm] = useState(EMPTY_FORM)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  // 編集モードのとき既存値をフォームにセットする
  useEffect(() => {
    if (property) {
      setForm({
        name:   property.name,
        rent:   property.rent,
        area:   property.area,
        layout: property.layout,
      })
    } else {
      setForm(EMPTY_FORM)
    }
  }, [property])

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSubmitting(true)
    try {
      await onSubmit({
        name:   form.name.trim(),
        rent:   Number(form.rent),
        area:   form.area.trim(),
        layout: form.layout,
      })
      onClose()
    } catch (err) {
      setError('保存に失敗しました。もう一度お試しください。')
    } finally {
      setSubmitting(false)
    }
  }

  // オーバーレイクリックでモーダルを閉じる
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) onClose()
  }

  return (
    <div className={styles.overlay} onClick={handleOverlayClick}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <h2 className={styles.title}>{isEdit ? '物件を編集' : '物件を登録'}</h2>
          <button className={styles.closeButton} onClick={onClose} aria-label="閉じる">✕</button>
        </div>

        {error && <p className={styles.error}>{error}</p>}

        <form onSubmit={handleSubmit} className={styles.form}>
          <label className={styles.label}>
            物件名
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              className={styles.input}
              placeholder="例: グランドヒルズ渋谷"
              required
            />
          </label>

          <label className={styles.label}>
            月額家賃（円）
            <input
              type="number"
              name="rent"
              value={form.rent}
              onChange={handleChange}
              className={styles.input}
              placeholder="例: 150000"
              min={1}
              required
            />
          </label>

          <label className={styles.label}>
            エリア
            <input
              type="text"
              name="area"
              value={form.area}
              onChange={handleChange}
              className={styles.input}
              placeholder="例: 東京都渋谷区"
              required
            />
          </label>

          <label className={styles.label}>
            間取り
            <select
              name="layout"
              value={form.layout}
              onChange={handleChange}
              className={styles.select}
            >
              {LAYOUT_OPTIONS.map((opt) => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
          </label>

          <div className={styles.actions}>
            <button type="button" className={styles.cancelButton} onClick={onClose}>
              キャンセル
            </button>
            <button type="submit" className={styles.submitButton} disabled={submitting}>
              {submitting ? '保存中...' : isEdit ? '更新する' : '登録する'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
