<script setup>
import { RouterView } from 'vue-router'
</script>

<template>
    <router-view v-slot="{ Component }">
    <!-- Use any custom transition and  to `fade` -->
    <transition name="page-slide" mode="out-in">
      <component :is="Component" />
    </transition>
  </router-view>
</template>

<style lang="scss">
@import "@/scss/main";
</style>