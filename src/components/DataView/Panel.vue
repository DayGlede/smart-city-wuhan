<template>
    <div class="panel">
        <header class="panel-header">
            <slot name="header"></slot>
        </header>
        <hr>
        <!-- 展示数据部分 -->
        <div id="body">
            <slot></slot>
        </div>
    </div>
</template>

<script>
// export default {
//     data() {
//         return {
//             }
//     },
//     methods() {
//     },
// }
</script>

<style scoped>
* {
    margin: 0px;
    padding: 0px
}

.panel {
    min-width: 200px;
    min-height: 250px;
    max-width: 5500px;
    max-height: 500px;
    overflow: hidden;
    background-color: #53697670;
    color: white;
    border-radius: 5%;
    opacity: 1;
    padding: 2px 5px;
}

header {
    height: 25px;
    width: 100%;
    margin-bottom: 1px;
    text-align: center;
    line-height: 25px;
    font-size: 15px;
}

#body {
    min-height: 100px;
    margin: 4px 0 2px 0;
}
</style>