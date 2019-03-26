<template>
    <button class="btn btn-primary" type="button" @click="highContrast = !highContrast">Toggle Contrast</button>
</template>

<script>
    export default {
        name: 'ToggleContrast',
        props: ['highContrast'],
        // data() {
        //     return {
        //         highContrast: false
        //     }
        // }
    }
</script>

<style lang="css">
</style>
