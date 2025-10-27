import { ref, computed } from 'vue'
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  type User,
} from 'firebase/auth'
import { auth } from '@/firebase/config'

const user = ref<User | null>(null)
const loading = ref(true)
const error = ref<string | null>(null)

export function useAuth() {
  const isAuthenticated = computed(() => !!user.value)

  // Authentication state listener
  const initAuth = () => {
    onAuthStateChanged(auth, (firebaseUser) => {
      user.value = firebaseUser
      loading.value = false
    })
  }

  // Email & Password login
  const login = async (email: string, password: string) => {
    loading.value = true
    error.value = null

    try {
      const result = await signInWithEmailAndPassword(auth, email, password)
      user.value = result.user
      return result
    } catch (err: any) {
      error.value = err.message
      throw err
    } finally {
      loading.value = false
    }
  }

  // Email & Password registration
  const register = async (email: string, password: string) => {
    loading.value = true
    error.value = null

    try {
      const result = await createUserWithEmailAndPassword(auth, email, password)
      user.value = result.user
      return result
    } catch (err: any) {
      error.value = err.message
      throw err
    } finally {
      loading.value = false
    }
  }

  // Google sign in
  const signInWithGoogle = async () => {
    loading.value = true
    error.value = null

    try {
      const provider = new GoogleAuthProvider()
      const result = await signInWithPopup(auth, provider)
      user.value = result.user
      return result
    } catch (err: any) {
      error.value = err.message
      throw err
    } finally {
      loading.value = false
    }
  }

  // Logout
  const logout = async () => {
    loading.value = true
    error.value = null

    try {
      await signOut(auth)
      user.value = null
    } catch (err: any) {
      error.value = err.message
      throw err
    } finally {
      loading.value = false
    }
  }

  return {
    user: computed(() => user.value),
    loading: computed(() => loading.value),
    error: computed(() => error.value),
    isAuthenticated,
    initAuth,
    login,
    register,
    signInWithGoogle,
    logout,
  }
}
