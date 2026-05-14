<script setup lang="ts">
import { useI18n } from 'vue-i18n';

const { locale } = useI18n();
</script>

<template>
  <label class="hidden items-center gap-2 rounded-md border border-slate-300 bg-white px-2 py-1 text-xs md:flex">
    <span class="material-symbols-outlined text-base text-slate-600">language</span>
    <select v-model="locale" class="rounded px-1 py-0.5 font-mono text-xs">
      <option value="tr">TR</option>
      <option value="en">EN</option>
    </select>
  </label>
</template>
