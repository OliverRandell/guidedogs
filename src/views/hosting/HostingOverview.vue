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
                        <div class="col-12">
                            <EventListing hosting />
                        </div>
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
    import EventListing from '../events/EventListing.vue';
    export default {
        name: 'HostingOverview',
        components: {
            LayoutMaster,
            Hero,
            EventListing,
        },
        data() {
            return {
                title: 'My Events and Ideas!',
                tagline: `Review and edit your hosted activities here.`,
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
    @import './src/assets/scss/app.scss';
    .idea-pod {
        @include make-col-ready();
        @include make-col(12);
        @include media-breakpoint-up(lg) {
            @include make-col(6);
        }
    }
</style>
