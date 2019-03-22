<template>
    <layout-master>
        <hero>
            <template slot="title">
                {{ title }}
            </template>
            <!-- <template slot="description">
                {{ tagline }}
            </template> -->
        </hero>

        <div class="container">
            <div class="pg-content layout-single-col" tabindex="-1">
                <div>
                    <!-- <form @submit.prevent="submitEventAcceptanceForm"> -->
                    <form>
                        <div class="form-group">
                            <label for="">Username:</label>
                            <input type="text" name="" value="" class="form-control" v-model="username">
                        </div>

                        <div class="form-group">
                            <label for="">Email:</label>
                            <input type="text" name="" value="" class="form-control" v-model="email">
                        </div>

                        <div class="form-group">
                            <label for="">Phone number:</label>
                            <input type="text" name="" value="" class="form-control" v-model="phoneNumber">
                        </div>

                        <textarea name="name" rows="8" cols="80" class="form-control" v-model="message"></textarea>
                    </form>
                </div>

                <!-- <div class="col-8">
                    <p>Content</p>
                </div>
                <div class="col-4">
                    <p>Content</p>
                </div> -->
            </div>
        </div>
    </layout-master>
</template>

<script>
    import LayoutMaster from '../../components/common/layouts/layout-master.vue';
    import Hero from '../../components/common/global/hero.vue';
    export default {
        name: 'EventRequest',
        components: {
            LayoutMaster,
            Hero,
        },
        data() {
            return {
                title: `Request to join`,
                username: '',
                email: '',
                phoneNumber: '',
                message: '',
            }
        }
    }
</script>

<style lang="css">
</style>
