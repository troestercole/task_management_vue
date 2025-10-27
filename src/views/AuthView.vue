<template>
  <div class="auth-page">
    <div class="auth-container">
      <LoginForm v-if="currentView === 'login'" @switch-to-register="currentView = 'register'" />
      <RegisterForm v-else @switch-to-login="currentView = 'login'" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import LoginForm from '@/components/auth/LoginForm.vue'
import RegisterForm from '@/components/auth/RegisterForm.vue'

const currentView = ref<'login' | 'register'>('login')
</script>

<style scoped>
.auth-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
}

.auth-container {
  width: 100%;
  max-width: 500px;
}
</style>
