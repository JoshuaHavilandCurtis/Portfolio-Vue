import App from "@/App.vue";
import router from "@/router";
import * as fontawesome from "@fortawesome/fontawesome-svg-core";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import * as swiper from "swiper/element/bundle";
import { Component, createApp } from "vue";

//define fontawesome icons
fontawesome.library.add(faArrowLeft);

//register swiper.js
swiper.register();

const app = createApp(App as Component);

app.use(router);

app.mount("#entry-point");