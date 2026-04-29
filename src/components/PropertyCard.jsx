import styles from './PropertyCard.module.css'

// 物件情報カード（編集・削除操作付き）
export default function PropertyCard({ property, onEdit, onDelete }) {
  const { name, rent, area, layout } = property

  const handleDelete = () => {
    if (window.confirm(`「${name}」を削除しますか？この操作は取り消せません。`)) {
      onDelete(property.id)
    }
  }

  return (
    <div className={styles.card}>
      <div className={styles.topRow}>
        <span className={styles.badge}>{layout}</span>
        <div className={styles.buttonGroup}>
          <button className={styles.editButton} onClick={() => onEdit(property)}>
            編集
          </button>
          <button className={styles.deleteButton} onClick={handleDelete}>
            削除
          </button>
        </div>
      </div>

      <h2 className={styles.name}>{name}</h2>
      <p className={styles.area}>📍 {area}</p>
      <p className={styles.rent}>¥{rent.toLocaleString()}<span className={styles.perMonth}>/月</span></p>
    </div>
  )
}
