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

                    <form class="form-contact" @submit.prevent="submitContactForm" v-if="!submitted">
                        <fieldset>
                            <legend>Share any feedback or questions you have with us.</legend>
                            <p v-if="formErrors.length" role="alert" aria-atomic="true">
                                <b>Please correct the following error(s):</b>
                                <ul>
                                    <li v-for="(error, index) in formErrors" :key="index">{{ error }}</li>
                                </ul>
                            </p>
                            <div class="form-group">
                                <label for="givenName">First name:</label>
                                <input type="text" name="givenName" v-model="user.givenName" v-validate="'required|alpha'" :class="['form-control', {'input': true, 'is-danger': errors.has('givenName') }]" placeholder="Enter your first name">
                                <small class="form-text">Enter your first name</small>
                            </div>
                            <div class="form-group">
                                <label for="familyName">Last name:</label>
                                <input type="text" name="familyName" v-model="user.familyName" v-validate="'required|alpha'" :class="['form-control', {'input': true, 'is-danger': errors.has('familyName') }]" placeholder="Enter your last name">
                                <small class="form-text">Enter your last name</small>
                            </div>

                            <div class="form-group">
                                <label for="email">Email address:</label>
                                <input type="email" name="email" v-model="user.email" v-validate="'required|email'" :class="['form-control', {'input': true, 'is-danger': errors.has('email')}]" placeholder="Enter your email...">
                            </div>
                            <div class="form-group">
                                <label for="phoneNumber">Phone Number:</label>
                                <input type="text" name="phoneNumber" v-model="user.phoneNumber" v-validate="'required|numeric'" :class="['form-control', {'input': true, 'is-danger': errors.has('phoneNumber') }]" placeholder="Enter your phone number">
                            </div>
                            <div class="form-group">
                                <label for="message">Write your message:</label>
                                <textarea name="message" rows="8" cols="80" class="form-control" id="message" v-model="message.text" :maxlength="message.maxlength"></textarea>
                                <span class="counter">{{ message.text.length }} / {{ message.maxlength }}</span>
                            </div>
                            <div class="btn-wrapper">
                                <input type="submit" @click.prevent="submitContactForm" value="Send form" class="btn btn-primary">
                            </div>

                        </fieldset>


                    </form>

                    <section class="msg-thanks" v-if="submitted">
                        <h3>Thanks for your message</h3>
                    </section>

                </div>

            </section>

        </div>
    </LayoutMaster>
</template>

<script>
    import { mapState, mapActions } from 'vuex';
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
                formErrors: [],
                title: 'Contact us.',
                tagline: 'Use the form below to get in touch.',
                user: {
                    givenName: '',
                    familyName: '',
                    email: '',
                    phoneNumber: '',
                },
                message: {
                    text: `Write your message in here...`,
                    maxlength: 1000
                },
                submitted: false,
            }
        },
        // computed: {
        //     ...mapState('account')
            // message: {
            //     get () {
            //         return this.$store.state.message;
            //     },
            //     set (val) {
            //         this.$store.commit('UPDATE_MESSAGE', val);
            //     }
            // }
        // },
        // methods: {
        //     ...mapActions('account'),
            // checkForm() {
            //     this.formErrors = [];
            //     if (!this.message.text) { this.formErrors.push('Message is required') }
            //     return this.formErrors.length > 0;
            // }

            // handleSubmit() {
            //     this.submitted = true;
            //     this.$validator.validate().then(valid => {
            //         if(valid) {
            //             this.
            //         }
            //     })
            // },
            // submitContactForm() {
            //     this.$validator.validateAll().then((result) => {
            //         if (result) {
            //             alert('Form Submitted!');
            //             return;
            //         }
            //         alert('Correct the errors!');
            //     });
            // }
        // }
    }
</script>

<style lang="scss" scoped>
    @import './src/assets/scss/app.scss';
    input[type="submit"] {
        float: right;
    }
</style>
