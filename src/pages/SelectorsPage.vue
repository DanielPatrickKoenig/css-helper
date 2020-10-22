<template>
    <div>
        <div class="selector-builder-container" v-if="selectorReady">
            <SelectorBuilder :element="selectorBuilderElement" v-on:update-selector="updateSelector" />
            <div>{{selector}}</div>
        </div>
        <div class="selector-template-container">
            <select app-controll v-model="markup" v-on:change="onHTMLEditorUpdate">
                <option v-for="(template, key, i) in templates" :key="'template'+i.toString()" :value="template.html">
                    {{template.label}}
                </option>
            </select>
        </div>
        <div class="markup-container">
            <HTMLPreview :markup="markup" :matrix="classManifest" :selectors="selectorList" :selector="selector" :suppliments="supplimentManifet" :highlighting="true" :sig="sig" />
            <textarea class="html-editor" v-model="markup" v-on:change="onHTMLEditorUpdate" v-on:keyup="onHTMLEditorUpdate" />
        </div>
    </div>
</template>

<script>
import SelectorBuilder from '../components/SelectorBuilder.vue';
import HTMLPreview from '../components/HTMLPreview.vue';
import Utilities from '../utils/Utilities.js';
import {mapState} from 'vuex';
export default {
    components: {
        SelectorBuilder,
        HTMLPreview
    },
    data () {
        return {
            selectorReady: false,
            selectorBuilderElement: null,
            markup: Utilities.Templates.default.html,
            selector: '',
            sig: 'x',
            supplimentManifet: {},
            templates: Utilities.Templates
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
        }
    }, computed: {
        ...mapState(['selectorIndex', 'selectorList', 'selectorPropertyMatrix'])
    },
    mounted: function () {
        this.$data.selectorBuilderElement = document.querySelector('div.preview-display');
        this.$data.selectorReady = true;
    }
}
</script>

<style lang="scss" scoped>
div.markup-container{
    display:flex;
    flex-direction:row;
    justify-content: space-between;
    > * {
        width:48%;
    }
}
div.selector-template-container{
    display: flex;
    justify-content: flex-end;
    padding: 6px 0;
}
</style>