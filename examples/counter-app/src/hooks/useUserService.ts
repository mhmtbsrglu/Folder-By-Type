import { useState, useCallback } from 'react'
import { AxiosError } from 'axios'
import type { UpdateUserPayload, User } from '../types/user'
import { getUser, updateUser } from '../services/userService'
interface UseUserServiceReturn {
  data: User | null
  loading: boolean
  error: AxiosError | null
  fetchUser: (id: string) => Promise<User>
  editUser: (id: string, payload: UpdateUserPayload) => Promise<User>
}

export const useUserService = (): UseUserServiceReturn => {
  const [data, setData] = useState<User | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<AxiosError | null>(null)

  const fetchUser = useCallback(async (id: string): Promise<User> => {
    setLoading(true)
    setError(null)
    try {
      const response = await getUser(id)
      setData(response)
      return response
    } catch (err) {
      console.log(err)
      setError(err as AxiosError)
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  const editUser = useCallback(
    async (id: string, payload: UpdateUserPayload): Promise<User> => {
      setLoading(true)
      setError(null)
      try {
        const response = await updateUser(id, payload)
        setData(response)
        return response
      } catch (err) {
        setError(err as AxiosError)
        throw err
      } finally {
        setLoading(false)
      }
    },
    []
  )

  return { data, loading, error, fetchUser, editUser }
}