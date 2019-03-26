<template lang="html">
    <LayoutMaster>
        <hero>
            <template slot="title">
                {{ title }}
            </template>
            <template slot="description">
                <span>{{ tagline }}</span>
            </template>
        </hero>

        <div class="container">
            <section class="pg-content layout-single-col" tabindex="-1">
                <div>

                    <form class="form-contact" @submit.prevent="submitContactForm">
                        <fieldset>
                            <legend>Share any feedback or questions you have with us.</legend>
                            <div class="form-group">
                                <label for="givenName">First name:</label>
                                <input type="text" name="givenName" v-model="givenName" v-validate="'required|alpha'" :class="['form-control', {'input': true, 'is-danger': errors.has('givenName') }]" placeholder="Enter your first name">
                                <small class="form-text">Enter your first name</small>
                            </div>
                            <div class="form-group">
                                <label for="familyName">Last name:</label>
                                <input type="text" name="familyName" v-model="familyName" v-validate="'required|alpha'" :class="['form-control', {'input': true, 'is-danger': errors.has('familyName') }]" placeholder="Enter your last name">
                                <small class="form-text">Enter your last name</small>
                            </div>

                            <div class="form-group">
                                <label for="email">Email address:</label>
                                <input type="email" name="email" v-model="email" v-validate="'required|email'" :class="['form-control', {'input': true, 'is-danger': errors.has('email')}]" placeholder="Enter your email...">
                            </div>
                            <div class="form-group">
                                <label for="phoneNumber">Phone Number:</label>
                                <input type="text" name="phoneNumber" v-validate="'required|numeric'" :class="['form-control', {'input': true, 'is-danger': errors.has('phoneNumber') }]" placeholder="Enter your phone number">
                            </div>
                            <div class="form-group">
                                <label for="message">Write your message:</label>
                                <textarea name="message" rows="8" cols="80" class="form-control" id="message" v-model="message.text" :maxlength="message.maxlength"></textarea>
                                <span class="counter">{{ message.text.length }} / {{ message.maxlength }}</span>
                            </div>
                            <div class="btn-wrapper">
                                <input type="submit" name="" value="Send form" class="btn btn-primary">
                            </div>

                        </fieldset>


                    </form>

                </div>

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
                title: 'Contact us.',
                tagline: 'Use the form below to get in touch.',
                givenName: '',
                familyName: '',
                email: '',
                phoneNumber: '',
                message: {
                    text: `Write your message in here...`,
                    maxlength: 1000
                },
                submitted: false
            }
        },
        methods: {
            submitContactForm() {
                this.$validator.validateAll().then((result) => {
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
</style>
