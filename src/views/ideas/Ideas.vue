<template lang="html">
    <layout-master>
        <hero>
            <template slot="title">
                {{ title }}!
            </template>
            <template slot="description">
                <span>See what ideas are being floated for events in your community</span>
            </template>
        </hero>

        <div class="container">
            <div class="pg-content">

                <div class="idea-listings" ref="ideaListing" tabindex="-1">

                    <div class="col-12 mb-5">
                        <h4>Create your own Idea!</h4>
                        <router-link to="/create-idea" class="btn btn-primary">+ Create idea</router-link>
                    </div>

                    <!-- <div class="col-12">
                        <form v-on:submit.prevent="onSearch">
                            <div class="form-group my-5">
                                <label for="searchQuery" class="h4">Search</label>
                                <div class="form-inline">
                                    <input type="text" name="searchIdeas" placeholder="Idea keyword search" v-model="searchQuery" class="form-control" id="searchQuery">
                                    <input type="submit" value="Search" class="btn btn-primary mx-2">
                                </div>
                            </div>
                        </form>
                    </div> -->

                    <IdeaListing :categoryId="categoryId" :searchString="searchString" :pageNumber="pageNumber" v-on:last-page="setLastPage" />

                    <div class="col-12">
                        <button class="btn btn-outline-primary pagination-button" @click="onPrevPage" v-if="!firstPage">Previous page</button>
                        <button class="btn btn-outline-primary pagination-button" @click="onNextPage" v-if="!lastPage">Next page</button>
                    </div>

                </div>

                <aside class="idea-filters" role="group">
                    <section class="my-ideas">
                        <h6>Ideas that you've created</h6>
                        <router-link to="/my-hosting" class="btn btn-primary full-width">My ideas</router-link>
                    </section>

                    <CategoryListingFilter v-on:filter="categoryFilterIdeas" v-bind:categoryId="categoryId" subType="idea" />
                </aside>

            </div><!-- .pg-content -->
        </div><!-- .container -->
    </layout-master>
</template>

<script>
    import { mapGetters, mapActions } from "vuex";
    import LayoutMaster from '../../components/common/layouts/layout-master.vue';
    import Hero from '../../components/common/global/hero.vue';
    import IdeaListing from './IdeaListing.vue';
    import CategoryListingFilter from '../../components/common/CategoryListingFilter.vue';

    export default {
        name: 'Ideas',

        components : {
            LayoutMaster,
            Hero,
            IdeaListing,
            CategoryListingFilter
        },

        data () {
            return {
                title: 'Ideas',
                categoryId: '',
                searchQuery: '',
                searchString: '',
                pageNumber: 1,
                lastPage: false,
            }
        },

        methods: {
            categoryFilterIdeas: function(id) {
                this.categoryId = id;
                this.pageNumber = 1;
            },

            onSearch() {
                this.searchString = this.searchQuery;
            },

            onNextPage() {
                this.pageNumber++;
                window.scrollTo(0, this.topOffset);
                this.setFocusToIdeaListing();
            },

            onPrevPage() {
                if (this.pageNumber > 1) {
                    this.pageNumber--;
                    window.scrollTo(0, this.topOffset);
                    this.setFocusToIdeaListing();
                    this.lastPage = false;
                }
            },

            setFocusToIdeaListing() {
                this.$refs.ideaListing.focus();
            },

            setLastPage(isLastPage) {
                this.lastPage = isLastPage;
            },
        },

        created() {
            
        },

        computed: {
            topOffset: function() {
                const element = this.$refs.ideaListing;
                const top = element.offsetTop;
                return top;
            },
            firstPage: function() {
                return this.pageNumber === 1;
            },
        },

        watch: {
            '$route' (to, from) {
                alert(to.params.ideaItem.id);
            },
        }
    }
</script>

<style lang="scss" scoped>
    @import './src/assets/scss/vue.scss';
    .idea-listings {
        @include spacer(2rem);
        @include make-col-ready();
        @include make-col(12);
        @include media-breakpoint-up(lg) {
            @include make-col(9);
        }
    }
    .idea-filters {
        @include make-col-ready();
        @include make-col(12);
        @include media-breakpoint-up(lg) {
            @include make-col(3);
        }
    }
    .full-width {
        width: 100%;
    }
    .my-ideas {
        @include spacer(0.5rem);
    }
    .pagination-button {
        @include spacer(1rem);

        &:first-child {
            @extend .mr-2;
        }
    }
</style>
