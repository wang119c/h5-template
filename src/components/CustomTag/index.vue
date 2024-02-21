<template>
    <div class="tag" :style="borderStyle">{{ title }}</div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = withDefaults(defineProps<{
    borderColor?: string;
    title?: string;
    bgColor?: string;
}>(), {
    borderColor: '#000',
    title: "默认值",
    bgColor: "#000",
})

const borderStyle = computed(() => {
    return {
        'border': `1px solid ${props.borderColor}`,
        'background': props.bgColor,
        'color': props.borderColor
    }
})

</script>

<style scoped lang="less">
.tag {
    font-size: 10px;
    padding: 2px 5px;
    border-radius: 4px;
}
</style>