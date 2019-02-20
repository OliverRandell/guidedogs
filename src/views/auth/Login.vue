<template lang="html">
    <LayoutAuth>
        <h1>{{ title }}</h1>
        <p>Welcome to 'Insert name of product here'! Please login to your account if you're already a user or
            <router-link to="/register">create a new account with us</router-link>
        </p>
        <FormLogin></FormLogin>
        <router-link to="/register">Register an account with us</router-link>
        <router-link to="/forgot-password">Forgot password?</router-link>
    </LayoutAuth>

</template>

<script>
    import LayoutAuth from '../../components/common/layouts/layout-auth.vue';
    import FormLogin from '../../components/common/auth/form-login.vue';
    export default {
        name: 'UserLogin',
        components: {
            LayoutAuth,
            FormLogin
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
