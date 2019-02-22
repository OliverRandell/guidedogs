<template lang="html">
    <router-link to="/" class="app-branding">
        <!-- LOGO CAN GO IN HERE IF WE'RE HAVING ONE -->
        <Logo></Logo>
        <!-- <h1>This is the Guide Dogs project</h1> -->
    </router-link>
</template>

<script>
    import Logo from '../branding/logo.vue';
    export default {
        name: 'Branding',
        components: {
            Logo
        }
    }
</script>

<style lang="css">
</style>
