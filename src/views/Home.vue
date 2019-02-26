<template lang="html">
    <layout-master>
        <!-- <loading v-if="loading"></loading>
        <template v-if="isAuthenticated"> -->
            <!-- <feed-item v-for="(feed, index) in fakeFeed" :key="index" :feed="feed"></feed-item> -->
            <main class="pg-content home container">
                <div class="row">
                    <div class="col-12">
                        <h2>Latest News items</h2>
                    </div>
                    <div class="col-12 col-md-8 col-lg-6">
                        <article v-for="item in newsArticles" :key="item.id" class="new-article">
                            <h2>{{ item.title }}</h2>
                            <p>{{ item.desc }}</p>
                            <router-link :to="item.route" class="btn btn-primary">Read more</router-link>
                        </article>
                    </div>

                </div>

            </main>

        <!-- </template> -->
        <!-- <div v-if="!isAuthenticated && authStatus !== 'loading'">
            <main class="home pg-content">
                <h2>Welcome to Peer Support Platform!</h2>
            </main>
        </div> -->
    </layout-master>
</template>

<script>
    import { mapState, mapActions } from 'vuex';
    import LayoutMaster from '../components/common/layouts/layout-master.vue';
    export default {
        name: 'Home',
        components : {
            LayoutMaster
        },
        data () {
            return {
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
        computed: {
            ...mapState({
                account: state => state.account,
                users: state => state.users.all
            })
        },
        created () {
            this.getAllUsers();
        },
        methods: {
            ...mapActions('users', {
                getAllUsers: 'getAll',
                deleteUser: 'delete'
            })
        }
        // computed: {
        //     ...mapGetters(['isAuthenticated', 'authStatus']),
        //     loading: function () {
        //         return this.authStatus === 'loading' && !this.isAuthenticated
        //     }
        // }
    }
</script>

<style lang="scss" scoped>
    @import './src/assets/scss/vue.scss';
    .new-article {
        @include spacer(2rem);
    }
</style>
