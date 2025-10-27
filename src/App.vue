<template>
  <div id="app">
    <div v-if="loading" class="loading">Loading...</div>

    <div v-else-if="!isAuthenticated">
      <AuthView />
    </div>

    <div v-else>
      <header class="app-header">
        <h1>Kanban Board</h1>
        <div class="user-menu">
          <span>Welcome, {{ user?.email }}</span>
          <button @click="handleLogout" class="logout-btn">Logout</button>
        </div>
      </header>

      <main>
        <RouterView />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { RouterView } from 'vue-router'
import { useAuth } from './composables/useAuth'
import AuthView from './views/AuthView.vue'

const { user, loading, isAuthenticated, initAuth, logout } = useAuth()

onMounted(() => {
  initAuth()
})

const handleLogout = async () => {
  try {
    await logout()
  } catch (error) {
    console.error('Logout failed:', error)
  }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

.loading {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  font-size: 1.2rem;
}

.app-header {
  background: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.app-header h1 {
  color: #374151;
}

.user-menu {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.logout-btn {
  background: #ef4444;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9rem;
}

.logout-btn:hover {
  background: #dc2626;
}

main {
  padding: 2rem;
}
</style>
