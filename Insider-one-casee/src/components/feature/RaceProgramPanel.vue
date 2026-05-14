<script setup lang="ts">
import type { RoundProgram } from '../../types/race';

defineProps<{
  rounds: RoundProgram[];
  activeRoundIndex: number;
}>();
</script>

<template>
  <section class="col-span-12 flex h-[300px] flex-col overflow-hidden rounded-md border border-slate-300 bg-white lg:col-span-3">
    <div class="flex items-center justify-between bg-blue-600 px-4 py-2 text-white">
      <h3 class="font-mono text-xs font-bold">{{ $t('labels.raceProgram') }}</h3>
      <span class="material-symbols-outlined text-base">schedule</span>
    </div>
    <div class="flex-1 overflow-y-auto">
      <table class="w-full text-left">
        <thead class="border-b border-slate-300 bg-slate-100">
          <tr>
            <th class="px-4 py-1 font-mono text-[10px] text-slate-500">{{ $t('labels.round') }}</th>
            <th class="px-4 py-1 font-mono text-[10px] text-slate-500">{{ $t('labels.distance') }}</th>
            <th class="px-4 py-1 font-mono text-[10px] text-slate-500">{{ $t('labels.horseCount') }}</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-slate-200">
          <tr v-for="(round, roundIndex) in rounds" :key="round.roundNumber" :class="roundIndex === activeRoundIndex ? 'bg-blue-50' : ''">
            <td class="px-4 py-2 font-mono text-xs">{{ round.roundNumber }}</td>
            <td class="px-4 py-2 text-sm">{{ round.distance }}m</td>
            <td class="px-4 py-2 text-sm">{{ round.horses.length }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
</template>
