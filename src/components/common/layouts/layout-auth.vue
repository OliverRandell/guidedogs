<template lang="html">
    <article class="user-auth">
        <auth-header></auth-header>
        <main class="container-fluid" tabIndex="-1">
            <section class="wrapper">
                <slot></slot>
            </section>
        </main>
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

<style lang="scss" scoped>
    @import "./src/assets/scss/vue";
    .user-auth {
        min-height: 100%;
        background-color: $light;
        @include media-breakpoint-down(md) {
            padding-bottom: 4rem;
        }
        @include media-breakpoint-up(lg) {
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
        }
    }
    .wrapper {
        background-color: $white;
        padding: 2rem 1rem;
        border-radius: 0.25rem;
        display: flex;
        margin: 6rem auto;
        flex-direction: column;
        @include media-breakpoint-only(sm) {
            max-width: 80%;
        }
        @include media-breakpoint-only(md) {
            max-width: 60%;
        }
        @include media-breakpoint-only(lg) {
            max-width: 40%;
        }
        @include media-breakpoint-up(xl) {
            max-width: 28rem;
        }
    }

</style>
