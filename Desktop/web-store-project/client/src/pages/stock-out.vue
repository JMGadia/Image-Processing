<template>
  <AdminLayout>
    <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
      <div>
        <h1 class="text-3xl font-black text-white tracking-tight italic uppercase">Stock Out</h1>
        <p class="text-slate-500 text-sm">Update inventory levels based on daily sales or damage</p>
      </div>

      <div class="flex items-center gap-3">
        <div class="relative group w-full md:w-96">
          <span class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-slate-500 group-focus-within:text-rose-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </span>
          <input
            type="text"
            placeholder="Search item to stock out..."
            class="w-full bg-slate-900 border border-slate-800 text-slate-200 text-sm rounded-2xl pl-11 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-rose-500/50 transition-all shadow-xl"
          />
        </div>
      </div>
    </div>

    <div class="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl relative">
      <div class="overflow-x-auto">
        <table class="w-full text-left border-collapse">
          <thead>
            <tr class="bg-slate-800/50 border-b border-slate-800">
              <th class="px-6 py-4 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Date</th>
              <th class="px-6 py-4 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Description</th>
              <th class="px-6 py-4 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Category</th>
              <th class="px-6 py-4 text-[10px] font-black uppercase tracking-[0.2em] text-rose-400">Qty to Deduct</th>
              <th class="px-6 py-4 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">SRP</th>
              <th class="px-6 py-4 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Price</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-800">
            <tr v-for="(item, i) in stockOutItems" :key="i" class="hover:bg-slate-800/30 transition-colors group">
              <td class="px-6 py-4 text-xs text-slate-500 font-bold uppercase">{{ item.date }}</td>
              <td class="px-6 py-4 text-sm font-bold text-white">{{ item.description }}</td>
              <td class="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wide">{{ item.category }}</td>

              <td class="px-6 py-4">
                <div class="flex items-center space-x-3 bg-slate-950 border border-slate-800 rounded-xl p-1 w-32 group-focus-within:border-rose-500/50 transition-all">
                  <input
                    type="number"
                    v-model="item.qtyOut"
                    class="bg-transparent w-full text-center text-sm font-black text-rose-500 focus:outline-none"
                  />
                  <span class="text-[9px] font-black text-slate-600 pr-2 uppercase">PCS</span>
                </div>
              </td>

              <td class="px-6 py-4 text-sm font-bold text-slate-400">₱{{ item.srp.toFixed(2) }}</td>
              <td class="px-6 py-4 text-sm font-black text-white">₱{{ item.price.toFixed(2) }}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="p-6 bg-slate-800/30 border-t border-slate-800 flex justify-end">
        <button
          @click="showConfirmModal = true"
          class="bg-rose-600 hover:bg-rose-500 text-white px-10 py-4 rounded-2xl font-black text-xs uppercase tracking-[0.2em] transition-all shadow-xl shadow-rose-600/20 active:scale-95"
        >
          Update Records
        </button>
      </div>
    </div>

    <transition name="modal">
      <div v-if="showConfirmModal" class="fixed inset-0 z-[100] flex items-center justify-center p-4">
        <div class="fixed inset-0 bg-slate-950/90 backdrop-blur-sm" @click="showConfirmModal = false"></div>

        <div class="relative w-full max-w-md bg-slate-900 border border-slate-800 rounded-[2.5rem] shadow-2xl p-10 transform transition-all">
          <div class="flex flex-col items-center text-center">
            <div class="w-20 h-20 bg-rose-500/10 rounded-full flex items-center justify-center mb-6 border border-rose-500/20">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 text-rose-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>

            <h3 class="text-2xl font-black text-white mb-2 tracking-tight uppercase">Confirm Stock Out?</h3>
            <p class="text-slate-400 text-sm mb-8 leading-relaxed">The following items will be deducted from your total inventory count. This action cannot be undone.</p>

            <div class="w-full bg-slate-950/50 rounded-2xl border border-slate-800 mb-8 max-h-48 overflow-y-auto px-4 py-2">
              <div v-for="(item, idx) in stockOutItems" :key="idx" class="flex justify-between items-center py-3 border-b border-slate-800/50 last:border-0">
                <div class="text-left">
                  <p class="text-xs font-black text-white uppercase">{{ item.description }}</p>
                  <p class="text-[10px] text-slate-500 uppercase font-bold">{{ item.category }}</p>
                </div>
                <div class="text-right">
                  <p class="text-sm font-black text-rose-500">-{{ item.qtyOut }}</p>
                </div>
              </div>
            </div>

            <div class="grid grid-cols-2 gap-4 w-full">
              <button @click="showConfirmModal = false" class="py-4 px-4 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold rounded-2xl transition-all uppercase text-[10px] tracking-widest border border-slate-700">
                Cancel
              </button>
              <button @click="handleUpdate" class="py-4 px-4 bg-rose-600 hover:bg-rose-500 text-white font-bold rounded-2xl shadow-lg shadow-rose-600/20 transition-all uppercase text-[10px] tracking-widest">
                Confirm Update
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

// Mimicking initial data with a "qtyOut" property for editing
const stockOutItems = ref([
  { date: 'Dec 24, 2025', description: 'Lucky Me Pancit Canton', category: 'Noodles', qtyOut: 0, srp: 15.00, price: 18.00 },
  { date: 'Dec 24, 2025', description: 'Nescafe Original 3-in-1', category: 'Coffee', qtyOut: 0, srp: 8.00, price: 10.00 },
  { date: 'Dec 24, 2025', description: 'Coca-Cola 1.5L', category: 'Soda', qtyOut: 0, srp: 65.00, price: 75.00 },
])

const handleUpdate = () => {
  // Logic for updating inventory goes here later
  alert("Inventory has been updated and stock out recorded!")
  showConfirmModal.value = false

  // Reset fields after update
  stockOutItems.value.forEach(item => item.qtyOut = 0)
}
</script>

<style scoped>
.modal-enter-active, .modal-leave-active { transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1); }
.modal-enter-from, .modal-leave-to { opacity: 0; transform: scale(0.9) translateY(20px); }

/* Remove number input arrows for clean look */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
</style>