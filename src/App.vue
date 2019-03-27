<template>
    <div id="app" :class="{ 'highContrast': highContrast}">
        <div :class="`alert ${alert.type}`" v-if="alert.message">{{ alert.message }}</div>
        <router-view v-on:toggle-contrast="toggleContrast"></router-view>
    </div>
</template>

<script>
    import { mapState, mapActions } from 'vuex';
    export default {
        name: 'App',
        data() {
            return {
                highContrast: false,
            }
        },
        computed: {
            ...mapState({
                alert: state => state.alert
            })
        },
        methods: {
            toggleContrast: function(highContrast) {
                this.highContrast = highContrast;
            },
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
