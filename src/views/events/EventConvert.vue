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
                        <form class="form-create-event form-create" @submit.prevent="onSubmit">
                            <h4>Event details</h4>

                            <p class="formErrors" v-if="formErrors.length" role="alert" aria-atomic="true">
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
                                <input type="text" id="travelTips"  class="form-control" v-model="eventItem.travelTips" />
                                <small class="form-text">example: closest public transport stop</small>
                            </div>

                            <!-- ONLY VISIBLE IF EVENT IS PRIVATE -->
                            <div class="form-group" v-if="eventItem.eventPublicity === 'Private'">
                                <label for="capacity">Estimated Capacity</label>
                                <input type="number" id="capacity" class="form-control" v-model="eventItem.eventCapacity">
                                <small class="form-text">Please provide your preferred number of people who can attend this event</small>
                            </div>

                            <div class="form-group">
                                <label for="details">Event Details</label>
                                <textarea id="details" rows="8" v-on:input="checkDetailsCharacterLength" v-model="eventItem.eventDetails" max-length="1000" class="form-control"></textarea>
                                <div class="form-group-footer">
                                    <small class="form-text">Describe who should join and what your event is about</small>
                                    <p class="character-limit">{{ detailsCharacterLimitDisplay }}</p>
                                </div>

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
                                <input type="text" id="imageAlt" class="form-control" v-model="eventItem.imageAlt">
                                <small class="form-text">Please provide short description of image provided</small>
                            </div>
                            <div class="btn-wrapper">
                                <input type="submit" v-on:click.prevent="onSubmit" class="btn btn-primary" value="Save and convert" />
                            </div>

                        </form>

                        <section v-if="submitted" class="msg-success">
                            <h3>Your idea has been updated and awaiting review</h3>
                            <router-link to="/my-hosting" class="btn btn-primary">Go back to my events and ideas</router-link>
                        </section>

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
                title: 'Convert Idea to Event',
                importantInfo: `You can convert your Idea into an Event at any time. Further information will be require at that time. Ideas can be longstanding, and do not have an expiry date.`,
                submitted: false,
                imagePreviewUrl: '',
                imageFile: '',
                attendeeTotal: 5,
                detailsCharacterLimitEntered: 0,
                detailsCharacterLimit: 1000,
                eventStartDate: '',
                eventStartTime: '',
                eventStartTimeMeridiem : '',
                eventEndTime: '',
                eventEndTimeMeridiem: '',
            }
        },

        methods: {
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
                        this.uploadEventImage(data);
                    }

                    this.putEventCategories({ id: id, categories: [category] });
                    this.convertToEvent({id})
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

            ...mapActions({
                'updateEvent': 'updateEvent',
                'uploadEventImage': 'uploadEventImage',
                'getCategories': 'getCategories',
                'putEventCategories': 'putEventCategories',
                'getEvent': 'getEvent',
                'convertToEvent': 'convertToEvent',
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

                this.eventEndTime = this.eventItem.eventEndDate ? this.$moment(this.eventItem.eventEndDate).format('hh:mm') : '';
                this.eventEndTimeMeridiem = this.eventItem.eventEndDate ? this.$moment(this.eventItem.eventEndDate).format('A') : '';
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
