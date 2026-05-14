<script setup lang="ts">
import { ref } from 'vue';
import type { RoundResult } from '../../types/race';

defineProps<{
  results: RoundResult[];
}>();

const expandedRounds = ref<Set<number>>(new Set());

function isExpanded(roundNumber: number): boolean {
  return expandedRounds.value.has(roundNumber);
}

function toggleRound(roundNumber: number): void {
  if (expandedRounds.value.has(roundNumber)) {
    expandedRounds.value.delete(roundNumber);
  } else {
    expandedRounds.value.add(roundNumber);
  }

  expandedRounds.value = new Set(expandedRounds.value);
}
</script>

<template>
  <section class="col-span-12 flex max-h-[760px] flex-col overflow-hidden rounded-md border border-slate-300 bg-white">
    <div class="flex items-center justify-between bg-emerald-600 px-4 py-2 text-white">
      <h3 class="font-mono text-xs font-bold">{{ $t('labels.results') }}</h3>
      <span class="material-symbols-outlined text-base">emoji_events</span>
    </div>

    <div class="flex-1 space-y-3 overflow-y-auto p-3">
      <article v-for="round in results" :key="round.roundNumber" class="rounded-md border border-slate-200 bg-slate-50">
        <header class="flex items-center justify-between border-b border-slate-200 px-3 py-2">
          <h4 class="font-mono text-xs font-bold text-slate-700">{{ round.roundNumber }}. {{ $t('labels.race') }} - {{ round.distance }}m</h4>
          <button
            v-if="round.rankings.length > 3"
            class="rounded border border-slate-300 bg-white px-2 py-1 font-mono text-[10px] font-semibold text-slate-600 hover:bg-slate-100"
            @click="toggleRound(round.roundNumber)"
          >
            {{ isExpanded(round.roundNumber) ? $t('buttons.collapse') : $t('buttons.showMore') }}
          </button>
        </header>
        <ol class="space-y-1 px-4 py-2">
          <li
            v-for="(horse, index) in round.rankings.slice(0, isExpanded(round.roundNumber) ? 10 : 3)"
            :key="`${round.roundNumber}-${horse.id}`"
            class="flex items-center gap-3 text-sm"
          >
            <span class="inline-flex w-5 justify-center font-mono text-xs font-bold text-slate-500">{{ index + 1 }}</span>
            <span>{{ horse.name }}</span>
          </li>
        </ol>
      </article>
      <p v-if="results.length === 0" class="px-1 py-2 text-sm text-slate-500">{{ $t('messages.noResults') }}</p>
    </div>
  </section>
</template>
