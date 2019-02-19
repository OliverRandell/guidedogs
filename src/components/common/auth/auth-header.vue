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
    }
</style>
