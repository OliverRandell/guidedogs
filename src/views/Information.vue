<template>
    <layout-master>
        <hero>
            <template slot="title">
                'App' {{ title }}
            </template>
            <template slot="description">
                Below is the latest news and goings on within our community
            </template>
        </hero>

        <div class="container">
            <section class="pg-content">

                <div class="col-12">
                </div>
            </section>
        </div>
    </layout-master>
</template>

<script>
    import LayoutMaster from '../components/common/layouts/layout-master.vue';
    import Hero from '../components/common/global/hero.vue';
    export default {
        name: 'Information',
        components : {
            LayoutMaster,
            Hero
        },
        data () {
            return {
                title: 'Information'
            }
        }
    }
</script>

<style lang="css">
</style>
