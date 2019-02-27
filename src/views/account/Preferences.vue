<template lang="html">
    <LayoutMaster>

        <hero>
            <template slot="title">
                <h1>My preferences</h1>
            </template>
            <template slot="description">
                A useful guide on how to change your browser preference settings.
            </template>
        </hero>

        <div class="container">
            <section class="pg-content">
                <div class="col-12">
                    <p>What is this preferences page all about? Well, this page provides accessibility help, enabling our users to make the most of this application whatever their ability or disability.</p>
                    <p>Text size, contrast, colour,</p>
                </div>
            </section>
        </div>


    </LayoutMaster>
</template>

<script>
    import LayoutMaster from '../../components/common/layouts/layout-master.vue';
    import Hero from '../../components/common/global/hero.vue';
    import { mapState } from 'vuex';
    export default {
        name: 'Preferences',
        components: {
            LayoutMaster,
            Hero
        }
    }
</script>

<style lang="css">
</style>
