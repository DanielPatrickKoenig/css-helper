<template>
  <div id="search-content">
    <PropertyTable v-if="ready" :data="propertyManifest"></PropertyTable>
  </div>
</template>

<script>
// import axios from 'axios';
import PropertyTable from '../components/PropertyTable.vue';
import {mapState} from 'vuex';
export default {
  name: 'Search',
  components: {
    PropertyTable
  },
  data () {
    return {
      // searchItems: this.$root.propertyManifest,
      // ready: this.$root.ready
    }
  },
  computed: {
    ...mapState(['propertyManifest', 'ready'])
  }
}
</script>

<style>

</style>
