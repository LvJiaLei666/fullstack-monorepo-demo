<template>
  <div class="user-list">
    <h2>用户列表</h2>

    <div v-if="userStore.loading" class="loading">
      加载中...
    </div>

    <div v-else-if="userStore.error" class="error">
      错误: {{ userStore.error }}
    </div>

    <div v-else>
      <p>总用户数: {{ userStore.userCount }}</p>

      <div v-if="userStore.isLoggedIn" class="current-user">
        <h3>当前用户</h3>
        <div class="user-card">
          <p><strong>ID:</strong> {{ userStore.currentUser?.id }}</p>
          <p><strong>邮箱:</strong> {{ userStore.currentUser?.email }}</p>
          <p><strong>创建时间:</strong> {{ formatDate(userStore.currentUser?.createdAt) }}</p>
        </div>
        <button @click="userStore.logout()">退出登录</button>
      </div>

      <div v-else class="login-form">
        <h3>登录</h3>
        <input
          v-model="email"
          type="email"
          placeholder="请输入邮箱"
          @keyup.enter="handleLogin"
        />
        <button @click="handleLogin">登录</button>
      </div>

      <div class="users-grid">
        <div
          v-for="user in userStore.users"
          :key="user.id"
          class="user-card"
        >
          <p><strong>ID:</strong> {{ user.id }}</p>
          <p><strong>邮箱:</strong> {{ user.email }}</p>
          <p><strong>创建时间:</strong> {{ formatDate(user.createdAt) }}</p>
        </div>
      </div>

      <button @click="userStore.fetchUsers()">刷新用户列表</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type { UserModel } from '@fullstack-monorepo-demo/shared'
import { useUserStore } from '../stores/user'

const userStore = useUserStore()
const email = ref('')

// 类型化的用户数据示例
const sampleUser: UserModel = {
  id: 'sample-id',
  email: 'sample@example.com',
  password: 'hashed-password',
  createdAt: '2021-01-01',
  updatedAt: '2021-01-01'
}

function formatDate(date?: Date | string): string {
  if (!date) return 'N/A'
  return new Date(date).toLocaleString('zh-CN')
}

function handleLogin() {
  if (email.value) {
    userStore.loginUser(email.value)
    email.value = ''
  }
}

onMounted(() => {
  console.log('示例用户数据类型:', sampleUser)
})
</script>

<style scoped>
.user-list {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.loading, .error {
  text-align: center;
  padding: 20px;
  margin: 20px 0;
}

.error {
  color: #e74c3c;
  background-color: #fdf2f2;
  border: 1px solid #fecaca;
  border-radius: 6px;
}

.current-user {
  margin: 20px 0;
  padding: 20px;
  background-color: #f8f9fa;
  border-radius: 8px;
}

.login-form {
  margin: 20px 0;
  padding: 20px;
  background-color: #f8f9fa;
  border-radius: 8px;
}

.login-form input {
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-sizing: border-box;
}

.users-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  margin: 20px 0;
}

.user-card {
  padding: 15px;
  border: 1px solid #e1e5e9;
  border-radius: 8px;
  background-color: #ffffff;
}

button {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  margin: 5px;
}

button:hover {
  background-color: #0056b3;
}
</style>
