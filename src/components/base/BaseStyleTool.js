export default{
    props: ['value'],
    data () {
        return {
            valueObject: parse()
        }
    },
    methods: {
        parse: function () {
            return {};
        },
        serialize: function () {
            return '';
        },
        output: function () {
            this.$emit('output-tool-string', this.serialize());
        }
    }
}