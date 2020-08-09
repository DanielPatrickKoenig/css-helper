<template>
    <div v-if="type">
        <SelectDataRep v-if="type.rep == DataReps.SELECT" :data="type" :composited="composited" :name="name" :initval="initval" v-on:value-change="onValueChange" :index="index" />
        <NumberDataRep v-else-if="type.rep == DataReps.NUMBER" :data="type" :composited="composited" :name="name" :initval="initval" v-on:value-change="onValueChange" :index="index" />
        <ColorTool v-else-if="type.rep == DataReps.TOOL && (name == 'color' || name == 'background-color' || name == 'border-color')" :data="type" :composited="composited" :name="name" :initval="initval" v-on:value-change="onValueChange" :index="index" />
        <StringDataRep v-else :data="type" :composited="composited" :name="name" :initval="initval" v-on:value-change="onValueChange" :index="index" />
    </div>
</template>
<script>

import SelectDataRep from '../components/SelectDataRep.vue';
import NumberDataRep from '../components/NumberDataRep.vue';
import ColorTool from './ColorTool.vue';
import StringDataRep from '../components/StringDataRep.vue';
import Utilities from '../utils/Utilities';
export default {
    props: ['type', 'name', 'index', 'composited', 'initval', 'sig'],
    components: {
        SelectDataRep,
        NumberDataRep,
        StringDataRep,
        ColorTool
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