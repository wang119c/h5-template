<template>
    <div class="cate">
        <div class="cate-icon" :style="{ background: bgColor }">
            <img :src="imgSrc" alt="" />
        </div>
        <div class="cate-title">{{ title }}</div>
    </div>
</template>

<script setup lang="ts">
withDefaults(defineProps<{
    imgSrc: string;
    title: string;
    bgColor: string
}>(), {
    imgSrc: '',
    title: "默认值",
    bgColor: "#000"
})
</script>

<style scoped lang="less">
.cate {
    position: relative;
    width: 53px;
    height: 4.375rem;

    .cate-icon {
        width: 43px;
        height: 43px;
        margin: 0 auto;
        margin-bottom: .5625rem;
        border-radius: 20%;
        display: flex;
        justify-content: center;
        align-items: center;
        img {
            width: 26px;
            height: 26px;
            margin: 0 auto;
        }
    }

    .cate-title {
        font-size: 12px;
        text-align: center;
    }
}
</style>