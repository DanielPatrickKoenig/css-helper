export default {
    props: ['data'],
    data () {
        return {
            value: null
        }
    },
    methods: {
        onValueChange: function(e){
            this.$emit('value-change', this.deriveValue(e));
        },
        deriveValue: function(e){
            return e.target.value;
        }
    }
}