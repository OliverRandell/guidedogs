<template lang="html">
    <footer class="app-footer">
        <section class="footer-wrapper container">
            <p>&copy; Guide Dogs</p>
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
        height: 3rem;
        width: 100%;
        background-color: $black;
        color: $white;
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
