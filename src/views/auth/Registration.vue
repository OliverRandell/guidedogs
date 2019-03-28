<template lang="html">
    <LayoutAuth>
        <h1>{{ title }}</h1>
        <p v-html="intro"></p>
        <FormRegistration></FormRegistration>
        <router-link to="/login">&larr; Back to login</router-link>
    </LayoutAuth>
</template>

<script>
    import LayoutAuth from '../../components/common/layouts/layout-auth.vue';
    import FormRegistration from '../../components/common/auth/form-registration.vue';
    export default {
        name: 'Registration',
        components: {
            LayoutAuth,
            FormRegistration
        },
        data () {
            return {
                title: 'Register an account!',
                intro: `Let's get started! Please enter your details below:`,
                user: {
                    password: null
                }
            }
        },
    }
</script>

<style lang="css">
</style>
