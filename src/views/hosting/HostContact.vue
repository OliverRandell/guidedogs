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
                                <textarea name="message" rows="8" cols="80" v-model="user.message.text" :maxlength="user.message.maxlength" class="form-control" placeholder="Write message here..." v-validate="'required'"></textarea>
                                <span class="counter">{{ user.message.text.length }} / {{ user.message.maxlength }}</span>
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
                    username: 'Your username',
                    email: '',
                    phoneNumber: '',
                    message: {
                        text: `Write your message in here...`,
                        maxlength: 1000,
                    }
                },
                submitted: false,
            }
        },
        methods: {
            submitContactForm() {
                this.$validator.validateAll().then((result) => {
                    if (result) {
                        alert('Form submitted!');
                        return;
                    }
                    alert('Correct the errors!');
                });
            }
        }
    }
</script>

<style lang="css">
</style>
