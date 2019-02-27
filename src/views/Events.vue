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
                <div class="event-listings">
                    <article class="event-pod" v-for="item in eventItems" :key="item.id">
                        <figure class="event-thumbnail">
                            <img :src="item.imgSrc" :alt="item.imgAlt">
                        </figure>
                        <section class="event-content">
                            <time>
                                {{ item.date }}
                            </time>
                            <div>
                                <h2>{{ item.title }}</h2>
                                <time>{{ item.day }}, {{ item.date }}, {{ item.time }}</time>
                                <p>{{ item.location }}</p>
                                <p>{{ item.price }}</p>
                                <p>{{ item.host }}</p>
                            </div>

                        </section>

                        <!-- <p v-for="item in category" :key="item.id">{{ item.title }}</p> -->
                    </article>
                </div>


                <aside class="event-filter">
                    <h3>Filter:</h3>
                </aside>

            </div>
        </div>
    </layout-master>
</template>

<script>
    import LayoutMaster from '../components/common/layouts/layout-master.vue';
    import Hero from '../components/common/global/hero.vue';
    export default {
        name: 'ExpressionsOfInterest',
        components : {
            LayoutMaster,
            Hero
        },
        data () {
            return {
                title: 'Events',
                submit: false,
                eventItems: [
                    {
                        id: 0,
                        title: 'Valentines Day',
                        host: 'Gatsby',
                        date: '14-02-19',
                        day: 'Friday',
                        time: '14:00',
                        location: 'Gatsby Manor',
                        imgSrc: 'http://placekitten.com/600/300',
                        imgAlt: 'This is the alternative text of the image',
                        categories: [
                            {
                                id: '0',
                                title: 'Category 1',
                            }
                        ],
                        desc: 'Event description',
                        travelTips: '',
                        email: '',
                        tel: '',
                        open: false
                    },
                    {
                        id: 1,
                        title: 'Valentines Day',
                        time: '14-02-19',
                        desc: 'Event description',
                    }
                ]
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
            @include make-col(6);
            @include make-col-offset(2);
        }
    }
    .event-pod {
        width: 100%;
        @include spacer(1rem);
    }
    .event-thumbnail {
        width: 100%;
        margin: 0;
        border-radius: .5rem .5rem 0 0;
        overflow: hidden;
        img {
            width: 100%;
        }
    }
    .event-content {
        padding: 2rem;
        border-radius: 0 0 0.5rem 0.5rem;
        border: 2px solid $secondary;
        border-top: 0;
        display: flex;
    }
    .event-filter {
        @include make-col-ready();
        @include make-col(12);
        @include media-breakpoint-up(lg) {
            @include make-col(2);
        }
    }
</style>
