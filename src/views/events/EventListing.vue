<template lang="html">
    <div>
        <div class="row" v-if="allEvents.length" >
            <article class="event-pod" v-for="eventItem in allEvents" :key="eventItem.id" role="article">
                <EventListingItem v-bind:eventItem="eventItem" v-bind:hosting="hosting" />
            </article>
        </div>


        <article v-if="!allEvents.length" role="article">
            <p>There are no results matching your search.</p>
        </article>
        
    </div>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex';
    import EventListingItem from './EventListingItem.vue';

    export default {
        name: 'EventsListing',

        components : {
            EventListingItem
        },

        props: {
            sortField: {
                type: String,
                default: 'eventDate'
            },
            sortDirection: {
                type: String,
                default: 'Ascending'
            },
            searchString: {
                type: String,
                default: ''
            },
            itemsPerPage: {
                type: String,
                default: '10'
            },
            pageNumber: {
                type: Number,
                default: 1
            },
            rowOffset: {
                type: String,
                default: '0'
            },
            categoryId: {
                type: String,
                default: ''
            },
            hosting: {
                type: Boolean,
                default: false
            }
        },

        data () {
            return {
                title: 'Events',
            }
        },

        methods: {
            ...mapActions(['searchEvents', 'searchEventsAttending', 'searchEventsHosting']),

            // determine which endpoint to call based on categoryId string
            // categoryId will be an id number (as string) or 'attending'
            saerchEventsEndpoint: function(categoryId) {
                if (this.hosting) {
                    this.searchEventsHosting(this.searchParams);
                    return;
                }

                if (categoryId === 'attending' || this.categoryId === 'attending') {
                    this.searchEventsAttending({...this.searchParams, CategoryId: ''});
                    return;
                }

                this.searchEvents(this.searchParams);
            }
        },

        created() {
            this.saerchEventsEndpoint(this.searchParams);
        },

        computed: {
            searchParams: function() {
                return {
                    SortField: this.sortField,
                    SortDirection: this.sortDirection,
                    SearchString: this.searchString.toLowerCase(),
                    ItemsPerPage: this.itemsPerPage,
                    PageNumber: this.pageNumber.toString(),
                    RowOffset: this.rowOffset,
                    CategoryId: this.categoryId,
                };
            },

            ...mapGetters(['allEvents']),
        },

        watch: {
            '$route' (to, from) {
                alert(to.params.eventItem.id);
            },

            categoryId (to, from) {
                this.saerchEventsEndpoint(to);
            },

            searchString (to, from) {
                this.saerchEventsEndpoint();
            },

            pageNumber (to, from) {
                this.saerchEventsEndpoint();
            },

            allEvents (to, from) {
                this.$emit('last-page', this.allEvents.length < this.itemsPerPage);
            },
        }
    }
</script>

<style lang="scss" scoped>
    @import './src/assets/scss/vue.scss';
    .event-pod {
        width: 100%;
        box-sizing: border-box;
        @include spacer(1rem);
        @include make-col-ready();
        @include make-col(12);
        @include media-breakpoint-up(lg) {
            @include make-col(6);
        }
    }
</style>
