import Vue from 'vue';
import App from './App.vue';
import HomePage from './pages/HomePage.vue';
import SearchPage from './pages/SearchPage.vue';
import PropertyPage from './pages/PropertyPage.vue';
import VueRouter from 'vue-router';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faPlus, faCog, faInfo, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

Vue.use(VueRouter);

const router = new VueRouter({
  routes: [
    { path: '/', component: HomePage },
    { path: '/search', component: SearchPage },
    { path: '/property', component: PropertyPage }
  ]
});

library.add(faPlus);
library.add(faCog);
library.add(faInfo);
library.add(faTimes);

Vue.component('font-awesome-icon', FontAwesomeIcon);


Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
  data () {
    return {
      propertyManifest: {},
      ready: false
    }
  }
}).$mount('#app')
