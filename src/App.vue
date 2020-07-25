<template>
  <div id="app" class="main-container">
    <nav class="full-width-content">
      <router-link to="/">Home</router-link>
      <router-link to="/search">Search</router-link>
    </nav>
    <router-view class="main-content"></router-view>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'App',
  mounted: function () {
      let self = this;
      axios.get('property-manifest.json').then((response) => {
        self.$root.propertyManifest = response.data;
        self.$root.ready = true;
      });
  }
}
</script>

<style lang="scss">
@import './scss/variables.scss';
@import './scss/mixins.scss';
div.main-container,
.full-width-content{
  margin: 0 auto;
  width: 60em;
  max-width: 100%;
}
nav.full-width-content{
  position:fixed;
  top:0;
  background-color: $menu-bg;
  height: 2em;
  z-index:10;
  > a{
    padding: .1em .15em;
  }
}
.main-content{
    margin-top:3.5em;
}
@include min(850px){
  .main-content{
    margin-top:5.5em;
  }
}
</style>
