<template>
    <div class="proprty-page">
        <select app-controll class="template-selector" v-model="templateID" v-on:change="onTemplateSelected" :style="'visibility:'+(templates[templateID].label ? 'visible' : 'hidden')">
            <option v-for="(t, k, i) in labeledTemlates" :key="'template-'+i.toString()" :value="labeledTemlates[k].id">
                {{labeledTemlates[k].label}}
            </option>
        </select>
        <OptionSelector v-if="!selectionInfo.show" :options="modes" width="60%" class="main-mode-selector">
            <span v-for="(mode, i) in modes" :key="'mode-'+i.toString()" :slot="'option-'+i.toString()" v-on:click="currentMode=i;"><font-awesome-icon :icon="mode" /></span>
        </OptionSelector>
        <div class="selector-dropdown-container">
            <label>Selector:</label>
            <select app-controll v-model="selectionInfo.selectorIndex" v-on:change="selectorDropdownChange(selectionInfo.selectorIndex)">
                <option v-for="(selector, i) in selectorList" :key="'selector-'+i.toString()" :value="i">
                    {{selector}}
                </option>
                
            </select>
        </div>
        
        <div v-if="showEditors" :class="currentMode == 0 ? '' : 'm-hidden-content'">
            <PropertyEditorGroup v-for="(s, i) in selectorList" :key="'selector-'+i.toString()" :names="propertyNames" :types="selectePropertyTypes" sig="a" v-on:data-type-selected="onDataTypeSelected" v-on:value-change="onValueChange" multiples="true" :sindex="i" :style="selectorIndex == i ? '' : 'display:none;'" />
        </div>
        
        <OptionSelector v-if="!selectionInfo.show" :options="previewOptions" width="150px" :class="currentMode == 0 ? 'm-hidden-content preview-options' : 'preview-options'">
            <span v-for="(preview, i) in previewOptions" :key="'preview-'+i.toString()" :slot="'option-'+i.toString()" v-on:click="currentPreviewOption=i;" :class="currentPreviewOption == i ? 'selected-option' : ''"><font-awesome-icon :icon="preview" /></span>
        </OptionSelector>
        
        <div :class="currentMode == 0 ? 'm-hidden-content main-preview' : 'main-preview'">
            <HTMLPreview v-if="showingPreview" :markup="markup" :matrix="classManifest" :selectors="selectorList" :selector="selectorList[selectorIndex]" :suppliments="supplimentManifet" :sig="previewSig" :style="currentPreviewOption != 0 ? 'display:none;' : ''" v-on:style-text-change="onStyleTextUpdate" />
            <textarea class="html-editor" v-model="markup" :style="currentPreviewOption != 1 ? 'display:none;' : ''" />
            <div class="style-content-container" :style="currentPreviewOption != 1 ? 'display:none;' : ''">
                <textarea class="style-content" :value="styleText"></textarea>
                <div v-on:click="copyStyle">
                    <a><font-awesome-icon icon="clipboard" /></a>
                </div>
            </div>
            <ul :class="selectionInfo.show ? 'selectors-open selector-list' : 'selector-list'" :style="currentPreviewOption != 2 ? 'display:none;' : ''">
                <li v-for="(v, i) in selectorList" :key="'selector-'+i.toString()" :slot="'item-'+i.toString()">
                    <button app-controll v-on:click="onSelectorChosen(i)">
                        {{v}}
                    </button>
                    <button app-controll v-on:click="selectionInfo.selectorEditorOpen = true; selectionInfo.selectorEditIndex = i;selectionInfo.tempSelector = selectorList[selectionInfo.selectorEditIndex].toString();">
                        <font-awesome-icon icon="pencil-alt" />
                    </button>
                    <button app-controll v-on:click="removeSelector(v)">
                        
                        <font-awesome-icon icon="times" />
                    </button>
                </li>
                <li>
                    <button app-controll v-on:click="selectionInfo.selectorEditorOpen = true;selectionInfo.adding = true;selectionInfo.tempSelector = '';"><font-awesome-icon icon="plus" /></button>
                </li>
            </ul>
        </div>
        
        <ModalWindow v-if="selectionInfo.selectorEditorOpen" title="Selector Editor" v-on:modal-close-clicked="selectionInfo.selectorEditorOpen = false; selectionInfo.adding = false;" >
            <input app-controll v-model="selectionInfo.tempSelector" type="text" class="selector-editor-input" />
            
            <div class="selector-editor-preview-container">
                <HTMLPreview :markup="markup" :matrix="classManifest" :selectors="selectorList" :selector="selectionInfo.tempSelector" highlighting="true" :suppliments="supplimentManifet" :sig="previewSig" />
            </div>
            <div class="selector-editor-buttons-container">
                <button app-controll v-on:click="selectionInfo.selectorEditorOpen = false; selectionInfo.adding = false;">Cancel</button>
                <button v-if="selectionInfo.adding" app-controll v-on:click="addSelector">Add</button>
                <button v-else app-controll v-on:click="updateSelector(selectionInfo.selectorEditIndex, selectionInfo.tempSelector)">Update</button>
            </div>
            
        </ModalWindow>
    </div>
</template>
<script>
import Utilities from '../utils/Utilities.js';
import PropertyEditorGroup from '../components/PropertyEditorGroup.vue';
import HTMLPreview from '../components/HTMLPreview.vue';
// import DragOrderList from '../components/DragOrderList.vue';
import ModalWindow from '../components/ModalWindow.vue';
import OptionSelector from '../components/OptionSelector.vue';
import {mapState} from 'vuex';
export default {
    components: {
        PropertyEditorGroup,
        HTMLPreview,
        // DragOrderList,
        ModalWindow,
        OptionSelector
    },
    data () {
        return {
            propertyNames: Utilities.getParameterByName('names').split(','),
            templateID: Utilities.getParameterByName('template') ? Utilities.getParameterByName('template') : '',
            propertyTypeNum: Utilities.getParameterByName('tnum'),
            templates: Utilities.Templates,
            selectePropertyTypes: {},
            DataReps: Utilities.DataReps,
            classManifest: {},
            supplimentManifet: {},
            typeManifest: {},
            classStructure: {},
            typeStructure: {},
            previewSig: Utilities.createUniqueID(),
            editorGroupSig: Utilities.getValueTypeByID(),
            markup: '<span>sup</span><table><thead><tr><th>fruit</th><th>vegetables</th></tr></thead><tbody><tr><td>orange</td><td>carrot</td></tr><tr><td>apple</td><td>potato</td></tr></tbody></table>',
            showEditors: true,
            selectionInfo: {
                selectors: [],
                selectorIndex: 0,
                selectorEditorOpen: false,
                selectorEditIndex: -1,
                adding: false,
                tempSelector: '',
                show: false
            },
            modes: ['sliders-h', 'eye'],
            currentMode: 0,
            previewOptions: ['image', 'code', 'sitemap'],
            currentPreviewOption: 0,
            styleText: '',
            showingPreview: true
        }
    },
    computed: {
        ...mapState(['selectorIndex', 'selectorList', 'selectorPropertyMatrix']),
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
    methods: {
        activatePropertyType: function (scope, typeNumber) {
            setTimeout(() => {
                const targetElement = document.querySelector(`.property-type-selector li:nth-child(${typeNumber}) > a`);
                const expandElement = document.querySelector('.collapsed-header input[type="checkbox"]').click();
                if(targetElement){
                    targetElement.click();
                    expandElement.click();
                }
                else{
                    scope.activatePropertyType(scope, typeNumber);
                }
            },100);
            
        },
        copyStyle: function () {
            Utilities.addToClipboard(document.querySelector('.style-content'));
            this.$store.dispatch('setNotificationMessage', 'Added to clipboard.');
        },
        selectorDropdownChange: function (index) {
            setTimeout(() => {document.querySelector('.selector-list > li:nth-child('+(index + 1).toString()+') button:first-child').click();}, 100);
            
        },
        addSelector: function () {
            this.$data.showingPreview = false;
            setTimeout(() => {
                this.$data.showingPreview = true;
            }, 100);
            this.$store.dispatch('addSelector', this.$data.selectionInfo.tempSelector);
            this.$data.selectionInfo.selectorEditorOpen = false;
            this.$data.selectionInfo.adding = false;
            this.updateClassManifest();
            
        },
        updateSelector: function (index, selector) {
            this.$data.showingPreview = false;
            setTimeout(() => {
                this.$data.showingPreview = true;
            }, 100);
            // setSelectors
            let newSelectors = [];
            for(let i = 0; i < this.selectorList.length; i++){
                newSelectors.push(i == index ? selector : this.selectorList[i]);
            }
            this.$store.dispatch('setSelectors', newSelectors);
            this.$data.selectionInfo.selectorEditorOpen = false;
            this.$data.selectionInfo.adding = false;
            this.updateClassManifest();
        },
        removeSelector: function (selector) {
            this.$data.showingPreview = false;
            setTimeout(() => {
                this.$data.showingPreview = true;
            }, 100);
            this.$store.dispatch('removeSelector', selector);
        },
        onDataTypeSelected: function (e) {
            this.$data.selectePropertyTypes['type'+e.index.toString()] = Utilities.getValueTypeByID(e.pt);
            // // console.log(this.$data.selectePropertyTypes);
            // this.updateClassManifest();
            this.$forceUpdate();
        },
        onValueChange: function (e) {
            // console.log(e);
            if(!e.composited){
                // console.log('################# property page value change ######################');
                this.$data.classManifest[this.selectorList[e.sindex]] = JSON.parse(JSON.stringify(this.selectorPropertyMatrix[this.selectorList[e.sindex]].css));
                if(e.suppliment != '' && e.suppliment != undefined && e.suppliment != null){
                    this.$data.supplimentManifet[this.selectorList[e.sindex]] = e.suppliment;
                }
                // this.$state.setSupplimentMatrixValue({name: this.selectorList[e.sindex], value: e.suppliment});
                this.$data.classStructure = this.$data.classManifest[this.selectorList[e.sindex]];

                // this.$data.classStructure[e.name] = e.value;
                this.$data.typeStructure[e.name] = e.type;
                // // console.log(this.$data.classStructure);
                this.$data.previewSig = Utilities.createUniqueID();
                this.$forceUpdate();
                // console.log('suppliment manifest', this.$data.supplimentManifet);
            }
        },
        onSelectorChosen: function (index) {
            // this.selectorIndex = index;
            this.$data.selectionInfo.selectorIndex = index;
            this.$store.dispatch('setSelectorInex', index);
            // this.$root.selectorIndex = this.selectorIndex;
            // this.$data.showEditors = false;
            // setTimeout(function (self) {
            //     self.$data.showEditors = true;
            //     setTimeout(function (_self) {
            //         if(repeat){
            //             _self.onSelectorChosen(index);
            //         }
            //         // console.log('store', _self.$store);
            //     }, 50, self);
            // }, 50, this);

        },
        onSelectorOrderChanged: function (e) {
            Utilities.moveArrayItem(this.selectorList, e.moved, e.target);
            this.$data.previewSig = Utilities.createUniqueID();
            this.updateClassManifest();
            this.$forceUpdate();
            // this.$data.showEditors = false;
            // setTimeout(function (self) {self.$data.showEditors = true;}, 10, this);
            
        },
        // addSelector: function () {
        //     this.selectorList.push(this.selectorList.tempSelector);
        //     this.selectorList.selectorEditorOpen = false;
        //     this.selectorList.adding = false;
        //     // this.updateClassManifest();
        // },
        updateClassManifest: function () {
            let cManifest = {};
            for(let i = 0; i < this.selectorList.length; i++){
                cManifest[this.selectorList[i]] = this.$data.classManifest[this.selectorList[i]] ? this.$data.classManifest[this.selectorList[i]] : {};
            }
            this.$data.classManifest = cManifest;
            for(let c in this.$data.classManifest){
                // this.selectorPropertyMatrix[c] = {css: this.$data.classManifest[c], type: this.$data.typeManifest[c]};
                // this.$store.dispatch('setPropertyMatrixValue', [this.selectorList[this.selectorIndex], 'css', e.name, e.value]);
                for(let n in this.$data.classManifest[c]){
                    this.$store.dispatch('setPropertyMatrixValue', [c, 'css', n, this.$data.classManifest[c][n]]);
                }
            }
            // this.$root.selectorList = this.selectorList;
            
            // 
        },
        onStyleTextUpdate: function (e) {
            this.$data.styleText = e;
        },
        onTemplateSelected: function () {
            // this.$data.styleText = '';
            const nameParamString = Utilities.getParameterByName('names').split(',') ? `names=${Utilities.getParameterByName('names')}` : '';
            const newURL = `${document.location.href.split('?')[0]}?${nameParamString}&template=${this.$data.templateID}`;
            document.location = newURL;
            location.reload();
        }
    },
    beforeCreate: function(){
        this.$store.dispatch('resetSelectorData');
        console.log('before create property page');
    },
    mounted: function () {
        console.log('mounted property page');
        // this.$store.dispatch('addSelector', '');
        // this.$store.dispatch('addSelector', ' > span');
        // this.$store.dispatch('addSelector', ' > table th');
        // this.$store.dispatch('addSelector', ' > table td');
        // let selectedTemplate = {};
        for(let t in Utilities.Templates){
            if(Utilities.Templates[t].id == this.$data.templateID){
                // selectedTemplate = Utilities.Templates[t];
                this.$store.dispatch('setSelectors', Utilities.Templates[t].selectors);
                this.$data.markup = Utilities.Templates[t].html;
            }
        }
        // const selectors = selectedTemplate.selectors;
        // this.$store.dispatch('setSelectors', selectors);
        this.updateClassManifest();

        if(this.$data.propertyTypeNum){
            console.log('has tnum !!!');
            this.activatePropertyType(this, this.$data.propertyTypeNum);
        }
    }
}
</script>
<style lang="scss" scoped>

.drag-order-list{
    position: fixed;
    top:50px;
    right:5px;
    width:20em;
    > .drag-order-inner-list{
        width:100%;
    }
}
.selector-editor-input{
    display: block;
    padding: 5px;
    border: none;
    background-color: #bedaf1;
    width: 98.6%;
    margin-top: 21px;
}
.selector-editor-preview-container{
    height:300px;
    overflow-x:hidden;
    overflow-y:auto;
    padding:1px;
    background-color:#ffffff;
    margin-top:8px;
}
.selector-editor-buttons-container{
    display:flex;
    flex-direction: row;
    > button{
        flex-grow: 1;
        &:first-child{
            margin-right:4px;
        }
        &:last-child{
            margin-left:4px;
        }
    }
}
.style-content-container{
    position:relative;
    background-color:#eeeeee;
    > textarea{
        background-color: transparent;
    }
    > div{
        position:absolute;
        top:0;
        left:0;
        right:0;
        bottom:0;
        > a{
            position:absolute;
            top:3px;
            right:3px;
        }
    }
}
</style>
<style lang="scss">
@import '../scss/variables.scss';
input[type="number"][app-controll], input[type="text"][app-controll]{
    display: block;
    /* width: auto; */
    padding: 5px;
    border: none;
    background-color: $interaction-light;
}
select[app-controll]{
    display: block;
    /* width: auto; */
    padding: 5px;
    border: none;
    background-color: $interaction-light;
}
button[app-controll]{
    display: block;
    /* width: auto; */
    padding: 8px;
    border: none;
    background-color: #cccccc;
    color: $interaction-dark;
    background-image:linear-gradient(0deg, rgba(255, 255, 255, 0.75625) 0%, rgba(255, 255, 255, 0.4375) 43.9285714286%, rgba(255, 255, 255, 0.575) 47.5%, rgba(255, 255, 255, 0.7125) 85.3571428571%);
    text-shadow: 0 -1px 0px #ffffff;
    box-shadow: 0 0 0 1px $interaction-dark;
    width:100%;
    margin-top: 8px;
}
</style>