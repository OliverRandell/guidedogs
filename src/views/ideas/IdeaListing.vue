<template lang="html">
    <div>
        <div class="row" v-if="allIdeas.length">
            <article class="idea-pod" :class="{ 'hosting': hosting}" v-for="ideaItem in allIdeas" :key="ideaItem.id" role="article">
                <IdeaListingItem v-bind:idea="ideaItem" v-bind:hosting="hosting" />
            </article>
        </div>


        <article v-if="!allIdeas.length" role="article">
            <p class="my-3">Be the first to add an Idea!</p>
        </article>

    </div>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex';
    import IdeaListingItem from './IdeaListingItem.vue';

    export default {
        name: 'IdeassListing',

        components : {
            IdeaListingItem
        },

        props: {
            sortField: {
                type: String,
                default: 'eventId'
            },
            sortDirection: {
                type: String,
                default: 'Descending'
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
                title: 'Ideas',
            }
        },

        methods: {
            ...mapActions(['searchIdeas', 'searchIdeasAttending', 'searchIdeasHosting']),

            // determine which endpoint to call based on categoryId string
            // categoryId will be an id number (as string) or 'attending'
            saerchIdeasEndpoint: function(categoryId) {
                if (this.hosting) {
                    this.searchIdeasHosting(this.searchParams);
                    return;
                }

                if (categoryId === 'attending' || this.categoryId === 'attending') {
                    this.searchIdeasAttending({...this.searchParams, CategoryId: ''});
                    return;
                }

                this.searchIdeas(this.searchParams);
            }
        },

        created() {
            this.saerchIdeasEndpoint(this.searchParams);
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

            ...mapGetters(['allIdeas']),
        },

        watch: {
            '$route' (to, from) {
                alert(to.params.ideaItem.id);
            },

            categoryId (to, from) {
                this.saerchIdeasEndpoint(to);
            },

            searchString (to, from) {
                this.saerchIdeasEndpoint();
            },

            pageNumber (to, from) {
                this.saerchIdeasEndpoint();
            },

            allIdeas (to, from) {
                this.$emit('last-page', this.allIdeas.length < this.itemsPerPage);
            },
        }
    }
</script>

<style lang="scss" scoped>
    @import './src/assets/scss/vue.scss';
    .idea-pod {
        @include spacer(1rem);
        @include make-col-ready();
        @include make-col(12);

        &.hosting {
            @include media-breakpoint-up(lg) {
                @include make-col(6);
            }

        }
    }
</style>
