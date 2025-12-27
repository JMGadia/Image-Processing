<template>
  <div class="min-h-screen bg-slate-950 text-slate-100 selection:bg-violet-500/30 font-sans">
    <nav class="bg-slate-900 shadow-xl border-b border-slate-800 px-6 py-5 flex items-center justify-between sticky top-0 z-50">
      <div class="flex items-center space-x-3">
        <div class="w-10 h-10 bg-gradient-to-br from-violet-600 to-indigo-700 rounded-xl flex items-center justify-center shadow-lg">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
        </div>
        <span class="text-2xl font-black text-white tracking-tight underline decoration-violet-500 decoration-4">
          Gadia<span class="text-violet-500 italic">SARI-SARI</span>
        </span>
      </div>

      <div class="hidden md:flex items-center space-x-6">
        <div class="flex items-center space-x-4 border-r border-slate-800 pr-6 mr-4">
          <router-link to="/admin-dashboard" class="text-sm font-bold transition-colors" active-class="text-violet-400 border-b-2 border-violet-500 pb-1">Dashboard</router-link>
          <router-link to="/inventory" class="text-sm font-bold text-slate-400 hover:text-white transition-colors" active-class="text-violet-400 border-b-2 border-violet-500 pb-1">Inventory</router-link>
          <router-link to="/stock-in" class="text-sm font-bold text-slate-400 hover:text-white transition-colors" active-class="text-violet-400 border-b-2 border-violet-500 pb-1">Stock In</router-link>
          <router-link to="/stock-out" class="text-sm font-bold text-slate-400 hover:text-white transition-colors" active-class="text-violet-400 border-b-2 border-violet-500 pb-1">Stock Out</router-link>
          <router-link to="/gcash-atm" class="text-sm font-bold text-slate-400 hover:text-white transition-colors" active-class="text-violet-400 border-b-2 border-violet-500 pb-1">GCash & ATM</router-link>
          <router-link to="/lending-list" class="text-sm font-bold text-slate-400 hover:text-white transition-colors" active-class="text-violet-400 border-b-2 border-violet-500 pb-1">Lending List</router-link>
        </div>

        <div class="relative group">
          <button class="flex items-center space-x-2 bg-slate-800 px-4 py-2 rounded-xl border border-slate-700 hover:bg-slate-700 transition-all">
            <span class="text-sm font-bold text-slate-200">Account</span>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-slate-500 group-hover:rotate-180 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          <div class="absolute right-0 mt-2 w-64 bg-slate-900 rounded-2xl shadow-2xl border border-slate-800 py-4 invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all transform origin-top-right scale-95 group-hover:scale-100 z-50">
            <div class="px-5 pb-3 border-b border-slate-800">
              <p class="text-[10px] font-black text-slate-500 uppercase tracking-widest">Signed in as</p>
              <p class="text-sm font-bold text-white truncate">{{ adminName }}</p>
              <p class="text-xs text-slate-400 truncate">{{ adminEmail }}</p>
            </div>
            <div class="mt-2 px-2">
              <button @click="triggerLogoutModal" class="w-full flex items-center space-x-3 px-3 py-2 text-rose-400 hover:bg-rose-900/20 rounded-xl transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                <span class="text-sm font-bold">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div class="md:hidden flex items-center">
        <button @click="isMobileMenuOpen = !isMobileMenuOpen" class="text-slate-300 hover:text-white p-2 z-50">
          <svg v-if="!isMobileMenuOpen" xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
          <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </nav>

    <transition name="fade">
      <div v-if="isMobileMenuOpen" class="fixed inset-0 z-40 bg-slate-950 md:hidden pt-24 px-8 overflow-y-auto">
        <div class="flex flex-col space-y-6">
          <div class="bg-slate-900 p-6 rounded-3xl border border-slate-800 mb-4">
            <p class="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Account Info</p>
            <h2 class="text-xl font-black text-white">{{ adminName }}</h2>
            <p class="text-sm text-slate-400">{{ adminEmail }}</p>
          </div>
          <router-link @click="isMobileMenuOpen = false" to="/admin-dashboard" class="text-xl font-bold text-slate-300">Dashboard</router-link>
          <router-link @click="isMobileMenuOpen = false" to="/inventory" class="text-xl font-bold text-slate-300">Inventory</router-link>
          <router-link @click="isMobileMenuOpen = false" to="/stock-in" class="text-xl font-bold text-slate-300">Stock In</router-link>
          <router-link @click="isMobileMenuOpen = false" to="/stock-out" class="text-xl font-bold text-slate-300">Stock Out</router-link>
          <router-link @click="isMobileMenuOpen = false" to="/gcash-atm" class="text-xl font-bold text-slate-300">GCash & ATM</router-link>
          <router-link @click="isMobileMenuOpen = false" to="/lending-list" class="text-xl font-bold text-slate-300">Lending List</router-link>
          <hr class="border-slate-800">
          <button @click="triggerLogoutModal" class="text-left text-rose-500 font-bold text-xl flex items-center space-x-3">
            <span>Logout</span>
          </button>
        </div>
      </div>
    </transition>

    <transition name="modal">
      <div v-if="showLogoutModal" class="fixed inset-0 z-[100] flex items-center justify-center p-4">
        <div class="fixed inset-0 bg-slate-950/80 backdrop-blur-md" @click="showLogoutModal = false"></div>

        <div class="relative w-full max-w-sm bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl p-8 transform transition-all">
          <div class="flex flex-col items-center text-center">
            <div class="w-20 h-20 bg-rose-500/10 rounded-full flex items-center justify-center mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 text-rose-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
            </div>
            <h3 class="text-2xl font-black text-white mb-2 tracking-tight">Are you sure?</h3>
            <p class="text-slate-400 text-sm mb-8 leading-relaxed">You are about to log out from the Gadia Sari-Sari Store Management System.</p>

            <div class="grid grid-cols-2 gap-4 w-full">
              <button @click="showLogoutModal = false" class="py-3 px-4 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold rounded-2xl transition-all uppercase text-[10px] tracking-widest border border-slate-700">
                Go Back
              </button>
              <button @click="confirmLogout" class="py-3 px-4 bg-rose-600 hover:bg-rose-500 text-white font-bold rounded-2xl shadow-lg shadow-rose-600/20 transition-all uppercase text-[10px] tracking-widest">
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </transition>

    <main class="p-6 md:p-10 max-w-7xl mx-auto">
      <slot />
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const adminName = ref('Admin')
const adminEmail = ref('')
const isMobileMenuOpen = ref(false)
const showLogoutModal = ref(false)

// 1. Function to trigger the modal
const triggerLogoutModal = () => {
  isMobileMenuOpen.value = false
  showLogoutModal.value = true

  // Push a dummy state to history so if they click 'Cancel',
  // we can handle the history correctly
  history.pushState(null, null, window.location.pathname);
}

// 2. The Logic to catch the Back Button
const handleBackButton = (event) => {
  // If the logout modal isn't open yet, open it!
  if (!showLogoutModal.value) {
    showLogoutModal.value = true;

    // Stop the browser from actually going back
    history.pushState(null, null, window.location.pathname);
  }
};

onMounted(() => {
  const session = localStorage.getItem('userSession')
  if (session) {
    const userData = JSON.parse(session)
    adminName.value = userData.username || 'Admin'
    adminEmail.value = userData.email || 'No email provided'
  }

  // 3. Start listening for the back button
  window.addEventListener('popstate', handleBackButton);

  // Push an initial dummy state so there's something to "go back" from
  history.pushState(null, null, window.location.pathname);
})

onUnmounted(() => {
  // Clean up the listener when component is destroyed
  window.removeEventListener('popstate', handleBackButton);
})

const confirmLogout = () => {
  localStorage.removeItem('userSession');
  // Use replace to prevent the user from "going back" into the admin panel
  router.replace('/login');
};

// If they click "Go Back" (Cancel) in your modal
const cancelLogout = () => {
  showLogoutModal.value = false;
};
</script>

<style scoped>
/* Page & Sidebar Transitions */
.fade-enter-active, .fade-leave-active { transition: opacity 0.3s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }

/* Modal Zoom/Fade Animation */
.modal-enter-active, .modal-leave-active { transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1); }
.modal-enter-from, .modal-leave-to { opacity: 0; transform: scale(0.9) translateY(20px); }
</style>