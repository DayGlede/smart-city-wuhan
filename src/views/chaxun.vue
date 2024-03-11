<script setup>
import { ElForm, ElFormItem, ElSelect, ElOption, ElButton, ElMessage } from 'element-plus'
import { ref, inject, onUnmounted } from 'vue'
import { PointLayer } from "@antv/l7";
import { DrawEvent, DrawCircle, DrawRect, DrawPolygon } from '@antv/l7-draw'
import point from '@/assets/GIS_Data/point.json'
import * as turf from '@turf/turf'
const type = ref('')
const way = ref('')
const scene = inject('$scene_map').scene
const map = inject('$scene_map').map

//画笔,图层
let draw, layer, pointLayer
let result = ref([])
const query = (chaxunWay, chaxunType) => {
    if (chaxunWay === '' || chaxunWay === '') {
        return ElMessage.warning('请选择查询类型及方法！')
    }
    //清除上一次的数据
    result.value = []
    //清除上一次的区域图层
    draw?.clear(layer)
    //清除上一次的区域点图层
    scene.removeLayer(pointLayer)
    if (chaxunWay === '矩形') {
        draw = new DrawRect(scene, {});
    } else if (chaxunWay === '圆形') {
        draw = new DrawCircle(scene, {});
    } else if (chaxunWay === '自由绘图') {
        draw = new DrawPolygon(scene, {});
    }
    // 调用 Draw 上的方法
    draw.enable();
    draw.on(DrawEvent.Add, (newLayer) => {
        // 获取绘制的图层
        layer = newLayer
        pointLayer = new PointLayer().size(5).shape('circle').color('#ffffff')
        if (chaxunType !== '全部') {
            result.value = turf.pointsWithinPolygon(point, layer).features.filter(item => item.properties.attribute === chaxunType)
            result.value = {
                features: result.value,
                type: 'FeatureCollection'
            }
            ElMessage.success(`已为您找到${result.value.features.length}个${chaxunType}!`)
        } else {
            result.value = turf.pointsWithinPolygon(point, layer)
            ElMessage.success(`已为您找到${result.value.features.length}个地图点!`)
        }
        pointLayer.source(result.value)
        scene.addLayer(pointLayer)
        //关闭画笔
        draw.disable()
    });
}
const clear = () => {
    //清除上一次的数据
    result.value = []
    //关闭画笔
    draw?.disable()
    //清除上一次的区域图层
    draw?.clear(layer)
    //清除上一次的区域点图层
    scene.removeLayer(pointLayer)
}

//去详细地点
const goPosition = (lng, lat) => {
    console.log([lng, lat]);
    map.flyTo({
        center: [lng, lat],
        zoom: 16
    })
}

onUnmounted(()=>{
    clear()
})
</script>

<template>
    <div class="chaxun">
        <div class="title">地图查询</div>
        <el-form label-width="auto">
            <el-form-item label="查询类型">
                <el-select
                    v-model="type"
                    placeholder="请选择查询类型"
                    class="item"
                >
                    <el-option value="全部">全部</el-option>
                    <el-option value="学校">学校</el-option>
                    <el-option value="医院">医院</el-option>
                    <el-option value="超市">超市</el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="查询方式">
                <el-select
                    v-model="way"
                    placeholder="请选择查询方式"
                    class="item"
                >
                    <el-option value="矩形">矩形</el-option>
                    <el-option value="圆形">圆形</el-option>
                    <el-option value="自由绘图">自由绘图</el-option>
                </el-select>
            </el-form-item>
        </el-form>
        <div class="button">
            <el-button
                type="primary"
                @click="query(way, type)"
            >查询</el-button>
            <el-button
                type="primary"
                @click="clear"
            >清除</el-button>
        </div>
    </div>
    <div class="regional_table">
        <el-table
            style="width: 25%;height: 50%;"
            :data="result.features"
            v-if="result.features?.length"
        >
            <el-table-column
                prop="properties.name"
                label="名称"
                width="200"
            />
            <el-table-column
                prop="properties.attribute"
                label="类型"
                width="80"
            />
            <el-table-column
                label="操作"
                width="100"
            >
                <template #default="scope">
                    <el-button
                        size="small"
                        type="primary"
                        @click="goPosition(scope.row.properties.longitude, scope.row.properties.latitude)"
                    >去这里</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<style scoped>
.chaxun {
    width: 25vw;
    height: 30vh;
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

.button {
    display: flex;
    justify-content: space-around;
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