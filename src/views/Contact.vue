<template lang="html">
    <layout-master>
        <main class="contact container pg-content">
            <div class="row">
                <div class="col-12">
                    <h1>Contact us</h1>
                </div>
                <div class="col-6">
                    <form class="form-contact" @submit.prevent="submit">
                        <fieldset>
                            <legend>'Name of app' contact form</legend>
                            <div class="form-group">
                                <label for="name">Name</label>
                                <input type="text" name="name" value="" v-model="name" id="name" class="form-control">
                            </div>
                            <div class="form-group">
                                <label for="email">Email</label>
                                <input type="email" name="email" value="" v-model="email" id="email" class="form-control">
                            </div>
                            <div class="form-group">
                                <label for="message">Message</label>
                                <textarea name="message" rows="8" cols="80" class="form-control" id="message" v-model="message.text" :maxlength="message.maxlength"></textarea>
                                <span class="counter">{{ message.text.length }} / {{ message.maxlength }}</span>
                            </div>
                            <input type="submit" name="" value="Send form" class="btn btn-primary">
                        </fieldset>


                    </form>
                </div>
            </div>

        </main>
    </layout-master>
</template>

<script>
    import LayoutMaster from '../components/common/layouts/layout-master.vue';
    export default {
        name: 'Contact',
        components : {
            LayoutMaster
        },
        data () {
            return {
                name: '',
                email: '',
                message: {
                    text: `Write your message in here...`,
                    maxlength: 255
                },
                submitted: false
            }
        }
    }
</script>

<style lang="scss" scoped>
    input[type="submit"] {
        float: right;
    }
</style>
