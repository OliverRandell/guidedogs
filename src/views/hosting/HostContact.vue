<template>
    <LayoutMaster>
        <Hero>
            <template slot="title">
                {{ title }}
            </template>
        </Hero>
        <div class="container">
            <div class="pg-content">

                <div class="col-8">
                    <p><strong>Message to: </strong> <router-link to="/host-profile">{{ host.username }}</router-link></p>
                    <p>Please let the host know if you have any queries or additional RSVPs for a companion.</p>
                    <form>
                        <div class="form-group">
                            <label for="username"></label>
                            <input type="text" name="" value="" v-model="user.username" class="form-control" disabled>
                        </div>
                        <div class="form-group">
                            <label for="email">Email:</label>
                            <input type="email" name="" v-model="user.email" class="form-control" disabled>
                        </div>
                        <div class="form-group">
                            <label for="phone">Phone:</label>
                            <input type="text" name="" v-model="user.phone" class="form-control" disabled>
                        </div>
                        <div class="form-group">
                            <label for="">Message:</label>
                            <textarea name="name" rows="8" cols="80" class="form-control" placeholder="Write message here...">
                            </textarea>
                        </div>

                        <input type="submit" value="Send message" class="btn btn-primary">
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
                }
            }
        }
    }
</script>

<style lang="css">
</style>
