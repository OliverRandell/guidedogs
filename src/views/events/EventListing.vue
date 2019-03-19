<template lang="html">
    <layout-master>
        <hero>
            <template slot="title">
                This is our {{ title }} page
            </template>
            <template slot="description">
                Below are the latest event listings, what tickles your fancy?
            </template>
        </hero>

        <div class="container">
            <div class="pg-content">

                <div class="col-12">
                    <div class="form-group">
                        <label for="searchEvents">Search Events:</label>
                        <input type="text" name="Search events" value="" v-model="searchEvents" class="form-control">
                    </div>

                </div>
                <div class="event-listings">
                    <div class="row">
                        <!-- <transition-group class="filter" name="filter"> -->
                            <article class="event-pod" v-for="eventItem in filteredEvents" :key="eventItem.id" v-if="currentFilter === eventItem.category || currentFilter === 'all'" role="article">
                                <router-link :to="'/events/' + eventItem.id">
                                    <figure class="event-thumbnail">
                                        <h5 class="event-privacy">
                                            <template v-if="eventItem.eventOpen === 'true'">Public</template>
                                            <template v-else>Private</template></h5>
                                        <!-- <img :src="eventItem.image.url" :alt="eventItem.image.altText"> -->
                                    </figure>
                                </router-link>
                                <section class="event-content" tabindex="-1">
                                    <p class="category">{{ eventItem.category }}</p>
                                    <time class="event-date">
                                        <span class="month">{{ eventItem.eventDate }}</span>
                                        <span class="day">{{ eventItem.eventDate }}</span>
                                    </time>
                                    <dl class="event-summary">
                                        <router-link :to="'/events/' + eventItem.eventId" class="event-title">{{ eventItem.title }}</router-link>
                                        <dt>Location:</dt>
                                        <dd>{{ eventItem.location }}</dd>
                                        <dt>Cost:</dt>
                                        <dd>{{ eventItem.cost }}</dd>
                                        <dt>Travel tips:</dt>
                                        <dd>{{ eventItem.travelTips }}</dd>
                                        <!-- <h3 class="event-title"></h3> -->
                                        <p>{{ eventItem.body }}</p>
                                        <time><p><span>When: </span>{{ eventItem.day }}, {{ eventItem.date }}, {{ eventItem.time }}</p></time>

                                        <p><span>Cost: </span>{{ eventItem.price }}</p>
                                        <p><span>Host: </span>{{ eventItem.host }}</p>
                                        <button type="button" name="button" class="btn btn-primary">Interested</button>
                                        <router-link :to="'/event/' + eventItem.eventId" class="btn btn-primary">View event</router-link>
                                    </dl>


                                </section>

                                <!-- <p v-for="item in eventItem" :key="item.id">{{ item.title }}</p> -->
                            </article>
                        <!-- </transition-group> -->
                    </div>
                </div>


                <aside class="event-filters" role="group">
                    <h3>Filter:</h3>
                    <button type="button" :class="['btn-filter', { active: currentFilter === 'all' }]" @click="setFilter('all')">All</button>
                    <button type="button" :class="['btn-filter', { active: currentFilter === 'information' }]" @click="setFilter('information')">Information</button>
                    <button type="button" :class="['btn-filter', { active: currentFilter === 'social' }]" @click="setFilter('social')">Social</button>
                    <button type="button" :class="['btn-filter', { active: currentFilter === 'sport' }]" @click="setFilter('sport')">Sport and fitness</button>
                    <button type="button" :class="['btn-filter', { active: currentFilter === 'art' }]" @click="setFilter('art')">Arts and crafts</button>

                </aside>

                <div class="col-12">
                    <h3>Can't find an event you're looking for?</h3>
                    <router-link to="/create-event" class="btn btn-primary">Create event</router-link>
                </div>

            </div>

        </div>
    </layout-master>
</template>

<script>
    import LayoutMaster from '../../components/common/layouts/layout-master.vue';
    import Hero from '../../components/common/global/hero.vue';
    export default {
        name: 'Events',
        components : {
            LayoutMaster,
            Hero
        },
        data () {
            return {
                title: 'Events',
                // fkey: "category",
                // filterList: [
                //     'category 1', 'category 2', 'category 1', 'category 2', 'category 1', 'category 2'
                // ],
                //filter: 'All',
                currentFilter: 'all',
                events: [],
                searchEvents: ''
            }
        },
        methods: {
            setFilter: function(filter) {
                this.currentFilter = filter;
            },
            // customFormatter(date) {
            //     return moment(date).format('MMM');
            // }
        },
        created() {
            this.$http.get('https://gdvpeersupportplatformapi.azurewebsites.net/api/events').then(function(data) {
                // this.events = data.body.slice(0,6);
                return data.json();
                //title: this.event.title
            }).then(function(data) {
                var eventsArray = [];
                for (let key in data) {
                    data[key].id = key
                    eventsArray.push(data[key]);
                }
                this.events = eventsArray;
            })
        },
        computed: {
            filteredEvents: function() {
                return this.events.filter((eventItem) => {
                    return eventItem.title.match(this.searchEvents);
                });
            }
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
    .event-listings {
        @include spacer(2rem);
        @include make-col-ready();
        @include make-col(12);
        @include media-breakpoint-up(lg) {
            @include make-col(9);
            //@include make-col-offset(0);
        }
    }
    .event-pod {
        width: 100%;
        box-sizing: border-box;
        @include spacer(1rem);
        @include make-col-ready();
        @include make-col(12);
        @include media-breakpoint-up(lg) {
            @include make-col(6);
            //@include make-col-offset(0);
        }
    }
    .event-thumbnail {
        width: 100%;
        margin: 0;
        //border-radius: .5rem .5rem 0 0;
        overflow: hidden;
        position: relative;
        img {
            width: 100%;
        }
    }
    .event-content {
        padding: 1.5rem;
        border-radius: 0 0 0.5rem 0.5rem;
        //border: 1px solid $secondary;
        border-top: 0;
        display: flex;
        position: relative;
        .category {
            position: absolute;
            top: -1.25rem;
            right: 1rem;
            border: 1px solid $primary;
            border-radius: 50%;
            width: 2.5rem;
            height: 2.5rem;
            text-indent: -9999px;
            background-color: $white;
        }
    }
    .event-filters {
        @include make-col-ready();
        @include make-col(12);
        @include media-breakpoint-up(lg) {
            @include make-col(3);
        }
        button  {
            display: block;
            margin-bottom: 0.5rem;
            width: 100%;
        }
    }
    .event-title {
        font-size: $h5-font-size;
        font-weight: $font-weight-normal;
        > a {
            color: $black;
        }
    }
    .event-date {
        margin-right: 1rem;
    }
    .event-privacy {
        position: absolute;
        top: 0;
        right: 0;
        background-color: $secondary;
        color: $black;
        padding: 0.75rem;
        text-transform: uppercase;
        //font-size: 1rem;
        //font-weight: $font-weight-normal;
        font-size: $font-size-base * .65;
        margin-bottom: 0;
    }
    .filter {
        display: flex;
        flex-wrap: wrap;
        //justify-content: center;
    }
    .filter-enter {
        transform: scale(0.5) translateY(-80px);
        opacity: 0;
    }
    .filter-leave-to {
        transform: translateY(30px);
        opacity:0;
    }
    .filter-leave-action {
        position: absolute;
        z-index: -1;
    }
    .event-details p {
        font-size: 1rem;
        margin-bottom: 0.5rem;
        span {
            font-weight: $font-weight-bold;
            color: $primary;
            text-transform: uppercase;
            font-size: $font-size-base * .65;
        }
    }
    .btn-filter {
        border: 2px solid $primary;
        background-color: $white;
        border-radius: 0.25rem;
        color: $primary;
        transition: all 300ms;
        padding: 0.75rem 1.4rem;
        &.active,
        &:hover {
            background-color: $primary;
            border-color: $primary;
            color: $white;
        }
    }
    .event-summary {
        .event-title {
            display: block;
            margin-bottom: 1rem;
            line-height: 1;
        }
        dt {
            @include summaryHeading();
        }
        dd {
            font-size: 1rem;
        }
    }
</style>
