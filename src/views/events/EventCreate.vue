<template lang="html">
    <LayoutMaster>
        <Hero>
            <template slot="title">
                Create a new Event
            </template>
            <template slot="description">
                This is the area to create a new event...
            </template>
        </Hero>
        <div class="container">
            <article class="pg-content" tabindex="-1" role="article" v-if="!submitted">

                <form class="form-create-event col-8" @submit.prevent="handleSubmit">
                    <fieldset class="form-group">
                        <div class="row">
                            <legend class="col-form-label col-sm-4 pt-0">
                                Choose event type:
                            </legend>
                            <div class="col-sm-8">
                                <div class="form-check">
                                    <div class="form-check">
                                        <input class="form-check-input" type="radio" name="makeEventPrivate" id="private" value="Private" v-model="eventItem.status">
                                        <label class="form-check-label" for="private">Private</label>
                                    </div>
                                </div>
                                <div class="form-check">
                                    <div class="form-check">
                                        <input class="form-check-input" type="radio" name="makeEventPublic" id="public" value="public" v-model="eventItem.status">
                                        <label class="form-check-label" for="public">Public</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </fieldset>
                    <div class="form-group">
                        <label for="title">Event title:</label>
                        <input type="text" name="" value="" required v-model="eventItem.title" class="form-control">
                    </div>

                    <div class="form-group">
                        <label for="date">Event start date:</label>
                        <DatePicker v-model="eventItem.start" class="form-control"></DatePicker>
                    </div>
                    <div class="form-group">
                        <label for="date">Event end date:</label>
                        <DatePicker v-model="eventItem.end" class="form-control"></DatePicker>
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
                    <div class="form-group">
                        <label for="category">Category:</label>
                        <select class="form-control" v-model="eventItem.category">
                            <option v-for="category in eventCategories">{{ category | capitalize }}</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="host">Host:</label>
                        <input type="text" name="host" value="" v-model="account.user.username" class="form-control" disabled>
                        <!-- EVENT HOST WILL BE PRESELECTED AS THE USER -->
                        <!-- <select class="form-control" v-model="eventItem.host">
                            <option v-for="host in eventHosts">{{ host }}</option>
                        </select> -->
                    </div>
                    <div class="form-group">
                        <label for="location">Event location:</label>
                        <input type="text" name="location" value="" class="form-control" v-model="eventItem.location" />
                    </div>
                    <div class="form-group">
                        <label for="content">Event description:</label>
                        <textarea name="name" rows="4" v-model="eventItem.description" class="form-control"></textarea>
                    </div>
                    <input type="submit" v-on:click.prevent="post" class="btn btn-primary" value="Add Event" />
                </form>

                <aside class="event-preview col-4" aria-labelledby="eventPreview" tabindex="-1">
                    <button class="btn btn-primary" type="button" name="" @click="backToEvents">Go back to events page</button>
                    <h4>Preview Event</h4>

                    <dl class="event-details">
                        <dt>Event status:</dt>
                        <dd>{{ eventItem.status | capitalize }}</dd>
                        <dt>Event title:</dt>
                        <dd>{{ eventItem.title }}</dd>
                        <dt>Event start date:</dt>
                        <dd>{{ eventItem.start }}</dd>
                        <dt>Event end date:</dt>
                        <dd>{{ eventItem.end }}</dd>
                        <dt>Category:</dt>
                        <dd>{{ eventItem.category }}</dd>
                        <dt>Host:</dt>
                        <dd>{{ account.user.username }}</dd>
                        <dt>Event location:</dt>
                        <dd>{{ eventItem.location }}</dd>
                        <dt>Event content:</dt>
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
                eventItem: {
                    id: 0,
                    title: '',
                    start: '',
                    end: '',
                    description: '',
                    category: '',
                    host: 'me',
                    status: ''
                },
                eventCategories: ['information', 'social', 'sports and fitness', 'arts and crafts'],
                submitted: false
            }
        },
        methods: {
            post: function() {
                this.$http.post('https://gdvpeersupportplatformapi.azurewebsites.net/api/events', {
                    title: this.eventItem.title,
                    body: this.eventItem.content,
                    userId: 1
                }).then(function(data) {
                    console.log(data);
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
    .form-create-event {
        input[type="submit"] {
            float: right;
        }
    }
</style>
