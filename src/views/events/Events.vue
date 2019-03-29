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

                <div class="event-listings" ref="eventListing" tabindex="-1">
                    <!-- <header>
                        <h4 class="h3"></h4>
                    </header> -->
                    <section class="spacer">
                        <h3 class="h6">Welcome to the events section. Have an event in mind? Why not create your own!</h3>
                        <router-link to="/create-event" class="btn btn-primary">Create event</router-link>
                    </section>


                    <form v-on:submit.prevent="onSearch">
                        <div class="form-group">

                            <label for="searchQuery" class="h4 sr-only">Search events by name, date and category.</label>
                            <div class="input-group">

                                <input type="text" name="searchEvents" placeholder="Event keyword search" v-model="searchQuery" class="form-control" id="searchQuery">
                                <div class="input-group-append">
                                    <input type="submit" value="Search" class="btn btn-primary">
                                </div>

                            </div>
                            <small class="form-text text-muted">Search events by name, location and category.</small>
                        </div>

                    </form>


                    <EventListing :categoryId="categoryId" :searchString="searchString" :pageNumber="pageNumber" v-on:last-page="setLastPage" />

                    <section class="btn-group">
                        <button class="btn btn-outline-primary pagination-button" @click="onPrevPage" v-if="!firstPage">Previous page</button>
                        <button class="btn btn-outline-primary pagination-button" @click="onNextPage" v-if="!lastPage">Next page</button>
                    </section>

                    <!-- <div class="col-12">
                        <router-link to="/events/event-request" class="btn-link">Request to join event</router-link>
                    </div> -->

                </div>

                <aside class="event-filters" role="group">
                    <section class="my-events">
                        <h6>View the events you are hosting.</h6>
                        <router-link to="/my-hosting" class="btn btn-secondary full-width">My events</router-link>
                    </section>

                    <CategoryListingFilter v-on:filter="categoryFilterEvents" v-bind:categoryId="categoryId" />
                </aside>

            </div><!-- .pg-content -->
        </div><!-- .container -->
    </layout-master>
</template>

<script>
    import { mapGetters, mapActions } from "vuex";
    import LayoutMaster from '../../components/common/layouts/layout-master.vue';
    import Hero from '../../components/common/global/hero.vue';
    import EventListing from './EventListing.vue';
    import CategoryListingFilter from '../../components/common/CategoryListingFilter.vue';

    export default {
        name: 'Events',

        components : {
            LayoutMaster,
            Hero,
            EventListing,
            CategoryListingFilter
        },

        data () {
            return {
                title: 'Events',
                categoryId: '',
                searchQuery: '',
                searchString: '',
                pageNumber: 1,
                lastPage: false,
            }
        },

        methods: {
            categoryFilterEvents: function(id) {
                this.categoryId = id;
                this.pageNumber = 1;
            },

            onSearch() {
                this.searchString = this.searchQuery;
                this.pageNumber = 1;
            },

            onNextPage() {
                this.pageNumber++;
                window.scrollTo(0, this.topOffset);
                this.setFocusToEventListing();
            },

            onPrevPage() {
                if (this.pageNumber > 1) {
                    this.pageNumber--;
                    window.scrollTo(0, this.topOffset);
                    this.setFocusToEventListing();
                    this.lastPage = false;
                }
            },

            setFocusToEventListing() {
                this.$refs.eventListing.focus();
            },

            setLastPage(isLastPage) {
                this.lastPage = isLastPage;
            },
        },

        created() {

        },

        computed: {
            topOffset: function() {
                const element = this.$refs.eventListing;
                const top = element.offsetTop;
                return top;
            },
            firstPage: function() {
                return this.pageNumber === 1;
            },
        },

        watch: {
            '$route' (to, from) {
                alert(to.params.eventItem.id);
            },
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
        }
    }
    .event-filters {
        @include make-col-ready();
        @include make-col(12);
        @include media-breakpoint-up(lg) {
            @include make-col(3);
        }
    }
    .full-width {
        width: 100%;
    }
    .my-events {
        @include spacer(0.5rem);
    }
    .pagination-button {
        @include spacer(1rem);

        &:first-child {
            @extend .mr-2;
        }
    }
</style>
