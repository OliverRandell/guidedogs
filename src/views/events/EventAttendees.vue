<template lang="html">
    <LayoutMaster>
        <Hero>
            <template slot="title">
                {{ title }}
            </template>
        </Hero>
        <div class="container">
            <div class="pg-content">

                <div class="col-8">
                    <h2>{{ eventTitle }}</h2>
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
                        // rsvpId: 0,
                        // eventId: '0',
                        route: '/host-profile',
                        rsvpParticipantNickName: 'Guide dogs vic',
                    },
                    {
                        // rsvpId: 1,
                        // eventId: '1',
                        route: '/host-profile',
                        rsvpParticipantNickName: 'James_bond007',
                    },
                    {
                        // rsvpId: 3,
                        // eventId: '3',
                        route: '/host-profile',
                        rsvpParticipantNickName: 'Ernest Hemmingway',
                    },
                    {
                        // rsvpId: 4,
                        // eventId: '4',
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
    .guest-list {
        list-style: none;
        margin: 0;
        padding: 0;
        > li {
            @include spacer(0.25rem);

        }
    }
</style>
