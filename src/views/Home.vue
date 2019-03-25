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
                        <h4>Latest events</h4>
                    </div>
                    <article class="event-pod" v-for="eventItem in events" :key="eventItem.id" role="article">
                        <EventListingItem v-bind:eventItem="eventItem" />
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
                user: {
                    firstName: '',
                },
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
                events: []
            }
        },
        // computed: {
        //     ...mapState({
        //         account: state => state.account,
        //         users: state => state.users.all
        //     })
        // },
        created() {
            this.getEvents()
            // this.getAllUsers();
            // this.$http.get('https://gdvpeersupportplatformapi.azurewebsites.net/api/events').then(function(data) {
            //     return data.json();
            // }).then(function(data) {
            //     var eventsArray = [];
            //     for (let key in data) {
            //         data[key].eventId = key
            //         eventsArray.push(data[key]);
            //     }
            //     this.events = eventsArray;
            // })
        },
        methods: {
            ...mapActions(['getEvents']),
            // ...mapActions('users', {
            //     getAllUsers: 'getAll',
            //     deleteUser: 'delete'
            // })
        },
        computed: {
            ...mapGetters(['allEvents']),
        //     ...mapGetters(['isAuthenticated', 'authStatus']),
        //     loading: function () {
        //         return this.authStatus === 'loading' && !this.isAuthenticated
        //     }
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
