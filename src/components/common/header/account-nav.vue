<template lang="html">
    <nav class="account-nav">
        <template v-if="isProfileLoaded">
            <router-link to="/account"><strong>Welcome</strong> {{ name }}</router-link>
            <router-link to="/preferences">Preferences</router-link>
        </template>
        <button v-if="isAuthenticated" @click="logout" role="button" class="btn btn-primary">
            <span class="logout">Logout</span>
        </button>
        <template v-if="!isAuthenticated && !authLoading">
            <router-link to="/login">Login</router-link>
        </template>
    </nav>
</template>

<script>
    import { mapGetters, mapState } from 'vuex';
    import { AUTH_LOGOUT } from '../../../store/actions/auth';
    export default {
        name: 'AccountNav',
        methods: {
            logout: function () {
                this.$store.dispatch(AUTH_LOGOUT).then(() => this.$router.push('/login'))
            }
        },
        computed: {
            ...mapGetters(['getProfile', 'isAuthenticated', 'isProfileLoaded']),
            ...mapState({
                authLoading: state => state.auth.status === 'loading',
                name: state => `${state.user.profile.title} ${state.user.profile.name}`,
            })
        }
    }
</script>

<style lang="scss" scoped>
    .account-nav {
        text-align: right;
        a {
            margin-right: 0.5rem;
        }
    }
</style>
