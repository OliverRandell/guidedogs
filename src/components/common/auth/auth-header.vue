<template lang="html">
    <header class="auth-header">
        <branding></branding>
    </header>
</template>

<script>
    import Branding from '../header/branding.vue';
    export default {
        name: 'AuthHeader',
        components: {
            Branding
        }
    }
</script>

<style lang="scss" scoped>
    @import './src/assets/scss/vue';
    .auth-header {
        @include make-container();
        max-width: 100%;
        width: 100%;
        background: $white;
        padding-top: 1rem;
        padding-bottom: 1rem;
        position: absolute;
        top: 0;
        left: 0;
        @include media-breakpoint-down(md) {
            position: relative;
            margin-bottom: 4rem;
        }
    }

</style>
