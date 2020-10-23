<template>
    <div>
        <div class="selector-builder-container" v-if="selectorReady">
            <SelectorBuilder :element="selectorBuilderElement" v-on:update-selector="updateSelector" />
            <div class="selector-copy-container">
                <input app-controll type="text" v-model="selector" />
                <div v-on:click="copySelector">
                    <a><font-awesome-icon icon="clipboard" /></a>
                </div>
            </div>
        </div>
        <div class="selector-template-container">
            <label>Total Elements: {{elementCount}}</label>
            <select app-controll v-model="markup" v-on:change="onHTMLEditorUpdate">
                <option v-for="(template, key, i) in templates" :key="'template'+i.toString()" :value="template.html">
                    {{template.label}}
                </option>
            </select>
        </div>
        <OptionSelector :options="modes" width="60%" class="main-mode-selector">
            <span v-for="(mode, i) in modes" :key="'mode-'+i.toString()" :slot="'option-'+i.toString()" v-on:click="currentMode=i;"><font-awesome-icon :icon="mode" /></span>
        </OptionSelector>
        <div :class="currentMode == 0 ? 'markup-container show-markup-1' : 'markup-container show-markup-2'">
            <HTMLPreview :markup="markup" :matrix="classManifest" :selectors="selectorList" :selector="selector" :suppliments="supplimentManifet" :highlighting="highlighting" :sig="sig" />
            <textarea class="html-editor" v-model="markup" v-on:change="onHTMLEditorUpdate" v-on:keyup="onHTMLEditorUpdate" />
        </div>
    </div>
</template>

<script>
import SelectorBuilder from '../components/SelectorBuilder.vue';
import HTMLPreview from '../components/HTMLPreview.vue';
import OptionSelector from '../components/OptionSelector.vue';
import Utilities from '../utils/Utilities.js';
import {TweenLite} from 'gsap';
import {mapState} from 'vuex';
export default {
    components: {
        SelectorBuilder,
        HTMLPreview,
        OptionSelector
    },
    data () {
        return {
            templateID: Utilities.getParameterByName('template') ? Utilities.getParameterByName('template') : '',
            selectorReady: false,
            selectorBuilderElement: null,
            markup: Utilities.Templates.default.html,
            selector: '',
            sig: 'x',
            supplimentManifet: {},
            templates: Utilities.Templates,
            elementCount: '',
            modes: ['image', 'code'],
            currentMode: 0
            
        }
    }, methods: {
        updateSelector: function (e) {
            this.$data.selector = e;
        },
        onHTMLEditorUpdate: function () {
            this.$data.selectorReady = false;
            this.$data.selector = '';
            setTimeout(() => {
                this.$data.selectorReady = true;
            }, 100);
        },
        copySelector: function () {
            Utilities.addToClipboard(document.querySelector('.selector-copy-container > input'));
            this.$store.dispatch('setNotificationMessage', 'Added to clipboard.');
        },
        getElementCount: function () {
            let total = '-';
            try{
                total = this.$data.selectorBuilderElement.querySelectorAll(this.$data.selector).length;
            }
            catch(err){
                console.log(err);
                total = '-';
            }
            return total;
        },
        runElementCounter: function (scope) {
            let n = {x: 0};
            TweenLite.to(n, 1, {x: 1, onComplete: scope.runElementCounter, onCompleteParams: [scope], onUpdate: () => {
                console.log('a');
                scope.$data.elementCount = scope.getElementCount();
            }});
        }
    }, computed: {
        ...mapState(['selectorIndex', 'selectorList', 'selectorPropertyMatrix']),
        highlighting: function () {
            return this.$data.selector != '';
        }
    },
    mounted: function () {
        this.$data.selectorBuilderElement = document.querySelector('div.preview-display');
        this.$data.selectorReady = true;
        for(let template in Utilities.Templates){
            if(this.$data.templateID == Utilities.Templates[template].id){
                this.$data.markup = Utilities.Templates[template].html;
            }
        }
        this.onHTMLEditorUpdate();
        this.runElementCounter(this);
    }
}
</script>

<style lang="scss" scoped>
@import '../scss/variables.scss';
@import '../scss/mixins.scss';
div.markup-container{
    display:flex;
    flex-direction:row;
    justify-content: space-between;
    &.show-markup-1{
        > :last-child{
            display:none;
            width:100%;
        }
    }
    &.show-markup-2{
        > :first-child{
            display:none;
            width:100%;
        }
    }
    @include min(850px){
        &.show-markup-1{
            > :first-child{
                display:flex;
                width:48%;

            }
            > :last-child{
                display:flex;
                width:48%;

            }
        }
        &.show-markup-2{
            > :first-child{
                display:flex;
                width:48%;

            }
            > :last-child{
                display:flex;
                width:48%;

            }
        }
    }
}
div.selector-template-container{
    display: flex;
    justify-content: space-between;
    padding: 6px 0;
}
div.selector-copy-container{
    width:100%;
    position:relative;
    height:25px;
    margin-top:10px;
    margin-bottom:5px;
    > input{
        position:absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        width:99%;
    }
    > div{
        position:absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        width:100%;
        
        > a{
            position:absolute;
            top:3px;
            right:3px;
        }
        
    }
}
</style>