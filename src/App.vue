<template>
  <div id="app" class="main-container" v-if="ready">
    <div class="app-logo">
      <div>
        <img src="CSS_TrainingWheel_02.svg" />
        
      </div>
      <span></span>
    </div>
    <nav :class="menuOpen ? 'full-width-content full-width-content-open' : 'full-width-content'">
      <button app-controll :class="menuOpen ? 'hamberger-menu hamberger-menu-open' : 'hamberger-menu'"><font-awesome-icon icon="bars" v-on:click="menuOpen = !menuOpen" /></button>
      <div :class="menuOpen ? 'main-nav main-nav-open' : 'main-nav'">
        <router-link v-on:click.native="menuOpen = false;" to="/"><font-awesome-icon icon="home" /> Home</router-link> <span>|</span> <router-link v-on:click.native="menuOpen = false;" to="/search"><font-awesome-icon icon="filter" /> Property Selector</router-link>
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
svg.svg-inline--fa path{
  fill:$interaction-dark;
}
span.selected-option{
  svg.svg-inline--fa path{
    fill:#000000;
  }
}

span.collapse-toggle{
  float: right;
  margin-top: 1px;
  font-size: 16px;
  width: 16px;
  height: 16px;
}
body{
  font-family:$body-font;
  .main-preview{
    div.preview-display{
      font-family: initial;
    }
  }
}
div.main-container{
  > div.app-logo{
    height: 1.8em;
    background-color: #ffffff;
    position: fixed;
    top: 0;
    max-width: 100%;
    width: 30%;
    z-index: 100;
    right: 0px;
    > div{
      float:right;
      padding:4px;
      height:100%;
      width:1.8em;
    }
  }
}
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
  .hamberger-menu, .hamberger-menu-open{
    font-size: 1.6em;
    position: relative;
    z-index: 20;
    background-color: transparent;
    border:none;
  }
  .hamberger-menu-open{
    
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
      text-decoration: none;
    }
    > span{
      display: none;
    }
  }
  > div.main-nav{
    display:none;
    > span{
      display: none;
    }
  }
  > div.main-nav-open{
    display:inline-block;
    padding-top:3em;
    box-shadow: 0.2em 0 4px rgba(0,0,0,.5);
  }
  
  
}
.main-content{
    margin-top:3.9em;
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
  // margin: -61px auto 22px auto !important;
  // margin-top: -51px !important;
  // position: fixed;
  z-index: 10;
  margin-bottom:10px !important;
  // left:50%;
  // transform:translate(-50%,0);
}
.m-hidden-content{
  display:none !important;
}
.preview-options{
  margin:0 auto !important;
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
  h4{
    color:$interaction-dark;
    box-shadow:0 1px 0 $interaction-light inset
  }
  width:280px;
  margin: 0 auto;
  > div{
    box-shadow:0 0 0 9px $property-header-space, 0 0 0 10px $interaction-dark;
    margin-bottom:28px;
    border-radius:1px;
    h3 {
      // background-color:$property-header-bg;
      box-shadow:0 0 0 10px transparent;
      color:$interaction-dark;
      border-radius:1px 1px 0 0;
    }
    h3.collapsed-header{
      border-radius:1px;
    }
  }
  ul{
    margin:0;
    padding:0;
    > li{
      display:flex;
      flex-direction: row;
      padding:8px;
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
div.main-preview{
  box-shadow:0 0 0 1px $preview-shadow;
  overflow-y:auto;
  
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
textarea.html-editor{
    width:100%;
    height: 400px;
}
textarea.style-content{
    width:100%;
    height: 400px;
}
.style-content + ul{
  margin:0;
  padding:0;
  > li{
    padding:6px 0;
    box-shadow:0 1px 0 #dddddd;
    display:flex;
    flex-direction: row;
    > button{
      display:inline-flex;
      width:15%;
      border:none;
      background-color:transparent;
      justify-content: flex-end;
      box-shadow:none;
    }
    > button:first-child{
      width: 70%;
      justify-content: flex-start;
    }
  }
}
.template-selector{
  width: 100%;
  margin: 0 0 16px 0;
}
@include min(850px){
  div.property-editor-ui{
    margin:0 10px;
    display:block !important;
  }
  div.main-preview{
    display:block !important;
    width:600px;
    position:fixed;
    top:120px;
    left:50%;
    margin-left:-122px;
    bottom:80px;
  }
  .preview-options{
    display:flex !important;
    position:fixed;
    top:78px;
    left:50%;
    margin-left:326px !important;
  }
  .main-mode-selector{
    display:none !important;
  }
  .main-content{
    margin-top:8.3em;
  }
  nav.full-width-content{
    position:fixed;
    top:2.5em;
    background-color: $menu-bg;
    height: 2em;
    z-index:10;
    position: fixed;
    top: 2.5em;
    background-color: #ffffff;
    height: 2em;
    z-index: 10;
    margin-left: 71px;
    width: 55.6em;
    .hamberger-menu{
      display:none;
    }
    > div.main-nav{
      position:relative;
      display:block;
      height: auto;
      background-color: transparent;
      padding-top:0;
      > a{
        display:inline-block;
        padding: .1em .15em;
      }
      > span{
        display: initial;
      }
      &.main-nav-open{
        box-shadow:0 0 0 transparent;
      }
    }
  }
  .main-mode-selector{
    margin-top: -51px !important;
    position: fixed;
    z-index: 10;
    left:50%;
    transform:translate(-50%,0);
  }
  div.main-container{
    > div.app-logo{
      height: 3em;
      background-color: #ffffff;
      position: fixed;
      top: 0;
      width: 60em;
      right: auto;
      z-index: 10;
      background-color: #3588C9;
      box-shadow: 35px 0 0 #ffffff inset, 0 4px 0 #ffffff inset, 0 -15px 0 #ffffff inset;
      > div{
        float: left;
        padding: 4px;
        height: 3.8em;
        width: 3.8em;
        background-color: #ffffff;
        position: relative;
        box-shadow: 0 0 0 3px #ffffff;
      }
      > span{
        font-size: 1.3em;
        padding: .1em .5em;
        display: inline-block;
        font-weight: bold;
        color: #ffffff;
        &::after{
          content: "Training Wheels";
        }
      }
    }
  }
  .template-selector{
    width: auto;
    position: fixed;
    top:80px;
    margin-left:358px;
  }
}
</style>
