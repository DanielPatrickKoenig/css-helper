<template>
  <div id="app" class="main-container" v-if="ready">
    <nav class="full-width-content">
      <button :class="menuOpen ? 'hamberger-menu hamberger-menu-open' : 'hamberger-menu'"><font-awesome-icon icon="bars" v-on:click="menuOpen = !menuOpen" /></button>
      <div :class="menuOpen ? 'main-nav main-nav-open' : 'main-nav'">
        <router-link to="/">Home</router-link>
        <router-link to="/search">Search</router-link>
      </div>
    </nav>
    <router-view class="main-content"></router-view>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'App',
  data () {
    return {
      menuOpen: false,
      ready: false
    }
  },
  mounted: function () {
      let self = this;
      axios.get('property-manifest.json').then((response) => {
        self.$root.propertyManifest = response.data;
        self.$root.ready = true;
        self.$data.ready = self.$root.ready;
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
  .hamberger-menu{
    
  }
  .hamberger-menu-open{
    margin-left:60%;
  }
  > div.main-nav{
    display:none;
    position:fixed;
    left:0;
    width:60%;
    z-index: 15;
    height: 100vh;
    background-color: $menu-bg;
    > a{
      display:block;
      padding: .5em .3em;
    }
  }
  > div.main-nav{
    display:none;
  }
  > div.main-nav-open{
    display:inline-block;
  }
  
  
}
.main-content{
    margin-top:3.5em;
}
@include min(850px){
  .main-content{
    margin-top:5.5em;
  }
  nav.full-width-content{
    position:fixed;
    top:0;
    background-color: $menu-bg;
    height: 2em;
    z-index:10;
    .hamberger-menu{
      display:none;
    }
    > div.main-nav{
      position:relative;
      display:block;
      height: auto;
      background-color: transparent;
      > a{
        display:inline-block;
        padding: .1em .15em;
      }
    }
  }
}
</style>
