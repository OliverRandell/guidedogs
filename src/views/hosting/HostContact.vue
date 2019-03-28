<template>
    <LayoutMaster>
        <Hero>
            <template slot="title">
                {{ title }}
            </template>
        </Hero>
        <div class="container">
            <div class="pg-content layout-single-col" tabindex="-1">
                <div>
                    <p><strong>Message to: </strong> <router-link to="/host-profile">{{ host.username }}</router-link></p>

                    <form @submit.prevent="submitContactForm">
                        <fieldset>
                            <legend>Please let the host know if you have any queries or additional RSVPs for a companion.</legend>
                            <div class="form-group">
                                <label for="userName">Username:</label>
                                <input type="text" name="userName" value="" v-model="user.userName" class="form-control" disabled>
                            </div>
                            <div class="form-group">
                                <label for="email">Email:</label>
                                <input type="email" name="" v-model="user.email" class="form-control" disabled>
                            </div>
                            <div class="form-group">
                                <label for="phoneNumber">Phone number:</label>
                                <input type="text" name="phoneNumber" v-model="user.phoneNumber" class="form-control" disabled>
                            </div>
                            <div class="form-group">
                                <label for="">Message:</label>
                                <textarea name="message" rows="8" cols="80" v-model="message.text" :maxlength="message.maxlength" class="form-control" placeholder="Write message here..." v-validate="'required'"></textarea>
                                <span class="counter">{{ message.text.length }} / {{ message.maxlength }}</span>
                            </div>
                            <div class="btn-wrapper">
                                <input type="submit" value="Send message" class="btn btn-primary">
                            </div>
                        </fieldset>



                    </form>
                </div>
            </div>
        </div>
    </LayoutMaster>
</template>

<script>
    import { mapState, mapActions, mapGetters } from 'vuex';
    import axios from 'axios';
    import { authHeader } from '@/utils/auth-header';
    import { apiUrl } from '@/utils/api';
    import LayoutMaster from '../../components/common/layouts/layout-master.vue';
    import Hero from '../../components/common/global/hero.vue';
    export default {
        name: 'HostContact',
        components: {
            LayoutMaster,
            Hero,
        },
        data() {
            return {
                title: 'Contact Host!',
                host: {
                    username: 'Dorothy123',
                },
                user: {
                    userName: 'Your username',
                    email: '',
                    phoneNumber: '',
                },
                message: {
                    text: `Write your message in here...`,
                    maxlength: 1000,
                },
                submitted: false,
            }
        },
        created () {
            this.getProfileData()
        },
        methods: {
            getProfileData () {
                axios.get(`${apiUrl}/MemberProfile`, { headers: { ...authHeader() } })
                    .then(({data}) => {
                        // go through and match existing keys...
                        Object.keys(this.user).map(user => Object.keys(data).map(field => {
                            if (user === field) {
                                // assign the relevant data to existing fields
                                this.user[user] = data[field]
                            }
                        }))
                    })
                    .catch(err => console.error(`Couldn't retrieve profile data: ${err}`))
            },
            submitContactForm() {
                this.$validator.validateAll().then((result) => {
                    if (result) {
                        alert('Form submitted!');
                        return;
                    }
                    alert('Correct the errors!');
                });
            },
            updateProfileData () {
                axios.put(`${apiUrl}/MemberProfile`,
                    { ...this.user },
                    { headers: { ...authHeader() } }
                )
                    .then(({data}) => console.log(data))
                    .catch(err => console.error(`Couldn't retrieve profile data: ${err}`))
            },
            ...mapActions(['getMemberProfile'])
        },
        computed: {
            ...mapGetters(['memberProfile']),
        }
    }
</script>

<style lang="css">
</style>
