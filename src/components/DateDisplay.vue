<script lang="ts">
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import localizedDate from "dayjs/plugin/localizedFormat";
dayjs.extend(relativeTime);
dayjs.extend(localizedDate);
import { defineComponent } from "vue";
export default defineComponent({
  props: {
    timestamp: { type: Object , required: true },
  },
  computed: {
    normalizedTimestamp (){
      return this.timestamp?.seconds || this.timestamp
		},
		diffForHumans() {
			return dayjs.unix(this.normalizedTimestamp).fromNow();
		},
		humanFriendlyDate() {
			return dayjs.unix(this.normalizedTimestamp).format("llll");
		},
  },
});
</script>
<template>

  <div >{{ diffForHumans }}</div>
</template>
