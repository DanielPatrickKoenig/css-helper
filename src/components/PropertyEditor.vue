<template>
    <div v-if="propertyManifest" class="property-editor">
        <h3 v-if="!listed || index == 0" :class="expand ? 'property-header' : 'property-header collapsed-header'">
            <label><input app-controll type="checkbox" v-model="expand" style="display:none;" v-on:change="expandChange" />{{pname ? pname : name}}<span class="collapse-toggle"><font-awesome-icon v-if="expand" icon="caret-up" /><font-awesome-icon v-else icon="caret-down" /></span></label>
        </h3>
        <div :style="expand || open ? '' : 'display:none;'">
            <p v-if="!listed || index == 0">{{propertyManifest.description}}</p>
            <h4 v-if="listed">
                <span v-on:click="vexpand = !vexpand;">
                    <span v-if="pname">{{name}}</span>
                    <span v-else>Value {{(index + 1).toString()}}</span>
                    <span class="collapse-toggle"><font-awesome-icon v-if="vexpand" icon="caret-up" /><font-awesome-icon v-else icon="caret-down" /></span>
                </span>
                <slot v-if="vexpand" name="value-ui"></slot>
            </h4>
            <label class="editor-section-header" :style="vexpand ? '' : 'display:none;'">
                <input app-controll type="checkbox" v-model="showTypeMenu" style="display:none;" />
                <font-awesome-icon icon="wrench" /> {{getValueTypeByID(propertyManifest[this.name].property_types[selectionIndex]).label}}
            </label>
            <ul class="property-type-selector" :style="showTypeMenu && vexpand ? '' : 'display:none;'">
                <li v-for="(v, i) in propertyManifest[this.name].property_types" :key="'type-'+i.toString()" :class="selectionIndex == i ? 'selected-type' : ''">
                    <a v-on:click="onPropertyTypeSelected(v, i)">{{getValueTypeByID(v).label}}</a>
                </li>
            </ul>
            <div :style="vexpand ? '' : 'display:none;'">
                <slot></slot>
            </div>
        </div>
        <!-- <select>
            <option v-for="(v, i) in propertyManifest[this.name].property_types" :key="'type-'+i.toString()" :value="v">{{getValueTypeByID(v).label}}</option>
        </select> -->
    </div>
</template>
<script>
import Utilities from '../utils/Utilities';
import {mapState} from 'vuex';
export default {
    props: ['name', 'index', 'listed', 'sindex', 'open', 'pname'],
    data () {
        return {
            selectionIndex: 0,
            showTypeMenu: false,
            expand: false,
            vexpand: true
        }
    },
    computed: {
        ...mapState(['propertyManifest', 'selectorIndex', 'selectorList', 'selectorPropertyMatrix', 'selectorTypeMatrix'])
        // propertyDetails: function () {
        //     return this.$store.propertyManifest[this.name];
        // }
    },
    methods: {
        getValueTypeByID: Utilities.getValueTypeByID,
        onPropertyTypeSelected: function (pt, n) {
            this.$emit('data-type-selected', {pt: pt, index: this.index, name: this.name, sindex: this.sindex});
            this.$data.selectionIndex = n;
            this.$data.showTypeMenu = false;
        },
        expandChange: function () {
            this.$emit('editor-expantion-change', this.$data.expand);
        }
    },
    mounted: function () {
        console.log('manifest - ',this.propertyManifest);
        let firstSelection = 0;
        if(this.selectorTypeMatrix[this.selectorList[this.sindex]]){
            if(this.selectorTypeMatrix[this.selectorList[this.sindex]].type){
                if(this.selectorTypeMatrix[this.selectorList[this.sindex]].type[this.name]){
                    this.selectorTypeMatrix[this.selectorList[this.sindex]].type[this.name]['type_'+this.index.toString()]
                    let propertyType = Utilities.hasPropertyTypeList(this, this.name) ? Utilities.getValueTypeByID(this.selectorTypeMatrix[this.selectorList[this.sindex]].type[this.name]['type_'+this.index.toString()]) : Utilities.getValueTypeByID(this.selectorTypeMatrix[this.selectorList[this.sindex]].type[this.name]);
                    for(let i = 0; i < this.propertyManifest[this.name].property_types.length; i++) {
                        if (propertyType.id == Utilities.getValueTypeByID(this.propertyManifest[this.name].property_types[i]).id){
                            firstSelection = i;
                        }
                    }
                }
            }
        }
        this.$emit('data-type-selected', {pt: this.propertyManifest[this.name].property_types[firstSelection], index: this.index, name: this.name, sindex: this.sindex});
    }
}
</script>