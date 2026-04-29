import { useState, useEffect, useCallback } from 'react'
import { supabase } from '../supabaseClient'
import { useAuth } from '../contexts/AuthContext'

// propertiesテーブルへのCRUD操作を管理するカスタムフック
export function useProperties() {
  const { user } = useAuth()
  const [properties, setProperties] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // 自分の物件一覧を取得する（RLSにより他ユーザーの物件は取得されない）
  const fetchProperties = useCallback(async () => {
    setLoading(true)
    setError(null)
    const { data, error } = await supabase
      .from('properties')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      setError(error.message)
    } else {
      setProperties(data)
    }
    setLoading(false)
  }, [])

  useEffect(() => {
    if (user) fetchProperties()
  }, [user, fetchProperties])

  // 物件を新規登録する
  const addProperty = async (formData) => {
    const { data, error } = await supabase
      .from('properties')
      .insert([{ ...formData, user_id: user.id }])
      .select()
      .single()

    if (error) throw error
    // ローカルステートの先頭に追加して即時反映する
    setProperties((prev) => [data, ...prev])
    return data
  }

  // 物件情報を更新する
  const updateProperty = async (id, formData) => {
    const { data, error } = await supabase
      .from('properties')
      .update(formData)
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    // 更新された物件をローカルステートに反映する
    setProperties((prev) => prev.map((p) => (p.id === id ? data : p)))
    return data
  }

  // 物件を削除する
  const deleteProperty = async (id) => {
    const { error } = await supabase
      .from('properties')
      .delete()
      .eq('id', id)

    if (error) throw error
    // 削除した物件をローカルステートから除外する
    setProperties((prev) => prev.filter((p) => p.id !== id))
  }

  return {
    properties,
    loading,
    error,
    addProperty,
    updateProperty,
    deleteProperty,
  }
}
