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
                    <h4>
                        <strong>Message to: </strong>
                        <router-link :to="`/host-profile/${host.id}`">{{ host.username }}</router-link>
                    </h4>

                    <form @submit.prevent="submitContactForm" v-if="!submitted">
                        <fieldset>
                            <legend>Please let the host know if you have any queries or additional RSVPs for a companion.</legend>
                            <div class="form-group">
                                <label for="userName">Username:</label>
                                <input type="text" name="userName" value="" v-model="memberProfile.userName" class="form-control" disabled>
                            </div>
                            <div class="form-group">
                                <label for="email">Email:</label>
                                <input type="email" name="" v-model="memberProfile.email" class="form-control" disabled>
                            </div>
                            <div class="form-group">
                                <label for="phoneNumber">Phone number:</label>
                                <input type="text" name="phoneNumber" v-model="memberProfile.phoneNumber" class="form-control" disabled>
                            </div>
                            <div class="form-group">
                                <label for="">Message:</label>
                                <textarea name="message" rows="8" cols="80" v-model="user.message.text" :maxlength="user.message.maxlength" class="form-control" placeholder="Write message here..." v-validate="'required'"></textarea>
                                <span class="counter">{{ user.message.text.length }} / {{ user.message.maxlength }}</span>
                            </div>
                            <div class="btn-wrapper">
                                <input type="submit" value="Send message" class="btn btn-primary">
                            </div>
                        </fieldset>
                    </form>
                    <section v-if="submitted" class="msg-success">
                        <h3>Your message has been sent.</h3>
                        <button type="button" class="btn btn-primary" @click="onBack">Go back</button>
                    </section>
                </div>
            </div>
        </div>
    </LayoutMaster>
</template>

<script>
    import { mapActions, mapGetters } from 'vuex';
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
                    username: this.$route.params.hostNickName,
                    id: this.$route.params.hostId
                },
                user: {
                    userName: 'Your username',
                    email: '',
                    phoneNumber: '',
                    message: {
                        text: ``,
                        maxlength: 1000,
                    }
                },
                submitted: false,
            }
        },
        computed: {
            ...mapGetters(['memberProfile']),
        },
        created () {
            this.getMemberProfile();
        },
        methods: {
            submitContactForm() {
                this.$validator.validateAll().then((result) => {
                    if (result) {
                        this.sendMessageToEventHost({
                            eventId: this.$route.params.eventId,
                            subject: encodeURIComponent(`Contact for Event or Idea: ${this.$route.params.eventId}`),
                            body: encodeURIComponent(this.user.message.text),
                        }).then(() => {
                            this.submitted = true;
                        });
                        return;
                    }
                    alert('Correct the errors on the page!');
                });
            },
            onBack() {
                this.$router.go(-1);
            },
            ...mapActions(['getMemberProfile', 'sendMessageToEventHost']),
        },
    }
</script>

<style lang="scss" scoped>
    @import './src/assets/scss/vue.scss';
    .msg-success {
        position: fixed;
        background: rgba(0, 0, 0, 0.95);
        top: 0;
        bottom: 0;
        left: 0;
        height: 100%;
        width: 100%;
        z-index: 2;
        color: $white;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
    }
</style>
