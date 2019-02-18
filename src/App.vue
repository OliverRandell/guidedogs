<template>
    <div id="app">
        <header></header>
        <!-- <h1>This is the header</h1> -->
        <router-view></router-view>
        <footer></footer>
    </div>

</template>

<script>

import Header from './components/common/header/header.vue';
import Footer from './components/common/footer.vue';
export default {
    components: {
        Header,
        Footer
    }
}
</script>

<style lang="scss">
    @import './assets/scss/styles.scss';
</style>
