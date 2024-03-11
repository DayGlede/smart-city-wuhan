<template>

</template>

<script setup>
import { onMounted, inject, onUnmounted, } from 'vue';
import { LineLayer, Popup } from '@antv/l7';
import data from '../assets/GIS_Data/Wuhan_bridge.json'
let map, scene, layer,popup;


onMounted(() => {

    // 获取地图变量
    map = inject('$scene_map').map
    scene = inject('$scene_map').scene
    //加载桥梁数据


    map.flyTo({
        center: [114.25956, 30.514773],
        zoom: 12.4,
        pitch: 40
    })
        initLayer();
})

const initLayer = () => {
    layer = new LineLayer({})
        .source(data)
        .size(10)
        .shape('arc3d')
        .color("name", ["lightblue", "#fff200", "lightgreen", "#ffaec9", "#22b14c"])
        .style({
            segmentNumber: 100,
            opacity: 1
        });
    scene.addLayer(layer);
    popup = new Popup({});
    scene.addPopup(popup);
    layer.on('click', (e) => {
        console.log(e);
        const { lng, lat } =e.lngLat
        popup.setOptions({
            title: e.feature.properties.name,
            html: e.feature.properties.info,
            lngLat: {
                lng,
                lat,
            },
            closeOnClick:true
        });
    })
}


onUnmounted(() => {
    scene.removeLayer(layer);
    scene.removePopup(popup);
});
</script>

<style></style>
