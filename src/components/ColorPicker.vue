<template>
  <svg>
      <path v-for="(c, i) in swatchCoords" :key="'coords-'+i.toString()" :d="c" :fill="colors[i]" v-on:click="colorClicked(colors[i])" class="color-swatch"></path>
  </svg>
</template>

<script>
import jstrig from 'jstrig';
export default {
    props: ['size', 'granularity', 'offset'],
    data () {
        return {
            width: this.size ? this.size : 100,
            height: this.size ? this.size : 100,
            colors: [],
            selectedColor: null,
            swatchCoords: [],
            colorOffset: this.offset ? this.offset : 0
        }
    },
    methods: {
        colorClicked: function (c) {
           this.$data.selectedColor = c;
        },
        setColors: function () {
            this.$data.colors = [];
            this.$data.swatchCoords = [];
            const max = 0xffffff;
            const center = {x: this.$data.width / 2, y: this.$data.height / 2};
            for(let i = 0; i < this.granularity; i++){
                this.$data.colors.push("#"+((((max/this.granularity)*i)+this.$data.colorOffset)>>>0).toString(16).slice(-6));
                const coords = [
                    center,
                    {
                        x: jstrig.orbit(center.x, center.y, (360/this.granularity)*i, 'cos'),
                        y: jstrig.orbit(center.x, center.y, (360/this.granularity)*i, 'sin')
                    },
                    {
                        x: jstrig.orbit(center.x, center.y, (360/this.granularity)*(i+1), 'cos'),
                        y: jstrig.orbit(center.x, center.y, (360/this.granularity)*(i+1), 'sin')
                    }
                ];
                this.$data.swatchCoords.push(`M ${coords[0].x.toString()} ${coords[0].y.toString()} L ${coords[1].x.toString()} ${coords[1].y.toString()} L ${coords[2].x.toString()} ${coords[2].y.toString()} Z`);
            }
        }
    },
    watch: {
        offset:function(){
            this.$data.colorOffset = this.offset;
            this.setColors();
        }
    },
    created: function () {
        this.setColors();
        // console.log('color picker created');
    }

}
</script>

<style>

</style>