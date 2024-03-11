<template>
</template>
  <script setup>
    import {onMounted,inject,onUnmounted} from 'vue'
    let map,scene
    onMounted(()=>{
      // 获取地图变量
      map = inject('$scene_map').map
      scene = inject('$scene_map').scene
      map.flyTo({
        center:[114.3,30.5],
        zoom:14,
        pitch:45
      })
      // console.log(scene.getLayers()[0].hide())

      //实时道路
  
    })

    onUnmounted(()=>{
      scene.getLayers()[0].show()
    })
  </script>
<style>

</style>
