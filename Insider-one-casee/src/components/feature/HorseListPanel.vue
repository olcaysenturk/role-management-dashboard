<script setup lang="ts">
import type { Horse } from '../../types/race';

defineProps<{
  horses: Horse[];
}>();
</script>

<template>
  <section class="col-span-12 h-full rounded-md border border-slate-300 bg-white lg:col-span-3">
    <div class="flex items-center justify-between border-b border-slate-300 bg-slate-100 px-4 py-2">
      <h3 class="font-mono text-xs font-bold uppercase tracking-wider">{{ $t('labels.horseList') }}</h3>
      <span class="material-symbols-outlined text-base text-slate-600">filter_list</span>
    </div>

    <div class="max-h-[calc(100vh-150px)] overflow-y-auto">
      <table class="w-full border-collapse">
        <thead class="sticky top-0 bg-slate-50">
          <tr>
            <th class="border-b border-slate-300 px-4 py-1 text-left font-mono text-[11px] text-slate-500">{{ $t('labels.name') }}</th>
            <th class="border-b border-slate-300 px-4 py-1 text-center font-mono text-[11px] text-slate-500">{{ $t('labels.condition') }}</th>
            <th class="border-b border-slate-300 px-4 py-1 text-right font-mono text-[11px] text-slate-500">{{ $t('labels.silk') }}</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-slate-200">
          <tr v-for="horse in horses" :key="horse.id" class="hover:bg-slate-50">
            <td class="px-4 py-2 text-sm font-bold">{{ horse.name }}</td>
            <td class="px-4 py-2 text-center font-mono text-xs">{{ horse.conditionScore }}</td>
            <td class="px-4 py-2 text-right">
              <span class="inline-block h-3 w-3 rounded-full" :style="{ backgroundColor: horse.color }" />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
</template>
