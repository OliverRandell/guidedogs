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
                <section class="col-8 spacer">
                    <!-- http://www.bbc.co.uk/accessibility/guides/factsheets/factsheet_vision_computing.pdf -->
                    <!-- https://webaccessibility.guide/ -->
                    <h4>An explaination of this preferences page</h4>
                    <p v-html="intro"></p>
                </section>
                <section class="col-12 spacer">
                    <h6>Change the contrast of the site.</h6>
                    <!-- THIS BUTTON WILL ADD A CLASS TO THE APP -->
                    <ToggleContrast v-on:toggle-contrast="emitToggleContrast" />
                </section>
                <section class="col-12 spacer">
                    <h6>Increase and decrease text size.</h6>
                    <p>You can use the options below within your browser to adjust your text size:</p>
                </section>
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
