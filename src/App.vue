<script>
export default {
  name: 'App'
}
</script>

<script setup>
import { RouterView } from 'vue-router'
</script>

<template>
  <router-view v-slot="{ Component, route }">
    <!-- Use any custom transition and  to `fade` -->
    <transition 
      :enter-active-class="route.meta.enterClass" 
      :leave-active-class="route.meta.leaveClass" 
    >

      <component class="slide-to" :is="Component" :key="route.path" />
    </transition>
  </router-view>
</template>

<style lang="scss">
@import "@/scss/main";
</style>