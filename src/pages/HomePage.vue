<template>
    <div class="home-page">
        <h2>
            About CSS Training Wheels
        </h2>
        <p>
            CSS Training Wheels is place for beginners to learn the ins and outs of CSS. It is also a tool for more experienced developers create advanced CSS content with visual tools that output valid CSS. To learn more, check out the video below.
        </p>
        <iframe
            class="about-video"
            width="100%"
            height="480"
            src="https://www.youtube.com/embed/BZ38IPDd_d8"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowfullscreen
        >
        </iframe>
        <h2>Video Courses</h2>
        <ul class="video-list">
            <li
                v-for="(video, k, i) in videos"
                :key="'video-'+i.toString()"
            >
                <h3>
                    <a :href="video.playlist" target="_blank">{{video.title}}</a>
                </h3>
                <p>{{video.description}}</p>

                <input :id="'videos-'+k" class="video-list-toggle" type="checkbox">
                <label :for="'videos-'+k">
                    <span class="closed"><font-awesome-icon icon="chevron-down" /></span>
                    <span class="opened">
                        <font-awesome-icon icon="chevron-up" />
                    </span>
                </label>
                <ul class="inner-list">
                    <li>
                        <h4>
                            Challenges
                        </h4>
                    </li>
                    <li 
                        v-for="(challenge, i) in video.challenges"
                        :key="'challenge-'+i.toString()"
                    >
                        <h5>
                            {{challenge.name}}
                        </h5>
                        <router-link 
                            v-if="challenge.link.ctw" 
                            :to="challenge.link.ctw"
                            target="_blank"
                        >
                            CTW
                        </router-link>
                        <a 
                            v-if="challenge.link.codepen" 
                            :href="challenge.link.codepen"
                            target="_blank"
                        >
                            CodePen
                        </a>
                    </li>
                </ul>
                <!--
                <ul class="inner-list">
                    <li 
                        v-for="(chapter, j) in video.embedables"
                        :key="'chapter-'+j.toString()+'-'+i.toString()"
                    >
                        <iframe
                            width="400"
                            height="220"
                            :src="chapter.video"
                            frameborder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                            allowfullscreen
                        >
                        </iframe>
                    </li>
                </ul> -->
            </li>
        </ul>
        <!-- <EaseTool /> -->
        <!-- <GradientTool :name="gProps.name" :type="gProps.type" :initval="gProps.startVals[2]" /> -->
        <!-- <ColorSelector style="width:300px;" :cols="20" :incrament="incrament" v-on:color-selected="onColorSelected" />
        <div :style="'position:relative;left:200px;top:120px;box-shadow:0 -1px 0 #000000;height:1px;width:' + dimensions.width + 'px;'">
            <SliderComponent constraint="horizontal" :width="dimensions.width" :ratiox="rat" :max="255" v-on:slider-moved="onSliderMoved">
                
            </SliderComponent>
            <input app-controll type="number" v-model="rat" />
        </div> -->
    </div>
</template>
<script>
// import GradientTool from '../components/GradientTool.vue';
import Utilities from '../utils/Utilities.js';
// import ShapeTool from '../components/ShapeTool.vue';
// import EaseTool from '../components/EaseTool.vue';
// import TransformTool from '../components/TransformTool.vue';
//'type', 'name', 'index', 'composited', 'initval', 'sig'
// import SliderComponent from '../components/SliderComponent.vue';
export default {
    // components: {
        // EaseTool
        // GradientTool
    // },
    data () {
        return {
            videos: Utilities.Videos,
            gProps: {
                videos: Utilities.Videos,
                name: 'background-image',
                type: Utilities.PropertyValueTypes.GRADIENT_UI,
                startVals: [
                    'radial-gradient(circle at center top,rgba(0,96.9,0,1) 0%,rgba(255,255,112.2,1) 66.5%,rgba(179.77499999999998,0,0,1) 100%)',
                    'linear-gradient(68.60018986791778deg,rgba(168.3,224.4,0,1) 11%,rgba(19.125,255,164.475,1) 40%,rgba(0,91.8,0,1) 64%,rgba(145.35,0,63.75,1) 92%)',
                    'radial-gradient(circle at 76% 17.5%,rgba(168.3,224.4,0,1) 11%,rgba(19.125,255,164.475,1) 40%,rgba(0,91.8,0,1) 64%,rgba(145.35,0,63.75,1) 92%)'
                ]
            }
        }
        
    },
    methods: {
        onSliderMoved: function (e) {
            // console.log(e.x);
            this.$data.rat = e.x;
        }
    }
}
</script>
<style scoped lang="scss">
@import '../scss/mixins.scss';
.home-page{
    ul.video-list{
        margin:0;
        padding:0;
        > li{
            padding:4px 0;
            box-shadow:0 1px 0 rgba(0,0,0,.5) inset;
            margin:8px 0;
            display:block;
            position:relative;
            h3{
                & ~ label{
                    position:absolute;
                    top:20px;
                    right:0;
                }
            }
            > ul.inner-list{
                display:flex;
                width: 100%;
                flex-direction:column;

                h4,h5{
                    margin: 3px 0;
                }

                li{
                    display:flex;
                    flex-direction: column;
                    margin:3px;
                    max-width:98%;
                    &:not(:first-child){
                        margin: 3px 9px;
                    }
                    a {
                        display:block;
                    }

                }
            }
        }
    }
}
input.video-list-toggle{
    display:none;
    & + label{
        span.closed{
            display:block;
        }
        span.opened{
            display:none;
        }
        & + ul{
            margin:0;
            padding:0;
            display:none !important;
        }
    }
    &:checked + label{
        span.closed{
            display:none;
        }
        span.opened{
            display:block;
        }
        & + ul{
            display:flex !important;
        }   
    }

}
.about-video{
    width: 100%;
    height: 250px;
    box-shadow:0 0 0 1px rgba(0,0,0,0.4);
    @include min(850px){
        height: 400px;
    }   
}
</style>