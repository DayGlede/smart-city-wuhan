<template>
    <div id="map">
        <Header></Header>
        <Footer></Footer>
    </div>
    <RouterView></RouterView>
</template>
<script setup>
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { onMounted, onUnmounted, ref, reactive, provide } from "vue";
import { PointLayer, LineLayer, PolygonLayer, CityBuildingLayer, Scene } from "@antv/l7";

import { Mapbox } from "@antv/l7-maps";
import { RouterView } from 'vue-router';

import Header from '@/components/header.vue'
import Footer from '@/components/footer.vue'
import initLayer from '@/tools/initLayer.js'
import initControl from '@/tools/initControl.js'

mapboxgl.accessToken =
    "pk.eyJ1IjoiemhvbmdkaXNodW1hIiwiYSI6ImNsNXJoYXR5eTI2bGgzZW53d2didWF1c3AifQ.6vOplM2NQc_xnJW3aA5ZBA";

let scene, map
const initMap = () => {
    map = new mapboxgl.Map({
        container: "map",
        style: "mapbox://styles/mapbox/dark-v11", //地图风格
        center: [114.2837515207363, 30.55313427054257], //地图中心坐标
        zoom: 1.5, //缩放比例
        projection:'globe'
    });
    
    scene = new Scene({
        id: "map",
        map: new Mapbox({
            mapInstance: map,
        }),
        logoVisible:false
    });
    map.on("style.load", () => {
        map.setFog({});
        // 消除边界
        map.setFilter("admin-0-boundary-disputed", [
            "all",
            ["==", ["get", "disputed"], "true"],
            ["==", ["get", "admin_level"], 0],
            ["==", ["get", "maritime"], "false"],
            ["match", ["get", "worldview"], ["all", "CN"], true, false],
        ]);
        map.setFilter("admin-0-boundary", [
            "all",
            ["==", ["get", "admin_level"], 0],
            ["==", ["get", "disputed"], "false"],
            ["==", ["get", "maritime"], "false"],
            ["match", ["get", "worldview"], ["all", "CN"], true, false],
        ]);
        map.setFilter("admin-0-boundary-bg", [
            "all",
            ["==", ["get", "admin_level"], 0],
            ["==", ["get", "maritime"], "false"],
            ["match", ["get", "worldview"], ["all", "CN"], true, false],
        ]);
    });
    // 让地图变量全局化
    provide('$scene_map', { scene, map })
    //实例化图层
    initLayer(scene)

    // 全屏控件
    map.addControl(new mapboxgl.FullscreenControl(),'bottom-right');

    //添加导航控件，
    const nav = new mapboxgl.NavigationControl(
        {
            //是否显示指南针按钮，默认为true
            "showCompass": true,
            //是否显示缩放按钮，默认为true
            "showZoom": true
        }
    );
    //控件的位置包括'top-left', 'top-right','bottom-left' ,'bottom-right'四种，默认为'top-right'
    map.addControl(nav, 'bottom-right');


    // 比例尺控件
    const scale = new mapboxgl.ScaleControl({
        unit: 'metric|imperial' //默认为公里
    })
    map.addControl(scale);

    // 鼠标移动显现坐标
    map.on('mousemove', function (e) {
            const { lng, lat } = e.lngLat;
            document.getElementById('mouse-position').innerHTML = `
            经度:${lng.toFixed(5)}</div><div>纬度:${lat.toFixed(5)}`
        });
};

onMounted(() => {
    initMap();
});
</script>
<style>
@import 'https://at.alicdn.com/t/c/font_4441895_bnsmqzij1ju.css';
#map {
    width: 100vw;
    height: 100vh;
    position: absolute;
    left: 0;
    top: 0;
}
.mapboxgl-ctrl.mapboxgl-ctrl-scale {
    /* background:none; */
    text-align:center
}
.mapboxgl-ctrl-bottom-right {
    height: 230px;
}
.mapboxgl-ctrl-bottom-left {
    height: 90px;
}



</style>
