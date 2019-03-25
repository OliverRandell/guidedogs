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
                    <h2>{{ event.title }}</h2>
                    <h4>Important Information!</h4>
                    <p html="importantInfo"></p>

                    <h4>Pending requests</h4>
                    <h5>Total:</h5>
                    <ul>
                        <li >
                            <router-link :to="{ name: '', params: {} }">{{  }}</router-link>
                        </li>
                    </ul>
                    <h4>Approved Attendees</h4>
                    <h5>Total:</h5>
                    <ul>
                        <li v-for="attendee in approvedAttendees" class="row">
                            <router-link :to="attendee.route" class="col-5">{{ attendee.name }}</router-link>
                            <span class="col-1">fl</span>
                            <span class="col-3">Approve</span>
                            <span class="col-3">Decline</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </LayoutMaster>
</template>

<script>
    import LayoutMaster from '../../components/common/layouts/layout-master.vue';
    import Hero from '../../components/common/global/hero.vue';
    export default {
        name: 'IdeaManagement',
        components: {
            LayoutMaster,
            Hero,
        },
        data() {
            return {
                title: 'Event Management',
                event: {
                    title: 'Name of event',
                    importantInfo: `Please note, if the attendee has supplied further information a notification flag will be present. This message will be accessible via your requested email.`,
                }
            }
        }
    }
</script>

<style lang="css">
</style>
