<template>

</template>
<script setup>
import mapboxgl from "mapbox-gl";
import { onMounted, inject, onUnmounted } from 'vue'
let map, scene,guide
onMounted(() => {
    console.log(1);
    // 获取地图变量
    map = inject('$scene_map').map
    scene = inject('$scene_map').scene
    // map.on('load', () => {
        // 地图导航控件
        guide = new MapboxDirections({
            accessToken: mapboxgl.accessToken,
            // language:"zh-Hans", //语言，默认是英语en
        })

        map.addControl(guide, 'top-left')
        console.log(guide);
    // })
})
onUnmounted(()=>{
    map.removeControl(guide)
})
</script>
<style>
.mapboxgl-ctrl-top-left{
    top:90px;
    z-index: 999;
}
</style>