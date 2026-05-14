<script setup lang="ts">
import { storeToRefs } from 'pinia';
import AppHeader from '../components/layout/AppHeader.vue';
import HorseListPanel from '../components/feature/HorseListPanel.vue';
import RaceProgramPanel from '../components/feature/RaceProgramPanel.vue';
import ResultsPanel from '../components/feature/ResultsPanel.vue';
import LiveTrack from '../components/race/LiveTrack.vue';
import { useRaceStore } from '../store/raceStore';

const raceStore = useRaceStore();
const { visibleHorseList, roundProgram, roundResults, currentRoundIndex, status, activeRound, horseProgress, countdownValue } = storeToRefs(raceStore);

const onGenerateProgram = () => raceStore.generateProgram();
const onStartRace = () => raceStore.startRace();
</script>

<template>
  <div class="min-h-screen bg-slate-100 text-slate-900">
    <AppHeader
      :can-start="roundProgram.length > 0"
      :is-running="status === 'running'"
      @generate="onGenerateProgram"
      @start="onStartRace"
    />

    <main class="px-6 pb-20 pt-32 sm:pt-24">
      <div class="grid grid-cols-12 gap-6">
        <div class="col-span-12 lg:col-span-3">
          <HorseListPanel :horses="visibleHorseList" />
        </div>
        <div class="col-span-12 flex flex-col gap-6 lg:col-span-6">
          <LiveTrack
            :active-round="activeRound"
            :preview-round="roundProgram[0] ?? null"
            :progress="horseProgress"
            :countdown-value="countdownValue"
            :status="status"
            @generate="onGenerateProgram"
            @start="onStartRace"
          />
        </div>
        <div class="col-span-12 flex flex-col gap-6 lg:col-span-3">
          <RaceProgramPanel :rounds="roundProgram" :active-round-index="currentRoundIndex" />
          <ResultsPanel :results="roundResults" />
        </div>
      </div>
    </main>

  </div>
</template>
