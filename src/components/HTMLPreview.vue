<template>
    <div>
        <span v-for="(v, k, i) in selectorManifest" :key="'style-'+i.toString()" v-html="'<style>#' + mainElementID + selectors[i]+'{'+selectorManifest['#' + mainElementID + selectors[i]]+'}</style>'"></span>
        <span v-html="getHighlightStyle()"></span>
        <!-- <span :id="mainElementID+'-style-container'" v-html="'<style>#'+this.getInitialID()+'{'+getCSSString()+'}</style>'"></span> -->
        <div v-html="markup" :id="mainElementID"></div>
    </div>
</template>
<script>
import Utilities from '../utils/Utilities';
export default {
    props: ['markup', 'css', 'selector', 'selectors', 'highlighting', 'sig'],
    data () {
        return {
            mainElementID: this.getInitialID(),
            selectorString: '',
            cssObject: this.css,
            selectorStr: this.selector,
            selectorManifest: {}
        }
    },
    methods: {
        getInitialID: function () {
            return Utilities.createUniqueID() + '-html-preview-container';
        },
        getCSSString: function () {
            let str = '';
            for(let c in this.cssObject){
                str += c + ':' + this.cssObject[c] + ';'
            }
            return str;
        },
        applyStyle: function () {
            let selStr = this.$data.selectorString == '' ? '#' + this.$data.mainElementID : '#' + this.$data.mainElementID + this.$data.selectorString;
            // document.querySelector(selStr).setAttribute('style', this.getCSSString());
            // this.$forceUpdate();
            this.$data.selectorManifest[selStr] = this.getCSSString();
            console.log(this.$data.selectorManifest);
            // document.querySelector('#'+this.$data.mainElementID+'-style-container').innerHTML = '<style>'+selStr+'{'+this.getCSSString()+'}</style>';
            this.$forceUpdate();
        },
        getHighlightStyle: function () {
            return this.highlighting ? '<style>#' + this.$data.mainElementID + this.selector + '{box-shadow:0 0 0 1px #ff0000 !important;}</style>' : '';
        }
    },
    watch: {
        sig: function () {
            this.$data.selectorStr = this.selector;
            this.$data.selectorString = this.$data.selectorStr;
            this.$data.cssObject = this.css;
            this.applyStyle();
        }
    },
    mounted: function () {
        this.applyStyle();
    }
}
</script>