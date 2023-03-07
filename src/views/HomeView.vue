<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <header class="home-bg">
    <div class="home">
      <nav>
        <!-- <RouterLink to="/">Home</RouterLink> -->
        <RouterLink to="/about" id="about">About</RouterLink>
        <RouterLink to="/work" id="work">Work</RouterLink>
      </nav>

      <container class="text-center intro">
        <h1>Joshua Curtis.</h1>
        <p>Software Developer / Life Long Student / Human</p>
      </container>
    </div>
  </header>
</template>
