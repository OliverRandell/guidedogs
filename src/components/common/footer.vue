<template lang="html">
    <footer class="app-footer" role="contentinfo">
        <section class="footer-wrapper container">
            <p>&copy; Guide Dogs Victoria</p>
        </section>
    </footer>
</template>

<script>
    export default {
    }
</script>

<style lang="scss" scoped>
    @import './src/assets/scss/vue.scss';
    .app-footer {
        height: $footer-height;
        width: 100%;
        background-color: $black;
        color: $white;
        //padding: 2rem 0;
        //position: fixed;
        bottom: 0;
        p {
            margin-bottom: 0;
        }
    }
    .footer-wrapper {
        display: flex;
        align-items: center;
        height: 100%;
    }
</style>
