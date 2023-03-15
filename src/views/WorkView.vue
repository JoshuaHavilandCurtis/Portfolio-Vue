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

<<<<<<< HEAD
    <Transition appear name="page-loader">
      <Loader v-if="loading"></Loader>

      <div v-else class="page-content">
        <container>
          <div class="row">
            <div class="col-12">
              <h1>{{ productsTitle }}</h1>
            </div>
=======
      <div class="row gx-5 align-items-center">
        <div class="col-12 col-lg-5">
          <div class="work__image">
            <img src="../assets/img/dianebutterworth-portfolio.jpg">
>>>>>>> 8ae049fa424a719c476616a381a1244af1310f58
          </div>

<<<<<<< HEAD
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
=======
        <div class="col-12 col-lg-7">
          <div class="work__text">
            <h2>Diane Butterworth</h2>
            <h3>Designed and Built by</h3>

            <p>Diane Butterworth Ltd is an office planning, design, and technical consultancy. From design to technical products to construction they can support your digital requirements
            Using the latest technology, We built Diane's website in WordPress (CMS) using Advanced Custom Fields, Sage Theme, Bedrock, PHP and Javascript.</p>

            <a class="btn" href="#">Preview</a>
>>>>>>> 8ae049fa424a719c476616a381a1244af1310f58
          </div>
          
        </container>
      </div>
<<<<<<< HEAD
    </Transition>
=======

      <div class="row mt-5">
        <div class="col-12">

          <ul class="work__tags">
            <li>HTML5</li>
            <li>CSS3 (SCSS)</li>
            <li>Javascript</li>
            <li>WordPress/ACF</li>
            <li>PHP</li>
            <li>Roots (Sage Theme)</li>
            <li>Bootstrap</li>
          </ul>

        </div>
      </div>

    </container>
>>>>>>> 8ae049fa424a719c476616a381a1244af1310f58
  </div>
</template>