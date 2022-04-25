<script lang="ts" setup>
import DateDisplay from "./DateDisplay.vue";
import UseEmojis from "@/composables/UseEmojis";
import type Entry from "@/types/Entry";
import { inject } from "vue";
import { userInjectionKey } from "@/injectionKeys";
const { findEmoji } = UseEmojis();

const user = inject(userInjectionKey)
defineProps<{
  entry: Entry
}>()
</script>

<template>
  <div class="entry-card">
    <div class="entry-card-body">
      <component width="75" :is="findEmoji(entry.emoji)"></component>
      <div class="entry-text">{{ entry.body }}</div>
    </div>
    <div class="entry-footer">
      <DateDisplay :timestamp="entry.createdAt" class="mr-2" />
      |
      <span class="ml-2">{{user?.username}}</span>
    </div>
  </div>
</template>
