import Vue from 'vue';
import App from './App.vue';
import HomePage from './pages/HomePage.vue';
import SearchPage from './pages/SearchPage.vue';
import PropertyPage from './pages/PropertyPage.vue';
import VueRouter from 'vue-router';
import store from './store' 

import { library } from '@fortawesome/fontawesome-svg-core';
import { faPlus, faCog, faInfo, faTimes, faCaretDown, faCaretUp, faBars, faCode, faSort, faChevronUp, faChevronDown, faSitemap, faSlidersH, faEye, faWrench, faImage, faHome, faFilter, faPencilAlt, faSearch } from '@fortawesome/free-solid-svg-icons';
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
library.add(faSitemap);
library.add(faSlidersH);
library.add(faEye);
library.add(faWrench);
library.add(faImage);
library.add(faHome);
library.add(faFilter);
library.add(faPencilAlt);
library.add(faSearch);

Vue.component('font-awesome-icon', FontAwesomeIcon);


Vue.config.productionTip = false

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
