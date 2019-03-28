<template>
    <LayoutMaster>
        <Hero>
            <template slot="title">
                {{ title }}
            </template>
            <!-- <template slot="description">
                <span>{{ tagline }}</span>
            </template> -->
        </Hero>
        <div class="container">
            <div class="pg-content" tabindex="-1" ref="formCreate">

                <div class="col-8">
                    <h2 class="spacer">{{ eventItem.title }}</h2>
                    <section class="spacer">
                        <h4>Important information!</h4>
                        <p v-html="importantInfo"></p>
                    </section>
                    <section class="spacer">
                        <h4>Approved attendees:</h4>
                        <p>{{ attendeeTotal }}</p>
                        <ul class="guest-list">
                            <!-- TODO: MAKE COMPONENT AND SHARE IT ON THE EVENT ATTENDEES VIEW -->
                            <li v-for="guest in eventAttendees" :key="guest.id">
                                <router-link to="/">{{ guest.rsvpParticipantNickName }}</router-link>
                            </li>
                        </ul>
                        <div class="btn-wrapper">
                            <router-link 
                                :to="{ 
                                    name: 'EventRequestManagement', 
                                    params: { id: this.$route.params.id, title: eventItem.title } 
                                }" 
                                class="btn btn-primary">Manage requests</router-link>
                        </div>
                    </section>
                    
                    <section class="spacer">
                        <form class="form-create-event form-create" @submit.prevent="onSubmit">
                            <h4>Event details</h4>
                            
                            <p v-if="formErrors.length" role="alert" aria-atomic="true">
                                <b>Please correct the following error(s):</b>
                                <ul>
                                    <li v-for="(error, index) in formErrors" :key="index">{{ error }}</li>
                                </ul>
                            </p>

                            <fieldset class="form-group">
                                <div class="row">
                                    <legend class="col-form-label col-sm-12 pt-0">Type</legend>
                                    <div class="col-sm-12">
                                        <div class="custom-control custom-radio mb-2">
                                            <input class="custom-control-input" type="radio" name="publicOrPrivate" id="public" value="Public" v-model="eventItem.eventPublicity">
                                            <label class="custom-control-label" for="public">Public Event - unlimited capacity</label>
                                        </div>
                                        <div class="custom-control custom-radio mb-2">
                                            <input class="custom-control-input" type="radio" name="publicOrPrivate" id="private" value="Private" v-model="eventItem.eventPublicity">
                                            <label class="custom-control-label" for="private">Private Event - limited capacity of attendees</label>
                                        </div>
                                    </div>
                                </div>
                            </fieldset>

                            <div class="form-group">
                                <label for="title">Event Title</label>
                                <input type="text" id="title" required v-model="eventItem.title" class="form-control">
                            </div>
                            <fieldset class="form-group">

                                <div class="row">
                                    <legend class="col-form-label col-sm-12 pt-0">Category</legend>
                                    <div class="col-sm-8">
                                        <div class="custom-control custom-radio mb-2" v-for="category in allCategories" :key="category.categoryId">
                                            <input class="custom-control-input" type="radio" name="category" :id="category.title + category.categoryId" :value="category.categoryId" v-model="eventItem.category">
                                            <label class="custom-control-label" :for="category.title + category.categoryId">{{category.title}}</label>
                                        </div>
                                    </div>
                                </div>
                            </fieldset>

                            <div class="form-group">
                                <label for="date">Event Date (DD/MM/YYYY)</label>
                                <DatePicker v-model="eventStartDate" class="form-control"></DatePicker>
                            </div>

                            <div class="form-group meridiem-time">
                                <label for="timeStart">Start Time (HH:MM)</label>
                                <div class="meridiem-time__input">
                                    <input type="text" id="timeStart" required v-model="eventStartTime" class="form-control">
                                </div>
                                <div class="meridiem-time__radio">
                                    <div class="custom-control custom-radio mb-2">
                                        <input class="custom-control-input" type="radio" name="startMeridiem" id="startMeridiemAM" value="AM" v-model="eventStartTimeMeridiem">
                                        <label class="custom-control-label" for="startMeridiemAM">AM</label>
                                    </div>
                                    <div class="custom-control custom-radio mb-2">
                                        <input class="custom-control-input" type="radio" name="startMeridiem" id="startMeridiemPM" value="PM" v-model="eventStartTimeMeridiem">
                                        <label class="custom-control-label" for="startMeridiemPM">PM</label>
                                    </div>
                                </div>
                            </div>

                            <div class="form-group meridiem-time">
                                <label for="timeEnd">End Time (HH:MM) (optional)</label>
                                <div class="meridiem-time__input">
                                    <input type="text" id="timeEnd" required v-model="eventEndTime" class="form-control">
                                </div>
                                <div class="meridiem-time__radio">
                                    <div class="custom-control custom-radio mb-2">
                                        <input class="custom-control-input" type="radio" name="endMeridiem" id="endMeridiemAM" value="AM" v-model="eventEndTimeMeridiem">
                                        <label class="custom-control-label" for="endMeridiemAM">AM</label>
                                    </div>
                                    <div class="custom-control custom-radio mb-2">
                                        <input class="custom-control-input" type="radio" name="endMeridiem" id="endMeridiemPM" value="PM" v-model="eventEndTimeMeridiem">
                                        <label class="custom-control-label" for="endMeridiemPM">PM</label>
                                    </div>
                                </div>
                            </div>

                            <div class="form-group">
                                <label for="location">Event Location</label>
                                <small class="form-text">
                                    Insert Address
                                </small>
                                <input type="text" id="location" required v-model="eventItem.location" class="form-control">
                            </div>

                            <div class="form-group">
                                <label for="travelTips">Travel Tips</label>
                                <small class="form-text">
                                    example: closest public transport stop
                                </small>
                                <input type="text" id="travelTips"  class="form-control" v-model="eventItem.travelTips" />
                            </div>

                            <!-- ONLY VISIBLE IF EVENT IS PRIVATE -->
                            <div class="form-group" v-if="eventItem.eventPublicity === 'Private'">
                                <label for="capacity">Estimated Capacity</label>
                                <small class="form-text">
                                    Please provide your preferred number of people who can attend this event
                                </small>
                                <input type="number" id="capacity" class="form-control" v-model="eventItem.eventCapacity">
                            </div>

                            <div class="form-group">
                                <label for="details">Event Details</label>
                                <small class="form-text">
                                    Describe who should join and what your event is about
                                </small>
                                <textarea id="details" rows="8" v-on:input="checkDetailsCharacterLength" v-model="eventItem.eventDetails" max-length="1000" class="form-control"></textarea>
                                <p class="character-limit">{{ detailsCharacterLimitDisplay }}</p>
                            </div>

                            <img v-if="imagePreviewUrl" :src="imagePreviewUrl" class="my-2" />
                            <div class="form-group">
                                <div>
                                    <label for="eventImg">Event Image</label>
                                </div>
                                <label for="eventImg" class="btn btn-primary mr-2" tabindex="0" @keyup.enter="triggerUploadImageButton">Upload Image</label>
                                <span>(optional)</span>
                                <input type="file" id="eventImg" @change="onImageChange" ref="uploadBtn">
                            </div>

                            <div class="form-group">
                                <label for="imageAlt">Image Description</label>
                                <small class="form-text">
                                    Please provide short description of image provided
                                </small>
                                <input type="text" id="imageAlt" class="form-control" v-model="eventItem.imageAlt">
                            </div>

                            <input type="submit" v-on:click.prevent="onSubmit" class="btn btn-primary" value="Save changes" />
                        </form>

                        <section v-if="submitted" class="msg-success">
                            <h3>Your event has been updated</h3>
                            <router-link to="/my-hosting" class="btn btn-primary">Go back to my events and ideas</router-link>
                        </section>

                    </section>

                    <section class="spacer">
                        <h4 class="spacer">Delete event</h4>
                        <div class="custom-control custom-switch spacer">
                            <input type="checkbox" class="custom-control-input" id="confirmDelete" v-model="confirmDelete">
                            <label class="custom-control-label" for="confirmDelete">Do you want to delete this event?</label>
                        </div>
                        <div v-if="confirmDelete">
                            <p>Are you sure? Clicking on the button will permanently delete this event.</p>
                            <p><button @click="onDeleteEvent(eventItem)" type="button" name="button" class="btn btn-primary">Delete Event</button></p>
                        </div>
                    </section>

                    <section v-if="submitted && confirmDelete" class="msg-success">
                        <h3>Your event has been deleted</h3>
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
    import { mapActions, mapGetters } from 'vuex';
    import axios from 'axios';
    import { authHeader } from '@/utils/auth-header';
    import { apiUrl } from '@/utils/api';
    import LayoutMaster from '../../components/common/layouts/layout-master.vue';
    import Hero from '../../components/common/global/hero.vue';
    import DatePicker from 'vuejs-datepicker';
    import VueTimepicker from 'vue2-timepicker';

    export default {
        name: 'EventManagement',

        components: {
            LayoutMaster,
            Hero,
            DatePicker,
        },

        data() {
            return {
                formErrors: [],
                title: 'Event Management!',
                importantInfo: `Please note, you will not be able to edit event information 24 hours prior to your event start time. This is to assist attendees confirm their travel plans.`,
                confirmDelete: false,
                submitted: false,
                imagePreviewUrl: '',
                imageFile: '',
                detailsCharacterLimitEntered: 0,
                attendeeTotal: 0,
                detailsCharacterLimit: 1000,
                eventStartDate: '',
                eventStartTime: '',
                eventStartTimeMeridiem : '',
                eventEndTime: '',
                eventEndTimeMeridiem: '',
                eventAttendees: null,
            }
        },

        mounted () {
            this.getAttendees(this.$route.params.id)
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
                                && obj.rsvpParticipantId
                                && obj.responseType === "Attending"    
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

            onImageChange(e) {
                const image = e.target.files[0];
                this.imageFile = image;
                this.imagePreviewUrl = URL.createObjectURL(image);
            },

            checkForm() {
                this.formErrors = [];

                if (!this.eventItem.title) { this.formErrors.push('Title is required') }
                if (!this.eventStartDate) { this.formErrors.push('Event date is required') }
                if (!this.eventStartTime || !this.eventStartTimeMeridiem) { this.formErrors.push('Event start time is required') }
                // if (!this.eventEndTime || !this.eventEndTimeMeridiem) { this.formErrors.push('Event end time is required') }
                if (!this.eventItem.location) { this.formErrors.push('Location is required') }
                if (!this.eventItem.category) { this.formErrors.push('A category is required') }
                if (!this.eventItem.travelTips) { this.formErrors.push('Travel tips are required') }
                if (!this.eventItem.eventDetails) { this.formErrors.push('Event details are required') }
                if (!this.eventItem.eventPublicity) { this.formErrors.push('Type of event is required') }
                if (!this.eventItem.eventCapacity && this.eventItem.eventPublicity === "Private") { this.formErrors.push('Estimated capacity is required') }
                // if (!this.eventItem.eventType) { this.formErrors.push('Other event type/category is required') } // all events are type of Event right now
                if (!this.eventItem.attendanceString && this.eventItem.eventPublicity.toLowerCase() === 'Private') { this.formErrors.push('Attendance capacity is required') }
                // if (!this.imagePreviewUrl) { this.formErrors.push('An image is required') }
                if (this.imagePreviewUrl && !this.eventItem.imageAlt) { this.formErrors.push('An image description is required') }

                return this.formErrors.length > 0;
            },

            onSubmit() {
                const formHasErrors = this.checkForm();

                if ( formHasErrors ) {
                    window.scrollTo(0, this.topOffset);
                    this.setFocusToErrorListing();
                    return;
                }

                const eventTimes = this.calculateEventTimes();

                // destructure to only include relevant properties
                const { image, imageAlt, eventCategories, rsvPs, ...eventProps } = this.eventItem;

                const eventFormData = {
                    ...eventProps,
                    ...eventTimes
                };

                // only handling one category at the moment (radio button form input)
                const category = {
                    "categoryId": this.eventItem.category,
                    "checkBoxTicked": true
                };

                const id = this.eventItem.eventId;

                this.updateEvent({event: eventFormData}).then(() => {
                    const formData = new FormData();
                    formData.append('formFile', this.imageFile);
                    formData.append('eventId', id);
                    formData.append('altText', this.eventItem.imageAlt);

                    return formData;
                })
                .then(data => {
                    if (this.imagePreviewUrl) {
                        // add image to event
                        this.uploadEventImage(data).then(response => {
                            this.submitted = true;
                        });
                    }

                    this.putEventCategories({ id: id, categories: [category] });
                })
                .then(() => {
                    this.submitted = true;
                });
            },

            checkDetailsCharacterLength(e) {
                this.detailsCharacterLimitEntered = e.target.value.length;
            },

            setFocusToErrorListing() {
                this.$refs.formCreate.focus();
            },

            calculateEventTimes() {
                let startHour = Number(this.eventStartTime.split(':')[0]);
                const startMinute = Number(this.eventStartTime.split(':')[1]);
                if (this.eventStartTimeMeridiem === 'PM') {
                    startHour += 12;
                }

                let endHour = Number(this.eventEndTime.split(':')[0]);
                const endMinute = Number(this.eventEndTime.split(':')[1]);
                if (this.eventEndTimeMeridiem === 'PM') {
                    endHour += 12;
                }

                const eventDate = this.$moment(this.eventStartDate).hour(startHour).minute(startMinute).format('YYYY-MM-DDTHH:mm:00');
                const eventEndDate = this.$moment(this.eventStartDate).hour(endHour).minute(endMinute).format('YYYY-MM-DDTHH:mm:00');

                return { eventDate, eventEndDate };
            },

            triggerUploadImageButton() {
                // make accessible via keyboard enter
                this.$refs.uploadBtn.click();
            },

            onDeleteEvent(event) {
                this.deleteEvent(event.eventId).then(() => {
                    this.submitted = true;
                });
            },

            ...mapActions({
                'updateEvent': 'updateEvent',
                'uploadEventImage': 'uploadEventImage',
                'getCategories': 'getCategories',
                'putEventCategories': 'putEventCategories',
                'getEvent': 'getEvent',
                'deleteEvent': 'deleteEvent',
            }),
        },

        computed: {
            ...mapGetters(['allCategories']),
            ...mapGetters({
                eventItem: 'event'
            }),

            detailsCharacterLimitDisplay: function() {
                return `${this.detailsCharacterLimitEntered}/${this.detailsCharacterLimit}`;
            },

            topOffset: function() {
                const element = this.$refs.formCreate;
                const top = element.offsetTop;
                return top;
            },
        },

        created() {
            this.getCategories();
            this.getEvent(this.$route.params.id).then(() => {
                // set category based on first in array since user can only select one
                const event = {
                    ...this.eventItem,
                    category: this.eventItem.eventCategories[0].category.categoryId,
                };
                this.$store.commit('setEvent', event);

                //  set all fields from eventItem response to local component state
                this.eventStartDate = new Date(this.$moment(this.eventItem.eventDate).format('YYYY-MM-DDTHH:mm:00'));
                this.eventStartTime = this.$moment(this.eventItem.eventDate).format('hh:mm');
                this.eventStartTimeMeridiem = this.$moment(this.eventItem.eventDate).format('A');

                this.eventEndTime = this.$moment(this.eventItem.eventEndDate).format('hh:mm');
                this.eventEndTimeMeridiem = this.$moment(this.eventItem.eventEndDate).format('A');
            });
        }


    }
</script>

<style lang="scss" scoped>
    @import './src/assets/scss/vue.scss';
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
    .character-limit {
        text-align: right;
    }
    input[type="file"] {
        display: none;
    }
    .meridiem-time {
        @include make-row();
        padding: 0 15px;
        > label {
            width: 100%;
        }
        &__input {
            @include make-col-ready();
            @include make-col(3);
            padding: 0;
        }
        &__radio {
            @include make-col-ready();
            @include make-col(3);
        }
    }
</style>
