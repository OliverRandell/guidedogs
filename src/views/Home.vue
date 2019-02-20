<template lang="html">
    <layout-master>
        <loading v-if="loading"></loading>
        <div v-if="isAuthenticated">
            <!-- <feed-item v-for="(feed, index) in fakeFeed" :key="index" :feed="feed"></feed-item> -->
            <h2>News items go in here!</h2>
        </div>
        <div v-if="!isAuthenticated && authStatus !== 'loading'">
            <main class="home">
                <h2>Welcome to Peer Support Platform!</h2>
            </main>
        </div>
    </layout-master>
</template>

<script>
    import LayoutMaster from '../components/common/layouts/layout-master.vue';
    import { mapGetters } from 'vuex';
    export default {
        name: 'Home',
        components : {
            LayoutMaster
        },
        computed: {
            ...mapGetters(['isAuthenticated', 'authStatus']),
            loading: function () {
                return this.authStatus === 'loading' && !this.isAuthenticated
            }
        }
    }
</script>

<style lang="css">
</style>
