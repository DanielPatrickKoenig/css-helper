<template>
  <svg :style="'width:'+width.toString()+'px;height:'+height.toString()+'px;'">
      <path v-for="(c, i) in swatchCoords" :key="'coords-'+i.toString()" :d="c" :fill="colors.hex[i]" v-on:click="colorClicked(colors.hex[i])" class="color-swatch"></path>
      <circle fill="#ffffff" :cx="width/2" :cy="height/2" :r="height*.44" />
      <slot></slot>
  </svg>
</template>

<script>
import Utilities from '../utils/Utilities';
import jstrig from 'jstrig';
export default {
    props: ['colors', 'size'],
    data () {
        return {
            width: this.size ? this.size : 100,
            height: this.size ? this.size : 100,
            swatchCoords: []
        }
    },
    methods: {
        createSwatches: function () {
            const center = {x: this.$data.width / 2, y: this.$data.height / 2};
            for(let i = 0; i < this.colors.name.length; i++){
                const coords = [
                    center,
                    {
                        x: jstrig.orbit(center.x, center.y, (360/this.colors.name.length)*i, 'cos'),
                        y: jstrig.orbit(center.x, center.y, (360/this.colors.name.length)*i, 'sin')
                    },
                    {
                        x: jstrig.orbit(center.x, center.y, (360/this.colors.name.length)*(i+1), 'cos'),
                        y: jstrig.orbit(center.x, center.y, (360/this.colors.name.length)*(i+1), 'sin')
                    }
                ];
                this.$data.swatchCoords.push(`M ${coords[0].x.toString()} ${coords[0].y.toString()} L ${coords[1].x.toString()} ${coords[1].y.toString()} L ${coords[2].x.toString()} ${coords[2].y.toString()} Z`);
                
            }
        },
        colorClicked: function (hex) {
            console.log(hex);
            this.$emit('color-selected', Utilities.hexToRGB(hex));
        }
    },
    mounted: function () {
        this.createSwatches();
    }
}
</script>

<style>

</style>