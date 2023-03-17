<script>
import { fetchFromStrapi } from "@/lib/strapi";
import Loader from "@/components/Loader.vue";

export default {
  components: {
    Loader,
  },
  data() {
    return {
      loading: true,
      title: null,
      description: null,
      image: null
    }
  },
  methods: {
    async getAboutData() {
      const response = await fetchFromStrapi("about");
  
      console.log(response)

      this.title = response.data.attributes.title;
      this.description = response.data.attributes.description;
      this.image = response.data.attributes.image.data.attributes.formats.medium.url;

      this.loading = false;
    }
  },
  mounted() {
    this.getAboutData();
  }
}
</script>

<template>
  <div class="about page">
    <Transition appear name="page-loader">
      
      <Loader v-if="loading" />

      <div v-else class="page-content">
        <container>
          <div class="col-12">
            <h1>{{ title }}</h1>
            <p>{{ description }}</p>
            <img :src="image">
          </div>
        </container>
      </div>

    </Transition>
  </div>
</template>

