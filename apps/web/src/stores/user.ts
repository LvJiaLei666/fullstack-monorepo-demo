import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { UserModel } from '@fullstack-monorepo-demo/shared'

export const useUserStore = defineStore('user', () => {
  // 状态
  const currentUser = ref<UserModel | null>(null)
  const users = ref<UserModel[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  // 计算属性
  const isLoggedIn = computed(() => currentUser.value !== null)
  const userCount = computed(() => users.value.length)

  // 方法
  async function fetchUsers() {
    loading.value = true
    error.value = null
    try {
      // 这里将来会调用API
      // const response = await api.get('/users')
      // users.value = response.data || []
      console.log('Fetching users...')
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to fetch users'
    } finally {
      loading.value = false
    }
  }

  async function loginUser(email: string) {
    loading.value = true
    error.value = null
    try {
      // 这里将来会调用登录API
      // const response = await api.post('/auth/login', { email, password })
      // currentUser.value = response.data || null
      console.log('Logging in user:', email)
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Login failed'
    } finally {
      loading.value = false
    }
  }

  function logout() {
    currentUser.value = null
    users.value = []
    error.value = null
  }

  return {
    // 状态
    currentUser,
    users,
    loading,
    error,
    // 计算属性
    isLoggedIn,
    userCount,
    // 方法
    fetchUsers,
    loginUser,
    logout
  }
})
