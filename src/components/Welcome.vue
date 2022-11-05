<script>
export default {
  data() {
    return {
        name: 'Joshua Curtis',
        motto: 'Software Developer / Life Long Student / Human'
    }
  }
}
</script>

<template>
  <div class="container vh-100">
      <div class="row justify-content-center align-items-center h-100">
          <div class="col-12 text-center">
            <h1>{{ this.name }}</h1>
            <p>{{ this.motto }}</p>
            <slot></slot>
          </div>
      </div>
  </div>
</template>
