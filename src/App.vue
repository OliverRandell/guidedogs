<template>
    <div id="app">
        <div :class="`alert ${alert.type}`" v-if="alert.message">{{ alert.message }}</div>
        <router-view></router-view>
    </div>
</template>

<script>
    import { mapState, mapActions } from 'vuex';
    export default {
        name: 'App',
        computed: {
            ...mapState({
                alert: state => state.alert
            })
        },
        methods: {
            ...mapActions({
                clearAlert: 'alert/clear'
            })
        },
        watch: {
            $route (to, from) {
                // CLEAR ALERT ON LOCATION CHANGE
                this.clearAlert();
            }
        }
        // created: function () {
        //     if (this.$store.getters.isAuthenticated) {
        //         this.$store.dispatch(USER_REQUEST)
        //     }
        // }
    };
</script>

<style lang="scss">
    @import './assets/scss/app.scss';
</style>
