<template lang="html">
    <LayoutMaster>
        <hero>
            <template slot="title">
                <h1>Contact us</h1>
            </template>
            <template slot="description">
                Get in touch!
            </template>
        </hero>

        <div class="container">
            <section class="pg-content" tabindex="-1">

                <form class="col-12 col-lg-6 form-contact" @submit.prevent="submitContactForm">
                    <fieldset>
                        <legend>'Name of app' contact form</legend>
                        <div class="form-group">
                            <label for="name">Name</label>
                            <input type="text" name="name" v-model="name" v-validate="'required|alpha'" :class="['form-control', {'input': true, 'is-danger': errors.has('name') }]" placeholder="Enter your name">
                        </div>
                        <div class="form-group">
                            <label for="email">Email</label>
                            <input type="email" name="email" v-model="email" v-validate="'required|email'" :class="['form-control', {'input': true, 'is-danger': errors.has('email')}]" placeholder="Enter your email...">
                        </div>
                        <div class="form-group">
                            <label for="phone">Phone Number</label>
                            <input type="text" name="phone" v-validate="'required|numeric'" :class="['form-control', {'inout': true, 'is-danger': errors.has('phone') }]" placeholder="Enter your phone number">
                        </div>
                        <div class="form-group">
                            <label for="message">Message</label>
                            <textarea name="message" rows="8" cols="80" class="form-control" id="message" v-model="message.text" :maxlength="message.maxlength"></textarea>
                            <span class="counter">{{ message.text.length }} / {{ message.maxlength }}</span>
                        </div>
                        <input type="submit" name="" value="Send form" class="btn btn-primary">
                    </fieldset>


                </form>

            </section>

        </div>
    </LayoutMaster>
</template>

<script>
    import LayoutMaster from '../components/common/layouts/layout-master.vue';
    import Hero from '../components/common/global/hero.vue';
    export default {
        name: 'Contact',
        components : {
            LayoutMaster,
            Hero
        },
        data () {
            return {
                name: '',
                email: '',
                phone: '',
                message: {
                    text: `Write your message in here...`,
                    maxlength: 255
                },
                submitted: false
            }
        },
        methods: {
            submitContactForm() {
                this.$validate.validateAll().then((result) => {
                    if (result) {
                        alert('Form Submitted!');
                        return;
                    }
                    alert('Correct the errors!');
                });
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import './src/assets/scss/app.scss';
    input[type="submit"] {
        float: right;
    }
    .form-contact {
        @include make-col-ready();
        @include make-col(12);
        @include media-breakpoint-up(lg) {
            @include make-col(6);
            @include make-col-offset(3)
        }
    }
</style>
