<template>
    <div>
        <PropertyEditorGroup :names="propertyNames" :types="selectePropertyTypes" sig="a" v-on:data-type-selected="onDataTypeSelected" v-on:value-change="onValueChange" multiples="true" />
        <HTMLPreview :markup="markup" :css="classStructure" :selectors="selectionInfo.selectors" :selector="selectionInfo.selectors[selectionInfo.selectorIndex]" :sig="previewSig" />
        <textarea v-model="markup" />
        <div class="drag-order-list">
            <DragOrderList class="drag-order-inner-list" :count="selectionInfo.selectors.length" v-on:order-changed="onSelectorOrderChanged">
                <div v-for="(v, i) in selectionInfo.selectors" :key="'selector-'+i.toString()" :slot="'item-'+i.toString()">
                    <button v-on:click="selectionInfo.selectorIndex = i">
                        {{i}} / {{v}}
                    </button>
                    <button v-on:click="selectionInfo.selectorEditorOpen = true; selectionInfo.selectorEditIndex = i;">
                        EDIT
                        <!-- <font-awesome-icon icon="pencil-square-o" /> -->
                    </button>
                    <button v-on:click="selectionInfo.selectors.splice(i, 1)">
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
                <button v-on:click="selectionInfo.selectors.push(selectionInfo.tempSelector);selectionInfo.selectorEditorOpen = false; selectionInfo.adding = false;"><font-awesome-icon icon="plus" /></button>
            </div>
            <div v-else>
                <input v-model="selectionInfo.selectors[selectionInfo.selectorEditIndex]" type="text" />
            </div>
            <HTMLPreview :markup="markup" :css="classStructure" :selectors="selectionInfo.selectors" :selector="selectionInfo.adding ? selectionInfo.tempSelector : selectionInfo.selectors[selectionInfo.selectorIndex]" highlighting="true" :sig="previewSig" />
        </ModalWindow>
    </div>
</template>
<script>
import Utilities from '../utils/Utilities.js';
import PropertyEditorGroup from '../components/PropertyEditorGroup.vue';

import HTMLPreview from '../components/HTMLPreview.vue';
import DragOrderList from '../components/DragOrderList.vue';
import ModalWindow from '../components/ModalWindow.vue';

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
            classStructure: {},
            previewSig: Utilities.createUniqueID(),
            editorGroupSig: Utilities.getValueTypeByID(),
            markup: '<span>sup</span><table><thead><tr><th>fruit</th><th>vegetables</th></tr></thead><tbody><tr><td>orange</td><td>carrot</td></tr><tr><td>apple</td><td>potato</td></tr></tbody></table>',
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
    methods: {
        onDataTypeSelected: function (e) {
            this.$data.selectePropertyTypes['type'+e.index.toString()] = Utilities.getValueTypeByID(e.pt);
            console.log(this.$data.selectePropertyTypes);
            this.$forceUpdate();
        },
        onValueChange: function (e) {
            this.$data.classStructure[e.name] = e.value;
            this.$data.previewSig = Utilities.createUniqueID();
            console.log(this.$data.classStructure);
        },
        onSelectorOrderChanged: function (e) {
            Utilities.moveArrayItem(this.$data.selectionInfo.selectors, e.moved, e.target);
            this.$data.previewSig = Utilities.createUniqueID();
            this.$forceUpdate();
        }
    },
    mounted: function () {
        this.$data.selectionInfo.selectors.push('');
        this.$data.selectionInfo.selectors.push(' > span');
        this.$data.selectionInfo.selectors.push(' > table th');
        this.$data.selectionInfo.selectors.push(' > table td');
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