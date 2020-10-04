<template>
  <div>
      <div class="editor-section-sub-header">
        Shape: 
        <select app-controll v-model="selectedShapeIndex" v-on:change="selectionChanged">
            <option v-for="(s, i) in shapes" :key="'shape-'+i.toString()" :value="i">
                {{s}}
            </option>
        </select>
      </div>
      <div v-for="(s, i) in selectedPositions" :key="'selector-'+i.toString()" class="editor-section-sub-header">
        {{i == 0 ? 'Horizontal: ' : 'Vertical: '}}
        <select app-controll v-model="selectedPositions[i].position" v-on:change="selectionChanged">
            <option v-for="(p, k, j) in positions" :key="'option-'+i.toString()+'-'+j.toString()" :value="p">
                {{p}}
            </option>
        </select>
        <div v-if="selectedPositions[i].position == positions.PERCENTAGE" class="position-percentage-container">
            <SliderComponent :width="sliderParams.width" :max="sliderParams.max" :ratiox="selectedPositions[i].ratio" :constraint="sliderParams.constraint" v-on:slider-moved="onSliderMoved" :sig="i">
                <div style="width:20px;height:20px;margin-left:-10px;margin-top:-10px;background-color:#000000;border-radius:20px;"></div>
            </SliderComponent>
            <input app-controll type="number" v-model="selectedPositions[i].ratio" v-on:change="selectionChanged" />
        </div>
      </div>
  </div>
</template>

<script>
import Utilities from '../utils/Utilities.js';
import SliderComponent from './SliderComponent.vue';
export default {
    props: ['shape', 'position1', 'position2', 'ratio1', 'ratio2'],
    components: {
        SliderComponent
    },
    data () {
        return {
            positions: Utilities.PositionDirectives,
            selectedPositions: [{position: this.position1, ratio: this.ratio1}, {position: this.position2, ratio: this.ratio2}],
            shapes: ['circle', 'ellipse'],
            selectedShapeIndex: this.shape == 'circle' ? 0 : 1,
            sliderParams: {
                width:160,
                max: 100,
                constraint: 'horizontal'
            }
        };
    },
    methods: {
        onSliderMoved: function (e) {
            this.$data.selectedPositions[Number(e.sig)].ratio = e.x;
            this.selectionChanged();
        },
        selectionChanged: function(){
            this.$emit('selection-change', {shape: this.$data.shapes[this.$data.selectedShapeIndex], positions: this.$data.selectedPositions});
        }
    }
}
</script>

<style>

</style>