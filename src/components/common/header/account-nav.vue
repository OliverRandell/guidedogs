<template lang="html">
    <nav class="account-nav">
        <!-- <template v-if="isProfileLoaded"> -->
            <router-link to="/account"><strong>Welcome</strong> {{ account.user.username }}!</router-link>
            <router-link to="/preferences">Preferences</router-link>
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
    .account-nav {
        text-align: right;
        a {
            margin-right: 0.5rem;
        }
    }
</style>
