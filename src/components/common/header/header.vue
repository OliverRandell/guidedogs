<template lang="html">
    <header class="app-header">
        <Branding></Branding>
        <PrimaryNav></PrimaryNav>
    </header>
</template>

<script>
    import Branding from './branding';
    import PrimaryNav from './primary-nav.vue';
    export default {
        components: {
            Branding,
            PrimaryNav
        }
    }
</script>

<style lang="scss" scoped>
    @import './src/assets/scss/vue.scss';
    .app-header {
        @include make-container();
        max-width: 100%;
        display: flex;
        justify-content: space-between;
        border-bottom: 1px solid #bbb;
    }
</style>
