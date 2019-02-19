<template>
    <div id="app">
        <router-view></router-view>
    </div>
</template>

<script>
    export default {
        name: 'App',
        created: function () {
            if (this.$store.getters.isAuthenticated) {
                this.$store.dispatch(USER_REQUEST)
            }
        }
    }
</script>

<style lang="scss">
    @import './assets/scss/app.scss';
</style>
