<template>
  <AdminLayout>
    <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
      <div>
        <h1 class="text-3xl font-black text-white tracking-tight italic">STOCK IN</h1>
        <p class="text-slate-500 text-sm">Record items entering the inventory (Purchases)</p>
      </div>

      <div class="flex items-center gap-3">
        <div class="relative group w-full md:w-80">
          <span class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-slate-500 group-focus-within:text-violet-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </span>
          <input
            type="text"
            placeholder="Quick search..."
            class="w-full bg-slate-900 border border-slate-800 text-slate-200 text-sm rounded-2xl pl-11 pr-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-violet-500/50 transition-all shadow-lg"
          />
        </div>

        <button class="p-2.5 bg-slate-900 border border-slate-800 rounded-2xl text-slate-400 hover:text-violet-400 hover:border-violet-500/50 transition-all shadow-xl group" title="Capture Receipt">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 transition-transform group-active:scale-90" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </button>

        <button
          @click="addBlankRow"
          class="flex items-center space-x-2 bg-violet-600 hover:bg-violet-500 text-white px-6 py-2.5 rounded-2xl font-black text-xs uppercase tracking-widest transition-all shadow-lg shadow-violet-600/20 active:scale-95"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M12 4v16m8-8H4" />
          </svg>
          <span>Add Item</span>
        </button>
      </div>
    </div>

    <div class="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl relative">
      <div class="overflow-x-auto">
        <table class="w-full text-left border-collapse">
          <thead>
            <tr class="bg-slate-800/50 border-b border-slate-800 text-slate-400">
              <th class="px-6 py-4 text-[10px] font-black uppercase tracking-[0.2em]">Date</th>
              <th class="px-6 py-4 text-[10px] font-black uppercase tracking-[0.2em]">Description</th>
              <th class="px-6 py-4 text-[10px] font-black uppercase tracking-[0.2em]">Category</th>
              <th class="px-6 py-4 text-[10px] font-black uppercase tracking-[0.2em]">Quantity</th>
              <th class="px-6 py-4 text-[10px] font-black uppercase tracking-[0.2em]">SRP</th>
              <th class="px-6 py-4 text-[10px] font-black uppercase tracking-[0.2em]">Price</th>
              <th class="px-6 py-4 text-center"></th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-800">
            <tr v-if="stockList.length === 0">
              <td colspan="7" class="px-6 py-24 text-center">
                <div class="flex flex-col items-center opacity-20">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                  </svg>
                  <p class="font-black uppercase tracking-[0.3em] text-xs">No items in draft</p>
                </div>
              </td>
            </tr>
            <tr v-for="(item, i) in stockList" :key="i" class="hover:bg-slate-800/20 transition-colors">
              <td class="px-4 py-3">
                <input type="date" v-model="item.date" class="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:border-violet-500 outline-none w-full" />
              </td>
              <td class="px-4 py-3">
                <input type="text" v-model="item.description" placeholder="Product name..." class="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:border-violet-500 outline-none w-full font-bold" />
              </td>
              <td class="px-4 py-3">
                <select v-model="item.category" class="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:border-violet-500 outline-none w-full font-black uppercase">
                  <option>Noodles</option>
                  <option>Coffee</option>
                  <option>Soda</option>
                  <option>Bread</option>
                  <option>Canned</option>
                </select>
              </td>
              <td class="px-4 py-3">
                <input type="number" v-model="item.qty" class="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:border-violet-500 outline-none w-20 text-center font-black" />
              </td>
              <td class="px-4 py-3 text-slate-400">
                <div class="flex items-center bg-slate-950 border border-slate-800 rounded-xl px-2">
                  <span class="text-[10px] font-bold mr-1">₱</span>
                  <input type="number" v-model="item.srp" class="bg-transparent py-2 text-xs text-white focus:outline-none w-full" />
                </div>
              </td>
              <td class="px-4 py-3">
                <div class="flex items-center bg-slate-950 border border-slate-800 rounded-xl px-2">
                  <span class="text-[10px] font-bold mr-1 text-violet-400 italic">₱</span>
                  <input type="number" v-model="item.price" class="bg-transparent py-2 text-xs text-white focus:outline-none w-full font-bold" />
                </div>
              </td>
              <td class="px-4 py-3 text-center">
                <button @click="removeItem(i)" class="text-slate-600 hover:text-rose-500 transition-colors p-2">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div v-if="stockList.length > 0" class="p-6 bg-slate-800/30 border-t border-slate-800 flex justify-end items-center space-x-6">
        <div class="text-right">
          <p class="text-[10px] font-black text-slate-500 uppercase tracking-widest">Draft Items</p>
          <p class="text-xl font-black text-white leading-none">{{ stockList.length }}</p>
        </div>
        <button
          @click="showConfirmModal = true"
          class="bg-emerald-600 hover:bg-emerald-500 text-white px-10 py-4 rounded-2xl font-black text-xs uppercase tracking-[0.2em] transition-all shadow-xl shadow-emerald-600/20 active:scale-95"
        >
          Save Records
        </button>
      </div>
    </div>

    <transition name="modal">
      <div v-if="showConfirmModal" class="fixed inset-0 z-[100] flex items-center justify-center p-4">
        <div class="fixed inset-0 bg-slate-950/80 backdrop-blur-md" @click="showConfirmModal = false"></div>
        <div class="relative w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl p-8 transform transition-all">
          <div class="flex flex-col items-center">
            <div class="w-16 h-16 bg-emerald-500/10 rounded-2xl flex items-center justify-center mb-6 border border-emerald-500/20">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
              </svg>
            </div>

            <h3 class="text-xl font-black text-white mb-2 uppercase tracking-tight">Confirm Stock Entry?</h3>
            <p class="text-slate-400 text-sm text-center mb-6">Review the products below. Once confirmed, they will be added to your current inventory levels.</p>

            <div class="w-full bg-slate-950/50 rounded-2xl border border-slate-800 mb-8 max-h-40 overflow-y-auto p-4 space-y-2">
              <div v-for="(item, idx) in stockList" :key="idx" class="flex justify-between items-center text-[11px] font-bold">
                <span class="text-slate-300">{{ item.description || 'Unnamed Item' }}</span>
                <span class="text-emerald-500">x{{ item.qty }}</span>
              </div>
            </div>

            <div class="grid grid-cols-2 gap-4 w-full">
              <button @click="showConfirmModal = false" class="py-3 px-4 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold rounded-xl transition-all uppercase text-[10px] tracking-widest">
                Review Again
              </button>
              <button @click="handleFinalSave" class="py-3 px-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl shadow-lg shadow-emerald-600/20 transition-all uppercase text-[10px] tracking-widest">
                Confirm Entry
              </button>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </AdminLayout>
</template>

<script setup>
import { ref } from 'vue'
import AdminLayout from '../pages/components/AdminLayout.vue'

const showConfirmModal = ref(false)
const stockList = ref([
  { date: '2025-12-24', description: 'Lucky Me Pancit Canton', category: 'Noodles', qty: 10, srp: 15.00, price: 18.00 }
])

const addBlankRow = () => {
  stockList.value.push({
    date: new Date().toISOString().substr(0, 10),
    description: '',
    category: 'Noodles',
    qty: 1,
    srp: 0,
    price: 0
  })
}

const removeItem = (index) => {
  stockList.value.splice(index, 1)
}

const handleFinalSave = () => {
  // Logic to clear list and close modal
  stockList.value = []
  showConfirmModal.value = false
}
</script>

<style scoped>
.modal-enter-active, .modal-leave-active { transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1); }
.modal-enter-from, .modal-leave-to { opacity: 0; transform: scale(0.9) translateY(10px); }
</style>