<template lang="html">
    <nav class="account-nav">
        <!-- <template v-if="isProfileLoaded"> -->
        <router-link to="/preferences" class="nav-item">Preferences</router-link>
        <!-- </template> -->
        <router-link to="/login" class="btn btn-primary">Logout</router-link>
        <!-- <button v-if="isAuthenticated" @click="logout" role="button" >
            <span class="logout">Logout</span>
        </button> -->
        <!-- <template v-if="!isAuthenticated && !authLoading">
            <router-link to="/login">Login</router-link>
        </template> -->
    </nav>
</template>

<script>
    import { mapActions, mapState } from 'vuex';
    export default {
        name: 'AccountNav',
        computed: {
            //...mapGetters(['getProfile', 'isAuthenticated', 'isProfileLoaded']),
            ...mapState({
                account: state => state.account,
                users: state => state.users.all
                // authLoading: state => state.auth.status === 'loading',
                // name: state => `${state.user.profile.title} ${state.user.profile.name}`,
            })
        },
        created () {
            this.getAllUsers();
        },
        methods: {
            ...mapActions('users', {
                getAllUsers: 'getAll',
                deleteUser: 'delete'
            })
            // logout: function () {
            //     this.$store.dispatch(AUTH_LOGOUT).then(() => this.$router.push('/login'))
            // }
        },
    }
</script>

<style lang="scss" scoped>
    @import './src/assets/scss/vue.scss';
    .account-nav {
        text-align: right;
        display: flex;
        align-items: center;
        a {
            margin-left: 1rem;
        }
    }
</style>
