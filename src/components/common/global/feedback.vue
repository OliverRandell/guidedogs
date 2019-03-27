<template>
    <section class="feedback container">

        <div class="row">
            <div class="col-12">
                <h3>{{ msg }}</h3>
                <router-link to="/contact" class="btn btn-primary">Contact us</router-link>
            </div>
        </div>

    </section>
</template>

<script>

    export default {
        name: 'Feedback',
        data () {
            return {
                msg: "We'd love to hear from you, please feel free to contact us"
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import './src/assets/scss/vue.scss';
    .feedback {
        background-color: #EFEBEE;
        padding: 6rem 0;
        text-align: center;
        .highContrast & {
            background-color: $black;
        }
    }
    h3 {
        width: 50%;
        margin: 0 auto 3rem;

    }
</style>
