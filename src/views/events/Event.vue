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
            <article class="pg-content" role="article" tabindex="-1">
                <section class="event">

                    <div class="event-img">
                        <time class="event-date">{{ eventItem.date }}</time>
                        <figure>
                            <img :src="eventItem.imgSrc" alt="">
                        </figure>
                    </div>
                    <dl class="event-details">
                        <h2>{{ eventItem.title }}</h2>
                        <dt>Event date and time:</dt>
                        <dd>{{ eventItem.day }}, {{ eventItem.date }}. {{ eventItem.timeBegin }} - {{ eventItem.timeEnd }}</dd>
                        <dt>Event location:</dt>
                        <dd>{{ eventItem.location }}</dd>
                        <dt>Event hosted by:</dt>
                        <dd>{{ eventItem.host }}</dd>
                        <dt>Event description:</dt>
                        <dd>{{ eventItem.desc }}</dd>
                        <dt>Event Cost:</dt>
                        <dd>${{ eventItem.cost }}</dd>
                        <dt>Your response:</dt>
                        <!-- TOGGLE BUTTON, ON CLICK MAKE
                         INTERESTED OR NOT INTERESTED -->
                         <!-- FOR EVENT ATTENDING OR NOT ATTENDING -->
                        <dd>Not interested</dd>
                    </dl>
                    <button type="button" name="button" class="btn btn-primary btn-register" @click="registerInterest(eventItem)">Register your interest!</button>
                </section>
                <aside class="event-summary" tabindex="-1">
                    <p><router-link to="/events">Back to events page</router-link></p>



                    <!-- <time class="event-date">
                        <span class="month">Mar</span>
                        <span class="day">30</span>
                    </time> -->

                    <router-link to="/create-event" class="btn btn-primary">Create an Event</router-link>

                </aside>
            </article>
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
                    //
                    // eventItem: {},
                    // title: "Claptone 'The Masquerade' Melbourne 2019",
                    // imgSrc: 'http://placekitten.com/800/400',
                    // imgAlt: 'This is the alternative text of the image',
                    // category: 'information',
                    // host: 'Guide Dogs Victoria',
                    // date: '14-02-19',
                    // day: 'Friday',
                    // eoi: false,
                    // timeBegin: '13:30',
                    // timeEnd: '15:30',
                    // location: 'Melton Country Club, Reserve Road, Melton VIC, Australia',
                    // travelTips: 'Bus – 456, Closest Stop: Melton Valley Dr',
                    // eventOpen: 'false',
                    // cost: 'free',
                    // desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
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
    .event {
        @include make-col-ready();
        //border: 1px solid $primary;
        //width: 100%;
        //padding: 1rem;
        //height: 20rem;
        @include media-breakpoint-up(lg) {
            position: relative;
            @include make-col(8);
        }
    }
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
    .event-summary {
        @include make-col-ready();
        @include media-breakpoint-up(lg) {
            padding-top: 4rem;
            @include make-col(4);
        }
        header {
            display: block;
            margin-bottom: 1rem;
        }
        h5 {
            @include summaryHeading();
        }
        h4 {
            font-size: 1.2rem;
        }
        .event-date {
            display: flex;
            margin-bottom: 1rem;
        }
        .btn-group {
            margin-top: 2rem;
            display: block;
            .btn {
                margin-bottom: 1rem;
                width: 100%;
            }
        }
    }
    .pg-content {
        padding-top: 0;
    }
    .btn-register {
        float: right;
    }
</style>
