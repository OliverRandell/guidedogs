<template lang="html">
    <header class="app-header" role="banner">
        <a href="#content" id="skip-to-content">Skip to main content</a>
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
        .highContrast & {
            background-color: $black;
        }
    }
    .nav-wrapper {
        display: flex;
        align-items: center;
    }
    #skip-to-content {
        padding: 1em;
        position: absolute;
        top: -100px;
        left: 1em;
        z-index: 1000;
        color: white;
        &:focus {
            position: absolute;
            top: 0;
            background: #222;
        }
    }
</style>
