import App from "@/App.vue";
import router from "@/router";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { register } from "swiper/element/bundle";
import { createApp } from "vue";

//define fontawesome icons
library.add(faArrowLeft);

//register swiper.js
register();

// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
const app = createApp(App);

app.use(router);

app.mount("#entry-point");
