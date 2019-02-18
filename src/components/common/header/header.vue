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

</style>
