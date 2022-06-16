import { defineNuxtConfig } from "nuxt"

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  css: ["~/assets/main.css"],
  modules: ["nuxt-windicss", "unplugin-icons/nuxt", "@nuxtjs/supabase"],
})
