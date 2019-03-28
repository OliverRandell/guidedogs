<template>
    <layout-master>
        <!-- <loading v-if="loading"></loading>
        <template v-if="isAuthenticated"> -->
            <!-- <feed-item v-for="(feed, index) in fakeFeed" :key="index" :feed="feed"></feed-item> -->

        <hero>
            <template slot="title">
                <strong>{{ welcomeMsg }} {{ user.userName }}!</strong>
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


    </layout-master>
</template>

<script>
    import { mapState, mapActions, mapGetters } from 'vuex';
    import axios from 'axios';
    import { authHeader } from '@/utils/auth-header';
    import { apiUrl } from '@/utils/api';
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
                welcomeMsg: 'Welcome',
                tagline: 'Latest news and events',
                user: {
                    userName: '',
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
            }
        },
        methods: {
            getProfileData () {
                axios.get(`${apiUrl}/MemberProfile`, { headers: { ...authHeader() } })
                    .then(({data}) => {
                        // go through and match existing keys...
                        Object.keys(this.user).map(user => Object.keys(data).map(field => {
                            if (user === field) {
                                // assign the relevant data to existing fields
                                this.user[user] = data[field]
                            }
                        }))
                    })
            },
            ...mapActions(['getMemberProfile'])
        },
        created () {
            this.getProfileData()
        },
        computed: {
            ...mapGetters(['memberProfile']),
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
