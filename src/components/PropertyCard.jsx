import styles from './PropertyCard.module.css'

// 物件情報を表示するカードコンポーネント
export default function PropertyCard({ property }) {
  const { name, rent, area, type, rooms } = property

  return (
    <div className={styles.card}>
      <div className={styles.badge}>{type}</div>
      <h2 className={styles.name}>{name}</h2>
      <p className={styles.area}>📍 {area}</p>
      <div className={styles.footer}>
        <span className={styles.rooms}>{rooms}</span>
        <span className={styles.rent}>¥{rent.toLocaleString()}<small>/月</small></span>
      </div>
    </div>
  )
}
