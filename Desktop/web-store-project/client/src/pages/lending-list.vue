<template>
  <AdminLayout>
    <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
      <div>
        <h1 class="text-3xl font-black text-white tracking-tight italic uppercase">Lending List</h1>
        <p class="text-slate-500 text-sm">Track contracts, installments, and collectibles</p>
      </div>

      <div class="flex items-center gap-3">
        <div class="relative group w-full md:w-64">
          <span class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-slate-500 group-focus-within:text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </span>
          <input type="text" placeholder="Search contract or name..." class="w-full bg-slate-900 border border-slate-800 text-slate-200 text-sm rounded-2xl pl-11 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-amber-500/50 transition-all shadow-xl" />
        </div>

        <button @click="addLendingRow" class="flex items-center space-x-2 bg-amber-600 hover:bg-amber-500 text-white px-6 py-3 rounded-2xl font-black text-xs uppercase tracking-widest transition-all shadow-lg active:scale-95">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M12 4v16m8-8H4" /></svg>
          <span>Add Record</span>
        </button>
      </div>
    </div>

    <div class="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl">
      <div class="overflow-x-auto">
        <table class="w-full text-left border-collapse">
          <thead>
            <tr class="bg-slate-800/50 border-b border-slate-800 text-slate-400">
              <th class="px-4 py-4 text-[10px] font-black uppercase tracking-widest">Date & Time</th>
              <th class="px-4 py-4 text-[10px] font-black uppercase tracking-widest">Borrower Name</th>
              <th class="px-4 py-4 text-[10px] font-black uppercase tracking-widest text-indigo-400">Contract #</th>
              <th class="px-4 py-4 text-[10px] font-black uppercase tracking-widest text-amber-400">Borrowed</th>
              <th class="px-4 py-4 text-[10px] font-black uppercase tracking-widest text-orange-400">Installment</th>
              <th class="px-4 py-4 text-[10px] font-black uppercase tracking-widest text-emerald-400">Interest</th>
              <th class="px-4 py-4 text-[10px] font-black uppercase tracking-widest text-center">Status</th>
              <th class="px-4 py-4"></th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-800">
            <tr v-for="(loan, i) in lendingRecords" :key="i" :class="[loan.saved ? 'bg-slate-950/40' : 'hover:bg-slate-800/20']">

              <td class="px-3 py-3">
                <input type="datetime-local" v-model="loan.datetime" :disabled="loan.saved" class="bg-slate-950 border border-slate-800 rounded-lg px-2 py-2 text-[10px] text-white w-full disabled:opacity-30 font-mono" />
              </td>

              <td class="px-3 py-3">
                <input type="text" v-model="loan.name" :disabled="loan.saved" class="bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white w-full disabled:opacity-30 font-bold" placeholder="Name" />
              </td>

              <td class="px-3 py-3">
                <input type="text" v-model="loan.contract" :disabled="loan.saved" class="bg-slate-950 border border-indigo-900/30 rounded-lg px-3 py-2 text-xs text-indigo-300 w-full disabled:opacity-30" placeholder="REF-001" />
              </td>

              <td class="px-3 py-3">
                <div class="flex items-center bg-slate-950 border border-slate-800 rounded-lg px-2 py-2" :class="{'opacity-30': loan.saved}">
                  <span class="text-slate-600 text-[10px] mr-1">₱</span>
                  <input type="number" v-model="loan.amount" :disabled="loan.saved" class="bg-transparent text-xs text-white w-full outline-none" placeholder="0" />
                </div>
              </td>

              <td class="px-3 py-3">
                <div class="flex items-center bg-slate-950 border border-orange-900/20 rounded-lg px-2 py-2" :class="{'opacity-30': loan.saved}">
                  <span class="text-orange-600 text-[10px] mr-1">₱</span>
                  <input type="number" v-model="loan.installment" :disabled="loan.saved" class="bg-transparent text-xs text-orange-200 w-full outline-none" placeholder="/mo" />
                </div>
              </td>

              <td class="px-3 py-3">
                <div class="flex items-center bg-slate-950 border border-emerald-900/20 rounded-lg px-2 py-2" :class="{'opacity-30': loan.saved}">
                  <span class="text-emerald-600 text-[10px] mr-1">₱</span>
                  <input type="number" v-model="loan.interest" :disabled="loan.saved" class="bg-transparent text-xs text-emerald-400 font-bold w-full outline-none text-center" placeholder="0" />
                </div>
              </td>

              <td class="px-3 py-3 text-center">
                <select v-model="loan.status" :disabled="loan.saved" class="bg-slate-950 border border-slate-800 text-[9px] font-black uppercase rounded-lg px-2 py-2 outline-none disabled:opacity-50" :class="loan.status === 'Paid' ? 'text-emerald-500' : 'text-amber-500'">
                  <option value="Pending">Pending</option>
                  <option value="Paid">Paid</option>
                </select>
              </td>

              <td class="px-3 py-3 text-center">
                <button v-if="!loan.saved" @click="removeRow(i)" class="text-slate-600 hover:text-rose-500 transition-colors"><svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg></button>
                <div v-else class="text-slate-700 flex justify-center"><svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg></div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div v-if="hasUnsaved" class="p-6 bg-slate-800/30 border-t border-slate-800 flex justify-end items-center space-x-8">
        <div class="text-right">
          <p class="text-[9px] font-black text-slate-500 uppercase tracking-widest">Interest Total (Unsaved)</p>
          <p class="text-lg font-black text-emerald-400">₱{{ totalUnsavedInterest.toFixed(2) }}</p>
        </div>
        <button @click="showSaveModal = true" class="bg-amber-600 hover:bg-amber-500 text-white px-10 py-4 rounded-2xl font-black text-xs uppercase tracking-[0.2em] transition-all shadow-xl shadow-amber-600/20 active:scale-95">Confirm Records</button>
      </div>
    </div>

    </AdminLayout>
</template>

<script setup>
import { ref, computed } from 'vue'
import AdminLayout from '../pages/components/AdminLayout.vue'

const showSaveModal = ref(false)
const lendingRecords = ref([])

const hasUnsaved = computed(() => lendingRecords.value.some(r => !r.saved))
const totalUnsavedInterest = computed(() => lendingRecords.value.filter(r => !r.saved).reduce((sum, item) => sum + (Number(item.interest) || 0), 0))

const addLendingRow = () => {
  const now = new Date();
  now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
  lendingRecords.value.push({
    datetime: now.toISOString().slice(0, 16),
    name: '',
    contract: '', // New Field
    amount: 0,
    installment: 0, // New Field
    interest: 0,
    status: 'Pending',
    saved: false
  })
}

const removeRow = (i) => lendingRecords.value.splice(i, 1)
const confirmSave = () => {
  lendingRecords.value.forEach(r => { r.saved = true })
  showSaveModal.value = false
}
</script>