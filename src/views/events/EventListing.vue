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
                    <router-link to="/create-event" class="btn btn-primary">Create event</router-link>
                </div>
                <div class="event-listings">
                    <!-- <div class="row"> -->
                        <transition-group class="filter" name="filter">
                            <article class="event-pod" v-for="item in events" :key="item.id" v-if="currentFilter === item.category || currentFilter === 'all'" role="article">
                                <router-link :to="item.route">
                                    <figure class="event-thumbnail">
                                        <h5 class="event-privacy">
                                            <template v-if="item.eventOpen === 'true'">Public</template>
                                            <template v-else>Private</template></h5>
                                        <img :src="item.imgSrc" :alt="item.imgAlt">
                                    </figure>
                                </router-link>
                                <section class="event-content" tabindex="0">
                                    <p class="category">{{ item.category }}</p>
                                    <time class="event-date">
                                        <span class="month">Mar</span>
                                        <span class="day">30</span>
                                    </time>
                                    <div class="event-details">
                                        <p>{{ item.title }}</p>
                                        <p>{{ item.body }}</p>
                                        <h3 class="event-title">
                                            <router-link :to="item.route">{{ item.title }}</router-link>
                                        </h3>
                                        <time><p><span>When: </span>{{ item.day }}, {{ item.date }}, {{ item.time }}</p></time>
                                        <p><span>Where: </span>{{ item.location }}</p>
                                        <p><span>Cost: </span>{{ item.price }}</p>
                                        <p><span>Host: </span>{{ item.host }}</p>
                                        <button type="button" name="button" class="btn btn-primary">Interested</button>
                                    </div>


                                </section>

                                <!-- <p v-for="item in eventItem" :key="item.id">{{ item.title }}</p> -->
                            </article>
                        </transition-group>
                    <!-- </div> -->
                </div>


                <aside class="event-filters" role="group">
                    <h3>Filter:</h3>
                    <button type="button" :class="['btn-filter', { active: currentFilter === 'all' }]" @click="setFilter('all')">All</button>
                    <button type="button" :class="['btn-filter', { active: currentFilter === 'information' }]" @click="setFilter('information')">Information</button>
                    <button type="button" :class="['btn-filter', { active: currentFilter === 'social' }]" @click="setFilter('social')">Social</button>
                    <button type="button" :class="['btn-filter', { active: currentFilter === 'sport' }]" @click="setFilter('sport')">Sport and fitness</button>
                    <button type="button" :class="['btn-filter', { active: currentFilter === 'art' }]" @click="setFilter('art')">Arts and crafts</button>

                </aside>

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
                events: [
                    {
                        id: 0,
                        title: 'Brimbank, Melton & surrounds information session',
                        route: 'https://www.route-to-somewhere.com/',
                        host: 'Guide Dogs Victoria',
                        price: '$4.00',
                        date: '14-02-19',
                        day: 'Friday',
                        timeBegin: '13:30',
                        timeEnd: '15:30',
                        location: 'Melton Country Club, Reserve Road, Melton VIC, Australia',
                        travelTips: 'Bus – 456, Closest Stop: Melton Valley Dr',
                        eventOpen: 'true',
                        imgSrc: 'http://placekitten.com/600/300',
                        imgAlt: 'This is the alternative text of the image',
                        category: 'sport'
                    },
                    {
                        id: 1,
                        title: 'Brimbank, Melton & surrounds information session',
                        route: 'https://www.route-to-somewhere.com/',
                        host: 'Guide Dogs Victoria',
                        date: '14-02-19',
                        day: 'Friday',
                        timeBegin: '13:30',
                        timeEnd: '15:30',
                        location: 'Melton Country Club, Reserve Road, Melton VIC, Australia',
                        travelTips: 'Bus – 456, Closest Stop: Melton Valley Dr',
                        eventOpen: 'false',
                        imgSrc: 'http://placekitten.com/600/300',
                        imgAlt: 'This is the alternative text of the image',
                        category: 'information'
                    }
                ],
            }
        },
        methods: {
            setFilter: function(filter) {
                this.currentFilter = filter;
            },
            getEvents() {

            }
        },
        created() {
            this.$http.get('https://jsonplaceholder.typicode.com/posts').then(function(data) {
                this.events = data.body.slice(0,6);
            })
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
        display: flex;
        flex-direction: column;
        text-align: center;
        margin-right: 1rem;
        line-height: 1;
        .month {
            color: $primary;
            margin-bottom: 0;
        }
        .day {
            font-size: 2rem;
        }
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
        transform: scale(0.5) translatey(-80px);
	    opacity:0;
    }
    .filter-leave-to {
        transform: translatey(30px);
        opacity:0;
    }
    .filter-leave-action {
        position: absolute;
	    z-index:-1;
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
</style>
