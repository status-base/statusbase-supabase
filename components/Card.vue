<script setup lang="ts">
import { PropType } from "vue"
import { formatUptime } from "~~/utils/function"
import { Log, Url } from "~~/utils/interface"

const props = defineProps({
  meta_data: Object as PropType<Url>,
  report_data: Object as PropType<Log[]>,
})
const status = ref()
</script>

<template>
  <div class="my-8 md:my-10 w-full">
    <div class="mb-4 flex items-center justify-between">
      <div class="mx-0.5 truncate">
        <div class="flex items-center">
          <StatusIcon :uptime="status?.overallUptime"></StatusIcon>
          <NuxtLink :to="`/urls/${meta_data.title}`" class="ml-2 md:text-xl">{{ meta_data.title }}</NuxtLink>
        </div>
        <h4 class="text-sm text-gray-400">{{ meta_data.url }}</h4>
      </div>
      <div>
        <p v-if="status?.overallUptime" class="ml-3 md:text-xl text-gray-400">
          {{ formatUptime(status?.overallUptime) }}
        </p>
        <div v-else class="bg-gray-100 rounded-lg w-24 h-7 animate-pulse"></div>
      </div>
    </div>
    <StatusGrid ref="status" :data="report_data" />
  </div>
</template>
