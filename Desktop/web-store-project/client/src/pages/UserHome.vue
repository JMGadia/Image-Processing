<template>
  <UserLayout>
    <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
      <div>
        <h1 class="text-3xl font-black text-white italic tracking-tight uppercase">ITEM VIEWER</h1>
        <p class="text-slate-500 text-sm">Real-time product tracking & pricing</p>
      </div>

      <div class="flex items-center gap-3">
        <select
          v-model="selectedCategory"
          class="bg-slate-900 border border-slate-800 text-emerald-400 text-xs font-bold rounded-2xl px-4 py-3 outline-none focus:ring-2 focus:ring-emerald-500/50 appearance-none cursor-pointer min-w-[140px]"
        >
          <option value="All">All Categories</option>
          <option v-for="cat in categories" :key="cat" :value="cat">{{ cat }}</option>
        </select>

        <div class="relative group">
          <input
            type="text"
            v-model="searchQuery"
            placeholder="Find product..."
            class="bg-slate-900 border border-slate-800 text-white text-sm rounded-2xl pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 w-full md:w-64"
          />
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 absolute left-4 top-3.5 text-slate-500 group-focus-within:text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>
    </div>

    <div class="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl">
      <div class="overflow-x-auto">
        <table class="w-full text-left border-collapse">
          <thead>
            <tr class="bg-emerald-950/20 border-b border-slate-800 text-slate-400 uppercase tracking-widest text-[10px] font-black">
              <th class="px-6 py-5">Date Updated</th>
              <th class="px-6 py-5">Description</th>
              <th class="px-6 py-5">Category</th>
              <th class="px-6 py-5 text-center">Qty</th>
              <th class="px-6 py-5 text-emerald-400">SRP</th>
              <th class="px-6 py-5 text-emerald-400">Total Price</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-800">
            <tr v-for="(item, i) in filteredProducts" :key="i" class="hover:bg-slate-800/30 transition-colors">
              <td class="px-6 py-4 text-[11px] font-mono text-slate-400">{{ item.date }}</td>
              <td class="px-6 py-4 font-bold text-slate-200">{{ item.description }}</td>
              <td class="px-6 py-4">
                <span class="px-3 py-1 bg-slate-800 text-slate-400 text-[10px] font-black rounded-full uppercase">{{ item.category }}</span>
              </td>
              <td class="px-6 py-4 text-center">
                <span :class="item.qty < 5 ? 'text-rose-500 font-black' : 'text-white font-bold'">{{ item.qty }}</span>
              </td>
              <td class="px-6 py-4 font-bold text-emerald-400">₱{{ item.srp.toFixed(2) }}</td>
              <td class="px-6 py-4 font-black text-white italic">₱{{ (item.srp * item.qty).toFixed(2) }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </UserLayout>
</template>

<script setup>
import { ref, computed } from 'vue';
import UserLayout from '../pages/components/UserLayout.vue';

const searchQuery = ref('');
const selectedCategory = ref('All');

const categories = ['Canned Goods', 'Snacks', 'Beverages', 'Essentials', 'Condiments'];

// Mock Data
const products = ref([
  { date: '2025-12-27', description: 'Corned Beef 150g', category: 'Canned Goods', qty: 12, srp: 45.00 },
  { date: '2025-12-27', description: 'Soda 1.5L', category: 'Beverages', qty: 8, srp: 65.00 },
  { date: '2025-12-27', description: 'Crackers (Bundle)', category: 'Snacks', qty: 3, srp: 55.00 },
]);

const filteredProducts = computed(() => {
  return products.value.filter(item => {
    const matchesSearch = item.description.toLowerCase().includes(searchQuery.value.toLowerCase());
    const matchesCat = selectedCategory.value === 'All' || item.category === selectedCategory.value;
    return matchesSearch && matchesCat;
  });
});
</script>