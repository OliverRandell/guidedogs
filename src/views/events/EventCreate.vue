<template lang="html">
    <LayoutMaster>
        <Hero>
            <template slot="title">
                {{ title }}
            </template>
            <template slot="description">
                <span>{{ tagline }}</span>
            </template>
        </Hero>
        <div class="container">
            <article class="pg-content" tabindex="-1" role="article" v-if="!submitted">

                <form class="form-create-event form-create col-8" @submit.prevent="onSubmit">
                    <p v-if="formErrors.length" role="alert" aria-atomic="true">
                        <b>Please correct the following error(s):</b>
                        <ul>
                            <li v-for="(error, index) in formErrors" :key="index">{{ error }}</li>
                        </ul>
                    </p>
                    <fieldset class="form-group">

                        <div class="row">
                            <legend class="col-form-label col-sm-12 pt-0">Type:</legend>
                            <div class="col-sm-12">
                                <div class="custom-control custom-radio mb-2">
                                    <input class="custom-control-input" type="radio" name="publicOrPrivate" id="public" value="public" v-model="eventItem.eventPublicity">
                                    <label class="custom-control-label" for="public">Public Event - unlimited capacity</label>
                                </div>
                                <div class="custom-control custom-radio mb-2">
                                    <input class="custom-control-input" type="radio" name="publicOrPrivate" id="private" value="private" v-model="eventItem.eventPublicity">
                                    <label class="custom-control-label" for="private">Private Event - limited capacity of attendees</label>
                                </div>
                            </div>
                        </div>
                    </fieldset>
                    <!-- ONLY VISIBLE IF EVENT IS PRIVATE -->
                    <div class="form-group" v-if="eventItem.eventPublicity === 'private'">
                        <label for="capacity">Event capacity</label>
                        <input type="number" name="capacity" value="capacity" class="form-control" placeholder="e.g. 16" v-model="eventItem.attendanceString">
                        <small class="form-text text-muted">
                            Provide a capacity limitation of members who can attend this event.
                        </small>
                    </div>
                    <div class="form-group">
                        <label for="title">Event title:</label>
                        <input type="text" name="title" value="title" required v-model="eventItem.title" class="form-control">
                    </div>
                    <fieldset class="form-group">

                        <div class="row">
                            <!-- TODO: get category from api -->
                            <legend class="col-form-label col-sm-12 pt-0">Choose category:</legend>
                            <div class="col-sm-8">
                                <div class="custom-control custom-radio mb-2">
                                    <input class="custom-control-input" type="radio" name="category" id="social" value="social" v-model="eventItem.category">
                                    <label class="custom-control-label" for="social">Social</label>
                                </div>
                                <div class="custom-control custom-radio mb-2">
                                    <input class="custom-control-input" type="radio" name="category" id="information" value="information" v-model="eventItem.category">
                                    <label class="custom-control-label" for="information">Information</label>
                                </div>
                                <div class="custom-control custom-radio mb-2">
                                    <input class="custom-control-input" type="radio" name="category" id="arts" value="arts" v-model="eventItem.category">
                                    <label class="custom-control-label" for="arts">Arts</label>
                                </div>
                                <div class="custom-control custom-radio mb-2">
                                    <input class="custom-control-input" type="radio" name="category" id="sports" value="sports" v-model="eventItem.category">
                                    <label class="custom-control-label" for="sports">Sports and fitness</label>
                                </div>
                                <div class="custom-control custom-radio mb-2">
                                    <input class="custom-control-input" type="radio" name="category" id="none" value="none" v-model="eventItem.category">
                                    <label class="custom-control-label" for="none">Other</label>
                                </div>
                            </div>
                        </div>
                    </fieldset>

                    <div class="form-group">
                        <label for="date">Event date:</label>
                        <DatePicker v-model="eventItem.eventDate" class="form-control"></DatePicker>
                    </div>

                    <div class="form-group">
                        <label for="location">Event location:</label>
                        <input type="text" name="location" value="location" required v-model="eventItem.location" class="form-control">
                    </div>

                    <div class="form-group">
                        <label for="travelTips">Event travel tips:</label>
                        <input type="text" name="travelTips" value="travelTips" class="form-control" v-model="eventItem.travelTips" />
                    </div>

                    <div class="form-group">
                        <label for="content">Event details:</label>
                        <textarea name="name" rows="4" v-model="eventItem.eventDetails" class="form-control"></textarea>
                    </div>
                    
                    <img v-if="imagePreviewUrl" :src="imagePreviewUrl" />
                    <div class="form-group">
                        <label for="eventItem.imgSrc">Add an event image</label>
                        <input type="file" id="eventImg" name="" value="" class="form-control" @change="onImageChange">
                    </div>
                    <div class="form-group">
                        <label for="imageAlt">Image description</label>
                        <input type="text" name="" value="imageAlt" class="form-control" v-model="eventItem.imageAlt" placeholder="Please provide a short description of image provided">
                    </div>
                    <h4>Important Information</h4>
                    <p v-html="importantInfo"></p>
                    <input type="submit" v-on:click.prevent="onSubmit" class="btn btn-primary" value="Create Event" />
                </form>

                <aside class="event-preview col-4" aria-labelledby="eventPreview" tabindex="-1">
                    <router-link to="/events">&lt; Back to events page</router-link>
                    <h4>Preview Event</h4>

                    <dl class="event-details">
                        <dt>Event status:</dt>
                        <dd>{{ eventItem.status | capitalize }}</dd>
                        <dt>Event title:</dt>
                        <dd>{{ eventItem.title }}</dd>
                        <dt>Event start date:</dt>
                        <dd>{{ eventItem.start }}</dd>
                        <dt>Category:</dt>
                        <dd>{{ eventItem.category }}</dd>
                        <dt>Event location:</dt>
                        <dd>{{ eventItem.travelTips }}</dd>
                        <dt>Event travel tips:</dt>
                        <dd>{{ eventItem.location }}</dd>
                        <dt>Event details:</dt>
                        <dd>{{ eventItem.description }}</dd>
                    </dl>


                </aside>

            </article>
            <section v-if="submitted" class="msg-success">
                <h3>Congratulations! You have successfully created an event.</h3>
                <button type="button" name="" @click="backToEvents" class="btn btn-primary">Go back to events page</button>
            </section>
        </div>

    </LayoutMaster>

</template>

<script>
    import { mapState, mapActions } from 'vuex';
    import LayoutMaster from '../../components/common/layouts/layout-master.vue';
    import Hero from '../../components/common/global/hero.vue';
    import DatePicker from 'vuejs-datepicker';
    export default {
        name: 'EventCreate',
        components: {
            LayoutMaster,
            Hero,
            DatePicker
        },
        data () {
            return {
                formErrors: [],
                title: 'Create Event!',
                tagline: 'Organise and host your own event',
                eventItem: {
                    category: '',

                    title: '',
                    eventDate: '',
                    location: '',
                    eventCategories: [],
                    travelTips: '',
                    eventDetails: '',
                    eventPublicity: '',
                    eventType: 'Event',
                    attendanceString: '',
                    image: '',
                    imageAlt: '',
                },
                imagePreviewUrl: '',
                imageFile: '',
                eventCategories: ['information', 'social', 'sports and fitness', 'arts and crafts'],
                submitted: false,
                importantInfo: `Please note, you will not be able to edit event information 24 hours prior to your event start time. This is to assist attendees to confirm their travel plans.`
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
                if (!this.eventItem.eventDate) { this.formErrors.push('Event date is required') }
                if (!this.eventItem.location) { this.formErrors.push('Location is required') }
                if (!this.eventItem.eventCategories) { this.formErrors.push('A category is required') }
                if (!this.eventItem.travelTips) { this.formErrors.push('Travel tips are required') }
                if (!this.eventItem.eventDetails) { this.formErrors.push('Event details are required') }
                if (!this.eventItem.eventPublicity) { this.formErrors.push('Type of event is required') }
                // if (!this.eventItem.eventType) { this.formErrors.push('Other event type/category is required') } // all events are type of Event right now
                if (!this.eventItem.attendanceString && this.eventItem.eventPublicity.toLowerCase() === 'private') { this.formErrors.push('Attendance capacity is required') }
                if (!this.imagePreviewUrl) { this.formErrors.push('An image is required') }
                if (!this.eventItem.imageAlt) { this.formErrors.push('An image description is required') }

                return this.formErrors.length > 0;
            },
            onSubmit() {
                const formHasErrors = this.checkForm();

                if ( formHasErrors ) return;

                // destructure to only include relevant properties
                const { image, imageAlt, ...eventProps } = this.eventItem;

                const isDateInvalid = this.$moment(eventProps.eventDate).format('YYYY-MM-DD') === 'Invalid date';
                const formattedDate = isDateInvalid ? this.$moment(new Date()).format('YYYY-MM-DD') : this.$moment(eventProps.eventDate).format('YYYY-MM-DD');

                const eventFormData = {
                    ...eventProps,
                    eventDate: formattedDate,
                };

                this.createEvent({event: eventFormData}).then(response => {
                    const formData = new FormData();
                    formData.append('formFile', this.imageFile);
                    formData.append('eventId', response.eventId);
                    formData.append('altText', this.eventItem.imageAlt);

                    this.uploadEventImage(formData);
                });
            },
            backToEvents() {
                this.$router.push('/events');
            },
            ...mapActions({
                'createEvent': 'createEvent',
                'uploadEventImage': 'uploadEventImage'
            })
        },
        filters: {
            capitalize: function (value) {
                if (!value) return ''
                value = value.toString()
                return value.charAt(0).toUpperCase() + value.slice(1)
            }
        },
        computed: {
            ...mapState({
                account: state => state.account,
            })
        },
    }
</script>

<style lang="scss" scoped>
    @import './src/assets/scss/vue.scss';
    .event-preview {
        @include make-col-ready();
        @include media-breakpoint-up(lg) {
            @include make-col(4);
        }
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
