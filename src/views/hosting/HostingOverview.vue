<template>
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
            <div class="pg-content">

                <div class="col-8">
                    <h4>My Hosted events</h4>
                    <div class="row">

                        <article class="event-pod" v-for="eventItem in filteredEvents" :key="eventItem.id" role="article">
                            <EventListingItem v-bind:eventItem="eventItem" v-bind:selectedCategory="currentFilter" />
                        </article>

                        <!-- <article v-for="eventItem in hostedEvents" :key="eventItem.id" class="event-pod"> -->

                            <!-- IMG GOES HERE -->
                            <!-- <router-link :to="'/events/' + eventItem.eventId"></router-link>
                            <section class="event-content" tabindex="-1">
                                <time class="event-date">
                                  <span class="month">{{ eventItem.eventDate | moment("MMM") }}</span>
                                  <span class="day">{{ eventItem.eventDate | moment("D") }}</span>
                                </time>

                                <h2>{{ eventItem.title }}</h2>
                                <router-link to="/event-management" class="btn-link">Event management</router-link>
                                <router-link :to="'/events/' + eventItem.id" class="btn btn-primary">Edit event</router-link>
                            </section>



                        </article> -->
                    </div>

                    <h4>My Ideas</h4>
                    <div class="row">
                        <article class="idea-pod" v-for="idea in hostedIdeas" :key="idea.id">
                            <h3>{{ idea.title }}</h3>
                            <p>{{ idea.description }}</p>
                            <router-link :to="idea.route">Edit idea</router-link>
                        </article>
                    </div>

                </div>
                <div class="col-4">
                    <router-link to="/events" class="btn-link">&lt; Back to events</router-link>
                </div>
            </div>
        </div>
    </LayoutMaster>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex';
    import LayoutMaster from '../../components/common/layouts/layout-master.vue';
    import Hero from '../../components/common/global/hero.vue';
    import EventListingItem from '../events/EventListingItem.vue';
    export default {
        name: 'HostingOverview',
        components: {
            LayoutMaster,
            Hero,
            EventListingItem,
        },
        data() {
            return {
                title: 'My Events and Ideas!',
                tagline: `Review and edit your hosted activities here.`,
                currentFilter: 'all',
                events: [],
                // hostedEvents: [
                //     {
                //         title: 'Event 1',
                //         eventDate: '',
                //     },
                //     {
                //         title: 'Event 2',
                //         eventDate: '',
                //     }
                // ],
                hostedIdeas: [
                    {
                        id: 1,
                        title: 'Coffee chats in Kew',
                        description: `I'm looking to socialise with like-minded coffee loving indivduals`,
                        route: '/manage-idea',
                    },
                    {
                        id: 2,
                        title: 'Coffee chats in Kew',
                        description: `I'm looking to socialise with like-minded coffee loving indivduals`,
                        route: '/manage-idea',
                    }
                ],
            }
        },
        methods: {
            ...mapActions(['getEvents']),
            filterEvents: function(filter) {
                this.currentFilter = filter;
                this.getEvents(filter);
            },
        },
        created() {
            this.getEvents()
        },
        computed: {
            ...mapGetters(['allEvents']),
            filteredEvents: function() {
                return this.allEvents;
                return this.allEvents.filter((eventItem) => {
                    const titlesMatch = eventItem.title.toLowerCase().match(this.searchQuery.toLowerCase());

                    if (this.currentFilter !== 'all') {
                        const categoriesMatch = eventItem.eventCategories.filter(eventCategory => {
                            return eventCategory.category.categoryId.toString() === this.currentFilter;
                        });
                        return titlesMatch && categoriesMatch.length > 0;
                    }

                    return titlesMatch;
                });
            }
        },
        watch: {
            '$route' (to, from) {
                alert(to.params.eventItem.id);
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import './src/assets/scss/app.scss';
    .idea-pod {
        @include make-col-ready();
        @include make-col(12);
        @include media-breakpoint-up(lg) {
            @include make-col(6);
        }
    }
</style>
