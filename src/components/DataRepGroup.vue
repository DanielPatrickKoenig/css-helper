<template>
    <div v-if="type">
        <DefaultsTool v-if="type.rep == DataReps.TOOL && type == propertyTypes.DEFAULTS" :data="type" :composited="composited" :name="name" :initval="initval" v-on:value-change="onValueChange" :index="index" :sindex="sindex"/>
        <SelectDataRep v-else-if="type.rep == DataReps.SELECT" :data="type" :composited="composited" :name="name" :initval="initval" v-on:value-change="onValueChange" :index="index" :sindex="sindex" />
        <NumberDataRep v-else-if="type.rep == DataReps.NUMBER" :data="type" :composited="composited" :name="name" :initval="initval" v-on:value-change="onValueChange" :index="index" :sindex="sindex" />
        <ColorTool v-else-if="type.rep == DataReps.TOOL && (name == 'color' || name == 'background-color' || name == 'border-color')" :data="type" :composited="composited" :name="name" :initval="initval" v-on:value-change="onValueChange" :index="index" :sindex="sindex" />
        <GradientTool  v-else-if="type.rep == DataReps.TOOL && name == 'background-image'" :data="type" :composited="composited" :name="name" :initval="initval" v-on:value-change="onValueChange" :index="index" :sindex="sindex" />
        <TransformTool  v-else-if="type.rep == DataReps.TOOL && name == 'transform'" :data="type" :composited="composited" :name="name" :initval="initval" v-on:value-change="onValueChange" :index="index" :sindex="sindex" />
        <ShadowTool v-else-if="type.rep == DataReps.TOOL && (name == 'box-shadow' || name == 'text-shadow')" :data="type" :composited="composited" :name="name" :initval="initval" v-on:value-change="onValueChange" :index="index" :sindex="sindex" />
        <TransformOriginTool v-else-if="type.rep == DataReps.TOOL && name == 'transform-origin'" :data="type" :composited="composited" :name="name" :initval="initval" v-on:value-change="onValueChange" :index="index" :sindex="sindex" />
        <ShapeTool v-else-if="type.rep == DataReps.TOOL && name == 'clip-path'" :data="type" :composited="composited" :name="name" :initval="initval" v-on:value-change="onValueChange" :index="index" :sindex="sindex"/>
        <FontTool v-else-if="type.rep == DataReps.TOOL && name == 'font-family'" :data="type" :composited="composited" :name="name" :initval="initval" v-on:value-change="onValueChange" :index="index" :sindex="sindex"/>
        <AnimationTool v-else-if="type.rep == DataReps.TOOL && name == 'animation-name'" :data="type" :composited="composited" :name="name" :initval="initval" v-on:value-change="onValueChange" :index="index" :sindex="sindex"/>
        <EaseTool v-else-if="type.rep == DataReps.TOOL && name == 'animation-timing-function'" :data="type" :composited="composited" :name="name" :initval="initval" v-on:value-change="onValueChange" :index="index" :sindex="sindex"/>
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
import TransformOriginTool from './TransformOriginTool.vue';
import ShadowTool from './ShadowTool.vue';
import ShapeTool from './ShapeTool.vue';
import FontTool from './FontTool.vue';
import AnimationTool from './AnimationTool.vue';
import EaseTool from './EaseTool.vue';
import DefaultsTool from './DefaultsTool.vue';
export default {
    props: ['type', 'name', 'index', 'composited', 'initval', 'sig', 'sindex'],
    components: {
        SelectDataRep,
        NumberDataRep,
        StringDataRep,
        ColorTool,
        GradientTool,
        TransformTool,
        ShadowTool,
        TransformOriginTool,
        ShapeTool,
        FontTool,
        AnimationTool,
        EaseTool,
        DefaultsTool
    },
    data () {
        return {
            DataReps: Utilities.DataReps,
            propertyTypes: Utilities.PropertyValueTypes
        }
    },
    methods: {
        onValueChange: function (e) {
            // console.log(e);
            this.$emit('value-change', e);
        }
    }
}
</script>