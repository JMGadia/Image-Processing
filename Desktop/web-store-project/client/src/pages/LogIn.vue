<template>
  <div class="min-h-screen bg-gray-50 flex flex-col justify-center py-12 px-4">
    <div class="sm:mx-auto w-full max-w-md">
      <div class="bg-white py-10 px-8 shadow-2xl rounded-3xl border border-gray-100">
        <h2 class="text-4xl font-black text-center text-gray-900 mb-10">Login</h2>

        <form class="space-y-6" @submit.prevent="handleLogin">
          <div>
            <label class="block text-sm font-bold text-gray-700 mb-2">Email Address</label>
            <input v-model="email" type="email" placeholder="jhunmarkgadia202@gmail.com" required
              class="block w-full px-4 py-3.5 rounded-2xl border border-gray-200 focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all outline-none" />
          </div>

          <div class="relative">
            <label class="block text-sm font-bold text-gray-700 mb-2">Password</label>
            <input v-model="password" :type="showPassword ? 'text' : 'password'" placeholder="••••••••" required
              class="block w-full px-4 py-3.5 rounded-2xl border border-gray-200 focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all outline-none" />
            <button type="button" @click="showPassword = !showPassword"
              class="absolute right-4 top-[42px] text-xs font-black text-gray-400 hover:text-indigo-600 uppercase tracking-widest">
              {{ showPassword ? 'Hide' : 'Show' }}
            </button>
          </div>

          <button type="submit" :disabled="loading"
            class="w-full py-4 bg-indigo-600 text-white font-black rounded-2xl hover:bg-indigo-700 shadow-lg shadow-indigo-200 active:scale-[0.98] transition-all disabled:opacity-50">
            {{ loading ? 'Verifying...' : 'Login' }}
          </button>
        </form>

        <div v-if="error" class="mt-6 p-4 rounded-2xl bg-red-50 border border-red-100 text-center">
           <span class="text-sm font-bold text-red-600">{{ error }}</span>
        </div>

        <div class="mt-8 flex flex-col items-center space-y-3 text-sm">
          <router-link to="/forgot-password" class="text-indigo-600 font-bold hover:text-indigo-800 transition-colors">Forgot Password?</router-link>
          <router-link to="/signup" class="text-indigo-600 font-bold hover:text-indigo-800 transition-colors">
            Don't have an account? Sign Up
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const email = ref('')
const password = ref('')
const showPassword = ref(false)
const loading = ref(false)
const error = ref('')

const handleLogin = async () => {
  loading.value = true
  error.value = ''

  try {
    const res = await fetch('http://localhost:3000/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: email.value, password: password.value })
    })

    const data = await res.json()
    if (!res.ok) throw new Error(data.error)

    // Save session data to localStorage
    localStorage.setItem('userSession', JSON.stringify({
    username: data.user.username,
    role: data.user.role,
    token: Date.now() // Simple session key/timestamp
    }));

    // ROLE-BASED REDIRECTION LOGIC
    if (data.user.role === 'admin') {
      router.push('/admin-dashboard')
    } else {
      router.push('/user-home')
    }

  } catch (err) {
    error.value = err.message
  } finally {
    loading.value = false
  }
}
</script>