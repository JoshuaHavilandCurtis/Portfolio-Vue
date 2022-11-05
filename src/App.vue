<script>
import Welcome from './components/Welcome.vue'
import About from './components/About.vue'
import Work from './components/Work.vue'

export default {
  data() {
    return {
      componentSwitcher: "welcome"
    }
  },
  components: {
    Welcome,
    About,
    Work
  },
  methods: {
    // component switcher function
    open: function(cmp){
        this.componentSwitcher = cmp;
    }
  },
}
</script>

<template>
  <transition name="fade" mode="out-in" v-if="componentSwitcher === 'welcome'">
    <welcome>
        <nav>
          <span @click="open('about')">About</span>
          <span @click="open('work')">Work</span>
        </nav>
    </welcome>
  </transition>

  <transition name="fade" mode="out-in" v-if="componentSwitcher === 'about'">
    <about></about>
  </transition>

  <transition name="fade" mode="out-in" v-if="componentSwitcher == 'work'">
    <work></work>
  </transition>
</template>