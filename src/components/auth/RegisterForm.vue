<template>
  <div class="register-form">
    <h2>Create Account</h2>

    <form @submit.prevent="handleRegister">
      <div class="form-group">
        <label for="email">Email</label>
        <input id="email" v-model="email" type="email" required placeholder="Enter your email" />
      </div>

      <div class="form-group">
        <label for="password">Password</label>
        <input
          id="password"
          v-model="password"
          type="password"
          required
          placeholder="Enter your password"
          minlength="6"
        />
      </div>

      <div class="form-group">
        <label for="confirmPassword">Confirm Password</label>
        <input
          id="confirmPassword"
          v-model="confirmPassword"
          type="password"
          required
          placeholder="Confirm your password"
        />
      </div>

      <button type="submit" :disabled="loading || !isPasswordValid" class="btn-primary">
        {{ loading ? 'Creating Account...' : 'Create Account' }}
      </button>
    </form>

    <div class="divider">
      <span>or</span>
    </div>

    <button @click="handleGoogleLogin" :disabled="loading" class="btn-google">
      <svg class="google-icon" viewBox="0 0 24 24">
        <path
          fill="#4285F4"
          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
        />
        <path
          fill="#34A853"
          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        />
        <path
          fill="#FBBC05"
          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
        />
        <path
          fill="#EA4335"
          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
        />
      </svg>
      Continue with Google
    </button>

    <p v-if="error" class="error">{{ error }}</p>
    <p v-if="!isPasswordValid && confirmPassword" class="error">Passwords do not match</p>

    <p class="auth-switch">
      Already have an account?
      <button @click="$emit('switch-to-login')" class="link-button">Sign in</button>
    </p>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useAuth } from '@/composables/useAuth'

defineEmits<{
  'switch-to-login': []
}>()

const { register, signInWithGoogle, loading, error } = useAuth()

const email = ref('')
const password = ref('')
const confirmPassword = ref('')

const isPasswordValid = computed(
  () => password.value === confirmPassword.value && password.value.length >= 6,
)

const handleRegister = async () => {
  if (!isPasswordValid.value) return

  try {
    await register(email.value, password.value)
  } catch (err) {
    // Error is handled in composable
  }
}

const handleGoogleLogin = async () => {
  try {
    await signInWithGoogle()
  } catch (err) {
    // Error is handled in composable
  }
}
</script>

<style scoped>
/* Same styles as LoginForm.vue */
.register-form {
  max-width: 400px;
  margin: 0 auto;
  padding: 2rem;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.form-group {
  margin-bottom: 1rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: #374151;
}

input {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 4px;
  font-size: 1rem;
}

input:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.btn-primary,
.btn-google {
  width: 100%;
  padding: 0.75rem;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-primary {
  background: #3b82f6;
  color: white;
  margin-bottom: 1rem;
}

.btn-primary:hover:not(:disabled) {
  background: #2563eb;
}

.btn-primary:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.btn-google {
  background: white;
  color: #374151;
  border: 1px solid #d1d5db;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}

.btn-google:hover:not(:disabled) {
  background: #f9fafb;
}

.google-icon {
  width: 20px;
  height: 20px;
}

.divider {
  text-align: center;
  margin: 1.5rem 0;
  position: relative;
}

.divider::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  height: 1px;
  background: #e5e7eb;
}

.divider span {
  background: white;
  padding: 0 1rem;
  color: #6b7280;
}

.error {
  color: #ef4444;
  margin-top: 1rem;
  padding: 0.75rem;
  background: #fef2f2;
  border-radius: 4px;
  border: 1px solid #fecaca;
}

.auth-switch {
  text-align: center;
  margin-top: 1.5rem;
  color: #6b7280;
}

.link-button {
  background: none;
  border: none;
  color: #3b82f6;
  text-decoration: underline;
  cursor: pointer;
  font: inherit;
}
</style>
