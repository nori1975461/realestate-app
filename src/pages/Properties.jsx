import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { useProperties } from '../hooks/useProperties'
import PropertyCard from '../components/PropertyCard'
import PropertyForm from '../components/PropertyForm'
import styles from './Properties.module.css'

export default function Properties() {
  const { user, signOut } = useAuth()
  const navigate = useNavigate()
  const { properties, loading, error, addProperty, updateProperty, deleteProperty } = useProperties()

  // フォームモーダルの表示制御
  const [isFormOpen, setIsFormOpen] = useState(false)
  // 編集中の物件（nullなら新規登録モード）
  const [editingProperty, setEditingProperty] = useState(null)

  const handleSignOut = async () => {
    await signOut()
    navigate('/login')
  }

  // 新規登録ボタン押下
  const handleAddClick = () => {
    setEditingProperty(null)
    setIsFormOpen(true)
  }

  // 編集ボタン押下（対象物件をステートにセット）
  const handleEditClick = (property) => {
    setEditingProperty(property)
    setIsFormOpen(true)
  }

  // フォームのサブミット（新規 or 更新を判定）
  const handleFormSubmit = async (formData) => {
    if (editingProperty) {
      await updateProperty(editingProperty.id, formData)
    } else {
      await addProperty(formData)
    }
  }

  const handleFormClose = () => {
    setIsFormOpen(false)
    setEditingProperty(null)
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
        <div className={styles.toolbar}>
          <div>
            <h2 className={styles.sectionTitle}>物件一覧</h2>
            {!loading && (
              <p className={styles.count}>{properties.length}件の物件</p>
            )}
          </div>
          <button className={styles.addButton} onClick={handleAddClick}>
            ＋ 物件を登録
          </button>
        </div>

        {/* エラー表示 */}
        {error && (
          <p className={styles.error}>データの取得に失敗しました: {error}</p>
        )}

        {/* ローディング表示 */}
        {loading && (
          <div className={styles.loading}>
            <p>読み込み中...</p>
          </div>
        )}

        {/* 物件が0件のときの案内 */}
        {!loading && !error && properties.length === 0 && (
          <div className={styles.empty}>
            <p>登録されている物件はありません。</p>
            <p>「＋ 物件を登録」ボタンから最初の物件を追加しましょう。</p>
          </div>
        )}

        {/* 物件カード一覧 */}
        {!loading && properties.length > 0 && (
          <div className={styles.grid}>
            {properties.map((property) => (
              <PropertyCard
                key={property.id}
                property={property}
                onEdit={handleEditClick}
                onDelete={deleteProperty}
              />
            ))}
          </div>
        )}
      </main>

      {/* 登録・編集モーダル */}
      {isFormOpen && (
        <PropertyForm
          property={editingProperty}
          onSubmit={handleFormSubmit}
          onClose={handleFormClose}
        />
      )}
    </div>
  )
}
