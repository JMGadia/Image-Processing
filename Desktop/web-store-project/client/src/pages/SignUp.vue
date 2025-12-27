<template>
  <div class="min-h-screen bg-gray-50 flex flex-col justify-center py-12 px-4">
    <div class="sm:mx-auto w-full max-w-md">
      <div class="bg-white py-8 px-6 shadow-xl rounded-2xl border border-gray-100">
        <h2 class="text-3xl font-extrabold text-center text-gray-900 mb-8">Sign Up</h2>

        <form class="space-y-5" @submit.prevent="handleSignup">
          <div>
            <label class="block text-sm font-semibold text-gray-700">Username</label>
            <input v-model="form.username" type="text" placeholder="Min 6 characters" required
              class="block w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 outline-none" />
          </div>

          <div>
            <label class="block text-sm font-semibold text-gray-700">Gmail Address</label>
            <input v-model="form.email" type="email" placeholder="example@gmail.com" required
              class="block w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 outline-none" />
          </div>

          <div class="relative">
            <label class="block text-sm font-semibold text-gray-700">Password</label>
            <input v-model="form.password" :type="showPassword ? 'text' : 'password'" placeholder="••••••••" required
              class="block w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 outline-none" />
            <button type="button" @click="showPassword = !showPassword"
              class="absolute right-3 top-9 text-xs font-bold text-gray-500 hover:text-indigo-600">
              {{ showPassword ? 'HIDE' : 'SHOW' }}
            </button>
          </div>

          <button type="submit" :disabled="loading"
            class="w-full py-3 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition-all disabled:opacity-50">
            {{ loading ? 'Processing...' : 'Create Account' }}
          </button>
        </form>

        <div v-if="message" :class="`mt-4 p-3 rounded-xl text-center text-sm font-bold ${isSuccess ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`">
          {{ message }}
        </div>

        <div class="mt-6 text-center text-sm">
          <router-link to="/login" class="text-indigo-600 hover:underline">Already have an account? Log in</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const form = ref({ username: '', email: '', password: '' })
const showPassword = ref(false)
const loading = ref(false)
const message = ref('')
const isSuccess = ref(false)

const handleSignup = async () => {
  if (form.value.username.length < 6) {
    message.value = "Username must be 6+ characters!";
    return;
  }

  loading.value = true
  message.value = ''

  try {
    const res = await fetch('http://localhost:3000/api/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form.value)
    })
    const data = await res.json()

    if (!res.ok) throw new Error(data.error)

    isSuccess.value = true
    message.value = "Registration successful! Please check your Gmail to verify your account."
    // Don't redirect immediately so they can read the instruction
  } catch (err) {
    isSuccess.value = false
    message.value = err.message
  } finally {
    loading.value = false
  }
}
</script>