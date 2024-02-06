// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  pages: true,

  modules: ["@nuxtjs/supabase", "@nuxtjs/tailwindcss", "@nuxtjs/tailwindcss"],

  supabase: {
    redirect: false,
  },
});
