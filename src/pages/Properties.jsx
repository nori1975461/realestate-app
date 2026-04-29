import { useAuth } from '../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'
import PropertyCard from '../components/PropertyCard'
import styles from './Properties.module.css'

// ダミーの物件データ
const DUMMY_PROPERTIES = [
  { id: 1, name: 'グランドヒルズ渋谷', rent: 180000, area: '東京都渋谷区', type: 'マンション', rooms: '2LDK' },
  { id: 2, name: 'サンライズ新宿', rent: 95000, area: '東京都新宿区', type: 'アパート', rooms: '1K' },
  { id: 3, name: 'ブルースカイ横浜', rent: 130000, area: '神奈川県横浜市', type: 'マンション', rooms: '1LDK' },
  { id: 4, name: 'メゾン大阪梅田', rent: 110000, area: '大阪府大阪市北区', type: 'マンション', rooms: '2DK' },
  { id: 5, name: '緑風荘三鷹', rent: 72000, area: '東京都三鷹市', type: 'アパート', rooms: '1K' },
  { id: 6, name: 'パークサイド吉祥寺', rent: 155000, area: '東京都武蔵野市', type: 'マンション', rooms: '2LDK' },
]

export default function Properties() {
  const { user, signOut } = useAuth()
  const navigate = useNavigate()

  const handleSignOut = async () => {
    await signOut()
    navigate('/login')
  }

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1 className={styles.logo}>🏠 不動産管理</h1>
        <div className={styles.userArea}>
          <span className={styles.email}>{user?.email}</span>
          <button onClick={handleSignOut} className={styles.signOutButton}>
            ログアウト
          </button>
        </div>
      </header>

      <main className={styles.main}>
        <h2 className={styles.sectionTitle}>物件一覧</h2>
        <p className={styles.count}>{DUMMY_PROPERTIES.length}件の物件</p>
        <div className={styles.grid}>
          {DUMMY_PROPERTIES.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      </main>
    </div>
  )
}
