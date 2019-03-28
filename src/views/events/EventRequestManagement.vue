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
                    
                    <section class="spacer" aria-label="List of pending requests" v-if="pendingRequests">
                        <h4 v-if="totalPendingRequests > 0">Pending requests</h4>
                        <p v-if="newRequests && totalPendingRequests > 0 && !noRequests"><strong>Total: </strong>{{ totalPendingRequests }}</p>

                        <ul class="guest-list" v-if="newRequests && totalPendingRequests > 0 && !noRequests" aria-live="polite">
                            <li 
                                v-for="(user, index) in pendingRequests"
                                :key="`pr-${user.rsvpId}-${index}`"
                                :class="['row', { 'row-loading' : user.loading }]"   
                            >
                                <div class="col-5">
                                    <router-link :to="`/user/${user.rsvpParticipantId}`">{{ user.rsvpParticipantNickName }}</router-link>
                                    <span class="tip" v-if="user.sentHostMessage">{{user.rsvpParticipantNickName}} also sent a message, and will be located in your email inbox.</span>
                                </div>
                                <span class="col-3">
                                    <button class="btn btn-primary" type="button" @click="acceptRequest(eventId, user.rsvpParticipantId)">Accept</button>
                                </span>
                                <span class="col-3">
                                    <button class="btn btn-secondary" type="button" @click="declineRequest(eventId, user.rsvpParticipantId)">Decline</button>
                                </span>
                                <span class="error col-12" role="alert" v-if="user.error">{{ user.error }}</span>
                            </li>
                        </ul>

                        <p v-if="noRequests">{{pendingRequests}}</p>
                    </section>

                    <section class="spacer" aria-label="Approved Guests" 
                        v-if="approvedAttendees && approvedAttendees.length > 0"
                    >
                        <h4>Approved Attendees</h4>
                        <p><strong>Total: </strong>{{ totalApprovedGuests }}</p>

                        <ul class="guest-list" aria-live="polite">
                            <li 
                                v-for="(attendee, index) in approvedAttendees" 
                                class="row"
                                :key="`pr-${attendee.rsvpId}-${index}`"
                            >
                                <div class="col-8">
                                    <router-link :to="`/user/${attendee.rsvpParticipantId}`">{{ attendee.rsvpParticipantNickName }}</router-link>
                                    <span class="tip" v-if="attendee.sentHostMessage">{{attendee.rsvpParticipantNickName}} also sent a message, and will be located in your email inbox.</span>
                                </div>
                                <span class="col-3">
                                    <button class="btn btn-secondary" type="button" @click="declineRequest(eventId, attendee.rsvpParticipantId)">Decline</button>
                                </span>
                            </li>
                        </ul>
                    </section>

                    <section class="spacer" aria-label="Declined Guests" 
                        v-if="declinedAttendees && declinedAttendees.length > 0"
                    >
                        <h4>Declined guests</h4>
                        <p><strong>Total: </strong>{{ totalDeclinedGuests }}</p>

                        <ul class="guest-list" aria-live="polite">
                            <li 
                                v-for="(attendee, index) in declinedAttendees" 
                                class="row"
                                :key="`pr-${attendee.rsvpId}-${index}`"
                            >
                                <div class="col-8">
                                    <router-link :to="`/user/${attendee.rsvpParticipantId}`">{{ attendee.rsvpParticipantNickName }}</router-link>
                                    <span class="tip" v-if="attendee.sentHostMessage">{{attendee.rsvpParticipantNickName}} also sent a message, and will be located in your email inbox.</span>
                                </div>

                                <span class="col-3">
                                    <button 
                                        class="btn btn-primary" 
                                        type="button"
                                        @click="acceptRequest(eventId, attendee.rsvpParticipantId)"
                                    >
                                        Accept
                                    </button>
                                </span>
                            </li>
                        </ul>
                    </section>
                </div>
                <div class="col-4">
                    <router-link :to="{ path: `/event-management/${eventId}`, params: {id: eventId} }">&larr; Back to event management</router-link>
                </div>
            </div>
        </div>
    </LayoutMaster>
</template>

<script>
    import axios from 'axios';
    import LayoutMaster from '../../components/common/layouts/layout-master.vue';
    import Hero from '../../components/common/global/hero.vue';
    import { authHeader } from '@/utils/auth-header';
    import { apiUrl } from '@/utils/api';
    
    export default {
        name: 'EventRequestManagement',
        components: {
            LayoutMaster,
            Hero,
        },

        data() {
            return {
                title: 'Manage requests',
                event: {
                    // TODO: Update name dynamically
                    title: this.$route.params.title,
                },
                newRequests: null,
                noRequests: false
            }
        },

        mounted () {
            console.log(this.$route)
            // TODO - Get event as prop
            this.$nextTick(() => this.getEventRequests(this.eventId))
        },

        computed: {
            eventId () { return this.$route.params.id },

            pendingRequests () {
                if (!this.newRequests || this.filterAttendees(null) === 0 || this.noRequests) {
                    return 'There are no pending requests'
                }
                return this.filterAttendees(null)
            },

            approvedAttendees () {
                if (this.newRequests) return this.filterAttendees('approved')
            },

            declinedAttendees () {
                if (this.newRequests) return this.filterAttendees('declined')
            },

            totalPendingRequests () { return this.pendingRequests.length },
            totalApprovedGuests () { return this.approvedAttendees.length },
            totalDeclinedGuests () { return this.declinedAttendees.length }
        },

        methods: {

            getEventRequests (id) {
                axios.get(`${apiUrl}/events/${id}/RSVPs`, { headers: { ...authHeader() } })
                    .then(({data}) => {
                        const requestsIds = []
                        const requests = []

                        data.map(obj => { 
                            obj.status = null
                            obj.loading = false
                            obj.error = null

                            if (
                                !requestsIds.includes(obj.rsvpParticipantId) 
                                && obj.rsvpParticipantId
                                && obj.responseType === "Requesting"    
                            ) {
                                requestsIds.push(obj.rsvpParticipantId)
                                requests.push(obj)
                            }
                        })

                        if (requests.length === 0) this.noRequests = true

                        this.newRequests = requests
                    })
                    .catch(error => console.error(`Couldn't retrieve RSVP list: ${error.response}`))
            },

            filterAttendees (status) {
                return this.newRequests.filter(req => req.status === status)
            },

            acceptRequest (eventId, id) { this.actionRequest(eventId, id, 'approved') },
            declineRequest (eventId, id) { this.actionRequest(eventId, id, 'declined') },

            actionRequest (eventId, id, type) {
                const attendee = this.newRequests.filter(req => req.rsvpParticipantId === id)[0]
                attendee.loading = true
                attendee.error = null
                
                axios.put(`${apiUrl}/events/${eventId}/RSVPs/${attendee.rsvpId}`, 
                    {
                        ...attendee
                        // todo, update status in submission
                    }, 
                    { headers: { ...authHeader() } }
                )
                    .then(res => {
                        attendee.status = type
                        attendee.loading = false
                    })
                    .catch(err => {
                        attendee.loading = false
                        attendee.error = 'Something went wrong, please try again.'
                        console.error(err)
                    })
            }
        }
    }
</script>

<style lang="css">
.guest-list .btn{ width: 100%; }
.tip{
    font-size: 12px;
    display: block;
}
.error{ 
    font-size: 14px; 
    color: red; 
}
.row-loading{
    cursor: progress;
    opacity: 0.25
}
</style>
