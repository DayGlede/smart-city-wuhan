<script setup>
import { ref, reactive, onUnmounted } from 'vue'
let time = ref()
let timer = reactive()
//系统当前时间
time.value = new Date().toLocaleString()
//定时器
timer = setInterval(() => {
    time.value = new Date().toLocaleString()
}, 1000)
// 清除定时器
onUnmounted(() => {
    clearInterval(timer)
})
</script>
<template>
    <div class="header">
        <div class="time">{{ time }}</div>
        <div class="title">智慧武汉城市管理系统</div>
        <div id="mouse-position">这个地方传入经纬度</div>
    </div>
</template>
<style scoped>
.header{
    position: absolute;
    width: 100vw;
    height: 14vh;
    top: 0;
    background: url('@/assets/images/header.png') no-repeat center;
    z-index: 999;
    display: grid;
    grid-template-columns: 10% 80% 10%;
    color: #fff;    
}
.time{
    font-size: 15px;
    display: flex;
    align-items: center;   
}
.title{
    font-size: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
}
#mouse-position {
    font-size: 15px;
    padding-top: 15px;
}

</style>