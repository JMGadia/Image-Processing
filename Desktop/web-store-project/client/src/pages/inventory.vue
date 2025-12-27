<template>
  <AdminLayout>
    <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
      <div>
        <h1 class="text-3xl font-black text-white tracking-tight">Inventory Management</h1>
        <p class="text-slate-500 text-sm italic">Filter by category using the table header dropdown</p>
      </div>

      <div class="relative group w-full md:w-96">
        <span class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-slate-500 group-focus-within:text-violet-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </span>
        <input
          type="text"
          placeholder="Search items..."
          class="w-full bg-slate-900 border border-slate-800 text-slate-200 text-sm rounded-2xl pl-12 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-violet-500/50 transition-all shadow-xl"
        />
      </div>
    </div>

    <div class="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl relative">
      <div class="overflow-x-auto">
        <table class="w-full text-left border-collapse">
          <thead>
            <tr class="bg-slate-800/50 border-b border-slate-800">
              <th class="px-6 py-4 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Date</th>
              <th class="px-6 py-4 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Description</th>

              <th class="px-6 py-4">
                <div class="flex items-center space-x-2">
                  <span class="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Category</span>
                  <div class="relative">
                    <select
                      class="bg-slate-800 text-violet-400 text-[9px] font-black px-2 py-1 rounded border border-slate-700 focus:border-violet-500 outline-none uppercase cursor-pointer appearance-none pr-6"
                    >
                      <option>All</option>
                      <option>Noodles</option>
                      <option>Coffee</option>
                      <option>Soda</option>
                      <option>Canned</option>
                      <option>Bread</option>
                      <option>Snacks</option>
                      <option>ICE CREAM</option>
                    </select>
                    <div class="pointer-events-none absolute inset-y-0 right-1.5 flex items-center text-violet-500">
                      <svg class="h-2.5 w-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M19 9l-7 7-7-7" stroke-width="4"/></svg>
                    </div>
                  </div>
                </div>
              </th>

              <th class="px-6 py-4 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Quantity</th>
              <th class="px-6 py-4 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">SRP</th>
              <th class="px-6 py-4 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Price</th>
              <th class="px-6 py-4 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Status</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-800">
            <tr v-for="(item, i) in inventoryItems" :key="i" class="hover:bg-slate-800/30 transition-colors group">
              <td class="px-6 py-4 text-xs text-slate-500 font-bold uppercase">{{ item.date }}</td>
              <td class="px-6 py-4 text-sm font-bold text-white">{{ item.description }}</td>
              <td class="px-6 py-4 text-xs font-bold text-slate-300 uppercase tracking-wide">{{ item.category }}</td>
              <td class="px-6 py-4 text-sm font-black text-slate-200">{{ item.qty }}</td>
              <td class="px-6 py-4 text-sm font-bold text-slate-400">₱{{ item.srp.toFixed(2) }}</td>
              <td class="px-6 py-4 text-sm font-black text-white">₱{{ item.price.toFixed(2) }}</td>
              <td class="px-6 py-4">
                <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-widest border" :class="statusClasses(item.status)">
                  <span class="w-1.5 h-1.5 rounded-full mr-2" :class="statusBullet(item.status)"></span>
                  {{ item.status }}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </AdminLayout>
</template>

<script setup>
import { ref } from 'vue'
import AdminLayout from '../pages/components/AdminLayout.vue'

const inventoryItems = ref([
  { date: 'Dec 24, 2025', description: 'Lucky Me Pancit Canton', category: 'Noodles', qty: 120, srp: 15.00, price: 18.00, status: 'In Stock' },
  { date: 'Dec 23, 2025', description: 'Nescafe Original 3-in-1', category: 'Coffee', qty: 15, srp: 8.00, price: 10.00, status: 'Low Stock' },
  { date: 'Dec 22, 2025', description: 'Coca-Cola 1.5L', category: 'Soda', qty: 0, srp: 65.00, price: 75.00, status: 'Out of Stock' },
  { date: 'Dec 21, 2025', description: 'Silver Swan Soy Sauce', category: 'Canned', qty: 45, srp: 22.00, price: 25.00, status: 'In Stock' },
  { date: 'Dec 20, 2025', description: 'Gardenia Loaf Bread', category: 'Bread', qty: 8, srp: 75.00, price: 82.00, status: 'Low Stock' },
  { date: 'Dec 20, 2025', description: 'Gardenia Loaf Bread', category: 'Bread', qty: 8, srp: 75.00, price: 82.00, status: 'Low Stock' },
  { date: 'Dec 20, 2025', description: 'Gardenia Loaf Bread', category: 'Bread', qty: 8, srp: 75.00, price: 82.00, status: 'Low Stock' },
  { date: 'Dec 20, 2025', description: 'Gardenia Loaf Bread', category: 'Bread', qty: 8, srp: 75.00, price: 82.00, status: 'Low Stock' },
])

const statusClasses = (s) => {
  if (s === 'In Stock') return 'text-emerald-500 border-emerald-500/20 bg-emerald-500/5'
  if (s === 'Low Stock') return 'text-amber-500 border-amber-500/20 bg-amber-500/5'
  return 'text-rose-500 border-rose-500/20 bg-rose-500/5'
}

const statusBullet = (s) => {
  if (s === 'In Stock') return 'bg-emerald-500'
  if (s === 'Low Stock') return 'bg-amber-500'
  return 'bg-rose-500'
}
</script>