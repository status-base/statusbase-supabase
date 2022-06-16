<script setup lang="ts">
import { PropType } from "vue"
import { statusColor } from "~~/utils/function"
import { Log, Report } from "~~/utils/interface"
import { groupBy } from "lodash-es"

const props = defineProps({
  report_data: Object as PropType<Log[]>,
})
const { $dayjs } = useNuxtApp()

const todayUptimeList = computed(() => {
  let report_data = groupBy(props.report_data, "title")
  return Object.values(report_data).map((i) => {
    if (!i) return
    let todayData: number[] = i.filter((j) => $dayjs.utc(j.time).isToday()).map((j) => (j.status === "success" ? 1 : 0))

    return todayData.reduce((a, v) => a + v, 0) / todayData.length
  })
})

const todayOverallUptime = computed(() => {
  if (todayUptimeList.value.find((i) => i >= 0 && i < 0.5)) {
    return 0
  } else if (todayUptimeList.value.find((i) => i >= 0.5 && i < 0.9)) {
    return 0.5
  } else {
    return 1
  }
})
const todayOverallMessage = computed(() => {
  const majorOutageCount = todayUptimeList.value.filter((i) => i >= 0 && i < 0.5).length
  const partialOutageCount = todayUptimeList.value.filter((i) => i >= 0.5 && i < 0.9).length

  if (majorOutageCount) {
    return `${majorOutageCount} Major Outage`
  } else if (partialOutageCount) {
    return `${partialOutageCount} Partial Outage`
  } else {
    return "All Systems Operational"
  }
})
</script>

<template>
  <div class="flex justify-center">
    <div
      class="w-full bg-white p-6 md:p-8 flex items-center rounded-xl shadow-lg shadow-purple-100 text-xl md:text-3xl font-medium"
      :class="statusColor(todayOverallUptime, 'text')"
    >
      <StatusIcon :uptime="todayOverallUptime" class="md:text-3xl" />
      <h2 class="ml-3 md:ml-6">{{ todayOverallMessage }}</h2>
    </div>
  </div>
</template>
