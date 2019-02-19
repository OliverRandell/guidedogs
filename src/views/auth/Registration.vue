<template lang="html">
    <LayoutAuth>
        <h1>{{ title }}</h1>
        <p>Welcome to Guide Dogs...</p>
        <FormRegistration></FormRegistration>
    </LayoutAuth>
</template>

<script>
    import LayoutAuth from '../../components/common/layouts/layout-auth.vue';
    import FormRegistration from '../../components/common/auth/form-registration.vue';
    export default {
        name: 'Registration',
        components: {
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
        methods: {

        }
    }
</script>

<style lang="css">
</style>
