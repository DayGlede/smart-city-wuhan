<template>
    <div id='foot'>
        <div class="tool-box">
            <ul>
                <li v-for="item in toolBoxs">
                    <div class="tool">
                        <InquireTools v-if="item.isHover">
                            <button style="width: 40px;height: 30px;border-radius: 45%;">
                                <img :src="`/src/assets/zdp-images/${item.icon}`" alt="图片丢失">
                            </button>
                        </InquireTools>
                        <button style="width: 40px;height: 30px;border-radius: 45%;" @click="item.motion" v-else>
                            <img :src="`/src/assets/zdp-images/${item.icon}`" alt="图片丢失">
                        </button>
                        <i style="color: wheat;font-size: 3%;background-color: rgba(23, 19, 19, 0.5);border-radius: 5%;">{{
                            item.title }}</i>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import { inject } from "vue";
import InquireTools from "./InquireTools.vue";
export default {
    data() {
        return {
            scene: {}, // the scene初始化scene对象
            map: {}, // the map 初始化map对象
            valveForRotate: true, // the valve 控制地球是否转动的阀门。默认转动
            isInCity: false, // the valve 判断地图中心是否在指定城市，控制是否飞行向城市。默认地图中心不在城市
            toolBoxs: [
                {
                    title: '自转控制',
                    icon: '地球.png',
                    motion: this.rotateControl
                }, {
                    title: '控制中心',
                    icon: '控制中心.png',
                    motion: this.controlCenter
                }, {
                    title: '飞行城市',
                    icon: '飞行.png',
                    motion: this.flyTO_City
                }, {
                    title: '范围查询',
                    icon: '范围查询.png',
                    isHover: true,
                    motion: () => { }
                },
            ], // 工具箱
        }
    },
    components: {
        InquireTools
    },
    props: {
        valveForLayer: Boolean,
        renderProgressBar: Boolean
    },
    emits: ['update:valveForLayer', 'eventData', 'update:renderProgressBar'],
    methods: {
        // 地球转动函数
        rotate() {
            const M_zoom = this.map.getZoom();
            if (M_zoom < 6 && this.valveForRotate) {
                const center = this.map.getCenter();
                center.lng += 5
                this.map.easeTo({ center, zoom: 1.8, duration: 1000, easing: (t) => t });
            }
        },
        // 控制地球是否转动
        rotateControl() {
            this.valveForRotate = !this.valveForRotate

            // 点击控制按钮时地图立即停止转动，没有延迟
            if (!this.valveForRotate) {
                this.map.stop();
            }
        },

        // 控制中心。
        controlCenter() {
            console.log('控制中心触发')
        },

        // 飞行到城市。1.默认城市：杭州 2.后续可以添加城市，城市由用户在客户端指定
        flyTO_City() {
            if (this.flyTO_City.valueOf()) {
                this.map.flyTo({
                    center: [114.30, 30.56],
                    zoom: 9,
                    speed: 1,
                    curve: 3,
                    easing(t) {
                        return t;
                    }
                })
            } else {
                this.map.flyTo({
                    center: [120.145, 30.238915],
                    zoom: 9,
                    duration: 3000,
                    curve: 3,
                    easing(t) {
                        return t;
                    },
                    // pitch: 20,
                    // bearing: 40
                })
            }
            this.flyTO_City = !this.flyTO_City.valueOf()
        },
    },
    mounted() {
        const { scene, map } = inject('$scene_map');
        this.map = map;
        this.scene = scene

        // 进入视图时地球开始自转
        this.rotate()
        this.map.on('moveend', () => {
            // console.log('开始转动');
            this.rotate();
        })

        // 添加的地图点击事件。
        /*
        进入视图时，地球默认转动。停止地球转动的方法有点击按钮与点击地图两种。并且再次点击时地球应该是可以转动的。
        但是因为丕文同学添加了地图点击事件，在地球停止转动时，再次点击地图，触发了丕文同学的地图点击事件，地球转动控制效果未生效。
        此情况下点击按钮是可以让地球重新转动的。
        */
        this.map.on('click', () => {
            // 点击地图，当地图在旋转时停止自转
            if (this.valveForRotate) {
                this.rotateControl()
            }
        })

    },
    watch: {
        valveForRotate() {
            this.rotate();
        },
    },
    unmounted() {
        this.valveForRotate = false
    },
}
</script>

<style scoped>
* {
    margin: 0px;
    padding: 0px
}

#foot {
    position: fixed;
    left: 0;
    bottom: 90px;
    z-index: 3;
    width: 50vw;
    height: 8vh;
    /* border: 1px red solid; */
    transform: translateX(25vw);
    overflow: hidden;
}

.tool-box {
    border-radius: 7%;
}

.tool-box ul {
    width: 45vw;
    margin: 1px auto;
    display: flex;
    justify-content: center;
    align-items: flex-end;
    list-style: none;
    /* 去除项目符号 */
}

.tool-box ul li {
    float: left;
}

.tool {
    width: 50px;
    height: 50px;
    overflow: hidden;
    margin: auto 8px;
}

.tool button img {
    width: 20px;
    height: 20px;
}
</style>