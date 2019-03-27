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
                    <EventListing itemsPerPage="2" />
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
    import EventListing from './events/EventListing.vue';
    export default {
        name: 'Home',
        components : {
            LayoutMaster,
            Hero,
            RecentArticles,
            EventListing,
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
            }
        },
        methods: {
            
        },
        created() {
        },
        computed: {

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
