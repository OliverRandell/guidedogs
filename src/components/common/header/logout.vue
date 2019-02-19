<template lang="html">
    <button type="button" name="button">Logout</button>
</template>

<script>
    export default {
        name: 'logout',
        methods: {
            logout: function () {
                this.$store.dispatch(AUTH_LOGOUT).then(() => this.$router.push('/login'))
            }
        },
    }
</script>

<style lang="css">
</style>
