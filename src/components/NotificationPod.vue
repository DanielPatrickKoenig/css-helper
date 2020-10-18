<template>
    <div v-if="top > -100" :style="cssProps" class="notification-pod">
        <div>
            <label>
                <span v-if="message == codes.ACCESS_EDITOR">Your property selections have been updated.<br />Click on the <font-awesome-icon :icon="message.split(':')[1]" /> icon to access the editor.</span>
                <span v-else-if="message == codes.EMPTY_EDITOR">Your property selections have been updated.</span>
                <span v-else-if="message == codes.ACCESS_SEARCH">Click on the <font-awesome-icon :icon="message.split(':')[1]" /> icon to search.</span>
                <span v-else>{{message}}</span>
            </label>
        </div>
    </div>
</template>

<script>
import Utilities from '../utils/Utilities.js';
import {TweenLite} from 'gsap';
export default {
    props: ['message', 'sig'],
    data () {
        return{
            minPos: -60,
            top: 0,
            width: 320,
            wait: 0,
            height: 0,
            codes: Utilities.MessageCodes
        }
    },
    created: function () {
        this.$data.height = Math.abs(this.$data.minPos * .9);
        this.$data.top = this.$data.minPos;
    },
    computed: {
        cssProps: function () {
            return {
                '--top':`${this.$data.top}px`,
                '--width':`${this.$data.width}px`,
                '--height':`${this.$data.height}px`,
                '--margin-left':`${this.$data.width/-2}px`
            }
        }
    },
    watch: {
        sig: function(){
            this.$data.top = -100;
            this.$data.wait = 1;
            TweenLite.to(this.$data, 1, {
                top: 0,
                onComplete: () => {
                    TweenLite.to(this.$data, 4, {
                        wait: 1,
                        onComplete: () => {
                            TweenLite.to(this.$data, 1, {top: this.$data.minPos});
                        }
                    });
                }
            })
        }
    }
}
</script>

<style lang="scss" scoped>
.notification-pod{
    top: var(--top);
    position:fixed;
    left:50%;
    z-index: 12000;
    > div{
        width: var(--width);
        margin-left:var(--margin-left);
        display:flex;
        justify-content: center;
        background-color:#eeeeee;
        box-shadow: 0 0 2px 1px rgba(0,0,0,.2);
        border-radius: 0 0 12px 12px;
        height:var(--height);
        > label{
            padding:12px;
            font-size:.7em;
            text-align: center;
        }
    }
}
</style>