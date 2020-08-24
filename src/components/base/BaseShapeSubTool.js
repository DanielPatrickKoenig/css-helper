import SliderComponent from '../SliderComponent.vue';
export default {
    components: {
        SliderComponent
    },
    props: ['width', 'height'],
    data () {
        return {
            size: {
                width: this.width ? this.width : 100,
                height: this.height ? this.height : 100
            },
            max: 1
        }
    },
    computed: {
        cssStyle: function () {
            return {
                '--left':`${(this.$data.x*100).toString()}%`,
                '--top':`${(this.$data.y*100).toString()}%`,
                '--width':`${this.$data.size.width}px`,
                '--height':`${this.$data.size.height}px`
            };
        }
    },
    methods: {
        getOutput: function () {
            return '';
        },
        emitValue: function () {
            const output = this.getOutput();
            this.$emit('ellipse-changed', output);
        }
    }
}