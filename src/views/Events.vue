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
                        <time>{{ item.time }}</time>
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
                eventItems: [
                    {
                        id: 0,
                        title: 'Valentines Day',
                        time: '14-02-19',
                        desc: 'Event description',
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
