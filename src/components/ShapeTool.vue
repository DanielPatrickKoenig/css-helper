<template>
    <div>
        <select v-model="currentType" class="clip-path-type-selector">
            <option v-for="(v, k, i) in types" :key="'type-'+i.toString()" :value="types[k]">{{k}}</option>
        </select>
        <EllipseTool :width="size.width" :height="size.height" :circular="true" :style="currentType == types.CIRCLE ? '' : 'display:none;'" v-on:shape-changed="shapeChanged" />
        <EllipseTool :width="size.width" :height="size.height" :circular="false" :style="currentType == types.ELLIPSE ? '' : 'display:none;'" v-on:shape-changed="shapeChanged" />
        <InsetTool :width="size.width" :height="size.height" :style="currentType == types.INSET ? '' : 'display:none;'" v-on:shape-changed="shapeChanged" />
        <PathTool :width="size.width" :height="size.height" :style="currentType == types.PATH ? '' : 'display:none;'" v-on:shape-changed="shapeChanged" />
    </div>
</template>

<script>
import PathTool from './PathTool.vue';
import InsetTool from './InsetTool.vue';
import EllipseTool from './EllipseTool.vue';
import BaseDataRep from './base/BaseDataRep.js';
export default {
    extends: BaseDataRep,
    components: {
        PathTool,
        InsetTool,
        EllipseTool
    },
    data () {
        return {
            max: 1,
            types: {
                INSET: 'inset',
                CIRCLE: 'circle',
                ELLIPSE: 'ellipse',
                PATH: 'path'
            },
            currentType: 'inset',
            size: {
                width: 200,
                height: 200
            }
        }
    },
    methods: {
        shapeChanged: function (e) {
            this.$emit('value-change', {value: e, name: this.name, index: this.index, type: this.data, composited: this.composited, sindex: this.sindex});
        }
    }
}
</script>

<style lang="scss" scoped>
select.clip-path-type-selector{
    position:relative;
    z-index: 10;
    margin: 12px 0;
}
</style>