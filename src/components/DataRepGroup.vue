<template>
    <div v-if="type">
        <SelectDataRep v-if="type.rep == DataReps.SELECT" :data="type" :composited="composited" :name="name" :initval="initval" v-on:value-change="onValueChange" :index="index" :sindex="sindex" />
        <NumberDataRep v-else-if="type.rep == DataReps.NUMBER" :data="type" :composited="composited" :name="name" :initval="initval" v-on:value-change="onValueChange" :index="index" :sindex="sindex" />
        <ColorTool v-else-if="type.rep == DataReps.TOOL && (name == 'color' || name == 'background-color' || name == 'border-color')" :data="type" :composited="composited" :name="name" :initval="initval" v-on:value-change="onValueChange" :index="index" :sindex="sindex" />
        <GradientTool  v-else-if="type.rep == DataReps.TOOL && name == 'background-image'" :data="type" :composited="composited" :name="name" :initval="initval" v-on:value-change="onValueChange" :index="index" :sindex="sindex" />
        <TransformTool  v-else-if="type.rep == DataReps.TOOL && name == 'transform'" :data="type" :composited="composited" :name="name" :initval="initval" v-on:value-change="onValueChange" :index="index" :sindex="sindex" />
        <StringDataRep v-else :data="type" :composited="composited" :name="name" :initval="initval" v-on:value-change="onValueChange" :index="index" :sindex="sindex" />
    </div>
</template>
<script>

import SelectDataRep from '../components/SelectDataRep.vue';
import NumberDataRep from '../components/NumberDataRep.vue';
import ColorTool from './ColorTool.vue';
import StringDataRep from '../components/StringDataRep.vue';
import Utilities from '../utils/Utilities';
import GradientTool from './GradientTool.vue';
import TransformTool from './TransformTool.vue';
export default {
    props: ['type', 'name', 'index', 'composited', 'initval', 'sig', 'sindex'],
    components: {
        SelectDataRep,
        NumberDataRep,
        StringDataRep,
        ColorTool,
        GradientTool,
        TransformTool
    },
    data () {
        return {
            DataReps: Utilities.DataReps
        }
    },
    methods: {
        onValueChange: function (e) {
            this.$emit('value-change', e);
        }
    }
}
</script>