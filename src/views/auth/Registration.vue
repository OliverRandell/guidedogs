<template lang="html">
    <LayoutAuth>
        <h1>{{ title }}</h1>
        <p>Welcome to Guide Dogs...</p>
        <FormRegistration></FormRegistration>
        <router-link to="/login">Back to login</router-link>
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
                title: 'Create an account',
                user: {
                    password: null
                }
            }
        },
    }
</script>

<style lang="css">
</style>
