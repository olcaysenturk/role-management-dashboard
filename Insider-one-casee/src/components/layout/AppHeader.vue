<script setup lang="ts">
import LanguageSwitcher from '../shared/LanguageSwitcher.vue';

defineProps<{
  canStart: boolean;
  isRunning: boolean;
}>();

const emit = defineEmits<{
  generate: [];
  start: [];
}>();
</script>

<template>
  <header class="fixed top-0 z-40 flex w-full flex-col gap-2 border-b border-slate-300 bg-white px-3 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-6 sm:py-4">
    <div>
      <h1 class="font-sans text-xl font-bold text-slate-950 sm:text-3xl">{{ $t('appTitle') }}</h1>
    </div>

    <div class="grid w-full grid-cols-2 gap-2 sm:flex sm:w-auto sm:items-center">
      <LanguageSwitcher />
      <button
        class="flex h-[30px] w-full items-center justify-center rounded-md border border-slate-400 bg-white p-0 font-mono text-[11px] font-semibold tracking-wider enabled:hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50 md:h-auto md:w-auto md:px-4 md:py-2 md:text-xs"
        :disabled="isRunning"
        :aria-label="$t('actions.generate')"
        @click="emit('generate')"
      >
        <span class="material-symbols-outlined text-[18px] leading-none md:hidden">event_note</span>
        <span class="hidden md:inline">{{ $t('actions.generate') }}</span>
      </button>
      <button
        class="flex h-[30px] w-full items-center justify-center rounded-md bg-red-600 p-0 font-mono text-[11px] font-bold tracking-wider text-white enabled:hover:bg-red-500 disabled:cursor-not-allowed disabled:opacity-50 md:h-auto md:w-auto md:px-4 md:py-2 md:text-xs"
        :disabled="!canStart || isRunning"
        :aria-label="$t('actions.start')"
        @click="emit('start')"
      >
        <span class="material-symbols-outlined text-[18px] leading-none md:hidden">play_circle</span>
        <span class="hidden md:inline">{{ $t('actions.start') }}</span>
      </button>
    </div>
  </header>
</template>
