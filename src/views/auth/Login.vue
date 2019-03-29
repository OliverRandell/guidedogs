<template lang="html">
    <LayoutAuth>
        <h1>{{ title }}</h1>
        <h4>Welcome to Peer Support Platform</h4>
        <p>Please login to your account below.<br>
        Or <router-link to="/register">register an account </router-link>to get started.</p>
        <FormLogin />
        <router-link to="/forgot-password" class="btn btn-link">Forgotten Password</router-link>

    </LayoutAuth>

</template>

<script>
    import LayoutAuth from '../../components/common/layouts/layout-auth.vue';
    import FormLogin from '../../components/common/auth/form-login.vue';
    export default {
        name: 'UserLogin',
        components: {
            LayoutAuth,
            FormLogin,
        },
        data () {
            return {
                title: 'Login'
            }
        }
    }
</script>

<style lang="css">
</style>
