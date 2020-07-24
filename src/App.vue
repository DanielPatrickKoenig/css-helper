<template>
  <div id="app">
    <nav>
      <router-link to="/">Home</router-link>
      <router-link to="/search">Search</router-link>
      <router-link :to="'/property?name='+property">Property</router-link>
    </nav>
    <router-view></router-view>
    <!-- <AttributeList v-if="ready" :data="searchItems"></AttributeList> -->
  </div>
</template>

<script>
import axios from 'axios';
// import AttributeList from './components/AttributeList.vue';
export default {
  name: 'App',
  // components: {
  //   AttributeList
  // },
  data () {
    return {
      searchItems: {},
      ready: false,
      property: 'background-color'
    }
  },
  mounted: function () {
      let self = this;
      axios.get('property-manifest.json').then((response) => {
        self.$root.propertyManifest = response.data;
        // self.$data.searchItems = self.$root.propertyManifest;
        self.$root.ready = true;
        // self.$data.ready = self.$root.ready;
      });
  }
}
</script>

<style>

</style>
