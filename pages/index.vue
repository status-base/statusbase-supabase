<script setup lang="ts">
import { Url, Log, Incident } from "~~/utils/interface"

const client = useSupabaseClient()

const { data: urls } = await useAsyncData("urls", async () => {
  const { data, error } = await client.from<Url>("urls").select("*")
  if (error) throw Error(error.message)
  return data
})

const { data: logs } = await useLazyAsyncData("logs", async () => {
  const { data, error } = await client.from<Log>("logs").select("*").order("time", { ascending: false })
  if (error) throw Error(error.message)
  return data
})

const { data: incidents } = await useLazyAsyncData("reports", async () => {
  const { data, error } = await client.from<Incident>("incidents").select("*").order("created_at", { ascending: false })
  if (error) throw Error(error.message)
  return data
})

const gridCount = useGridCount()
useCustomHead("StatusBase Status Page")

const retrieveLogs = (url_id: string) => {
  return logs.value?.filter((i) => i.url_id == url_id)
}
</script>

<template>
  <div class="">
    <OverallStatus :report_data="logs"></OverallStatus>

    <div class="mt-12 md:mt-20 font-semibold inline-flex items-end">
      <h2 class="text-xl md:text-3xl">Uptime</h2>
      <h3 class="text-gray-400 md:text-xl ml-3 md:ml-6">Last {{ gridCount }} days</h3>
    </div>

    <div class="flex flex-col items-center">
      <Card :meta_data="url" :report_data="retrieveLogs(url.id)" v-for="url in urls" :key="url.id"></Card>
    </div>

    <IncidentReport :incidents="incidents"></IncidentReport>
  </div>
</template>
