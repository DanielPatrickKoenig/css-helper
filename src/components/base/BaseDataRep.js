export default {
    props: ['data', 'name', 'index'],
    data () {
        return {
            value: this.getDefaultValue()
        }
    },
    methods: {
        onValueChange: function(e){
            this.$emit('value-change', {value: this.processValue(this.deriveValue(e)), name: this.name, index: this.index});
        },
        deriveValue: function(e){
            return e.target.value;
        },
        getDefaultValue: function () {
            return 0;
        },
        processValue: function (val) {
            return val;
        }
    },
    mounted: function () {
        this.$emit('value-change', {value: this.processValue(this.$data.value), name: this.name, index: this.index});
    }
}