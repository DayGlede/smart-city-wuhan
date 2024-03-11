<template>
    <div id='app'>
        <!-- 加载某个视图时显示进度条 -->
        <div class="progress-bar" v-if="renderView && !renderProgressBar">
            <ProgressBarPanel />
        </div>
        <!-- 底部工具箱 -->
        <BottomTool v-model:valveForLayer="renderView" v-model:renderProgressBar="renderProgressBar"
            @eventData="(data) => { eventData = data }" />
    </div>
</template>

<script>
import BottomTool from "@/components/InquireView/BottomTool.vue";
import ProgressBarPanel from "@/components/InquireView/ProgressBarPanel.vue";
// import { computed } from "vue";
export default {
    components: {
        BottomTool,
        ProgressBarPanel
    },
    data() {
        return {
            renderProgressBar: false, // the valve 控制进度条，面板是否显示
            eventData: [],
        }
    },
    methods: {
    },
    mounted() {
    },
    watch: {
    }
}
</script>

<style scoped>
* {
    margin: 0px;
    padding: 0px
}

.progress-bar {
    position: absolute;
    width: var(--width);
    height: var(--height);
    --width: 21vw;
    --height: 2vh;
    overflow: hidden;
    left: calc((100vw - var(--width)) / 2);
    top: calc((100vh - var(--height)) / 2);
    opacity: 0.8;
}
</style>