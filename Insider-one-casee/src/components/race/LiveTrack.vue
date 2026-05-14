<script setup lang="ts">
import { computed } from 'vue';
import type { Horse, HorseProgress, RoundProgram } from '../../types/race';

const props = defineProps<{
  activeRound: RoundProgram | null;
  previewRound: RoundProgram | null;
  progress: HorseProgress[];
  countdownValue: number | null;
  status: 'idle' | 'program-generated' | 'running' | 'finished';
}>();

const emit = defineEmits<{
  generate: [];
  start: [];
}>();

const progressMap = computed(() => new Map(props.progress.map((item) => [item.horseId, item.progress])));
const visibleRound = computed(() => props.activeRound ?? props.previewRound);
const laneItems = computed(() => visibleRound.value?.horses ?? []);

function progressForHorse(horse: Horse): number {
  return progressMap.value.get(horse.id) ?? 0;
}
</script>

<template>
  <section class="col-span-12 overflow-hidden rounded-md border border-slate-300 bg-white shadow-sm">
    <div class="flex items-center justify-between border-b border-slate-300 bg-white px-4 py-3">
      <div class="flex items-center gap-2">
        <span class="material-symbols-outlined text-red-600">sensors</span>
        <h2 class="text-2xl font-semibold">{{ $t('labels.liveTrack') }}</h2>
      </div>
      <span v-if="visibleRound" class="rounded bg-red-100 px-2 py-1 font-mono text-xs font-bold text-red-700">
        {{ $t('labels.round') }} {{ visibleRound.roundNumber }} {{ visibleRound.distance }}m
      </span>
    </div>

    <div class="relative min-h-[360px] turf-pattern">
      <div class="absolute bottom-0 left-12 top-0 w-2 bg-white/20"></div>
      <div class="absolute bottom-0 right-12 top-0 z-10 flex w-4 items-center justify-center border-x border-white/25 bg-white/40">
        <span class="rotate-90 whitespace-nowrap font-mono text-xs font-bold tracking-widest text-white/70">{{ $t('labels.finishLine') }}</span>
      </div>

      <div class="relative z-0 flex h-full flex-col" :class="{ 'blur-[2px]': !activeRound }">
        <div v-for="(horse, laneIndex) in laneItems" :key="horse.id" class="lane-border relative flex flex-1 items-center last:border-b-0">
          <span class="flex h-full w-8 items-center justify-center border-r border-white/20 bg-white/10 font-mono text-xs font-bold text-white/60">{{ laneIndex + 1 }}</span>
          <div class="relative h-8 flex-1 overflow-hidden">
            <div class="horse-container absolute top-1/2 -translate-y-1/2 transition-[left] duration-200 ease-linear" :style="{ left: `${progressForHorse(horse)}%`, color: horse.color }">
              <span class="text-2xl leading-none drop-shadow-lg">♞</span>
            </div>
          </div>
        </div>
      </div>

      <div v-if="!activeRound" class="absolute inset-0 z-20 flex items-center justify-center">
        <div class="flex flex-col items-center gap-3 rounded-md border border-slate-300 bg-white/90 px-5 py-4 text-sm font-semibold text-slate-700 shadow">
          <span>{{ $t('status.idle') }}</span>
          <button
            v-if="status === 'idle'"
            class="rounded-md border border-slate-400 bg-white px-4 py-2 font-mono text-xs font-semibold tracking-wider hover:bg-slate-100"
            @click="emit('generate')"
          >
            {{ $t('actions.generate') }}
          </button>
          <button
            v-else-if="status === 'program-generated' || status === 'finished'"
            class="rounded-md bg-red-600 px-4 py-2 font-mono text-xs font-bold tracking-wider text-white hover:bg-red-500"
            @click="emit('start')"
          >
            {{ $t('actions.start') }}
          </button>
        </div>
      </div>

      <div v-if="countdownValue !== null" class="pointer-events-none absolute inset-0 z-30 flex items-center justify-center bg-black/20">
        <div class="rounded-full bg-white/90 px-6 py-4 font-mono text-4xl font-bold text-red-600 shadow-lg">
          {{ countdownValue }}
        </div>
      </div>
    </div>
  </section>
</template>
