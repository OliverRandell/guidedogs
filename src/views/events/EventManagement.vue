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
            <div class="pg-content">

                <div class="col-8">
                    <h2>{{ event.title }}</h2>
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
                                <router-link :to="guest.route">{{ guest.rsvpParticipantNickName }}</router-link>
                            </li>
                        </ul>
                        <div class="btn-wrapper">
                            <router-link to="/manage-requests" class="btn btn-primary">Manage requests</router-link>
                        </div>


                    </section>
                    <section class="spacer">
                        <h4>Event details:</h4>
                        <form>
                            <div class="form-group">
                                <label for="hostName">Host Name:</label>
                                <input type="text" name="" value="" disabled class="form-control" v-modal="event.hostName">
                            </div>
                            <fieldset class="form-group">

                                <div class="row">
                                    <legend class="col-form-label col-sm-12 pt-0">Type</legend>
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
                            <div class="form-group" v-if="eventItem.eventPublicity === 'private'">
                                <label for="capacity">Estimated Capacity</label>
                                <small class="form-text">
                                    Please provide your preferred number of people who can attend this event
                                </small>
                                <input type="number" id="capacity" class="form-control" v-model="eventItem.attendanceString">
                            </div>
                            <div class="form-group">
                                <label for="details">Event Details</label>
                                <small class="form-text">
                                    Describe who should join and what your event is about
                                </small>
                                <textarea id="details" rows="4" v-on:input="checkDetailsCharacterLength" v-model="eventItem.eventDetails" max-length="1000" class="form-control"></textarea>
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
                            <input type="submit" v-on:click.prevent="onSubmit" class="btn btn-primary" value="Submit changes" />
                        </form>
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
    import LayoutMaster from '../../components/common/layouts/layout-master.vue';
    import Hero from '../../components/common/global/hero.vue';
    export default {
        name: 'EventManagement',
        components: {
            LayoutMaster,
            Hero,
        },
        data() {
            return {
                formErrors: [],
                title: 'Event Management!',
                importantInfo: `You can convert your idea into an event at any time. Further informtation will be required at that time. Ideas can be longstanding and do not have an expiry date.`,
                attendeeTotal: 5,
                event: {
                    title: 'This is the title'
                },
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
            }
        }
    }
</script>

<style lang="css">
</style>
