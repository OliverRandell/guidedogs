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
                    
                    <section class="spacer" aria-label="List of requests">
                        <h4>Pending requests</h4>
                        <p v-if="newRequests && totalPendingRequests > 0"><strong>Total: </strong>{{ totalPendingRequests }}</p>

                        <ul class="guest-list" v-if="newRequests && totalPendingRequests > 0">
                            <li 
                                v-for="(user, index) in pendingRequests"
                                :key="`pr-user-${index}`"
                                class="row"
                            >
                                <div class="col-5">
                                    <router-link :to="user.route">{{ user.rsvpParticipantNickName }}</router-link>
                                    <span class="tip" v-if="user.sentHostMessage">{{user.rsvpParticipantNickName}} also sent a message, and will be located in your email inbox.</span>
                                </div>
                                <span class="col-3">
                                    <button class="btn btn-primary" type="button" @click="acceptRequest(user.rsvpParticipantId)">Accept</button>
                                </span>
                                <span class="col-3">
                                    <button class="btn btn-secondary" type="button" @click="declineRequest(user.rsvpParticipantId)">Decline</button>
                                </span>
                            </li>
                        </ul>

                        <p v-else>{{pendingRequests}}</p>
                    </section>

                    <section class="spacer" aria-label="Approved Guests" v-if="approvedAttendees">
                        <h4>Approved Attendees</h4>
                        <p><strong>Total: </strong>{{ totalApprovedGuests }}</p>

                        <ul class="guest-list">
                            <li v-for="attendee in approvedAttendees" class="row">
                                <div class="col-8">
                                    <router-link :to="attendee.route">{{ attendee.rsvpParticipantNickName }}</router-link>
                                    <span class="tip" v-if="attendee.sentHostMessage">{{attendee.rsvpParticipantNickName}} also sent a message, and will be located in your email inbox.</span>
                                </div>
                                <span class="col-3">
                                    <button class="btn btn-secondary" type="button" @click="declineRequest(attendee.rsvpParticipantId)">Decline</button>
                                </span>
                            </li>
                        </ul>
                    </section>

                    <section class="spacer" aria-label="Declined Guests" v-if="declinedAttendees">
                        <h4>Declined guests</h4>
                        <p><strong>Total: </strong>{{ totalDeclinedGuests }}</p>

                        <ul class="guest-list">
                            <li v-for="attendee in declinedAttendees" class="row">
                                <div class="col-8">
                                    <router-link :to="attendee.route">{{ attendee.rsvpParticipantNickName }}</router-link>
                                    <span class="tip" v-if="attendee.sentHostMessage">{{attendee.rsvpParticipantNickName}} also sent a message, and will be located in your email inbox.</span>
                                </div>

                                <span class="col-3">
                                    <button 
                                        class="btn btn-primary" 
                                        type="button"
                                        @click="acceptRequest(attendee.rsvpParticipantId)"
                                    >
                                        Accept
                                    </button>
                                </span>
                            </li>
                        </ul>
                    </section>
                </div>
                <div class="col-4">
                    <router-link to="event-management">&larr; Back to event management</router-link>
                </div>
            </div>
        </div>
    </LayoutMaster>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex';
    import LayoutMaster from '../../components/common/layouts/layout-master.vue';
    import Hero from '../../components/common/global/hero.vue';
    export default {
        name: 'EventRequestManagement',
        components: {
            LayoutMaster,
            Hero,
        },

        data() {
            return {
                title: 'Manage requests',
                importantInfo: `Please note, if the attendee has supplied further information a notification flag will be present. This message will be accessible via your requested email.`,
                event: {
                    title: 'Name of event',
                },
                newRequests: [
                    {
                        rsvpId: 0,
                        eventId: 0,
                        rsvpParticipantId: '123',
                        rsvpParticipantNickName: 'Guide dogs vic1',
                        sentHostMessage: true,
                        hostSentMessage: true,
                        route: '/host-profile',
                        status: null
                    },
                    {
                        rsvpId: 0,
                        eventId: 0,
                        rsvpParticipantId: '125353',
                        rsvpParticipantNickName: 'Guide dogs vic2',
                        sentHostMessage: false,
                        hostSentMessage: false,
                        route: '/host-profile',
                        status: null
                    },
                    {
                        rsvpId: 0,
                        eventId: 0,
                        rsvpParticipantId: '178923',
                        rsvpParticipantNickName: 'Guide dogs vic3',
                        sentHostMessage: false,
                        hostSentMessage: false,
                        route: '/host-profile',
                        status: null
                    },
                    {
                        rsvpId: 0,
                        eventId: 0,
                        rsvpParticipantId: '124263',
                        rsvpParticipantNickName: 'Guide dogs vic4',
                        sentHostMessage: true,
                        hostSentMessage: true,
                        route: '/host-profile',
                        status: null
                    },
                    {
                        rsvpId: 0,
                        eventId: 0,
                        rsvpParticipantId: '1154556623',
                        rsvpParticipantNickName: 'Guide dogs vic5',
                        sentHostMessage: false,
                        hostSentMessage: false,
                        route: '/host-profile',
                        status: 'approved'
                    },
                    {
                        rsvpId: 0,
                        eventId: 0,
                        rsvpParticipantId: '12793',
                        rsvpParticipantNickName: 'Guide dogs vic6',
                        sentHostMessage: false,
                        hostSentMessage: false,
                        route: '/host-profile',
                        status: 'declined'
                    }
                ]
            }
        },

        created () {
            console.log(this.getRsvpRequests(36))
        },

        computed: {
            pendingRequests () {
                if (!this.newRequests || this.filterAttendees(null) === 0) {
                    return 'There are no pending requests'
                }
                return this.filterAttendees(null)
            },

            approvedAttendees () {
                if(this.newRequests) {  return this.filterAttendees('approved') }
            },

            declinedAttendees () {
                if(this.newRequests) { return this.filterAttendees('declined') }
            },

            totalPendingRequests () { return this.pendingRequests.length },
            totalApprovedGuests () { return this.approvedAttendees.length },
            totalDeclinedGuests () { return this.declinedAttendees.length }
        },

        methods: {
            ...mapActions(['getRsvpRequests']),

            filterAttendees (status) {
                return this.newRequests.filter(req => req.status === status)
            },

            acceptRequest (id) {
                const attendee = this.newRequests.filter(req => req.rsvpParticipantId === id)[0]
                attendee.status = 'approved'
                // TODO: Add post requests
            },

            declineRequest (id) {
                const attendee = this.newRequests.filter(req => req.rsvpParticipantId === id)[0]
                attendee.status = 'declined'
                // TODO: Add post requests
            },
        }
    }
</script>

<style lang="css">
.guest-list .btn{ width: 100%; }
.tip{
    font-size: 12px;
    display: block;
}
</style>
