<template>
    <LayoutMaster>
        <Hero>
            <template slot="title">
                {{ title }}
            </template>

        </Hero>
        <div class="container">
            <div class="pg-content" tabindex="-1" ref="formCreate">

                <div class="col-8">

                    <h2>{{ idea.title }}</h2>
                    <section class="spacer">
                        <h4>Important information!</h4>
                        <p v-html="importantInfo"></p>
                    </section>

                    <section class="spacer">
                        <h4>Number of people interested:</h4>
                        <p><strong>Total: </strong>{{ attendeeTotal }}</p>
                        <ul class="guest-list">
                            <!-- TODO: MAKE COMPONENT AND SHARE IT ON THE EVENT ATTENDEES VIEW -->
                            <li v-for="guest in eventAttendees" :key="guest.id">
                                {{ guest.rsvpParticipantNickName | fallbackName}}
                                <!-- <router-link :to="`/user/${guest.rsvpParticipantId}`">{{ guest.rsvpParticipantNickName }}</router-link> -->
                            </li>
                        </ul>
                        <!-- <router-link to="/event-attendees" class="btn btn-primary">View people interested</router-link> -->

                    </section>

                    <section class="spacer">
                        <form @submit.prevent="onSubmit" v-if="!submitted">
                            <h4>Idea details</h4>

                            <p class="formErrors" v-if="formErrors.length" role="alert" aria-atomic="true">
                                <b>Please correct the following error(s):</b>
                                <ul>
                                    <li v-for="(error, index) in formErrors" :key="index">{{ error }}</li>
                                </ul>
                            </p>

                            <div class="form-group">
                                <label for="title">Title of Idea</label>
                                <input type="text" id="title" required v-model="idea.title" class="form-control">
                            </div>

                            <div class="form-group">
                                <label for="summary">Idea summary:</label>
                                <textarea id="summary" required v-on:input="checkSummaryCharacterLength" v-model="idea.eventSummary" class="form-control" rows="2" max-length="75"></textarea>
                                <div class="form-group-footer">
                                    <small class="form-text text-muted">This short introduction will appear on the Ideas page</small>
                                    <p class="character-limit">{{ summaryCharacterLimitDisplay }}</p>
                                </div>
                            </div>

                            <fieldset class="form-group">
                                <div class="row">
                                    <legend class="col-form-label col-sm-12 pt-0">Category</legend>
                                    <div class="col-sm-8">
                                        <div class="custom-control custom-radio mb-2" v-for="category in allCategories" :key="category.categoryId">
                                            <input class="custom-control-input" type="radio" name="category" :id="category.title + category.categoryId" :value="category.categoryId" v-model="idea.category">
                                            <label class="custom-control-label" :for="category.title + category.categoryId">{{category.title}}</label>
                                        </div>
                                    </div>
                                </div>
                            </fieldset>

                            <div class="form-group">
                                <label for="description">Idea Details</label>
                                <textarea name="name" rows="8" v-on:input="checkDescriptionCharacterLength" v-model="idea.eventDetails" class="form-control" max-length="1000"></textarea>
                                <div class="form-group-footer">
                                    <small class="form-text text-muted">Who should join, and what your idea will be about</small>
                                    <p class="character-limit">{{ descriptionCharacterLimitDisplay }}</p>
                                </div>

                            </div>

                            <div class="btn-wrapper">
                                <input type="submit" class="btn btn-primary" v-on:click.prevent="onSubmit" value="Save changes" />
                            </div>
                        </form>

                        <section v-if="submitted" class="msg-success">
                            <h3>Your idea has been updated</h3>
                            <router-link to="/my-hosting" class="btn btn-primary">Go back to my events and ideas</router-link>
                        </section>
                    </section>

                    <section class="spacer">
                        <h4>Want to convert this idea into an Event?</h4>
                        <div class="btn-group">
                            <router-link :to="'/convert-idea/' + idea.eventId" class="btn btn-primary">Convert</router-link>
                        </div>
                    </section>

                    <section class="spacer" aria-label="Delete Idea">

                        <h4>Delete idea</h4>
                        <div class="custom-control custom-switch spacer">
                            <input type="checkbox" class="custom-control-input" id="confirmDelete" v-model="confirmDelete">
                            <label class="custom-control-label" for="confirmDelete">Do you want to delete this idea?</label>
                        </div>
                        <div v-if="confirmDelete">
                            <p>Are you sure? Clicking on the button will permanently delete this idea.</p>
                            <p><button @click="onDeleteIdea(idea)" type="button" name="button" class="btn btn-primary btn-delete">Delete Idea</button></p>
                        </div>
                    </section>

                    <section v-if="submitted && confirmDelete" class="msg-success">
                        <h3>Your idea has been deleted</h3>
                        <router-link to="/my-hosting" class="btn btn-primary">Go back to my events and ideas</router-link>
                    </section>

                </div>
                <div class="col-4">
                    <router-link to="/my-hosting">&larr; Back to my events and ideas</router-link>
                </div>
            </div>
        </div>

    </LayoutMaster>
</template>

<script>
    import axios from 'axios';
    import { authHeader } from '@/utils/auth-header';
    import { apiUrl } from '@/utils/api';
    import { mapActions, mapGetters } from 'vuex';
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
                formErrors: [],
                title: 'Idea Management!',
                importantInfo: `You can convert your idea into an event at any time. Further informtation will be required at that time. Ideas can be longstanding and do not have an expiry date.`,
                interestedTotal: '',
                confirmDelete: false,
                submitted: false,
                summaryCharacterLimitEntered: 0,
                summaryCharacterLimit: 75,
                descriptionCharacterLimitEntered: 0,
                descriptionCharacterLimit: 1000,
                eventAttendees: null,
                attendeeTotal: 0
            }
        },

        computed: {
            ...mapGetters(['allCategories', 'idea']),

            summaryCharacterLimitDisplay: function() {
                return `${this.summaryCharacterLimitEntered}/${this.summaryCharacterLimit}`;
            },

            descriptionCharacterLimitDisplay: function() {
                return `${this.descriptionCharacterLimitEntered}/${this.descriptionCharacterLimit}`;
            },

            topOffset: function() {
                const element = this.$refs.formCreate;
                const top = element.offsetTop;
                return top;
            },
        },

        created() {
            this.getCategories();
            this.getAttendees(this.$route.params.id)
            this.getIdea(this.$route.params.id).then(() => {
                const eventCat = this.idea.eventCategories[0]
                // set category based on first in array since user can only select one
                const idea = {
                    ...this.idea,
                    category: eventCat ? eventCat.category.categoryId : null
                };
                this.$store.commit('setIdea', idea);
            });
        },

        filters: {
            fallbackName (val) {
                return val ? val : 'Unkown User'
            }
        },

        methods: {
            getAttendees (id) {
                axios.get(`${apiUrl}/events/${id}/RSVPs`, { headers: { ...authHeader() } })
                    .then(({data}) => {
                        const requestsIds = []
                        const requests = []

                        data.map(obj => {
                            if (
                                !requestsIds.includes(obj.rsvpParticipantId)
                                && obj.responseType === "Interested"
                            ) {
                                requestsIds.push(obj.rsvpParticipantId)
                                requests.push(obj)
                            }
                        })

                        this.eventAttendees = requests
                        this.attendeeTotal = requests.length
                    })
                    .catch(error => console.error(`Couldn't retrieve Attendee list: ${error.response}`))
            },

            checkForm() {
                this.formErrors = [];

                if (!this.idea.title) { this.formErrors.push('Title is required') }
                if (!this.idea.category) { this.formErrors.push('A category is required') }
                if (!this.idea.eventSummary) { this.formErrors.push('Idea summary is required') }
                if (!this.idea.eventDetails) { this.formErrors.push('Idea details are required') }

                return this.formErrors.length > 0;
            },

            onSubmit() {
                const formHasErrors = this.checkForm();

                if ( formHasErrors ) {
                    window.scrollTo(0, this.topOffset);
                    this.setFocusToErrorListing();
                    return;
                }

                // destructure to only include relevant properties
                const { image, imageAlt, eventCategories, rsvPs, ...eventProps } = this.idea;

                const isDateInvalid = this.$moment(eventProps.eventDate).format('YYYY-MM-DD') === 'Invalid date';
                const formattedDate = isDateInvalid ? this.$moment(new Date()).format('YYYY-MM-DD') : this.$moment(eventProps.eventDate).format('YYYY-MM-DD');

                const eventFormData = {
                    ...eventProps,
                    eventDate: formattedDate,
                };

                // only handling one category at the moment (radio button form input)
                const category = {
                    "categoryId": this.idea.category,
                    "checkBoxTicked": true
                };

                const id = this.idea.eventId;

                this.updateIdea({idea: eventFormData}).then((data) => {
                    this.putIdeaCategories({ id: id, categories: [category] });
                })
                .then(() => {
                    this.submitted = true;
                });
            },

            onDeleteIdea(idea) {
                this.deleteIdea(idea.eventId).then(() => {
                    this.submitted = true;
                });
            },

            ...mapActions({
                'updateIdea': 'updateIdea',
                'getCategories': 'getCategories',
                'getIdea': 'getIdea',
                'putIdeaCategories': 'putIdeaCategories',
                'deleteIdea': 'deleteIdea',
            }),

            checkSummaryCharacterLength(e) {
                this.summaryCharacterLimitEntered = e.target.value.length;
            },

            checkDescriptionCharacterLength(e) {
                this.descriptionCharacterLimitEntered = e.target.value.length;
            },

            setFocusToErrorListing() {
                this.$refs.formCreate.focus();
            },
        },
    }
</script>

<style lang="scss" scoped>
    .character-limit {
        text-align: right;
    }
    .msg-success {
        position: fixed;
        background: rgba(0, 0, 0, 0.95);
        top: 0;
        bottom: 0;
        left: 0;
        height: 100%;
        width: 100%;
        z-index: 2;
        color: #fff;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
    }
</style>
