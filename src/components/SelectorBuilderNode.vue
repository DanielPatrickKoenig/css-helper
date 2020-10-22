<template>
    <div v-if="active">
        <select app-controll v-model="nodeTypes.value" v-on:change="onSelection">
            <option :value="nodeTypes.defaultVal.value">{{nodeTypes.defaultVal.label}}</option>
            <optgroup label="Tags" v-if="afteropperator">
                <option v-for="(tag, i) in nodeTypes.tagList" :key="'tag-'+i.toString()" :value="tag.value">{{tag.label}}</option>
            </optgroup>
            <optgroup label="Opperators" v-if="!afteropperator">
                <option v-for="(opperator, i) in nodeTypes.operatorList" :key="'opperator-'+i.toString()" :value="opperator.value">{{opperator.label}}</option>
            </optgroup>
            <optgroup label="Classes">
                <option v-for="(c, i) in nodeTypes.classList" :key="'class-'+i.toString()" :value="c.value">{{c.label}}</option>
            </optgroup>
            <optgroup label="IDs">
                <option v-for="(id, i) in nodeTypes.idList" :key="'id-'+i.toString()" :value="id.value">{{id.label}}</option>
            </optgroup>
            <optgroup label="Attributes">
                <option v-for="(attribute, i) in nodeTypes.attributeList" :key="'attribute-'+i.toString()" :value="attribute.value">{{attribute.label}}</option>
            </optgroup>
            <optgroup label="Psudo Classes">
                <option v-for="(psu, i) in nodeTypes.psudoList" :key="'psudo-'+i.toString()" :value="psu.value">{{psu.label}}</option>
            </optgroup>
        </select>
        <a v-if="removable" v-on:click="removeNode">
            <font-awesome-icon icon="times" />
        </a>
    </div>
    <div v-else class="value-label">
        {{`${nodeTypes.value.split('()').join('')}`}}<span v-if="nodeTypes.value.split('()').length > 1">(<input type="text" v-model="nodeTypes.arg" v-on:change="onArgChange" v-on:keyup="onArgChange" />)</span>
    </div>
</template>

<script>
export default {
    props: ['tags', 'classes', 'ids', 'attributes', 'afteropperator', 'active', 'removable', 'index'],
    data () {
        return {
            nodeTypes: {
                defaultVal: {label: 'Please make a selection', value: ''},
                tagList: this.tags,
                classList: this.classes,
                idList: this.ids,
                attributeList: this.attributes,
                operatorList: [
                    {label: 'descendent', value: ' '},
                    {label: 'child', value: ' > '},
                    {label: 'next sibling', value: ' + '},
                    {label: 'following sibling', value: ' ~ '},
                    {label: 'and', value: ', '}
                ],
                selector: [],
                psudo: ['active', 'any-link', 'checked', 'blank', 'default', 'defined', 'dir()', 'disabled', 'empty', 'enabled', 'first', 'first-child', 'first-of-type', 'fullscreen', 'focus', 'focus-visible', 'focus-within', 'has()', 'host()', 'host-context()', 'hover', 'indeterminate', 'in-range', 'invalid', 'is() (', 'matches(), ', 'any())', 'lang()', 'last-child', 'last-of-type', 'left', 'link', 'not()', 'nth-child()', 'nth-last-child()', 'nth-last-of-type()', 'nth-of-type()', 'only-child', 'only-of-type', 'optional', 'out-of-range', 'placeholder-shown', 'read-only', 'read-write', 'required', 'right', 'root', 'scope', 'target', 'valid', 'visited', 'where()'],
                psudoList: [],
                value: null,
                arg: ''
            }
        }
    },
    methods: {
        onSelection: function (e) {
            let isOp = false;
            for(let i = 0; i < this.nodeTypes.operatorList.length;i++){
                if(this.nodeTypes.operatorList[i].value == e.currentTarget.value){
                    isOp = true;
                }
            }
            this.$emit('selector-builder-selection', {isOp, value: e.currentTarget.value});
        },
        onArgChange: function () {
            this.$emit('selector-builder-selection', {isOp: false, value: `${this.$data.nodeTypes.value.split('()')[0]}(${this.$data.nodeTypes.arg})`, index: this.index});
        },
        removeNode: function () {
            this.$emit('remove-last-node');
        }
    },
    created: function () {
        for(let i = 0; i < this.$data.nodeTypes.psudo.length; i++){
            this.$data.nodeTypes.psudoList.push({label: `:${this.$data.nodeTypes.psudo[i]}`, value: `:${this.$data.nodeTypes.psudo[i]}`, hasArg: this.$data.nodeTypes.psudo[i].split('()').length > 1});
        }
    },
    mounted: function (){
        this.nodeTypes.value = this.nodeTypes.defaultVal.value;
    }
}
</script>

<style lang="scss" scoped>
select{
    max-width:80px;
    display:inline-block;
    margin-right:3px;
}
div.value-label{
    display: inline-block;
    background-color: #333333;
    padding:3px 6px;
    border-radius: 3px;
    color:#ffffff;
    margin: 0 4px;
}
</style>