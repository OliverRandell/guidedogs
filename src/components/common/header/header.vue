<template lang="html">
    <header class="app-header" role="banner">
        <Branding></Branding>
        <div class="nav-wrapper">
            <PrimaryNav></PrimaryNav>
            <AccountNav></AccountNav>
        </div>

    </header>
</template>

<script>
    import Branding from './branding';
    import AccountNav from './account-nav.vue';
    import PrimaryNav from './primary-nav.vue';
    export default {
        components: {
            Branding,
            AccountNav,
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
        //border-bottom: 1px solid $gray-200;
        align-items: center;
        padding-top: .5rem;
        padding-bottom: .5rem;
        //@include spacer(2rem);
        height: 6rem;
        background-color: $secondary;
    }
    .nav-wrapper {
        display: flex;
        align-items: center;
    }
</style>
