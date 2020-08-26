<template>
    <div>
        <div v-if="showEditors">
            <PropertyEditorGroup v-for="(s, i) in selectorList" :key="'selector-'+i.toString()" :names="propertyNames" :types="selectePropertyTypes" sig="a" v-on:data-type-selected="onDataTypeSelected" v-on:value-change="onValueChange" multiples="true" :sindex="i" />
        </div>
        
        <HTMLPreview :markup="markup" :matrix="classManifest" :selectors="selectorList" :selector="selectorList[selectorIndex]" :suppliments="supplimentManifet" :sig="previewSig" />
        <textarea v-model="markup" />
        <div class="drag-order-list">
            <DragOrderList class="drag-order-inner-list" :count="selectorList.length" v-on:order-changed="onSelectorOrderChanged">
                <div v-for="(v, i) in selectorList" :key="'selector-'+i.toString()" :slot="'item-'+i.toString()">
                    <button v-on:click="onSelectorChosen(i, true)">
                        {{i}} / {{v}}
                    </button>
                    <button v-on:click="selectionInfo.selectorEditorOpen = true; selectionInfo.selectorEditIndex = i;">
                        EDIT
                        <!-- <font-awesome-icon icon="pencil-square-o" /> -->
                    </button>
                    <button v-on:click="removeSelector(v)">
                        Delete
                        <!-- <font-awesome-icon icon="pencil-square-o" /> -->
                    </button>
                </div>
            </DragOrderList>
            <button v-on:click="selectionInfo.selectorEditorOpen = true;selectionInfo.adding = true;selectionInfo.tempSelector = '';"><font-awesome-icon icon="plus" /></button>
        </div>
        
        <ModalWindow v-if="selectionInfo.selectorEditorOpen" title="Selector Editor" v-on:modal-close-clicked="selectionInfo.selectorEditorOpen = false; selectionInfo.adding = false;" >
            <div v-if="selectionInfo.adding">
                <input v-model="selectionInfo.tempSelector" type="text" />
                <button v-on:click="addSelector"><font-awesome-icon icon="plus" /></button>
            </div>
            <div v-else>
                <input v-model="selectorList[selectionInfo.selectorEditIndex]" type="text" />
            </div>
            <HTMLPreview :markup="markup" :matrix="classManifest" :selectors="selectorList" :selector="selectionInfo.adding ? selectionInfo.tempSelector : selectorList[selectionInfo.selectorEditIndex]" highlighting="true" :suppliments="supplimentManifet" :sig="previewSig" />
        </ModalWindow>
    </div>
</template>
<script>
import Utilities from '../utils/Utilities.js';
import PropertyEditorGroup from '../components/PropertyEditorGroup.vue';
import HTMLPreview from '../components/HTMLPreview.vue';
import DragOrderList from '../components/DragOrderList.vue';
import ModalWindow from '../components/ModalWindow.vue';
import {mapState} from 'vuex';
export default {
    components: {
        PropertyEditorGroup,
        HTMLPreview,
        DragOrderList,
        ModalWindow
    },
    data () {
        return {
            propertyNames: Utilities.getParameterByName('names').split(','),
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
                tempSelector: ''
            }
        }
    },
    computed: {
        ...mapState(['selectorIndex', 'selectorList', 'selectorPropertyMatrix'])
    },
    methods: {
        addSelector: function () {
            this.$store.dispatch('addSelector', this.$data.selectionInfo.tempSelector);
            this.$data.selectionInfo.selectorEditorOpen = false;
            this.$data.selectionInfo.adding = false;
        },
        removeSelector: function (selector) {
            this.$store.dispatch('removeSelector', selector);
        },
        onDataTypeSelected: function (e) {
            this.$data.selectePropertyTypes['type'+e.index.toString()] = Utilities.getValueTypeByID(e.pt);
            // console.log(this.$data.selectePropertyTypes);
            // this.updateClassManifest();
            this.$forceUpdate();
        },
        onValueChange: function (e) {
            console.log(e);
            if(!e.composited){
                console.log('################# property page value change ######################');
                this.$data.classManifest[this.selectorList[e.sindex]] = JSON.parse(JSON.stringify(this.selectorPropertyMatrix[this.selectorList[e.sindex]].css));
                this.$data.supplimentManifet[this.selectorList[e.sindex]] = e.suppliment;
                this.$data.classStructure = this.$data.classManifest[this.selectorList[e.sindex]];

                // this.$data.classStructure[e.name] = e.value;
                this.$data.typeStructure[e.name] = e.type;
                // console.log(this.$data.classStructure);
                this.$data.previewSig = Utilities.createUniqueID();
                this.$forceUpdate();
                console.log('suppliment manifest', this.$data.supplimentManifet);
            }
        },
        onSelectorChosen: function (index, repeat) {
            // this.selectorIndex = index;
            this.$store.dispatch('setSelectorInex', index);
            // this.$root.selectorIndex = this.selectorIndex;
            this.$data.showEditors = false;
            setTimeout(function (self) {
                self.$data.showEditors = true;
                setTimeout(function (_self) {
                    if(repeat){
                        _self.onSelectorChosen(index);
                    }
                    console.log('store', _self.$store);
                }, 50, self);
            }, 50, this);

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
        }
    },
    mounted: function () {
        this.$store.dispatch('addSelector', '');
        this.$store.dispatch('addSelector', ' > span');
        this.$store.dispatch('addSelector', ' > table th');
        this.$store.dispatch('addSelector', ' > table td');
        this.updateClassManifest();
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
</style>