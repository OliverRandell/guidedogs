<template lang="html">
    <LayoutMaster>
        <Hero>
            <template slot="title">
                {{ title }}
            </template>
            <template slot="description">
                This is the area to create a new event...
            </template>
        </Hero>
        <div class="container">
            <div class="pg-content">
                <article class="" role="article">
                    <img src="" alt="">
                    <h1>Title</h1>
                    <time></time>
                </article>

            </div>
        </div>
    </LayoutMaster>
</template>

<script>
    import LayoutMaster from '../../components/common/layouts/layout-master.vue';
    import Hero from '../../components/common/global/hero.vue';
    export default {
        name: 'Event',
        components: {
            LayoutMaster,
            Hero
        },
        data () {
            return {
                id: 0,
                title: 'Event title',

            }
        }
    }
</script>

<style lang="css">
</style>
