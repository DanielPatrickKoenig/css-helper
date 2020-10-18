<template>
    <div v-if="shouldDisplay">
        <!-- <span v-for="(v, k, i) in selectorManifest" :key="'style-'+i.toString()" v-html="'<style>#' + mainElementID + selectorConnecion + selectors[i]+'{'+selectorManifest['#' + mainElementID + selectorConnecion + selectors[i]]+'}</style>'"></span> -->
        <span v-for="(v, k, i) in selectorManifest" :key="'style-'+i.toString()" v-html="'<style>'+(supplimentData[selectors[i]] != undefined ? supplimentData[selectors[i]] : '')+'#' + mainElementID + selectorConnecion + selectors[i]+'{'+getStyleString(i)+'}</style>'"></span>
        <span v-html="getHighlightStyle()"></span>
        <!-- <span :id="mainElementID+'-style-container'" v-html="'<style>#'+this.getInitialID()+'{'+getCSSString()+'}</style>'"></span> -->
        <div v-html="markup" :id="mainElementID" class="preview-display"></div>
    </div>
</template>
<script>
import Utilities from '../utils/Utilities';
export default {
    props: ['markup', 'matrix', 'selector', 'selectors', 'highlighting', 'suppliments', 'sig'],
    data () {
        return {
            mainElementID: this.getInitialID(),
            selectorString: '',
            selectorStr: this.selector,
            selectorManifest: {},
            selectorConnecion: ' ',
            supplimentData: this.suppliments,
            shouldDisplay: true
        }
    },
    methods: {
        getInitialID: function () {
            return Utilities.createUniqueID() + '-html-preview-container';
        },
        getCSSItemString: function (item) {
            let str = '';
            for(let c in item){
                str += c + ':' + item[c] + ';'
            }
            return str;
        },
        applyStyles: function () {
            for(let m in this.matrix){
                let selStr = m == '' ? '#' + this.$data.mainElementID + this.$data.selectorConnecion : '#' + this.$data.mainElementID + this.$data.selectorConnecion + m;
                // document.querySelector(selStr).setAttribute('style', this.getCSSString());
                // this.$forceUpdate();
                this.$data.selectorManifest[selStr] = this.getCSSItemString(this.matrix[m]);
                // console.log(this.$data.selectorManifest);
            }
            
            // document.querySelector('#'+this.$data.mainElementID+'-style-container').innerHTML = '<style>'+selStr+'{'+this.getCSSString()+'}</style>';
            this.$forceUpdate();
        },
        getHighlightStyle: function () {
            return this.highlighting ? '<style>#' + this.$data.mainElementID + this.$data.selectorConnecion + this.selector + '{box-shadow:0 0 0 1px #ff0000 !important;}</style>' : '';
        },
        getStyleString: function (index) {
            console.log('########## index ############', index);
            let styleSTR = this.$data.selectorManifest['#' + this.$data.mainElementID + this.$data.selectorConnecion + this.selectors[index]];
            for(let v in Utilities.ValueSeparatorMatrix){
                styleSTR = styleSTR.split(Utilities.ValueSeparatorMatrix[v].proxy).join(Utilities.ValueSeparatorMatrix[v].actual);
            }
            console.log(styleSTR);
            return styleSTR;
        },
        setFullStyleData: function () {
            let styleString = '';
            if(document.querySelector(`#${this.$data.mainElementID}`)){
                const styleTags = document.querySelector(`#${this.$data.mainElementID}`).parentNode.querySelectorAll('style');
                for(let i = 0; i < styleTags.length;i++){
                    styleString += styleTags[i].innerHTML.split('-html-preview-container ')[1];
                }
            }
            console.log(styleString);
            return styleString.split(';').join(';\r').split('{').join('{\r').split('}').join('}\r');
        }
    },
    watch: {
        sig: function () {
            this.$data.selectorStr = this.selector;
            this.$data.selectorString = this.$data.selectorStr;
            this.$data.shouldDisplay = false;
            setTimeout(() => {
                this.$data.shouldDisplay = true;
            }, 10);
            
            this.$data.supplimentData = this.suppliments;
            this.applyStyles();
            setTimeout(() => {
                this.$emit('style-text-change', this.setFullStyleData());
            }, 100);
            
            // this.applyStyle();
        }
    },
    mounted: function () {
        this.applyStyles();
    }
}
</script>