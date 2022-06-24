<script setup lang="ts">
import { Url, Log, Incident } from "~~/utils/interface"

const {
  params: { slug },
} = useRoute()

const client = useSupabaseClient()
const { data: url } = await useAsyncData(`url-${slug}`, async () => {
  const { data, error } = await client.from<Url>("urls").select("*").eq("title", `${slug}`).single()
  if (error) throw Error(error.message)
  return data
})

const { data: logs } = await useLazyAsyncData(`log-${slug}`, async () => {
  const { data, error } = await client
    .from<Log>("logs")
    .select("*")
    .eq("url_id", `${url.value.id}`)
    .order("time", { ascending: false })
  if (error) throw Error(error.message)
  return data
})

const { data: incidents } = await useLazyAsyncData(`incident-${slug}`, async () => {
  const { data, error } = await client
    .from<Incident>("incidents")
    .select("*")
    .eq("url_id", `${url.value.id}`)
    .order("created_at", { ascending: false })
  if (error) throw Error(error.message)
  return data
})

const gridCount = useGridCount()
useCustomHead(`${url.value.title} Status Page | StatusBase`)
</script>

<template>
  <div class="">
    <OverallStatus :report_data="logs"></OverallStatus>

    <div class="mt-12 md:mt-20 font-semibold inline-flex flex-col md:flex-row md:items-end">
      <h2 class="text-xl md:text-3xl">{{ url.title }}'s Uptime</h2>
      <h3 class="text-gray-400 md:text-xl md:ml-6">Last {{ gridCount }} days</h3>
    </div>

    <div class="flex flex-col items-center">
      <Card :meta_data="url" :report_data="logs"></Card>
    </div>

    <IncidentReport :incidents="incidents"></IncidentReport>
  </div>
</template>
