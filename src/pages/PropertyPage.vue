<template>
    <div>
        Property
        <span>{{propertyName}}</span>
    </div>
</template>
<script>
import Utilities from '../utils/Utilities.js';
export default {
    data () {
        return {
            propertyName: Utilities.getParameterByName('name')
        }
    }
}
</script>