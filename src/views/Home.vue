<template>
    <layout-master>
        <!-- <loading v-if="loading"></loading>
        <template v-if="isAuthenticated"> -->
            <!-- <feed-item v-for="(feed, index) in fakeFeed" :key="index" :feed="feed"></feed-item> -->

        <hero>
            <template slot="title">
                <strong>{{ welcomeMsg }}</strong>
            </template>
            <template slot="description">
                {{ tagline }}
            </template>
        </hero>
        <div class="container">
            <div class="pg-content home" role="article" tabindex="-1">
                <section class="item-wrapper">
                    <div class="col-12">
                        <RecentArticles>
                            <template slot="btn-title">Read Article</template>
                        </RecentArticles>
                    </div>
                </section>
                <section class="item-wrapper">
                    <div class="col-12">
                        <h4>Upcoming events</h4>
                    </div>
                    <article class="event-pod" v-for="eventItem in filteredEvents" :key="eventItem.id" role="article">
                        <EventListingItem v-bind:eventItem="eventItem" v-bind:selectedCategory="currentFilter" />
                    </article>
                    <!-- <article class="pod-event" v-for="eventItem in events" :key="eventItem.id">
                        <router-link :to="'/events/' + eventItem.id">
                            <h2>{{ eventItem.title }}</h2>
                        </router-link>
                    </article> -->
                </section>
            </div>
        </div>

        <!-- </template> -->
        <!-- <div v-if="!isAuthenticated && authStatus !== 'loading'">
            <main class="home pg-content">
                <h2>Welcome to Peer Support Platform!</h2>
            </main>
        </div> -->
    </layout-master>
</template>

<script>
    import { mapGetters, mapActions } from "vuex";
    import LayoutMaster from '../components/common/layouts/layout-master.vue';
    import Hero from '../components/common/global/hero.vue';
    import RecentArticles from '../components/common/blog/recent-articles.vue';
    import EventListingItem from './events/EventListingItem.vue';
    export default {
        name: 'Home',
        components : {
            LayoutMaster,
            Hero,
            RecentArticles,
            EventListingItem,
        },
        data () {
            return {
                welcomeMsg: 'Welcome!',
                tagline: 'Latest news and events',
                newsArticles: [
                    {
                        title: 'Brand new social platfom launched!',
                        desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
                        route: '',
                    },
                    {
                        title: 'Title',
                        desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
                        route: '',
                    },
                    {
                        title: 'Title',
                        desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
                        route: '',
                    }
                ],
                currentFilter: 'all',
                events: [],
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
    @import './src/assets/scss/vue.scss';
    .new-article {
        @include spacer(2rem);
    }
    .pod-event {
        @include make-col-ready();
        @include make-col(12);
        @include media-breakpoint-up(lg) {
            @include make-col(6);
        }
    }
</style>
