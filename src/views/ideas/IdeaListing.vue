<template>

    <LayoutMaster>
        <hero>
            <template slot="title">
                {{ title }}
            </template>
            <template slot="description">
                {{ tagline }}
            </template>
        </hero>
        <div class="container">
            <div class="pg-content">
                <section class="item-wrapper">
                    <article class="idea-pod" v-for="idea in allIdeas" :key="idea.eventId">
                        <IdeaListingItem v-bind:idea="idea" v-bind:selectedCategory="currentFilter" />
                    </article>
                </section>
                <aside class="filters" role="group">
                    <!-- TODO: refactor so that "my event RSVP's" doesn't appear for ideas -->
                    <EventListingFilter v-on:filter-events="filterEvents" v-bind:currentFilter="currentFilter" />
                </aside>

                <article class="ideas-footer">
                    <p>Can't find what you're looking for? Create your own idea!</p>
                    <router-link to="/create-idea" class="btn btn-primary">Create idea</router-link>
                </article>

            </div>
        </div>
    </LayoutMaster>
</template>

<script>
    import { mapGetters, mapActions } from "vuex";
    import LayoutMaster from '../../components/common/layouts/layout-master.vue';
    import Hero from '../../components/common/global/hero.vue';
    import EventListingFilter from '../events/EventListingFilter.vue';
    import IdeaListingItem from './IdeaListingItem.vue';
    export default {
        name: 'IdeaListing',

        components: {
            LayoutMaster,
            Hero,
            EventListingFilter,
            IdeaListingItem,
        },

        data() {
            return {
                title: 'Ideas!',
                tagline: 'Expressions of interest posted here',
                currentFilter: 'all',
            }
        },

        computed: {
            ...mapGetters(['allIdeas']),
        },

        created() {
            this.getIdeas();
        },

        methods: {
            ...mapActions({
                'getIdeas': 'getIdeas',
            }),
            filterEvents: function(filter) {
                this.currentFilter = filter;
                this.getIdeas(filter);
            },
        }
    }
</script>

<style lang="scss" scoped>
    @import './src/assets/scss/vue.scss';
    .idea-pod {
        @include spacer(1.5rem);
    }
    .ideas-footer {
        @include make-col-ready();
        @include make-col(12);
        text-align: center;
    }
    .interested {
        color: red;
    }
</style>
