<template>
    <div>
        <div v-html="markup" :id="mainElementID"></div>
    </div>
</template>
<script>
export default {
    props: ['markup', 'css', 'selector', 'sig'],
    data () {
        return {
            mainElementID: this.getInitialID(),
            selectorString: '',
            cssObject: this.css,
            selectorStr: this.selectors
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
            let selStr = this.$data.selectorString == '' ? '#' + this.$data.mainElementID : '#' + this.$data.mainElementID + ' ' + this.$data.selectorString;
            document.querySelector(selStr).setAttribute('style', this.getCSSString());
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