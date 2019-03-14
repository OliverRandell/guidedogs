<template lang="html">
    <LayoutMaster>
        <Hero>
            <template slot="title">
                {{ eventItem.title }}
            </template>
            <!-- <template slot="description">
                Claptone’s ‘The Masquerade’ returns to Melbourne this April, to ignite fans into an extraordinary soirée of veiled faces!
            </template> -->
        </Hero>
        <div class="container">
            <section class="pg-content" tabindex="-1">
                <article class="event item-wrapper" role="article" tabindex="-1">

                    <div class="featured-img">
                        <time class="event-date">{{ eventItem.date }}</time>
                        <figure>
                            <img :src="eventItem.imgSrc" :alt="eventItem.imgAlt">
                        </figure>
                    </div>
                    <dl class="event-details">
                        <h2>{{ eventItem.title }}</h2>
                        <dt>Event date and time:</dt>
                        <dd>{{ eventItem.eventDate }}</dd>
                        <dt>Event location:</dt>
                        <dd>{{ eventItem.location }}</dd>
                        <dt>Event hosted by:</dt>
                        <dd>{{ eventItem.eventHostNickname }}</dd>
                        <dt>Event description:</dt>
                        <dd>{{ eventItem.eventDetails }}</dd>
                        <!-- <dt>Event Cost:</dt> -->
                        <!-- <dd>${{ eventItem.cost }}</dd>
                        <dt>Your response:</dt> -->
                        <!-- TOGGLE BUTTON, ON CLICK MAKE
                         INTERESTED OR NOT INTERESTED -->
                         <!-- FOR EVENT ATTENDING OR NOT ATTENDING -->
                        <!-- <dd>Not interested</dd> -->
                    </dl>
                    <button type="button" name="button" class="btn btn-primary btn-register" @click="registerInterest(eventItem)">Register your interest!</button>
                </article>
                <aside class="event-summary items-sidebar" tabindex="-1">
                    <p><router-link to="/events">Back to events page</router-link></p>
                    <p><button type="button" name="button" class="btn btn-primary">Delete event</button></p>
                    <p>
                        <!-- IF EVENT HOST ID == USER ID  -->
                        <!-- <router-link :to="{ 'editAccount': '', params: { eventId: event.eventId } }">Edit event</router-link> -->
                    </p>


                    <!-- <time class="event-date">
                        <span class="month">Mar</span>
                        <span class="day">30</span>
                    </time> -->

                    <router-link to="/create-event" class="btn btn-primary">Create an Event</router-link>

                </aside>
            </section>
        </div>
    </LayoutMaster>
</template>

<script>
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
                eventItem: {
                    id: this.$route.params.id,
                    imgAlt: 'This is the text alternative for the image',
                }
            }
        },
        created() {
            this.$http.get('https://gdvpeersupportplatformapi.azurewebsites.net/api/events/' + this.eventItem.id).then(function(data) {
                return data.json();
            }).then(function(data){
                this.eventItem = data;
            });
        },
        methods: {
            backToEvents() {
                this.$router.push('/events');
            },
            registerInterest(eventItem) {
                this.$emit('register-interest', eventItem);
            }
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
    }
    .btn-register {
        float: right;
    }
</style>
