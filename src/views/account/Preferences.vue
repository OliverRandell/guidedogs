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
                <div class="col-12">
                    <!-- THIS BUTTON WILL ADD A CLASS TO THE BODY -->
                    <button type="button" name="button" class="btn btn-primary">Change the contract</button>
                </div>
            </section>
        </div>


    </LayoutMaster>
</template>

<script>
    import LayoutMaster from '../../components/common/layouts/layout-master.vue';
    import Hero from '../../components/common/global/hero.vue';
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
