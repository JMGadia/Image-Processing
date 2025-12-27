<template>
  <div class="min-h-screen bg-gray-50 flex flex-col justify-center py-12 px-4">
    <div class="sm:mx-auto w-full max-w-md bg-white py-10 px-8 shadow-2xl rounded-3xl">
      <h2 class="text-3xl font-black text-gray-900 mb-6">New Password</h2>

      <form @submit.prevent="updatePassword" class="space-y-6">
        <div>
          <label class="block text-sm font-bold text-gray-700 mb-2">New Password</label>
          <input v-model="newPassword" type="password" required placeholder="••••••••"
            class="block w-full px-4 py-3.5 rounded-2xl border border-gray-200 outline-none" />
        </div>
        <button type="submit" :disabled="loading"
          class="w-full py-4 bg-green-600 text-white font-black rounded-2xl hover:bg-green-700 transition-all">
          {{ loading ? 'Updating...' : 'Update Password' }}
        </button>
      </form>
      <p v-if="message" class="mt-4 text-center text-sm font-bold text-indigo-600">{{ message }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(import.meta.env.VITE_SUPABASE_URL, import.meta.env.VITE_SUPABASE_ANON_KEY)
const router = useRouter()
const newPassword = ref('')
const loading = ref(false)
const message = ref('')

const updatePassword = async () => {
  loading.value = true
  const { error } = await supabase.auth.updateUser({ password: newPassword.value })

  if (error) {
    message.value = error.message
  } else {
    message.value = "Password updated! Redirecting to login..."
    setTimeout(() => router.push('/login'), 2000)
  }
  loading.value = false
}
</script>