<template>
</template>
<script setup>
import data from "@/assets/GIS_Data/2024-03-09.json"
import { onMounted, inject, onUnmounted } from 'vue'
import { HeatmapLayer } from "@antv/l7";

let map, scene, layer, popup;

onMounted(() => {
  // 获取地图变量
  map = inject('$scene_map').map
  scene = inject('$scene_map').scene
  map.setProjection('mercator')
  map.setCenter( [114.2837515207363, 30.55313427054257])
  map.setZoom(3)
  //加载热力图层
  initLayer();

})

const initLayer = () => {
  fetch(
    'https://gw.alipayobjects.com/os/basement_prod/d3564b06-670f-46ea-8edb-842f7010a7c6.json'
  )
    .then(res => res.json())
    .then(data => {
      layer = new HeatmapLayer({})
        .source(data)
        .shape('heatmap')
        .size('mag', [0, 1.0]) // weight映射通道
        .style({
          intensity: 2,
          radius: 20,
          rampColors: {
            colors: [
              '#FF4818',
              '#F7B74A',
              '#FFF598',
              '#F27DEB',
              '#8C1EB2',
              '#421EB2'
            ].reverse(),
            positions: [0, 0.2, 0.4, 0.6, 0.8, 1.0]
          }
        });
      scene.addLayer(layer);
    });
}

onUnmounted(() => {
  layer&&scene.removeLayer(layer)
  map.setProjection('globe')
})
</script>
<style></style>