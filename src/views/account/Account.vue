<template lang="html">
    <LayoutMaster>
        <hero>
            <template slot="title">
                <h1>Hi {{ account.user.firstName }}!</h1>
            </template>
            <template slot="description">
                {{ tagline }}
            </template>
        </hero>

        <div class="container">
            <section class="pg-content">
                <article class="item-wrapper" role="article" tabindex="-1">
                    <h4>Your details</h4>
                    <p>This information will assit us to currate personalised content.</p>
                    <!-- INCLUDE AGE DETAILS, NAME, USERNAME, POSTCODE, INTERESTS -->
                    <form>
                        <div class="form-group">
                            <label for="email">Email:</label>

                        </div>
                        <div class="form-group">
                            <label for="userName">Username:</label>
                            <!-- <editable-input v-model="userDetailsForm.name" change-button-label="Edit" save-button-label="Save" @saved="updateProfile"></editable-input> -->
                            <input type="text" name="" value="" v-model="account.user.userName" class="form-control">
                        </div>

                    </form>
                </article>
                <aside class="items-sidebar">
                    <!-- TABS GO IN HERE. DETAILS, EVENTS & IDEAS & SETTINGS -->
                </aside>
                <div class="col-12">
                    <div>


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

                        <em v-if="users.loading">Loading users...</em>
                        <span v-if="users.error" class="text-danger">ERROR: {{users.error}}</span>
                        <ul v-if="users.items">
                            <li v-for="user in users.items" :key="user.id">
                                {{user.firstName + ' ' + user.lastName}}
                                <span v-if="user.deleting"><em> - Deleting...</em></span>
                                <span v-else-if="user.deleteError" class="text-danger"> - ERROR: {{user.deleteError}}</span>
                                <span v-else> - <button @click="deleteUser(user.id)" class="btn btn-secondary text-danger">Delete</button>
                                </span>
                            </li>
                        </ul>
                        <p>
                            <router-link to="/login" class="btn btn-primary">Logout</router-link>
                        </p>
                        <p>First name:</p>
                        <p>Last name:</p>
                        <p>email:</p>
                        <p>Bio:</p>
                    </div>
                    <div class="my-events">
                        <h4>My Events:</h4>
                        <ul>
                            <li v-for="eventItem in events" :key="eventItem.id">This is an event</li>
                        </ul>
                    </div>
                    <section class="change-password">
                        <h4>Change password:</h4>
                        <form class="form-change-password">
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
                    </section>


                </div>

            </section>
        </div>

        <!-- <p v-if="profile.name">Hello <span>{{ profile.title }} {{ profile.name }}</span> this is your profile area. Feel free to add as many details as you can to this area. It increases your experiences with this app.</p>
        <section class="profile-pod">
            <img src="../../assets/imgs/profile-pic.jpg" :alt="['Profile picture for', profile.name]">
            <p v-if="profile.name">
                <strong>Name: </strong>
                <span>{{ profile.title }} {{ profile.name }}</span> -->
            <!-- </p>
            <p>Email</p>
            <p>username</p>
            <p>update password form</p>
            <p>Interests</p>
            <p>Talk to me about...</p>
        </section> -->

    </LayoutMaster>
</template>

<script>
    import { mapState, mapActions } from 'vuex';
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
                userDetailsForm: {
                    username: 'Username'
                },
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
        computed: {
            ...mapState({
                account: state => state.account,
                users: state => state.users.all
            })
        },
        created () {
            this.getAllUsers();
        },
        methods: {
            ...mapActions('users', {
                getAllUsers: 'getAll',
                deleteUser: 'delete'
            })
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
    .form-change-password {
        button {
            float: right;
        }
    }
</style>
