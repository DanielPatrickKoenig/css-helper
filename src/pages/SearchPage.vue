<template>
  <div id="search-content">
    <PropertyTable v-if="ready" :data="searchItems"></PropertyTable>
  </div>
</template>

<script>
// import axios from 'axios';
import PropertyTable from '../components/PropertyTable.vue';
export default {
  name: 'Search',
  components: {
    PropertyTable
  },
  data () {
    return {
      searchItems: this.$root.propertyManifest,
      ready: this.$root.ready
    }
  }
}
</script>

<style>

</style>
