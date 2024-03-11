<script setup>
import router from "../router";
import { ref } from "vue";
let isRotation = ref(false);
const goRotation = () => {
    isRotation.value=!isRotation.value;
    router.push({
        path: '/rotation',
        // query:{
        //     isRotation: isRotation.value
        // }
    })
}


</script>
<template>
    <div class="footer">
        <div class="item"><i class="iconfont icon-icon-test" @click="goRotation"></i><div>自转控制</div></div>
        <div class="item"><i class="iconfont icon-jiankongkongzhiguanli" @click="router.push('/data')"></i><div>控制中心</div></div>
        <div class="item"><i class="iconfont icon-feihang" @click="router.push('/view')"></i><div>视角切换</div></div>
        <div class="item"><i class="iconfont icon-chaxun" @click="router.push('/chaxun')"></i><div>地图查询</div></div>
        <div class="item"><i class="iconfont icon-chizi" @click="router.push('/measuringtools')"></i><div>地图测量</div></div>
        <div class="item"><i class="iconfont icon-qiaoliang" @click="router.push('/bridgeview')"></i><div>桥梁视角</div></div>
        <div class="item"><i class="iconfont icon-qiche" @click="router.push('/navigation')"></i><div>定点导航</div></div>
        <div class="item"><i class="iconfont icon-wenduji" @click="router.push('/heatmap')"></i><div>热力图</div></div>
        <!-- <div class="item"><i class="iconfont icon-gengduo"></i><div>更多功能</div></div> -->
    </div>
</template>
<style scoped>
@import 'https://at.alicdn.com/t/c/font_4441895_ipe67pfjhtn.css';
.footer{
    position: absolute;
    bottom: 0;
    width: 100vw;
    height: 14vh;
    background: url('@/assets/images/xzd-header.png') no-repeat center;
    z-index: 999;
    color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;   
}
.footer .item{
    width: 80px;
    
}
.footer .item i:hover{
    cursor: pointer;
    background-color: #085194;
}
.footer .item .iconfont{
    display: flex;
    align-items: center;
    justify-content: center;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    box-shadow: 0 0 10px #000;
    background-color: #2b5b86;
}
</style>