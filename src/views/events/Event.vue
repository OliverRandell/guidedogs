<template lang="html">
    <LayoutMaster>
        <Hero>
            <template slot="title">
                {{ event.title }}
            </template>
        </Hero>
        <div class="container">
            <section class="pg-content" tabindex="-1">
                <article class="event item-wrapper" role="article" tabindex="-1">

                    <div class="featured-img" v-bind:class="{'no-img': !event.image}">
                        <time class="event-date">{{ event.eventDate | moment("DD MMM") }}</time>
                        <figure>
                            <img v-if="event.image" :src="event.image.url" :alt="event.image.altText">
                        </figure>
                    </div>
                    <dl class="event-details">
                        <h2>{{ event.title }}</h2>
                        <!-- TODO: link to host profile -->
                        <dt>Host:</dt>
                        <dd>{{ event.eventHostNickName }}</dd>
                        <dt>When:</dt>
                        <dd>
                            <time>
                                {{ event.eventDate | moment("dddd Do MMMM") }}
                                <br>
                                <!-- TODO: specify start and end times from model -->
                                {{ event.eventDate | moment("h:mm a") }}
                            </time>
                        </dd>
                        <dt>Where:</dt>
                        <dd>{{ event.location }}</dd>
                        <dt>Travel Tips:</dt>
                        <dd>{{ event.travelTips }}</dd>
                        <dt>Details:</dt>
                        <dd>{{ event.eventDetails }}</dd>
                    </dl>
                    <button type="button" name="button" class="btn btn-primary" @click="registerInterest(event)">Interested</button>
                    <button type="button" name="button" class="btn btn-outline-primary mx-3" @click="registerRsvp(event)">RSVP</button>
                </article>
                <aside class="event-summary items-sidebar" tabindex="-1">
                    <p><router-link to="/events">&lt; Back to events page</router-link></p>
                    <p><button v-if="event.userIsHost" @click="onDeleteEvent(event)" type="button" name="button" class="btn btn-primary">Delete event</button></p>
                    <router-link to="/create-event" class="btn btn-primary">Create an Event</router-link>

                </aside>
            </section>
        </div>
    </LayoutMaster>
</template>

<script>
    import { userService } from '../../services/user';
    import { mapGetters, mapActions } from 'vuex';
    import LayoutMaster from '../../components/common/layouts/layout-master.vue';
    import Hero from '../../components/common/global/hero.vue';
    export default {
        name: 'Event',
        components: {
            LayoutMaster,
            Hero
        },
        data() {
            return {
                
            }
        },
        created() {
            this.getEvent(this.$route.params.id);
        },
        methods: {
            ...mapActions(['getEvent', 'deleteEvent', 'rsvpEvent']),
            backToEvents() {
                this.$router.push('/events');
            },
            registerInterest(event) {
                event.rsvpType = 'Interested';
                this.rsvpEvent(event);
            },
            registerRsvp(event) {
                event.rsvpType = 'Attending';
                this.rsvpEvent(event);
            },
            onDeleteEvent(event) {
                this.deleteEvent(event.eventId).then(response => {
                    this.$router.push('/events');
                });
            }
        },
        computed: {
            ...mapGetters(['event'])
        }
    }
</script>

<style lang="scss" scoped>
    @import './src/assets/scss/vue.scss';
    .event-img {
        @include responsiveImg(20rem);
        @include spacer(1.5rem);
        @include media-breakpoint-up(lg) {
            margin-left: -$grid-gutter-width/2;
            .event-date {
                position: absolute;
                bottom: 0;
                left: 0;
                background: $secondary;
                padding: 1rem;
                color: $black;
                z-index: 2;
            }
        }
    }
    .event-details {
        @include spacer(1.5rem);
        h2 {
            @include spacer(1rem);
        }
        @include media-breakpoint-up(lg) {
            padding-left: $grid-gutter-width;
        }
        .event-title {
            display: block;
            margin-bottom: 1rem;
            line-height: 1;
        }
        dt {
            @include summaryHeading();
        }
        dd {
            font-size: 1rem;
        }
    }
</style>
