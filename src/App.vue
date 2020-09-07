<template>
  <div id="app" class="main-container" v-if="ready">
    <nav :class="menuOpen ? 'full-width-content full-width-content-open' : 'full-width-content'">
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
// import axios from 'axios';
import ActivityRecorder from './utils/ActivityRecorder.js';
import {mapState} from 'vuex';
export default {
  name: 'App',
  data () {
    return {
      menuOpen: false
    }
  },
  computed: {
    ...mapState(['ready'])
  },
  mounted: function () {
    this.$store.dispatch('pullPropertyManifest');
    this.$store.dispatch('pullColorPresets');
    ActivityRecorder.init();
    // let self = this;
    // axios.get('preset-colors.json').then((response) => {
    //   self.$root.colorPresets = response.data;
    //   axios.get('property-manifest.json').then((response) => {
    //     self.$root.propertyManifest = response.data;
    //     for(let p in self.$root.propertyManifest){
    //       self.$root.propertyManifest[p].property_types.push(0);
    //     }
    //     self.$root.ready = true;
    //     self.$data.ready = self.$root.ready;
    //   });
    // });
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

div.selector-menu{
  
  > button{
    position:fixed;
    top:0;
    right:0;
    left:auto;
    z-index: 10;
  }
  > ul{
    display: none;
    position:fixed;
    width:80%;
    height: 100%;
    right:0;
    top:0;
    margin-top:45px;
    background-color: rgba(255,255,255,.85);
  }
  > button.selectors-open{
    right:auto;
    left:21%;
  }
  > ul.selectors-open{
    display: block;
  }
}

nav.full-width-content-open + div.main-content{
  > .main-mode-selector{
    display:none;
  }

}
.main-mode-selector{
  margin-top: -51px !important;
  position: fixed;
  z-index: 10;
  left:50%;
  transform:translate(-50%,0);
}
.m-hidden-content{
  display:none !important;
}
.preview-options{
  margin:0 !important;
  float:right;
}

.preview-options + div{
  position: relative;
  top:40px;
}
ul.property-type-selector{
  margin:0;
  padding:0;
  > li{
    display:block;
    padding:12px 6px;
    box-shadow:0 0 0 1px rgba(0,0,0,.4);
    color:#333333;
  }
  > li.selected-type{
    background-color:#333333;
    color:#ffffff;
  }
}
div.property-editor-ui{
  width:280px;
  margin: 0 auto;
  ul{
    margin:0;
    padding:0;
    > li{
      display:flex;
      flex-direction: row;
      padding:8px 0;
      margin:0;
      > label{
        flex-grow: 1;
        width: 30px;
      }
      > div.drag-container{
        margin-top:11px;
        display:inline-flex;
        box-shadow:0 -1px 0 rgba(0,0,0,.5);
        width: 160px;
        margin-left: -30px;
        margin-right: 30px;
      }
      > div.drag-container + input{
        width: 20px;
        display:inline-flex;
        flex-grow: 1;
      }
    }  
  }
}
.position-percentage-container{
  display:flex;
  flex-direction: row;
  > div{
    margin-top:11px;
    display:inline-flex;
    margin-right: 25px;
    box-shadow:0 -1px 0 rgba(0,0,0,.5);
    width:160px;
  }
  > div + input{
    width: 50px;
    display:inline-flex;
    flex-grow: 1;
  }
}
.angle-control{
  box-shadow:0 0 0 1px rgba(0,0,0,.5);
}
.editor-section-header{
  padding: 14px 0;
  display:block;
}
.editor-section-sub-header{
  margin: 12px 0;
  > select{
    float:right;
  }
  > select + .position-percentage-container{
    margin-top:5px;
  }
}
.property-type-selector{
  margin-bottom: 14px !important;
}
.colapsable-section{
  > input:not(:checked) + label + *, > input:not(:checked) + label + * + *{
    display:none;
  }
}
@include min(850px){
  div.property-editor-ui{
    margin:0;
    display:block !important;
  }
  div.main-preview{
    display:block !important;
    width:600px;
    position:fixed;
    top:90px;
    left:50%;
    margin-left:-180px;
  }
  .preview-options{
    display:flex !important;
    position:fixed;
    top:40px;
    left:50%;
    margin-left:-180px !important;
  }
  .main-mode-selector{
    display:none !important;
  }
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
