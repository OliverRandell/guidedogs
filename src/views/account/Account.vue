<template lang="html">
    <LayoutMaster>
        <hero>
            <template slot="title">
                <h1>My Account</h1>
            </template>
        </hero>

        <div class="container">
            <section class="pg-content">
                <article class="item-wrapper" role="article" tabindex="-1" ref="formAccount">
                    <h4>Manage your account details:</h4>
                    <p>This information will assit us to currate personalised content.</p>

                    <p class="formErrors" v-if="formErrors.length" role="alert" aria-atomic="true">
                        <b>Please correct the following error(s):</b>
                        <ul>
                            <li v-for="(error, index) in formErrors" :key="index">{{ error }}</li>
                        </ul>
                    </p>

                    <!-- INCLUDE AGE DETAILS, NAME, nickName, POSTCODE, INTERESTS -->
                    <form class="spacer" @submit.prevent="onSubmit" aria-label="Your details">
                        <!-- NB: I DON'T THINK THAT THE USER CAN CHANGE THEIR EMAIL -->
                        <div class="form-group">
                            <label for="email">Email:</label>
                            <input type="text" id="email" class="form-control" disabled v-model="user.email">
                        </div>
                        <div class="form-group">
                            <label for="givenName">First Name*:</label>
                            <input type="text" id="givenName" placeholder="" v-model="user.givenName" class="form-control" aria-required="true">
                        </div>
                        <div class="form-group">
                            <label for="familyName">Last Name*:</label>
                            <input type="text" id="familyName" placeholder="" v-model="user.familyName" class="form-control" aria-required="true">
                        </div>
                        <div class="form-group">
                            <label for="nickName">Nick Name/Display Name*:</label>
                            <!-- <editable-input v-model="userDetailsForm.name" change-button-label="Edit" save-button-label="Save" @saved="updateProfile"></editable-input> -->
                            <input type="text" id="nickName" v-model="user.nickName" class="form-control" aria-required="true">
                        </div>
                        <!-- <div class="form-group">
                            <label for="phone">Phone Number:</label>
                            <input type="text" id="phone" class="form-control" v-model="user.phoneNumber">
                        </div> -->
                        <div class="form-group">
                            <label for="dob">DOB (DD/MM/YYYY):</label>
                            <input @input="validateAge" type="text" id="dob" class="form-control" v-model="user.dob">
                        </div>
                        <!-- TODO: Check if ross can add this to his db -->
                        <!-- <div class="form-group">
                            <label for="postcode">Postcode:</label>
                            <input type="text" name="postcode" value="postcode" class="form-control" v-model="user.postcode">
                            <small class="form-text">We'd like your postcode to find out who is where!</small>
                        </div> -->
                        <!-- <fieldset class="form-group">

                            <div class="row">
                                <legend class="col-form-label col-sm-12 pt-0">Type:</legend>

                                <div class="col-sm-12">
                                    <div class="custom-control custom-checkbox">
                                        <input type="checkbox" class="custom-control-input" id="social">
                                        <label class="custom-control-label" for="social">Social</label>
                                    </div>
                                    <div class="custom-control custom-checkbox">
                                        <input type="checkbox" class="custom-control-input" id="arts">
                                        <label class="custom-control-label" for="arts">Arts</label>
                                    </div>
                                    <div class="custom-control custom-checkbox">
                                        <input type="checkbox" class="custom-control-input" id="information">
                                        <label class="custom-control-label" for="information">Information</label>
                                    </div>
                                    <div class="custom-control custom-checkbox">
                                        <input type="checkbox" class="custom-control-input" id="sports">
                                        <label class="custom-control-label" for="sports">Sports and fitness</label>
                                    </div>
                                    <small class="form-text">You can select multiple interests</small>
                                </div>

                            </div>
                        </fieldset> -->
                        <!-- <div class="form-group">
                            <label for="">Talk to me about:</label>
                            <textarea name="name" rows="8" cols="80" class="form-control" placeholder="Example: my new guide dog Toby, best coffee spots in Kew and I want to learn more about JAWS"></textarea>
                            <small class="sr-only form-text">Example: my new guide dog Toby, best coffee spots in Kew and I want to learn more about JAWS</small>
                        </div> -->
                        <div class="btn-wrapper">
                            <Loader class="spinner" v-if="loading.form"/>
                            <button type="submit" @click.prevent="onSubmit" class="btn btn-primary col-5">Update your account</button>
                        </div>

                        <section class="success" v-if="success.form">Updated successfully!</section>
                        <section class="error" v-if="error.form">Sorry, your details can't be updated right now, please try again later.</section>
                    </form>

                    <form class="form-change-password spacer" aria-label="Update Password">
                        <h4>Change password</h4>
                        <div class="form-group">
                            <label for="current_password">Current Password</label>
                            <input type="password" @input="checkPassword" id="current_password" v-model="changePasswordForm.oldPassword" class="form-control" aria-required="true">
                        </div>
                        <div class="form-group">
                            <label for="new_password">New Password</label>
                            <input type="password" @input="checkPassword" id="new_password" v-model="changePasswordForm.newPassword" class="form-control" aria-required="true">
                        </div>
                        <div class="form-group">
                            <label for="confirm_password">Confirm new Password</label>
                            <input type="password" @input="checkPassword" id="confirm_password" v-model="changePasswordForm.newPasswordConfirmation" class="form-control" aria-required="true">
                        </div>
                        <div class="btn-wrapper">
                            <Loader class="spinner" v-if="loading.password" />
                            <button :disabled="!canChangePassword" @click.prevent="updatePassword" id="password"  class="btn btn-primary col-5">Change password</button>
                        </div>

                        <section class="success" v-if="success.password">Updated successfully!</section>
                        <section class="error" v-if="error.password">Sorry, your password can't be updated right now, please try again later.</section>
                    </form>

                    <section class="spacer" aria-label="Delete Account">
                        <div class="custom-control custom-switch spacer">
                            <input type="checkbox" class="custom-control-input" id="confirmDelete" v-model="confirmDelete">
                            <label class="custom-control-label" for="confirmDelete">Do you want to delete this account?</label>
                        </div>
                        <div v-if="confirmDelete">
                            <p>No longer want to be part of the Peer Support Platform community?</p>
                            <p><button @click="onDeleteAccount(account)" type="button" class="btn btn-primary btn-delete">Delete Account</button></p>
                        </div>

                    </section>

                    <section v-if="submitted && confirmDelete" class="msg-success">
                        <h3>Your account has been deleted</h3>
                        <router-link to="/login" class="btn btn-primary">Login</router-link>
                    </section>

                </article>
                <aside class="items-sidebar">
                    <!-- TABS GO IN HERE. DETAILS, EVENTS & IDEAS & SETTINGS -->
                </aside>

            </section>
        </div>

    </LayoutMaster>
</template>

<script>
    import { mapActions, mapGetters } from 'vuex';
    import moment from 'moment'
    import axios from 'axios';
    import { authHeader } from '@/utils/auth-header';
    import { apiUrl } from '@/utils/api';
    import LayoutMaster from '../../components/common/layouts/layout-master.vue';
    import Hero from '../../components/common/global/hero.vue';
    import Loader from '@/components/common/global/loading'


    export default {
        name: 'Account',
        components: {
            LayoutMaster,
            Hero,
            Loader
        },

        data() {
            return {
                formErrors: [],
                title: 'Account page',
                tagline: 'Review and edit your personal details here',
                user: {
                    givenName: '',
                    familyName: '',
                    nickName: '',
                    age: '',
                    dob: '',
                    email: '',
                },
                confirmDelete: false,
                submitted: false,
                changePasswordForm: {
                    oldPassword: '',
                    newPassword: '',
                    newPasswordConfirmation: '',
                },
                canChangePassword: false,
                loading: {
                    initial: true,
                    form: false,
                    password: false
                },
                success: {
                    form: false,
                    password: false
                },
                error: {
                    form: false,
                    password: false
                }
            }
        },

        created () {
            this.getProfileData()
        },

        methods: {
            ...mapActions(['getMemberProfile']),

            /* Running the axios without store just for simplicity of not
            having to do set/get computed functions to the store and back with limited time */
            getProfileData () {
                axios.get(`${apiUrl}/MemberProfile`, { headers: { ...authHeader() } })
                    .then(({data}) => {
                        this.loading.initial = false
                        // go through and match existing keys...
                        Object.keys(this.user).map(user => Object.keys(data).map(field => {
                            if (user === field) {
                                // assign the relevant data to existing fields
                                this.user[user] = data[field]
                            }
                        }))

                        if (this.user.dob.length > 0) {
                            this.user.dob = moment(this.user.dob).format('DD/MM/YYYY')
                        }
                    })
                    .catch(err => {
                        this.loading.initial = false
                        console.error(`Couldn't retrieve profile data: ${err}`)
                    })
            },

            updateProfileData () {
                this.loading.form = true
                this.success.form = false
                this.error.form = false

                const user = this.user

                const convertDobFormat = ({dob, ...user}) => ({ ...user, dob: moment(dob, 'DD/MM/YYYY').format('YYYY/MM/DD') })

                axios.put(`${apiUrl}/MemberProfile`,
                    { ...convertDobFormat(user) },
                    { headers: { ...authHeader() } }
                )
                    .then(() => {
                        this.loading.form = false
                        this.success.form = true

                        setTimeout(() => {
                            this.success.form = false
                        }, 8000);
                    })
                    .catch(err => {
                        this.loading.form = false
                        this.error.form = true
                        console.error(`Couldn't update profile data: ${err}`)
                    })
            },

            checkForm() {
                this.formErrors = [];
                if(!this.user.givenName) { this.formErrors.push('First name is required') }
                if(!this.user.familyName) { this.formErrors.push('Last name is required') }
                if(!this.user.nickName) { this.formErrors.push('nickName is required') }
                if(this.user.age && !this.validateAge) { this.formErrors.push('You need to be over 18')}
                return this.formErrors.length > 0;
            },

            validateAge () {
                var eighteenYearsAgo = moment().subtract(18, 'years');
                var dob = moment(this.user.dob);

                if (!dob.isValid()) return false

                return eighteenYearsAgo.isAfter(dob)
            },

            onDeleteAccount(account) {
                this.deleteAccount(account.id).then(() => {
                    this.submitted = true;
                });
            },

            onSubmit() {
                const formHasErrors = this.checkForm();

                if ( formHasErrors ) {
                    window.scrollTo(0, this.topOffset);
                    this.setFocusToErrorListing();
                    return;
                }

                this.updateProfileData()
            },

            setFocusToErrorListing() {
                this.$refs.formAccount.focus();
            },

            checkPassword () {
                const pForm = this.changePasswordForm
                const matches = pForm.newPassword === pForm.newPasswordConfirmation

                let fieldLengths = 0

                // If fieldLengths = 3, all fields have 6 characters or more.
                Object.values(pForm).map(val => {
                    val.length >= 6 ? fieldLengths++ : fieldLengths--
                })

                matches && fieldLengths === 3 ? this.canChangePassword = true : this.canChangePassword = false
            },

            updatePassword () {
                this.loading.password = true
                this.success.password = false
                this.error.password = false

                if (this.canChangePassword) {
                    axios.post(`${apiUrl}/authentication/changepassword`, {
                            oldPassword: this.changePasswordForm.oldPassword,
                            newPassword: this.changePasswordForm.newPassword
                        },
                        { headers: { ...authHeader() } }
                    )
                    .then(() => {
                        this.success.password = true
                        this.loading.password = false

                        Object.keys(this.changePasswordForm).map(key => {
                            this.changePasswordForm[key] = ''
                        })

                        setTimeout(() => {
                            this.success.password = false
                        }, 8000);
                    })
                    .catch(err => {
                        this.loading.password = false
                        this.error.password = true
                        console.error(`Can't update password: ${err}`)
                    })
                }
            },

            ...mapActions(['getMemberProfile', 'deleteAccount'])
        },

        computed: {
            ...mapGetters(['memberProfile']),
            topOffset: function() {
                const element = this.$refs.formAccount;
                const top = element.offsetTop;
                return top;
            },
        }
    }
</script>

<style lang="scss" scoped>
    @import './src/assets/scss/app.scss';
    .profile-pod {
        display: flex;
        margin-top: 2rem;
        img {
            width: 120px;
            height: 120px;
            border-radius: 50%;
            border: 1px solid $gray-400;
            margin-right: 1rem;
        }
    }
    .my-events {
        display: block;
        ul {
            list-style: none;
            margin: 0;
            padding: 0;
        }
    }
    .spinner{
        display: inline;
        text-align: right;
        height: 40px;
        margin-left: auto;
        margin-right: 0;
    }

    .success,
    .error{
        text-align: right;
        margin-top: 1em;
    }

    .success{
        color: green;
        font-size: 16px;
    }
</style>
