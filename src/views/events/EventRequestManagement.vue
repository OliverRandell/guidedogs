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
                    <section class="spacer">
                        <h6>Important Information!</h6>
                        <p v-html="importantInfo"></p>
                    </section>
                    <section class="spacer">
                        <h4>Pending requests</h4>
                        <p><strong>Total: </strong>{{ totalPendingRequests }}</p>
                        <ul class="guest-list">
                            <li v-for="user in pendingRequests" class="row">
                                <router-link :to="user.route" class="col-5">{{ user.rsvpParticipantNickName }}</router-link>
                                <span class="col-1">fl</span>
                                <span class="col-3">
                                    <div class="form-check form-check-inline">
                                        <input class="form-check-input" type="radio" name="inlineRadioOptions" id="accept" value="accept">
                                        <label class="form-check-label" for="accept">Accept</label>
                                    </div>
                                </span>
                                <span class="col-3">
                                    <div class="form-check form-check-inline">
                                        <input class="form-check-input" type="radio" name="inlineRadioOptions" id="decline" value="decline">
                                        <label class="form-check-label" for="decline">Decline</label>
                                    </div>
                                </span>
                            </li>
                        </ul>
                    </section>
                    <section class="spacer">
                        <h4>Approved Attendees</h4>
                        <p><strong>Total: </strong>{{ totalApprovedGuests }}</p>
                        <ul class="guest-list">
                            <li v-for="attendee in approvedAttendees" class="row">
                                <router-link :to="attendee.route" class="col-5">{{ attendee.rsvpParticipantNickName }}</router-link>
                                <span class="col-1">fl</span>
                                <span class="col-3">
                                    <div class="form-check form-check-inline">
                                        <input class="form-check-input" type="radio" name="inlineRadioOptions" id="accept" value="accept">
                                        <label class="form-check-label" for="accept">Accept</label>
                                    </div>
                                </span>
                                <span class="col-3">
                                    <div class="form-check form-check-inline">
                                        <input class="form-check-input" type="radio" name="inlineRadioOptions" id="decline" value="decline">
                                        <label class="form-check-label" for="decline">Decline</label>
                                    </div>
                                </span>
                            </li>
                        </ul>
                    </section>
                    <section class="spacer">
                        <h4>Declined guests</h4>
                        <p><strong>Total: </strong>{{ totalDeclinedGuests }}</p>
                        <ul class="guest-list">
                            <li v-for="attendee in declinedAttendees" class="row">
                                <router-link :to="attendee.route" class="col-5">{{ attendee.rsvpParticipantNickName }}</router-link>
                                <span class="col-1">fl</span>
                                <span class="col-3">
                                    <div class="form">
                                        <div class="form-check form-check-inline">
                                            <input class="form-check-input" type="radio" name="inlineRadioOptions" id="accept" value="accept">
                                            <label class="form-check-label" for="accept">Accept</label>
                                        </div>
                                    </div>
                                </span>
                                <span class="col-3">
                                    <div class="form-check form-check-inline">
                                        <input class="form-check-input" type="radio" name="inlineRadioOptions" id="decline" value="decline">
                                        <label class="form-check-label" for="decline">Decline</label>
                                    </div>
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
                pendingRequests: [
                    {
                        route: '/host-profile',
                        rsvpParticipantNickName: 'Guide dogs vic',
                    },
                    {
                        route: '/host-profile',
                        rsvpParticipantNickName: 'Guide dogs vic',
                    },
                    {
                        route: '/host-profile',
                        rsvpParticipantNickName: 'Guide dogs vic',
                    }
                ],
                approvedAttendees: [
                    {
                        route: '/host-profile',
                        rsvpParticipantNickName: 'Guide dogs vic',
                    },
                    {
                        route: '/host-profile',
                        rsvpParticipantNickName: 'Guide dogs vic',
                    },
                    {
                        route: '/host-profile',
                        rsvpParticipantNickName: 'Guide dogs vic',
                    }
                ],
                declinedAttendees: [
                    {
                        route: '/host-profile',
                        rsvpParticipantNickName: 'Guide dogs vic',
                    },
                    {
                        route: '/host-profile',
                        rsvpParticipantNickName: 'Guide dogs vic',
                    },
                    {
                        route: '/host-profile',
                        rsvpParticipantNickName: 'Guide dogs vic',
                    }
                ],
                totalPendingRequests: 12,
                totalApprovedGuests: 4,
                totalDeclinedGuests: 5,
            }
        }
    }
</script>

<style lang="css">
</style>
