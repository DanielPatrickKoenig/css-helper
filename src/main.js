import Vue from 'vue';
import App from './App.vue';
import HomePage from './pages/HomePage.vue';
import SearchPage from './pages/SearchPage.vue';
import PropertyPage from './pages/PropertyPage.vue';
import VueRouter from 'vue-router';
import store from './store' 

import { library } from '@fortawesome/fontawesome-svg-core';
import { faPlus, faCog, faInfo, faTimes, faCaretDown, faCaretUp, faBars, faCode, faSort, faChevronUp, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'history',
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
library.add(faCaretDown);
library.add(faCaretUp);
library.add(faBars);
library.add(faCode);
library.add(faSort);
library.add(faChevronUp);
library.add(faChevronDown);

Vue.component('font-awesome-icon', FontAwesomeIcon);


Vue.config.productionTip = false

new Vue({
  store,
  router,
  render: h => h(App),
  data () {
    return {
      propertyManifest: {},
      ready: false,
      selectorPropertyMatrix: {},
      selectorTypeMatrix: {},
      selectorList: [],
      selectorIndex: 0,
      colorPresets: {}
    }
  }
}).$mount('#app')
