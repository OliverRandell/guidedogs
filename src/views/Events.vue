<template lang="html">
    <layout-master>
        <main class="events container pg-content">
            <div class="row">
                <div class="col-12">
                    <h1>{{ title }}</h1>
                </div>
            </div>

            <div class="row">
                <div class="col-12">
                    <section class="event-pod" v-for="item in eventItems" :key="item.id">
                        <h2>{{ item.title }}</h2>
                        <p>{{ item.desc }}</p>
                        <time>{{ item.time }} {{ item.day }}, {{ item.date }}</time>
                        <p>{{ item.host }}</p>
                        <p>{{ item.location }}</p>
                        <!-- <p v-for="item in category" :key="item.id">{{ item.title }}</p> -->
                    </section>
                </div>
            </div>
        </main>
    </layout-master>
</template>

<script>
    import LayoutMaster from '../components/common/layouts/layout-master.vue';
    export default {
        name: 'ExpressionsOfInterest',
        components : {
            LayoutMaster
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
    .event-pod {
        @include spacer(2rem);
    }
</style>
