<template>
  <div class="min-h-screen bg-slate-950 text-slate-100 font-sans">
    <nav class="bg-slate-900 border-b border-emerald-500/20 px-6 py-4 flex items-center justify-between sticky top-0 z-50">
      <div class="flex items-center space-x-3">
        <div class="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-700 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/20">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>
        </div>
        <div>
          <span class="text-xl font-black text-white tracking-tight uppercase">Gadia<span class="text-emerald-500 italic">POS</span></span>
          <p class="text-[9px] text-emerald-500/70 font-bold tracking-[0.2em] uppercase leading-none">Terminal Access</p>
        </div>
      </div>

      <div class="relative group">
        <button class="flex items-center space-x-3 bg-slate-800/50 hover:bg-slate-800 p-1.5 pr-4 rounded-2xl border border-slate-700 transition-all active:scale-95">
          <div class="w-8 h-8 bg-emerald-500 rounded-xl flex items-center justify-center text-emerald-950 font-black text-xs uppercase">
            {{ adminName.charAt(0) }}
          </div>
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-slate-500 group-hover:rotate-180 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        <div class="absolute right-0 mt-3 w-64 bg-slate-900 rounded-[2rem] shadow-2xl border border-slate-800 py-6 invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all transform origin-top-right scale-95 group-hover:scale-100 z-[60]">
          <div class="px-6 pb-4 border-b border-slate-800 text-center">
            <div class="w-16 h-16 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto mb-3 border border-emerald-500/20">
               <span class="text-2xl font-black text-emerald-500 uppercase">{{ adminName.charAt(0) }}</span>
            </div>
            <p class="text-[10px] font-black text-slate-500 uppercase tracking-widest">Employee Profile</p>
            <p class="text-lg font-black text-white truncate">{{ adminName }}</p>
            <p class="text-xs text-slate-400 truncate">{{ adminEmail }}</p>
          </div>

          <div class="mt-4 px-3">
            <button @click="showLogoutModal = true" class="w-full flex items-center justify-center space-x-3 px-4 py-3 text-rose-400 hover:bg-rose-500/10 rounded-2xl transition-all group/btn">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 transition-transform group-hover/btn:-translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7" />
              </svg>
              <span class="text-xs font-black uppercase tracking-widest">Logout</span>
            </button>
          </div>
        </div>
      </div>
    </nav>

    <transition name="modal">
      <div v-if="showLogoutModal" class="fixed inset-0 z-[100] flex items-center justify-center p-4">
        <div class="fixed inset-0 bg-slate-950/90 backdrop-blur-md" @click="showLogoutModal = false"></div>
        <div class="relative w-full max-w-sm bg-slate-900 border border-slate-800 rounded-[2.5rem] shadow-2xl p-8 text-center">
          <div class="w-20 h-20 bg-rose-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 text-rose-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
          </div>
          <h3 class="text-2xl font-black text-white mb-2 uppercase tracking-tight">Exit Terminal?</h3>
          <p class="text-slate-400 text-sm mb-8 leading-relaxed">This will end your current session. Make sure all sales are finalized.</p>

          <div class="grid grid-cols-2 gap-3">
            <button @click="showLogoutModal = false" class="py-4 bg-slate-800 text-slate-400 font-bold rounded-2xl text-[10px] uppercase tracking-widest hover:bg-slate-700 transition-colors">Cancel</button>
            <button @click="confirmLogout" class="py-4 bg-rose-600 text-white font-bold rounded-2xl text-[10px] uppercase tracking-widest shadow-lg shadow-rose-600/30">Confirm</button>
          </div>
        </div>
      </div>
    </transition>

    <main class="p-6 md:p-8 max-w-7xl mx-auto">
      <slot />
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const adminName = ref('User');
const adminEmail = ref('');
const showLogoutModal = ref(false);

// Catch Browser Back Button
const handleBackButton = () => {
  if (!showLogoutModal.value) {
    showLogoutModal.value = true;
    history.pushState(null, null, window.location.pathname);
  }
};

onMounted(() => {
  const session = localStorage.getItem('userSession');
  if (session) {
    const userData = JSON.parse(session);
    adminName.value = userData.username || 'User';
    adminEmail.value = userData.email || '';
  }

  window.addEventListener('popstate', handleBackButton);
  history.pushState(null, null, window.location.pathname);
});

onUnmounted(() => {
  window.removeEventListener('popstate', handleBackButton);
});

const confirmLogout = () => {
  localStorage.removeItem('userSession');
  window.onbeforeunload = null;
  router.replace('/login');
};
</script>

<style scoped>
.modal-enter-active, .modal-leave-active { transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1); }
.modal-enter-from, .modal-leave-to { opacity: 0; transform: scale(0.9) translateY(20px); }
</style>