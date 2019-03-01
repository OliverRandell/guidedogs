<template lang="html">
    <nav class="primary-nav">
        <router-link v-for="item in navItems" :to="item.route" :key="item.id" class="nav-item">{{ item.title }}</router-link>
    </nav>
</template>

<script>
    //import { mapGetters, mapState } from 'vuex';
    //import { AUTH_LOGOUT } from '../../../store/actions/auth';
    export default {
        name: 'PrimaryNav',
        data () {
            return {
                navItems: [
                    {
                        id: 0,
                        title: 'Home',
                        route: '/'
                    },
                    {
                        id: 1,
                        title: 'Events',
                        route: 'events'
                    },
                    {
                        id: 2,
                        title: 'Information',
                        route: 'information'
                    },
                    {
                        id: 3,
                        title: 'My Account',
                        route: 'account'
                    },
                    {
                        id: 4,
                        title: 'Contact Us',
                        route: 'contact'
                    }
                ]
            }
        },
        // methods: {
        //     logout: function () {
        //         this.$store.dispatch(AUTH_LOGOUT).then(() => this.$router.push('/login'))
        //     }
        // },
        // computed: {
        //     ...mapGetters(['getProfile', 'isAuthenticated', 'isProfileLoaded']),
        //     ...mapState({
        //         authLoading: state => state.auth.status === 'loading',
        //         name: state => `${state.user.profile.title} ${state.user.profile.name}`,
        //     })
        // }
    }
</script>

<style lang="scss" scoped>
    @import './src/assets/scss/vue.scss';
    .primary-nav {
        text-align: right;
    }
    .nav-item {
        margin-left: 1rem;
        &:first-child {
            margin-left: 0;
        }
    }
</style>
