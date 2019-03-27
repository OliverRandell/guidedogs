<template lang="html">
    <LayoutMaster>
        <Hero>
            <template slot="title">
                {{ title }}
            </template>
        </Hero>
        <div class="container">
            <div class="pg-content">

                <div class="col-8 spacer">
                    <h2 class="spacer">{{ eventTitle }}</h2>
                    <div class="row">
                        <div class="col-6">
                            <h4>Guests attending:</h4>
                            <ul class="guest-list">
                                <li v-for="guest in eventAttendees" :key="guest.id">
                                    <router-link :to="guest.route">{{ guest.rsvpParticipantNickName }}</router-link>
                                </li>
                            </ul>
                            <h4>Total: {{ attendanceString }}</h4>
                        </div>
                    </div>
                </div>


                <div class="col-12 col-lg-4">
                    <router-link to="/manage-idea">&larr; Back to managing idea</router-link>
                </div>
            </div>
        </div>

    </LayoutMaster>

</template>

<script>
    import LayoutMaster from '../../components/common/layouts/layout-master.vue';
    import Hero from '../../components/common/global/hero.vue';
    export default {
        name: 'eventAttendees',
        components: {
            LayoutMaster,
            Hero,
        },
        data() {
            return {
                title: 'Attendees list',
                eventTitle: 'This is the event title',
                eventAttendees: [
                    {
                        route: '/host-profile',
                        rsvpParticipantNickName: 'Guide dogs vic',
                    },
                    {
                        route: '/host-profile',
                        rsvpParticipantNickName: 'James_bond007',
                    },
                    {
                        route: '/host-profile',
                        rsvpParticipantNickName: 'Ernest Hemmingway',
                    },
                    {
                        route: '/host-profile',
                        rsvpParticipantNickName: 'EinsteinMind',
                    }
                ],
                attendanceString: '24',
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import './src/assets/scss/vue.scss';
</style>
