<script setup>
import {onMounted,onUnmounted,inject} from 'vue'
let map
onMounted(() => {
    map=inject('$scene_map').map
    map.flyTo({
        center: [114.2837515207363, 30.55313427054257],
        zoom:12
    })
})
// onUnmounted(() => {
//     map.setCenter([114.2837515207363, 30.55313427054257])
//     map.setZoom(1.5)
// })
</script>