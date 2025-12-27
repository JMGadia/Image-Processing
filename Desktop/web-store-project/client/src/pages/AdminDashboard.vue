<template>
  <AdminLayout>
    <div class="mb-8">
      <h1 class="text-3xl font-black text-white tracking-tight">Dashboard Overview</h1>
      <p class="text-slate-500 text-sm tracking-wide">Gadia Sari-Sari Store Management System</p>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

      <div class="bg-slate-900 p-6 rounded-3xl border border-slate-800 shadow-sm hover:border-violet-500/50 transition-all group">
        <p class="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-2">Store Sales</p>
        <div class="flex items-end justify-between">
          <h2 class="text-2xl font-black text-white">₱12,450.00</h2>
          <span class="text-emerald-500 text-xs font-bold mb-1">+12% ↑</span>
        </div>
      </div>

      <div class="bg-slate-900 p-6 rounded-3xl border border-slate-800 shadow-sm hover:border-blue-500/50 transition-all">
        <p class="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-2">GCash & ATM</p>
        <div class="flex items-end justify-between">
          <h2 class="text-2xl font-black text-white">₱8,200.00</h2>
          <span class="text-blue-400 text-xs font-bold mb-1">Interest</span>
        </div>
      </div>

      <div class="bg-slate-900 p-6 rounded-3xl border border-slate-800 shadow-sm hover:border-amber-500/50 transition-all">
        <p class="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-2">Total Stocks</p>
        <div class="flex items-end justify-between">
          <h2 class="text-2xl font-black text-white">1,402</h2>
          <span class="text-amber-500 text-xs font-bold mb-1">24 Low Items</span>
        </div>
      </div>

      <div class="bg-slate-900 p-6 rounded-3xl border border-slate-800 shadow-sm hover:border-rose-500/50 transition-all">
        <p class="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-2">Lending Status</p>
        <div class="flex items-center space-x-4 mt-1">
          <div>
            <p class="text-[10px] text-slate-500 font-bold uppercase">Paid</p>
            <p class="text-xl font-black text-emerald-500">18</p>
          </div>
          <div class="h-8 w-px bg-slate-800"></div>
          <div>
            <p class="text-[10px] text-slate-500 font-bold uppercase">Not Paid</p>
            <p class="text-xl font-black text-rose-500">07</p>
          </div>
        </div>
      </div>
    </div>

    <div class="mt-10 space-y-8">

      <section class="bg-slate-900 border border-slate-800 rounded-3xl p-8">
        <div class="flex justify-between items-center mb-8">
          <h3 class="text-lg font-black text-white tracking-tight bold">Products Trend</h3>
        </div>
        <div class="flex items-end justify-around h-48 space-x-2">
          <div v-for="(h, i) in [40, 90, 65, 80, 30, 100, 55, 55]" :key="i" class="w-full max-w-[40px] bg-gradient-to-t from-violet-600 to-indigo-500 rounded-t-lg transition-all hover:brightness-125" :style="{ height: h + '%' }"></div>
        </div>
        <div class="flex justify-around mt-4 text-[10px] font-bold text-slate-500 uppercase tracking-tighter">
          <span>Rice</span><span>Eggs</span><span>Coffee</span><span>Canned</span><span>Soda</span><span>Bread</span><span>Snacks</span><span>ICE CREAM</span>        </div>
      </section>

      <section class="bg-slate-900 border border-slate-800 rounded-3xl p-8">
        <div class="mb-6">
          <h3 class="text-lg font-black text-white tracking-tight bold">Monthly Sales Report</h3>
          <p class="text-slate-500 text-xs">Revenue performance for the current year</p>
        </div>
        <div class="relative h-40 w-full bg-slate-950/50 rounded-xl overflow-hidden flex items-end">
          <svg class="w-full h-full" viewBox="0 0 100 20" preserveAspectRatio="none">
            <path d="M0 20 V12 Q25 5 50 10 T100 8 V20 Z" fill="rgba(139, 92, 246, 0.2)" />
            <path d="M0 12 Q25 5 50 10 T100 8" fill="none" stroke="#8b5cf6" stroke-width="0.5" />
          </svg>
        </div>
        <div class="flex justify-between mt-4 text-[10px] font-bold text-slate-600 uppercase">
          <span>Jan</span><span>Mar</span><span>May</span><span>Jul</span><span>Sep</span><span>Nov</span>
        </div>
      </section>

      <section class="bg-slate-900 border border-slate-800 rounded-3xl p-8">
        <div class="mb-6">
          <h3 class="text-lg font-black text-white tracking-tight bold">Yearly Sales Comparison</h3>
        </div>
        <div class="space-y-4">
          <div class="flex items-center space-x-4">
            <span class="text-xs font-bold text-slate-400 w-12">2024</span>
            <div class="flex-1 bg-slate-950 h-3 rounded-full overflow-hidden">
              <div class="bg-violet-500 h-full w-[85%]"></div>
            </div>
            <span class="text-xs font-black text-white">₱450k</span>
          </div>
          <div class="flex items-center space-x-4">
            <span class="text-xs font-bold text-slate-400 w-12">2023</span>
            <div class="flex-1 bg-slate-950 h-3 rounded-full overflow-hidden">
              <div class="bg-slate-700 h-full w-[70%]"></div>
            </div>
            <span class="text-xs font-black text-slate-400">₱380k</span>
          </div>
        </div>
      </section>

    </div>
  </AdminLayout>
</template>

<script setup>
import AdminLayout from '../pages/components/AdminLayout.vue'
</script>