<template>
  <AdminLayout>
    <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
      <div>
        <h1 class="text-3xl font-black text-white tracking-tight italic uppercase">GCash & ATM</h1>
        <p class="text-slate-500 text-sm">Manage cash flow and track service fee interests</p>
      </div>

      <div class="flex flex-wrap items-center gap-3">
        <select class="bg-slate-900 border border-slate-800 text-slate-400 text-xs font-bold rounded-2xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 appearance-none cursor-pointer hover:border-slate-700 transition-all">
          <option>All Months</option>
          <option>January</option>
          <option>February</option>
          <option>March</option>
          <option selected>December</option>
        </select>

        <button
          @click="addTransactionRow"
          class="flex items-center space-x-2 bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-3 rounded-2xl font-black text-xs uppercase tracking-widest transition-all shadow-lg shadow-indigo-600/20 active:scale-95"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M12 4v16m8-8H4" />
          </svg>
          <span>New Entry</span>
        </button>
      </div>
    </div>

    <div class="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl">
      <div class="overflow-x-auto">
        <table class="w-full text-left border-collapse">
          <thead>
            <tr class="bg-slate-800/50 border-b border-slate-800 text-slate-400">
              <th class="px-6 py-4 text-[10px] font-black uppercase tracking-[0.2em]">Date & Time</th>
              <th class="px-6 py-4 text-[10px] font-black uppercase tracking-[0.2em] text-emerald-400">Cash In</th>
              <th class="px-6 py-4 text-[10px] font-black uppercase tracking-[0.2em] text-rose-400">Cash Out</th>
              <th class="px-6 py-4 text-[10px] font-black uppercase tracking-[0.2em] text-blue-400">Withdraw</th>
              <th class="px-6 py-4 text-[10px] font-black uppercase tracking-[0.2em] text-cyan-400 text-center">Interest/Fee</th>
              <th class="px-6 py-4 text-center">Status</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-800">
            <tr v-if="transactions.length === 0">
              <td colspan="6" class="px-6 py-24 text-center">
                <div class="flex flex-col items-center opacity-20">
                   <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <p class="text-white font-black uppercase tracking-[0.3em] text-xs">No Records Found</p>
                  <p class="text-slate-500 text-[10px] mt-1 uppercase">Click "New Entry" to start recording</p>
                </div>
              </td>
            </tr>
            <tr v-for="(tr, i) in transactions" :key="i"
                :class="[tr.saved ? 'bg-slate-950/40' : 'hover:bg-slate-800/20', 'transition-colors']">

              <td class="px-4 py-3">
                <input type="datetime-local" v-model="tr.datetime" :disabled="tr.saved"
                  class="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-[10px] text-white focus:border-indigo-500 outline-none w-full disabled:opacity-30 disabled:cursor-not-allowed uppercase font-mono" />
              </td>

              <td class="px-4 py-3">
                <div class="flex items-center bg-slate-950 border border-slate-800 rounded-xl px-3 py-2" :class="{'opacity-30 cursor-not-allowed': tr.saved}">
                  <span class="text-slate-600 text-[10px] mr-2">₱</span>
                  <input type="number" v-model="tr.cashIn" :disabled="tr.saved" class="bg-transparent text-xs text-white outline-none w-full" placeholder="0" />
                </div>
              </td>

              <td class="px-4 py-3">
                <div class="flex items-center bg-slate-950 border border-slate-800 rounded-xl px-3 py-2" :class="{'opacity-30 cursor-not-allowed': tr.saved}">
                  <span class="text-slate-600 text-[10px] mr-2">₱</span>
                  <input type="number" v-model="tr.cashOut" :disabled="tr.saved" class="bg-transparent text-xs text-white outline-none w-full" placeholder="0" />
                </div>
              </td>

              <td class="px-4 py-3">
                <div class="flex items-center bg-slate-950 border border-slate-800 rounded-xl px-3 py-2" :class="{'opacity-30 cursor-not-allowed': tr.saved}">
                  <span class="text-slate-600 text-[10px] mr-2">₱</span>
                  <input type="number" v-model="tr.withdraw" :disabled="tr.saved" class="bg-transparent text-xs text-white outline-none w-full" placeholder="0" />
                </div>
              </td>

              <td class="px-4 py-3">
                <div class="flex items-center bg-slate-950 border border-cyan-900/30 rounded-xl px-3 py-2" :class="{'opacity-30 cursor-not-allowed': tr.saved}">
                  <span class="text-cyan-500 text-[10px] mr-2">₱</span>
                  <input type="number" v-model="tr.interest" :disabled="tr.saved" class="bg-transparent text-xs text-cyan-400 font-black outline-none w-full text-center" placeholder="0" />
                </div>
              </td>

              <td class="px-4 py-3 text-center">
                <div v-if="tr.saved" class="flex items-center justify-center text-slate-700">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  <span class="text-[9px] font-black uppercase ml-1 tracking-tighter">Locked</span>
                </div>
                <button v-else @click="removeRow(i)" class="text-slate-600 hover:text-rose-500 transition-colors p-2">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div v-if="hasUnsaved" class="p-6 bg-slate-800/30 border-t border-slate-800 flex justify-end items-center space-x-8">
        <div class="text-right">
          <p class="text-[9px] font-black text-slate-500 uppercase tracking-widest">New Interest total</p>
          <p class="text-lg font-black text-cyan-400 leading-none mt-1">₱{{ totalUnsavedInterest.toFixed(2) }}</p>
        </div>
        <button
          @click="showSaveModal = true"
          class="bg-cyan-600 hover:bg-cyan-500 text-white px-10 py-4 rounded-2xl font-black text-xs uppercase tracking-[0.2em] transition-all shadow-xl shadow-cyan-600/20 active:scale-95"
        >
          Confirm Entry
        </button>
      </div>
    </div>

    <transition name="modal">
      <div v-if="showSaveModal" class="fixed inset-0 z-[100] flex items-center justify-center p-4">
        <div class="fixed inset-0 bg-slate-950/90 backdrop-blur-md" @click="showSaveModal = false"></div>
        <div class="relative w-full max-w-sm bg-slate-900 border border-slate-800 rounded-[2.5rem] shadow-2xl p-8 transform transition-all">
          <div class="flex flex-col items-center text-center">
            <h3 class="text-xl font-black text-white mb-2 uppercase tracking-tight">Finalize Transaction?</h3>
            <p class="text-slate-400 text-sm mb-6">Confirmed entries will be recorded in the dashboard and <span class="text-rose-400 font-bold">cannot be changed</span>.</p>
            <div class="grid grid-cols-2 gap-3 w-full">
              <button @click="showSaveModal = false" class="py-3 bg-slate-800 text-slate-400 font-bold rounded-xl text-[10px] uppercase tracking-widest transition-colors hover:bg-slate-700">Cancel</button>
              <button @click="confirmSave" class="py-3 bg-cyan-600 text-white font-bold rounded-xl text-[10px] uppercase shadow-lg shadow-cyan-600/30 tracking-widest">Confirm</button>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </AdminLayout>
</template>

<script setup>
import { ref, computed } from 'vue'
import AdminLayout from '../pages/components/AdminLayout.vue'

const showSaveModal = ref(false)

// Start with an empty list so there are no dummy records on load
const transactions = ref([])

const hasUnsaved = computed(() => transactions.value.some(t => !t.saved))

const totalUnsavedInterest = computed(() => {
  return transactions.value
    .filter(t => !t.saved)
    .reduce((sum, item) => sum + (Number(item.interest) || 0), 0)
})

const addTransactionRow = () => {
  // ISO format adapted for datetime-local: YYYY-MM-DDTHH:mm
  const now = new Date();
  now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
  const formattedDate = now.toISOString().slice(0, 16);

  transactions.value.push({
    datetime: formattedDate,
    cashIn: 0,
    cashOut: 0,
    withdraw: 0,
    interest: 0,
    saved: false
  })
}

const removeRow = (i) => transactions.value.splice(i, 1)

const confirmSave = () => {
  transactions.value.forEach(t => {
    if(!t.saved) t.saved = true
  })
  showSaveModal.value = false
}
</script>

<style scoped>
.modal-enter-active, .modal-leave-active { transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1); }
.modal-enter-from, .modal-leave-to { opacity: 0; transform: scale(0.95); }

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button { -webkit-appearance: none; margin: 0; }

/* Custom calendar icon color for dark mode */
input[type="datetime-local"]::-webkit-calendar-picker-indicator {
  filter: invert(1);
  opacity: 0.5;
}
</style>