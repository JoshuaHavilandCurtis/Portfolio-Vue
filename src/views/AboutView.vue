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
    // async getWorkData() {
    //   const response = await fetchFromStrapi("work");
  
    //   console.log(response)

    //   this.productsTitle = response.data.attributes.title;
    //   this.products = response.data.attributes.products; 

    //   this.loading = false;
    // }
  },
  mounted() {
    // this.getWorkData();
  }
}
</script>

<template>
  <div class="about page">
    <container>
      <div class="col-12">
        <h1>This is an about page</h1>

        <p>
          I am highly motivated individual with a natural, confident and collaborative style who relishes and enjoys a challenging environment in which to work whilst delivering high standards of outcomes.
        </p>

        <p>
          I have over 5 years experience working in the web development space both within teams and as sole developer, a computer science degree amassing a wealth of IT experience during this time. My passion for developing and delivering core ‘customer experience’ solutions that add ‘real value’ to the clients. I am a driven, diligent, highly motivated, hardworking & talented young IT professional.
        </p>
      </div>
    </container>
  </div>
</template>

