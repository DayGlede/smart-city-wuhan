// 获取GIS数据
import roadData from '@/assets/GIS_Data/Wuhan_roads.json'
import buildingData from '@/assets/GIS_Data/Wuhan_Buildings.json'
import point from '@/assets/GIS_Data/point.json'
import { LineLayer,CityBuildingLayer} from "@antv/l7";
export default (scene)=>{
    const Wuhan_Buildings = new CityBuildingLayer()
        .source(buildingData)
        .size('Elevation', (h) => h)
        .color('rgba(242,246,250,1.0)')
        .animate({
            enable: true
        })
        .active({
            color: '#0ff',
            mix: 0.5
        })
        .style({
            opacity: 0.7,
            baseColor: 'rgb(16, 16, 16)',
            windowColor: 'rgb(30, 60, 89)',
            brightColor: 'rgb(255, 176, 38)',
            sweep: {
                enable: true,
                sweepRadius: 2,
                sweepColor: '#1990FF',
                sweepSpeed: 0.5,
                sweepCenter: [114.24424323776958, 30.496494154680008]
            }
        });
    scene.addLayer(Wuhan_Buildings)
    const Wuhan_Road = new LineLayer({
        name: '武汉道路'
    })
    Wuhan_Road.source(roadData)
        .size(1)
        .shape('line')
        .color('#1990FF')
        .animate({
            interval: 1,
            trailLength: 2,
            duration: 2
        })
    scene.addLayer(Wuhan_Road)

    // scene.addLayer(new PointLayer().source(point).size(5).shape('circle').color('#ffffff'))
}