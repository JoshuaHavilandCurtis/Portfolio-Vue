<script setup>
import { useRouter, RouterLink } from 'vue-router';

/**
 * Observe route changes:
 * I'm not sure whether it's best to put this in the parent 'App.vue', or within the 'Home.vue' component 
 * my thinking is that, if you Home component is being created/destoyed each time a different view is shown,
 * then it makes sense to put this route observer here in the parent. however, the logic here is specific
 * to that 'Home.vue' component, so perhaps it makes sense to put this in there?
 * Both ways seem to work. however, defo one question to ask that colleague of yours
 * */

const router = useRouter(); //'how to use useRouter() with the options api'

router.afterEach((to, from) => {
  if (from.name === "about") { //if the route we are coming from is 'about' -> slide in from the right
    to.meta.enterClass += " animate__fadeInRight";
    to.meta.leaveClass += " animate__fadeOutLeft";
  } else if (from.name === "work") { //otherwise if the route we're coming from is 'work' -> slide left
    to.meta.enterClass += " animate__fadeInLeft";
    to.meta.leaveClass += " animate__fadeOutRight";
  }
});
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

        <div class="row">
          <div class="col-12">
            <a href="/" target="_blank" class="button preview">Resume</a>
          </div>
        </div>

        <a href="/" target="_blank" class=""><font-awesome-icon icon="fa-brands fa-linkedin-in" /></a>
        <a href="/" target="_blank" class="">GitHub</a>
      </container>
    </div>
  </header>
</template>

<style lang="scss" scoped>
@import "@/scss/views/home";
</style>