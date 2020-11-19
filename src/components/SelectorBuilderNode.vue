<template>
    <div v-if="active">
        <a v-if="removable" v-on:click="removeNode">
            <font-awesome-icon icon="times" />
        </a>
        <select app-controll v-model="value" v-on:change="onSelection">
            <option :value="defaultVal.value">{{defaultVal.label}}</option>
            <optgroup label="Tags" v-if="afteropperator">
                <option v-for="(tag, i) in tagList" :key="'tag-'+i.toString()" :value="tag.value">{{tag.label}}</option>
            </optgroup>
            <optgroup label="Opperators" v-if="!afteropperator">
                <option v-for="(opperator, i) in operatorList" :key="'opperator-'+i.toString()" :value="opperator.value">{{opperator.label}}</option>
            </optgroup>
            <optgroup v-if="classList.length > 0" label="Classes">
                <option v-for="(c, i) in classList" :key="'class-'+i.toString()" :value="c.value">{{c.label}}</option>
            </optgroup>
            <optgroup v-if="idList.length > 0" label="IDs">
                <option v-for="(id, i) in idList" :key="'id-'+i.toString()" :value="id.value">{{id.label}}</option>
            </optgroup>
            <optgroup v-if="attributeList.length > 0" label="Attributes">
                <option v-for="(attribute, i) in attributeList" :key="'attribute-'+i.toString()" :value="attribute.value">{{attribute.label}}</option>
            </optgroup>
            <optgroup v-if="pclasses" label="Psudo Classes">
                <option v-for="(psu, i) in psudoList" :key="'psudo-'+i.toString()" :value="psu.value">{{psu.label}}</option>
            </optgroup>
        </select>
    </div>
    <div v-else class="value-label">
        {{`${value.split('()').join('')}`}}<span v-if="value.split('()').length > 1">(<input type="text" v-model="arg" v-on:change="onArgChange" v-on:keyup="onArgChange" />)</span>
    </div>
</template>

<script>
export default {
    props: ['tags', 'classes', 'ids', 'attributes', 'afteropperator', 'active', 'removable', 'index', 'pclasses'],
    data () {
        return {
            defaultVal: {label: 'Please make a selection', value: ''},
            tagList: this.tags,
            classList: this.classes,
            idList: this.ids,
            attributeList: this.attributes,
            operatorList: [
                {label: 'descendent ( )', value: ' '},
                {label: 'child (>)', value: ' > '},
                {label: 'next sibling (+)', value: ' + '},
                {label: 'following sibling (~)', value: ' ~ '},
                {label: 'and (,)', value: ', '}
            ],
            selector: [],
            psudo: ['active', 'any-link', 'checked', 'blank', 'default', 'defined', 'dir()', 'disabled', 'empty', 'enabled', 'first', 'first-child', 'first-of-type', 'fullscreen', 'focus', 'focus-visible', 'focus-within', 'has()', 'host()', 'host-context()', 'hover', 'indeterminate', 'in-range', 'invalid', 'is()', 'matches()', 'any()', 'lang()', 'last-child', 'last-of-type', 'left', 'link', 'not()', 'nth-child()', 'nth-last-child()', 'nth-last-of-type()', 'nth-of-type()', 'only-child', 'only-of-type', 'optional', 'out-of-range', 'placeholder-shown', 'read-only', 'read-write', 'required', 'right', 'root', 'scope', 'target', 'valid', 'visited', 'where()'],
            psudoList: [],
            value: null,
            arg: ''
        }
    },
    watch: {
        active: function () {
            if(this.active){
                this.$data.value = '';
            }
        }
    },
    methods: {
        onSelection: function (e) {
            let isOp = false;
            for(let i = 0; i < this.operatorList.length;i++){
                if(this.operatorList[i].value == e.currentTarget.value){
                    isOp = true;
                }
            }
            if(e.currentTarget.value != ''){
                this.$emit('selector-builder-selection', {isOp, value: e.currentTarget.value});
            }
        },
        onArgChange: function () {
            this.$emit('selector-builder-selection', {isOp: false, value: `${this.$data.value.split('()')[0]}(${this.$data.arg})`, index: this.index});
        },
        removeNode: function () {
            this.$emit('remove-last-node');
        }
    },
    created: function () {
        for(let i = 0; i < this.$data.psudo.length; i++){
            this.$data.psudoList.push({label: `:${this.$data.psudo[i]}`, value: `:${this.$data.psudo[i]}`, hasArg: this.$data.psudo[i].split('()').length > 1});
        }
    },
    mounted: function (){
        this.value = this.defaultVal.value;
    }
}
</script>

<style lang="scss" scoped>
select{
    max-width:185px;
    display:inline-block;
    margin: 1px 4px;
}
div.value-label{
    display: inline-block;
    background-color: #333333;
    padding:3px 6px;
    border-radius: 3px;
    color:#ffffff;
    margin: 1px 4px;
}
</style>