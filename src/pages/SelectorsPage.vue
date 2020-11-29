<template>
    <div>
        <div v-if="excercise >= 0 && excercises.length > 0">
            <h2>
                Exercise {{excercise+1}}
            </h2>
            <label>
                Create a selector that will highlight the same elements highlighted in the box below.
            </label>
            <div class="markup-container excercise-box">
                <HTMLPreview :markup="markup" :matrix="classManifest" :selectors="selectorList" :selector="excercises[excercise]" :suppliments="supplimentManifet" :highlighting="true" :sig="excerciseSig" />
            </div>
            <ul class="challenge-nav">
                <li>
                    <button app-controll :class="{'active-button': excercise > 0}" v-on:click="excercise -= excercise > 0 ? 1 : 0;">PREVIOUS</button>
                </li>
                <li>
                    <button app-controll :class="{'active-button': excercise < excercises.length - 1 && lastSolved >= excercise && excerciseResult == ''}" v-on:click="excercise += excercise < excercises.length - 1 && lastSolved >= excercise ? 1 : 0;">NEXT</button>
                </li>
                <li>
                    <button app-controll :class="{'active-button': selector != ''}" v-on:click="checkAnswers">
                        SUBMIT
                    </button>
                </li>
            </ul>
            <ModalWindow v-if="excerciseResult != ''" :title="'Exercise ' + (excercise+1).toString() + ' Results'" v-on:modal-close-clicked="excerciseResult = '';" >
                <div class="excercise-results">{{excerciseResult}}</div>
            </ModalWindow>
        </div>
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
                <option v-for="(template, key, i) in labeledTemlates" :key="'template'+i.toString()" :value="template.html">
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
import ModalWindow from '../components/ModalWindow.vue';
import Utilities from '../utils/Utilities.js';
import {TweenLite} from 'gsap';
import {mapState} from 'vuex';
export default {
    components: {
        SelectorBuilder,
        HTMLPreview,
        OptionSelector,
        ModalWindow
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
            currentMode: 0,
            excercise: Utilities.getParameterByName('challenge') ? 0 : -1,
            lastSolved: -1,
            excercises: [],
            excerciseResult: ''
            
        }
    }, methods: {
        updateSelector: function (e) {
            this.$data.selector = e;
            // console.log(e);
            // if(this.$data.excercise >= 0){
            //     this.checkAnswers();
            // }
        },
        onHTMLEditorUpdate: function () {
            this.$data.selectorReady = false;
            this.$data.selector = '';
            setTimeout(() => {
                this.$data.selectorReady = true;
            }, 100);
        },
        checkAnswers: function () {
            if(this.$data.selector != ''){
                const excerciseElement = document.querySelector('.markup-container.excercise-box .preview-display');
                const excerciseSelections = excerciseElement.querySelectorAll(this.$data.excercises[this.$data.excercise]);
                const excerciseDescendants = excerciseElement.querySelectorAll('*');

                const builderElement = document.querySelector('.markup-container:not(.excercise-box) .preview-display');
                const builderSelections = builderElement.querySelectorAll(this.$data.selector);
                const builderDescendants = builderElement.querySelectorAll('*');
                // console.log(excerciseDescendants);
                let excerciseMatches = [];

                for(let i = 0; i < excerciseSelections.length; i++){
                    for(let j = 0; j < excerciseDescendants.length; j++){
                        if(excerciseSelections[i] == excerciseDescendants[j]){
                            excerciseMatches.push(j);
                        }
                    }
                }

                let builderMatches = [];

                for(let i = 0; i < builderSelections.length; i++){
                    for(let j = 0; j < builderDescendants.length; j++){
                        if(builderSelections[i] == builderDescendants[j]){
                            builderMatches.push(j);
                        }
                    }
                }

                // console.log(excerciseMatches);
                // console.log(builderMatches);

                if(builderMatches.join('-') == excerciseMatches.join('-')){
                    if(this.$data.lastSolved < this.$data.excercise){
                        this.$data.lastSolved = this.$data.excercise;
                    }
                    this.$data.excerciseResult = this.$data.excercise == this.$data.excercises.length + -1 ? 'Excelent! You completed all the challenges.' : 'Correct! Great Job';
                }
                else{
                    this.$data.excerciseResult = 'Sorry, that is not correct.'
                }
            }
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
                // console.log(err);
                total = '-';
            }
            return total;
        },
        runElementCounter: function (scope) {
            let n = {x: 0};
            TweenLite.to(n, 1, {x: 1, onComplete: scope.runElementCounter, onCompleteParams: [scope], onUpdate: () => {
                // console.log('a');
                scope.$data.elementCount = scope.getElementCount();
            }});
        }
    }, computed: {
        ...mapState(['selectorIndex', 'selectorList', 'selectorPropertyMatrix']),
        highlighting: function () {
            return this.$data.selector != '';
        },
        labeledTemlates: function () {
            let lt = {};
            for(let t in Utilities.Templates){
                if(Utilities.Templates[t].label){
                    lt[t] = Utilities.Templates[t];
                }
            }
            return lt;
        }
    },
    mounted: function () {
        this.$data.selectorBuilderElement = document.querySelector('div.preview-display');
        this.$data.selectorReady = true;
        for(let template in Utilities.Templates){
            if(this.$data.templateID == Utilities.Templates[template].id){
                this.$data.markup = Utilities.Templates[template].html;
                this.$data.excercises = Utilities.Templates[template].excercises.selector;
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
@keyframes bounce{
    0%{
        transform: scale(1,1);
    }
    25%{
        transform: scale(1,1.2);
    }
    50%{
        transform: scale(1,.85);
    }
    75%{
        transform: scale(1,1.06);
    }
    100%{
        transform: scale(1,1);
    }
}
div.excercise-box{
    padding: 2px;
    box-shadow:0 0 0 1px #333333;
    margin: 8px 0;
    max-height:400px;
    overflow-y:auto;
}
.excercise-results{
    color:#ffffff;
    font-size:40px;
}
ul.challenge-nav{
    padding:0;
    margin:0;
    display: block;
    height: 88px;
    > li{
        display:block;
        float:left;
        padding:0;
        margin:0;
        width:50%;
        &:last-child{
            width:100%;
        }
        button{
            opacity: .5;
            &.active-button{
                opacity: 1;
            }
        }
        &:not(:first-child){
            button.active-button{
                animation-name:bounce;
                animation-duration: .6s;
                animation-iteration-count: 1;
                animation-timing-function: ease-out;
            }
        }
        
    }
    
    
}
div.markup-container{
    display:flex;
    flex-direction:row;
    justify-content: space-between;
    
    &.show-markup-1{
        > :first-child{
            box-shadow: 0 1px 0 rgba(0,0,0,.3) inset;
        }
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
        background-color:#eeeeee;
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