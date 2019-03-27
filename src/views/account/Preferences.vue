<template lang="html">
    <LayoutMaster>

        <hero>
            <template slot="title">
                {{ title }}
            </template>
            <template slot="description">
                <span>{{ tagline }}</span>
            </template>
        </hero>

        <div class="container">
            <section class="pg-content">
                <div class="col-8">
                    <!-- http://www.bbc.co.uk/accessibility/guides/factsheets/factsheet_vision_computing.pdf -->
                    <!-- https://webaccessibility.guide/ -->
                    <p v-html="intro"></p>
                </div>
                <div class="col-12">
                    <!-- THIS BUTTON WILL ADD A CLASS TO THE APP -->
                    <ToggleContrast v-on:toggle-contrast="emitToggleContrast" />
                </div>
                <!-- <div class="col-12">
                    <div class="btn-group">
                        <button type="button" @click="fontSizeIncrease">Increase font size</button>
                        <button type="button" @click="fontSizeDecrease">Decrease font size</button>
                    </div>

                    <p v-bind:style="{ fontSize: fontSize + 'px' }">Font size is: {{ fontSize }}</p>

                </div> -->
            </section>
        </div>


    </LayoutMaster>
</template>

<script>
    import LayoutMaster from '../../components/common/layouts/layout-master.vue';
    import Hero from '../../components/common/global/hero.vue';
    import ToggleContrast from '../../components/common/global/toggle-contrast.vue';
    export default {
        name: 'Preferences',
        components: {
            LayoutMaster,
            Hero,
            ToggleContrast,
        },
        data() {
            return {
                title: 'Preferences.',
                tagline: 'Alter your accessibility settings.',
                intro: `What is this preferences page all about? Well, this page provides accessibility help, enabling our users to make the most of this application whatever their ability or disability.`,
                //fontSize: 10,
            }
        },
        methods: {
            emitToggleContrast: function(highContrast) {
                this.$emit('toggle-contrast', highContrast);
            }
        }
    }
</script>

<style lang="css">
</style>
