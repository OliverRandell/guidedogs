<template lang="html">
    <layout-master>
        <hero>
            <template slot="title">
                {{ title }}!
            </template>
            <template slot="description">
                <span>Find events in your community here</span>
            </template>
        </hero>

        <div class="container">
            <div class="pg-content">

                <div class="event-listings">

                    <div class="col-12">
                        <h3>Host your own Event!</h3>
                        <router-link to="/create-event" class="btn btn-primary">+ Create event</router-link>
                    </div>

                    <div class="col-12">
                        <router-link to="/my-hosting" class="btn-link">Events that I'm hosting</router-link>
                    </div>

                    <div class="col-12">
                        <form v-on:submit.prevent="onSearch">
                            <div class="form-group my-5">
                                <label for="searchQuery" class="h3">Search</label>
                                <div class="form-inline">
                                    <input type="text" name="Search events" placeholder="Event keyword search" v-model="searchQuery" class="form-control" id="searchQuery">
                                    <input type="submit" value="Search" class="btn btn-primary mx-2">
                                </div>
                            </div>
                        </form>
                    </div>

                    <div class="row">
                        <!-- <transition-group class="filter" name="filter"> -->
                            <article class="event-pod" v-for="eventItem in filteredEvents" :key="eventItem.id" role="article">
                                <EventListingItem v-bind:eventItem="eventItem" v-bind:selectedCategory="currentFilter" />
                            </article>
                        <!-- </transition-group> -->
                    </div>
                </div>

                <aside class="event-filters" role="group">
                    <EventListingFilter v-on:filter-events="filterEvents" v-bind:currentFilter="currentFilter" />
                </aside>

            </div><!-- .pg-content -->
        </div><!-- .container -->
    </layout-master>
</template>

<script>
    import { mapGetters, mapActions } from "vuex";
    import LayoutMaster from '../../components/common/layouts/layout-master.vue';
    import Hero from '../../components/common/global/hero.vue';
    import EventListingItem from './EventListingItem.vue';
    import EventListingFilter from './EventListingFilter.vue';

    export default {
        name: 'Events',
        components : {
            LayoutMaster,
            Hero,
            EventListingItem,
            EventListingFilter
        },
        data () {
            return {
                title: 'Events',
                currentFilter: 'all',
                events: [],
                searchQuery: ''
            }
        },
        methods: {
            ...mapActions(['getEvents', 'searchEvents']),
            filterEvents: function(filter) { // using arrow function here will change context of `this` and break things
                this.currentFilter = filter;
                this.getEvents(filter); // this will fetch from api
            },
            onSearch() {
                this.currentFilter = 'all';
                this.searchEvents(this.searchQuery.toLowerCase());
            }
        },
        created() {
            this.getEvents()
        },
        computed: {
            ...mapGetters(['allEvents']),
            filteredEvents: function() {
                // TODO: remove when api has category query
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
    @import './src/assets/scss/vue.scss';
    .event-listings {
        @include spacer(2rem);
        @include make-col-ready();
        @include make-col(12);
        @include media-breakpoint-up(lg) {
            @include make-col(9);
            //@include make-col-offset(0);
        }
    }
    .event-pod {
        width: 100%;
        box-sizing: border-box;
        @include spacer(1rem);
        @include make-col-ready();
        @include make-col(12);
        @include media-breakpoint-up(lg) {
            @include make-col(6);
            //@include make-col-offset(0);
        }
    }
    .event-filters {
        @include make-col-ready();
        @include make-col(12);
        @include media-breakpoint-up(lg) {
            @include make-col(3);
        }
    }
</style>
