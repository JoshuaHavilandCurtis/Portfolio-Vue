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
      products: [],
      productsTitle: ''
    }
  },
  methods: {
    async getWorkData() {
      const data = await fetchFromStrapi("work")/*.catch(error => {
        this.$store.setState("error", "Failed!");
      });*/

      console.log(data)

      this.productsTitle = data.data.attributes.title;
      this.products = data.data.attributes.products; 

      this.loading = false;
    }
  },
  mounted() {
    this.getWorkData();
  }
};
</script>


<template>

  <div class="work page">

    <Transition appear name="page-loader">
      <Loader v-if="loading"></Loader>

      <div v-else class="page-content">
        <container>
          <div class="row">
            <div class="col-12">
              <h1>{{ productsTitle }}</h1>
            </div>
          </div>

          <div class="row gx-5 align-items-center" v-for="product in products" :key="product.id">
            <div class="col-5">
              <div class="work__image">
                <img :src="product.image.data.attributes.url">
              </div>
            </div>
    
            <div class="col-7">
              <div class="work__text">
                <h2>{{ product.title }}</h2>
                <h3>{{ product.subtitle }}</h3>
                <p>{{ product.description }}</p>
              </div>
            </div>
          </div>
          
        </container>
      </div>
    </Transition>
  </div>
</template>