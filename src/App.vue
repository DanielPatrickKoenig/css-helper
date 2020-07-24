<template>
  <div id="app">

    <AttributeList v-if="ready" :data="searchItems"></AttributeList>
  </div>
</template>

<script>
import axios from 'axios';
import AttributeList from './components/AttributeList.vue';
export default {
  name: 'App',
  components: {
    AttributeList
  },
  data () {
    return {
      searchItems: {},
      ready: false
    }
  },
  mounted: function () {
      let self = this;
      axios.get('property-manifest.json').then((response) => {
        self.$root.propertyManifest = response.data;
        self.$data.searchItems = self.$root.propertyManifest;
        self.$data.ready = true;
      });
  }
}
</script>

<style>

</style>
