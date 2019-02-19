<template lang="html">
    <article class="user-auth">
        <auth-header></auth-header>
        <div class="container-fluid">
            <section class="wrapper">
                <slot></slot>
            </section>
        </div>
    </article>
</template>

<script>
    import AuthHeader from '../auth/auth-header.vue';
    export default {
        name: 'LayoutAuth',
        components: {
            AuthHeader
        }
    }
</script>

<style lang="css">
</style>
