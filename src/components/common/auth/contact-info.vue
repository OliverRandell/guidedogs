<template>
    <article class="auth-contact">
        <p>Questions or Feedback?
            <br>Contact Guide Dogs Victoria on
            <br><ContactTel />
            <br><ContactEmail />
        </p>
    </article>
</template>

<script>
    import ContactTel from './contact-tel.vue';
    import ContactEmail from './contact-email.vue';
    export default {
        name: 'ContactInfo',
        components: {
            ContactTel,
            ContactEmail
        }
    }
</script>

<style lang="scss" scoped>
    @import "./src/assets/scss/vue";
    .auth-contact {
        text-align: center;
        @include spacer(2rem);
    }
</style>
