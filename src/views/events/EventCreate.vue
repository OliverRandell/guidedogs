<template lang="html">
    <LayoutMaster>
        <Hero>
            <template slot="title">
                {{ title }}
            </template>
            <template slot="description">
                {{ tagline }}
            </template>
        </Hero>
        <div class="container">
            <article class="pg-content" tabindex="-1" role="article" v-if="!submitted">

                <form class="form-create-event form-create col-8" @submit.prevent="handleSubmit">
                    <div class="form-group">
                        <label for="host">Host:</label>
                        <input type="text" name="host" value="" v-model="account.user.username" class="form-control" disabled>
                        <!-- EVENT HOST WILL BE PRESELECTED AS THE USER -->
                        <!-- <select class="form-control" v-model="eventItem.host">
                            <option v-for="host in eventHosts">{{ host }}</option>
                        </select> -->
                    </div>
                    <fieldset class="form-group">

                        <div class="row">
                            <legend class="col-form-label col-sm-12 pt-0">Type:</legend>
                            <div class="col-sm-8">
                                <div class="form-check">
                                    <div class="form-check">
                                        <input class="form-check-input" type="radio" name="makeEventPrivate" id="private" value="private" v-model="eventItem.status">
                                        <label class="form-check-label" for="private">Private Event - limited capacity of attendees</label>
                                    </div>
                                </div>
                                <div class="form-check">
                                    <div class="form-check">
                                        <input class="form-check-input" type="radio" name="makeEventPublic" id="public" value="public" v-model="eventItem.status">
                                        <label class="form-check-label" for="public">Public Event - unlimited capacity</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </fieldset>
                    <!-- ONLY VISIBLE IF EVENT IS PRIVATE -->
                    <div class="form-group" v-if="eventItem.status === 'private'">
                        <label for="capacity">Event capacity</label>
                        <input type="number" name="capacity" value="capacity" class="form-control">
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
                            <legend class="col-form-label col-sm-12 pt-0">Choose category:</legend>
                            <div class="col-sm-8">
                                <div class="form-check">
                                    <div class="form-check">
                                        <input class="form-check-input" type="radio" name="categorySocial" id="social" value="social" v-model="eventItem.category">
                                        <label class="form-check-label" for="social">Social</label>
                                    </div>
                                </div>
                                <div class="form-check">
                                    <div class="form-check">
                                        <input class="form-check-input" type="radio" name="categoryInformation" id="information" value="information" v-model="eventItem.category">
                                        <label class="form-check-label" for="information">Information</label>
                                    </div>
                                </div>
                                <div class="form-check">
                                    <div class="form-check">
                                        <input class="form-check-input" type="radio" name="categoryArts" id="arts" value="arts" v-model="eventItem.category">
                                        <label class="form-check-label" for="arts">Arts</label>
                                    </div>
                                </div>
                                <div class="form-check">
                                    <div class="form-check">
                                        <input class="form-check-input" type="radio" name="categorySports" id="sports" value="sports" v-model="eventItem.category">
                                        <label class="form-check-label" for="sports">Sports and fitness</label>
                                    </div>
                                </div>
                                <div class="form-check">
                                    <div class="form-check">
                                        <input class="form-check-input" type="radio" name="categoryNone" id="none" value="none" v-model="eventItem.category">
                                        <label class="form-check-label" for="none">Other</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </fieldset>

                    <div class="form-group">
                        <label for="date">Event date:</label>
                        <DatePicker v-model="eventItem.eventDate" class="form-control"></DatePicker>
                    </div>

                    <!-- START TIME FIELD TO GO HERE -->
                    <div class="form-group">
                        <label for="startTime">Event start time:</label>
                        <VueTimepicker v-model="eventItem.eventStartTime" format="hh:mm A" class="form-control"></VueTimepicker>
                    </div>
                    <!-- END TIME FIELD TO GO HERE -->
                    <div class="form-group">
                        <label for="startTime">Event start time:</label>
                        <VueTimepicker v-model="eventItem.eventStartTime" format="hh:mm A" class="form-control"></VueTimepicker>
                    </div>

                    <div class="form-group">
                        <label for="location">Event location:</label>
                        <input type="text" name="location" value="location" required v-model="eventItem.location" class="form-control">
                    </div>



                    <!-- <div class="form-group">
                        <label for="date">Event end date:</label>
                        <DatePicker v-model="eventItem.end" class="form-control"></DatePicker>
                    </div> -->

                    <div class="form-group">
                        <label for="travelTips">Event travel tips:</label>
                        <input type="text" name="travelTips" value="travelTips" class="form-control" v-model="eventItem.travelTips" />
                    </div>


                    <!-- <div class="form-check form-check-inline">
                        <input class="form-check-input" type="checkbox" v-model="eventItem.categories" value="information" />
                        <label class="form-check-label" for="information">Information</label>
                    </div>
                    <div class="form-check form-check-inline">
                        <input class="form-check-input" type="checkbox" v-model="eventItem.categories" value="social" />
                        <label class="form-check-label" for="social">Social</label>
                    </div>
                    <div class="form-check form-check-inline">
                        <input class="form-check-input" type="checkbox" v-model="eventItem.categories" value="sports" />
                        <label class="form-check-label" for="sports">Sports &amp; Fitness</label>
                    </div>
                    <div class="form-check form-check-inline">
                        <input class="form-check-input" type="checkbox" v-model="eventItem.categories" value="arts" />
                        <label class="form-check-label" for="arts">Arts &amp; crafts</label>
                    </div> -->
                    <!-- <div class="form-group">
                        <label for="category">Category:</label>
                        <select class="form-control" v-model="eventItem.category">
                            <option v-for="category in eventCategories">{{ category | capitalize }}</option>
                        </select>
                    </div> -->
                    <!-- <div class="form-group">
                        <label for="location">Event location:</label>
                        <input type="text" name="location" value="" class="form-control" v-model="eventItem.location" />
                    </div> -->

                    <div class="form-group">
                        <label for="content">Event details:</label>
                        <textarea name="name" rows="4" v-model="eventItem.description" class="form-control"></textarea>
                    </div>
                    <!-- EVENT IMAGE DETAILS TO GO HERE -->
                    <div class="form-group">
                        <label for="eventItem.imgSrc">Add an event image</label>
                        <input type="file" id="eventImg" name="" value="" class="form-control">
                    </div>
                    <div class="form-group">
                        <label for="imageAlt">Image description</label>
                        <input type="text" name="" value="imageAlt" class="form-control" v-model="eventItem.imageAlt" placeholder="Please provide a short description of image provided">
                    </div>
                    <h4>Important Information</h4>
                    <p v-html="importantInfo"></p>
                    <input type="submit" v-on:click.prevent="post" class="btn btn-primary" value="Create Event" />
                </form>

                <aside class="event-preview col-4" aria-labelledby="eventPreview" tabindex="-1">
                    <button class="btn btn-primary" type="button" name="" @click="backToEvents">Go back to events page</button>
                    <h4>Preview Event</h4>

                    <dl class="event-details">
                        <dt>Event status:</dt>
                        <dd>{{ eventItem.status | capitalize }}</dd>
                        <dt>Event title:</dt>
                        <dd>{{ eventItem.title }}</dd>
                        <dt>Event date:</dt>
                        <dd>{{ eventItem.eventDate }}</dd>
                        <dt>Event start time:</dt>
                        <dd>{{ eventItem.eventStartTime }}</dd>
                        <dt>Event end time:</dt>
                        <dd>{{ eventItem.eventEndTime }}</dd>
                        <!-- <dt>Event end date:</dt>
                        <dd>{{ eventItem.end }}</dd> -->
                        <dt>Category:</dt>
                        <dd>{{ eventItem.category }}</dd>
                        <dt>Host:</dt>
                        <dd>{{ account.user.username }}</dd>
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
    import VueTimepicker from 'vue2-timepicker';
    export default {
        name: 'EventCreate',
        components: {
            LayoutMaster,
            Hero,
            DatePicker,
            VueTimepicker,
        },
        data () {
            return {
                title: 'Create a new Event',
                tagline: 'This is the area to create a new event...',
                eventItem: {
                    //id: '',
                    private: true,
                    title: '',
                    location: '',
                    travelTips: '',
                    eventDate: '',
                    eventStartTime: '',
                    eventEndTime: '',
                    description: '',
                    category: '',
                    host: 'me',
                    status: ''
                },
                eventCategories: ['information', 'social', 'sports and fitness', 'arts and crafts'],
                submitted: false,
                importantInfo: `Please note, you will not be able to edit event information 24 hours prior to your event start time. This is to assist attendees to confirm their travel plans.`
            }
        },
        methods: {
            post: function() {
                this.$http.post('https://gdvpeersupportplatformapi.azurewebsites.net/api/events', this.eventItem).then(function(data) {
                    console.log(data);
                    // title: this.eventItem.title,
                    // body: this.eventItem.content
                    this.submitted = true;
                });
            },
            // async handleSubmit() {
            //     const start = format(this.eventItem.start, 'YYYY-MM-DD');
            //     const end = format(this.eventItem.end, 'YYYY-MM-DD');
            //     const eventItem = {
            //         ...this.eventItem,
            //         start,
            //         end
            //     }
                //const req =
            //},
            backToEvents() {
                this.$router.push('/events');
            },
            ...mapActions('users', {
                getAllUsers: 'getAll',
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
