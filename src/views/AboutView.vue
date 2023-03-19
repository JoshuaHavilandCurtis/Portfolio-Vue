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

          <div class="row py-5">
            <div class="col-12">
              <div class="about__title">
                <h1>{{ title }}</h1>
              </div>
            </div>
          </div>

          <div class="row gx-5 align-items-center">
            <div class="col-5">
              <div class="about__image">
                <img :src="image">
              </div>
            </div>

            <div class="col-7">
              <div class="about__description">
                <p>{{ description }}</p>
              </div>
            </div>
          </div>

        </container>
      </div>
    </Transition>
  </div>
</template>

