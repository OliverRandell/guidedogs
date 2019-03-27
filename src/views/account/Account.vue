<template lang="html">
    <LayoutMaster>
        <hero>
            <template slot="title">
                <!-- <h1>Hi {{ account.user.firstName }}!</h1> -->
                <h1>My account!</h1>
            </template>
        </hero>

        <div class="container">
            <section class="pg-content">
                <article class="item-wrapper" role="article" tabindex="-1">
                    <h4>Your details</h4>
                    <p>This information will assit us to currate personalised content.</p>
                    <!-- INCLUDE AGE DETAILS, NAME, USERNAME, POSTCODE, INTERESTS -->
                    <form class="spacer" @submit.prevent="onSubmit">
                        <div class="form-group">
                            <label for="givenName">First Name:</label>
                            <input type="text" name="" value="" placeholder="" v-model="user.givenName" class="form-control">
                        </div>
                        <div class="form-group">
                            <label for="familyName">Last Name:</label>
                            <input type="text" name="" value="" placeholder="" v-model="user.familyName" class="form-control">
                        </div>
                        <div class="form-group">
                            <label for="userName">Username:</label>
                            <!-- <editable-input v-model="userDetailsForm.name" change-button-label="Edit" save-button-label="Save" @saved="updateProfile"></editable-input> -->
                            <input type="text" name="" value="" v-model="user.userName" class="form-control">
                        </div>
                        <div class="form-group">
                            <label for="age">Age:</label>
                            <input type="number" name="" value="" class="form-control" v-model="user.age">
                        </div>
                        <div class="form-group">
                            <label for="postcode">Postcode:</label>
                            <input type="text" name="postcode" value="postcode" class="form-control" v-model="user.postcode">
                        </div>
                        <fieldset class="form-group">

                            <div class="row">
                                <legend class="col-form-label col-sm-12 pt-0">Type:</legend>

                                <div class="col-sm-12">
                                    <small class="form-text">You can select multiple interests</small>
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
                                </div>
                            </div>
                        </fieldset>
                        <div class="form-group">
                            <label for="">Talk to me about</label>
                            <textarea name="name" rows="8" cols="80" class="form-control" placeholder="Example: my new guide dog Toby, best coffee spots in Kew and I want to learn more about JAWS"></textarea>
                            <small class="sr-only form-text">Example: my new guide dog Toby, best coffee spots in Kew and I want to learn more about JAWS</small>
                        </div>
                        <div class="btn-wrapper">
                            <input type="submit" v-on:click.prevent="onSubmit" class="btn btn-primary" value="Update your account">
                        </div>
                    </form>
                    <form class="spacer">
                        <h4>Manage your account</h4>
                        <!-- NB: I DON'T THINK THAT THE USER CAN CHANGE THEIR EMAIL -->
                        <div class="form-group">
                            <label for="email">Email</label>
                            <input type="text" name="" value="" class="form-control">
                        </div>
                        <div class="form-group">
                            <label for="email">Contact Number</label>
                            <input type="text" name="" value="" class="form-control">
                        </div>

                    </form>
                    <form class="form-change-password spacer">
                        <h4>Change password</h4>
                        <div class="form-group">
                            <label for="password">Current Password</label>
                            <input type="password" name="" value="" class="form-control">
                        </div>
                        <div class="form-group">
                            <label for="password">New Password</label>
                            <input type="password" name="" value="" class="form-control">
                        </div>
                        <div class="form-group">
                            <label for="password">Confirm new Password</label>
                            <input type="password" name="" value="" class="form-control">
                        </div>
                        <div class="btn-wrapper">
                            <input type="submit" name="" value="Change password" class="btn btn-primary">
                        </div>
                    </form>
                    <section class="spacer">
                        <p>No longer want to be part of the Peer Support Platform community?</p>
                        <div class="btn-wrapper">
                            <button type="button" class="btn btn-primary">Delete account</button>
                        </div>
                    </section>
                </article>
                <aside class="items-sidebar">
                    <!-- TABS GO IN HERE. DETAILS, EVENTS & IDEAS & SETTINGS -->
                </aside>



                        <!-- <form class="" action="index.html" method="post"> -->
                            <!-- <div class="form-field">
                                <label for="">Full name</label>
                                <input type="text" name="" value="" class="form-control" v-model="">
                            </div> -->
                            <!-- <div class="form-group">
                                <label for="username">Username</label>
                                <input type="text" v-model="user.username" v-validate="'required'" name="username" class="form-control" :class="{ 'is-invalid': submitted && errors.has('username') }" />
                                <div v-if="submitted && errors.has('username')" class="invalid-feedback">{{ errors.first('username') }}</div>
                            </div> -->

                        <!-- </form> -->

                        <!-- <em v-if="users.loading">Loading users...</em>
                        <span v-if="users.error" class="text-danger">ERROR: {{users.error}}</span>
                        <ul v-if="users.items">
                            <li v-for="user in users.items" :key="user.id">
                                {{user.firstName + ' ' + user.lastName}}
                                <span v-if="user.deleting"><em> - Deleting...</em></span>
                                <span v-else-if="user.deleteError" class="text-danger"> - ERROR: {{user.deleteError}}</span>
                                <span v-else> - <button @click="deleteUser(user.id)" class="btn btn-secondary text-danger">Delete</button>
                                </span>
                            </li>
                        </ul> -->



                    <!-- <section class="change-password">
                        <h4>Change password:</h4>
                        <form class="">
                            <div class="form-group">
                                <label for="">Enter existing password:</label>
                                <input v-model="changePasswordForm.oldPassword" type="password" placeholder="Enter your existing password..." class="form-control">
                            </div>
                            <div class="form-group">
                                <label for="">Enter new password:</label>
                                <input v-model="changePasswordForm.newPassword" type="password" placeholder="Enter new password..." class="form-control">
                            </div>
                            <div class="form-group">
                                <label for="">New Password again:</label>
                                <input v-model="changePasswordForm.newPasswordConfirmation" type="password" placeholder="Re-enter new password..." class="form-control">
                            </div>
                            <button type="button" @click="submitChangePasswordForm" class="btn btn-primary">Change password</button>
                            <button type="button" name="button" class="btn btn-primary">Change Password</button>
                        </form>
                    </section> -->


            </section>
        </div>

    </LayoutMaster>
</template>

<script>
    import { mapState, mapActions, mapGetters } from 'vuex';
    import LayoutMaster from '../../components/common/layouts/layout-master.vue';
    import Hero from '../../components/common/global/hero.vue';

    export default {
        name: 'Account',
        components: {
            LayoutMaster,
            Hero
        },
        data() {
            return {
                title: 'Account page',
                tagline: 'Review and edit your personal details here',
                user: {
                    givenName: '',
                    familyName: '',
                    userName: '',
                    age: '',
                    postcode: '',
                    interests: {},
                    bio: '',
                    phoneNumber: '',
                    email: '',
                    password: '',
                },
                // userDetailsForm: {
                //     username: 'Username',
                // },
                changePasswordForm: {
                    oldPassword: '',
                    newPassword: '',
                    newPasswordConfirmation: '',
                },
                events: [
                    {
                        id: '0',
                        title: 'This is an event',
                    },
                    {
                        id: '1',
                        title: 'This is an event',
                    }
                ]
            }
        },
        methods: {
            checkForm() {
                this.formErrors = [];
            },
            onSubmit() {
                const formHasErrors = this.checkForm();

                if ( formHasErrors ) {
                    window.scrollTo(0, this.topOffset);
                    this.setFocusToErrorListing();
                    return;
                };
            },
            setFocusToErrorListing() {
                this.$refs.formCreate.focus();
            },
            ...mapActions({
                'getMemberProfile': 'getMemberProfile'
            })
        },
        computed: {
            ...mapGetters(['memberProfile']),
            topOffset: function() {
                const element = this.$refs.formCreate;
                const top = element.offsetTop;
                return top;
            },
        },
        created() {
            this.getMemberProfile();
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
</style>
