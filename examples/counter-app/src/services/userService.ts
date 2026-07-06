import type { UpdateUserPayload, User } from "../types/user"
import axiosClient from "./axios"


export const getUser = (id: string): Promise<User> =>
  axiosClient.get(`/users/${id}`)

export const updateUser = (id: string, payload: UpdateUserPayload): Promise<User> =>
  axiosClient.put(`/users/${id}`, payload)