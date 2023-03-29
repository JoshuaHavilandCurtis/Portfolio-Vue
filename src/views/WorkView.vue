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
      products: null,
      title: null
    }
  },
  methods: {
    async getWorkData() {
      const response = await fetchFromStrapi("work");
  
      console.log(response)

      this.productsTitle = response.data.attributes.title;
      this.products = response.data.attributes.products; 

      this.loading = false;
    }
  },
  mounted() {
    this.getWorkData();
  }
}
</script>


<template>

  <div class="work page">

    <Transition appear name="page-loader">
      <Loader v-if="loading" />

      <div v-else class="page-content">
        <container>
          <nav>
            <RouterLink to="/" id="work"><font-awesome-icon icon="fa-solid fa-arrow-left" /> Back</RouterLink>
          </nav>

          <div class="row py-5">
            <div class="col-12">
              <h1 class="work__title">{{ title }}</h1>
            </div>
          </div>

          <div class="row gx-5 align-items-center work__product" v-for="product in products" :key="product.id">
            <div class="col-12 col-lg-5 mb-5 mb-lg-0">
              <div class="work__image">
                <img :src="product.image.data.attributes.url">
              </div>
            </div>
    
            <div class="col-12 col-lg-7">
              <div class="work__text">
                <h2>{{ product.title }}</h2>
                <h3>{{ product.subtitle }}</h3>
                <p>{{ product.description }}</p>
              </div>
            </div>

            <div class="row mt-5">
              <div class="col-12">
                <ul class="work__tags">
                  <li v-for="tag in product.tags.data" :key="tag.id">
                    <span>{{ tag.attributes.name }}</span>
                  </li>
                </ul>
              </div>
            </div>

            <div class="row py-5">
              <div class="col-12">
                <a :href="product.link" target="_blank" class="button preview">Preview</a>
              </div>
            </div>

          </div>
          
        </container>
      </div>
    </Transition>
  </div>
</template>

<style lang="scss" scoped>
@import "@/scss/views/work";
</style>