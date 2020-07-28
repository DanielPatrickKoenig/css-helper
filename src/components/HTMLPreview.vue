<template>
    <div>
        <span v-for="(v, k, i) in selectorManifest" :key="'style-'+i.toString()" v-html="'<style>#' + mainElementID + selectors[i]+'{'+selectorManifest['#' + mainElementID + selectors[i]]+'}</style>'"></span>
        <!-- <span :id="mainElementID+'-style-container'" v-html="'<style>#'+this.getInitialID()+'{'+getCSSString()+'}</style>'"></span> -->
        <div v-html="markup" :id="mainElementID"></div>
    </div>
</template>
<script>
export default {
    props: ['markup', 'css', 'selector', 'selectors', 'sig'],
    data () {
        return {
            mainElementID: this.getInitialID(),
            selectorString: '',
            cssObject: this.css,
            selectorStr: this.selectors,
            selectorManifest: {}
        }
    },
    methods: {
        getInitialID: function () {
            return 'html-preview-container';
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
            // document.querySelector('#'+this.$data.mainElementID+'-style-container').innerHTML = '<style>'+selStr+'{'+this.getCSSString()+'}</style>';
            this.$forceUpdate();
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
<style lang="scss" scoped>
#html-preview-container{
    background-color: #00cc00;
}
</style>