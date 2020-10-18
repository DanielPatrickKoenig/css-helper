<template>
  <div id="search-content">
    <PropertyTable v-if="ready" :data="propertyManifest"></PropertyTable>
  </div>
</template>

<script>
// import axios from 'axios';
import PropertyTable from '../components/PropertyTable.vue';
import Utilities from '../utils/Utilities.js';
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
  },
  mounted: function (){
    this.$store.dispatch('setNotificationMessage', Utilities.MessageCodes.ACCESS_SEARCH);
  }
}
</script>

<style>

</style>
