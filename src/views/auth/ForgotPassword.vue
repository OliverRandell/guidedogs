<template lang="html">
    <LayoutAuth>
        <h1>Forgotten Password</h1>
        <p>Have you forgotten your password? No fear, it happens to the best of us, enter your email addres below and we'll send a new one out to you.</p>
        <p>Please use the email associated to your account.</p>
        
        <FormForgotPassword />

        <section class="form-actions" style="margin-top: 2rem;">
            <router-link to="/login">Back to Login</router-link>
            <router-link to="/register">Register a new account</router-link>
        </section>
    </LayoutAuth>
</template>

<script>
    import LayoutAuth from '../../components/common/layouts/layout-auth.vue';
    import FormForgotPassword from '../../components/common/auth/form-forgot-password.vue';
    export default {
        Name: 'ForgotPassword',
        components: {
            LayoutAuth,
            FormForgotPassword
        }
    }
</script>

<style lang="css">
.form-actions a{
    display: block;
}
</style>
