<script setup>
import { ElForm, ElFormItem, ElSelect, ElOption, ElButton, ElMessage } from 'element-plus'
import { ref, inject, onUnmounted } from 'vue'
import { PointLayer } from "@antv/l7";
import { DrawEvent, DrawCircle, DrawRect, DrawPolygon, DrawLine } from '@antv/l7-draw'
import point from '@/assets/GIS_Data/point.json'
import * as turf from '@turf/turf'
const type = ref('')
const way = ref('')
const scene = inject('$scene_map').scene
const map = inject('$scene_map').map

//画笔,图层
let draw, layer
const celiang = (celiangWay) => {
    draw?.disable()
    //清除上一次的区域图层
    draw?.clear(layer)
    if (celiangWay === '矩形') {
        draw = new DrawRect(scene, {distanceOptions: {
            showTotalDistance: false,
            showDashDistance: true
        }});
    } else if (celiangWay === '圆形') {
        draw = new DrawCircle(scene, {areaOptions:{}});
    } else if (celiangWay === '多边形') {
        draw = new DrawPolygon(scene, {distanceOptions: {
            showTotalDistance: false,
            showDashDistance: true
            },areaOptions:{
                format: (squareMeters, polygonFeature) => {
                    return squareMeters > 1000000
                        ? `${+(squareMeters / 1000000).toFixed(2)}km²`
                        : `${+squareMeters.toFixed(2)}m²`;
                }
            }
        });
    } else if (celiangWay === '线段') {
        draw = new DrawLine(scene, {distanceOptions: {
            showTotalDistance: false,
            showDashDistance: true
        }});
    }
    draw.enable();
}
const clear = () => {
    //关闭画笔
    draw?.disable()
    //清除上一次的区域图层
    draw?.clear(layer)
}


onUnmounted(()=>{
    draw && draw.destroy();
    if(layer){
        scene.remove(layer);
        layer = null;
    }
})


</script>

<template>
    <div class="chaxun">
        <div class="title">地图测量</div>
        <div class="content"><el-form label-width="auto">
            <el-form-item label="测量方式">
                <el-select
                    v-model="way"
                    placeholder="请选择测量方式"
                    class="item"
                    @change='celiang'
                >
                    <el-option value="矩形">矩形</el-option>
                    <el-option value="圆形">圆形</el-option>
                    <el-option value="多边形">多边形</el-option>
                    <el-option value="线段">线段</el-option>
                </el-select>
            </el-form-item>
        </el-form>
            <el-button
                type="primary"
                @click="clear"
            >清除</el-button></div>
    </div>
</template>

<style scoped>
.chaxun {
    width: 25vw;
    height: 17vh;
    background-color: #5b6e94;
    color: #fff;
    border-radius: 5px;
    box-shadow: 5px 5px 10px #04408b;
    position: absolute;
    z-index: 999;
    top: 20vh;
    left: 2vw;
}

.title {
    font-size: 30px;
    text-align: center;
}

.el-form {
    margin-top: 20px;
}

:deep(.el-form-item__label) {
    color: #fff;
}

.content {
    display: flex;
    justify-content: space-around;
}

.el-button {
    margin-top: 20px;
}

.el-table {
    position: absolute;
    z-index: 999;
    top: 20vh;
    right: 2vw;
    border-radius: 15px;
    box-shadow: 5px 5px 10px #04408b;
}

/*最外层透明*/
.regional_table /deep/ .el-table,
.regional_table /deep/ .el-table__expanded-cell {
    background-color: #0d3661;
    color: white;
}

/* 表格内背景颜色 */
.regional_table /deep/ .el-table th,
.regional_table /deep/ .el-table tr,
.regional_table /deep/ .el-table td {
    background-color: #0d3661 !important;
    /* //表格字体颜色 */
    color: white;
}
</style>