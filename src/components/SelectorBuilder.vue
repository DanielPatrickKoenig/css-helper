<template>
    <div v-if="tagsList.length > 0" class="selector-dropdown-conaitner">
        <div>
            <label>
                <input app-controll type="checkbox" v-model="showPsudo" /> Psudo Classes
            </label>
            <span style="padding: 0 6px;"> | </span>
            <label>
                <input app-controll type="checkbox" v-model="useBuilder" /> Use Builder
            </label>
        </div>
        <div :style="{display: useBuilder ? 'flex' : 'none'}">
            <SelectorBuilderNode v-on:selector-builder-selection="onSelection" :tags="tagsList" :ids="idsList" :classes="classesList" :attributes="attributesList" :afteropperator="true" :active="nodes.length < 1" :index="0" :pclasses="showPsudo" />
            <SelectorBuilderNode v-for="(node, i) in nodes" :key="'node-'+i.toString()" v-on:selector-builder-selection="onSelection" v-on:remove-last-node="removeLastNode" :tags="tagsList" :ids="idsList" :classes="classesList" :attributes="attributesList" :afteropperator="node.isOp" :removable="true" :active="nodes.length <= i + 1" :index="i + 1" :pclasses="showPsudo"/>
        </div>
        <div>
            <input app-controll type="text" v-model="selectorString" :style="{width: '100%', display: useBuilder ? 'none' : 'block'}" v-on:change="onSelectorChange" v-on:keyup="onSelectorChange" />
        </div>
    </div>
</template>

<script>
import SelectorBuilderNode from './SelectorBuilderNode.vue';
export default {
    props: ['element', 'sig'],
    components:{
        SelectorBuilderNode
    },
    data () {
        return {
            nodes: [],
            ids: [],
            classes: [],
            tags: ['*'],
            attributes: [],
            idsList: [],
            classesList: [],
            tagsList: [],
            attributesList: [],
            showPsudo: false,
            useBuilder: true,
            selectorString: ''
        }
    },
    methods: {
        getSelectorData: function (scope, e) {
            if(e != scope.element){
                if((`||${this.tags.join('||')}||`).split(`||${e.nodeName.toLowerCase()}||`).length < 2){
                    this.tags.push(e.nodeName.toLowerCase());
                }
                if(e.getAttribute('id')){
                    if((`||${this.ids.join('||')}||`).split(`||${`#${e.getAttribute('id')}`}||`).length < 2){
                        this.ids.push(`#${e.getAttribute('id')}`);
                    }
                }
                if(e.getAttribute('class')){
                    for(let j = 0; j < e.getAttribute('class').split(' ').length; j++){
                        if((`||${this.classes.join('||')}||`).split(`||${`.${e.getAttribute('class').split(' ')[j]}`}||`).length < 2){
                            this.classes.push(`.${e.getAttribute('class').split(' ')[j]}`);
                        }
                    }
                    
                }
                if(e.attributes){
                    for(let j = 0; j < e.attributes.length; j++){
                        if((`||${this.attributes.join('||')}||`).split(`||${`[${e.attributes[j].name}]`}||`).length < 2){
                            this.attributes.push(`[${e.attributes[j].name}]`);
                        }
                    }
                    for(let j = 0; j < e.attributes.length; j++){
                        if((`||${this.attributes.join('||')}||`).split(`||[${e.attributes[j].name}="${e.getAttribute(e.attributes[j].name)}"]||`).length < 2){
                            this.attributes.push(`[${e.attributes[j].name}="${e.getAttribute(e.attributes[j].name)}"]`);
                        }
                    }
                    
                }
            }
            for(let i = 0; i < e.children.length; i++){
                this.getSelectorData(scope, e.children[i]);
            }
        },
        convertToValuePairs: function (list) {
            let output = [];
            for(let i = 0; i < list.length; i++){
                output.push({label: list[i], value: list[i]});
            }
            return output;
        },
        onSelectorChange: function () {
            this.$emit('update-selector', this.$data.selectorString);
        },
        onSelection: function (e) {
            if(e.index != undefined){
                this.$data.nodes[e.index].value = e.value;
            }
            else{
                this.$data.nodes.push(e);
            }
            
            this.$data.selectorString = '';
            for(let i = 0; i < this.$data.nodes.length; i++) {
                this.$data.selectorString += this.$data.nodes[i].value;
            }
            this.$emit('update-selector', this.$data.selectorString);
        },
        removeLastNode: function () {
            this.$data.nodes.pop();
            this.$data.selectorString = '';
            for(let i = 0; i < this.$data.nodes.length; i++) {
                this.$data.selectorString += this.$data.nodes[i].value;
            }
            this.$emit('update-selector', this.$data.selectorString);
        }
    },
    mounted: function () {
        this.getSelectorData(this, this.element);
        this.tagsList = this.convertToValuePairs(this.tags);
        this.classesList = this. convertToValuePairs(this.classes);
        this.idsList = this. convertToValuePairs(this.ids);
        this.attributesList = this. convertToValuePairs(this.attributes);
        console.log(this.tagsList);
        console.log(this.classesList);
        console.log(this.idsList);
        console.log(this.attributesList);
    }
}
</script>

<style lang="scss" scoped>
div.selector-dropdown-conaitner{
    width:100%;
    > div:first-child{
        margin: 4px 0;
    }
    > div{
        width:100%;
        display:flex;
        flex-direction: row;
        flex-flow: wrap;
    }
}
</style>