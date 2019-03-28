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
            <div class="pg-content">
                <article class="col-8">
                    <!-- http://www.bbc.co.uk/accessibility/guides/factsheets/factsheet_vision_computing.pdf -->
                    <!-- https://webaccessibility.guide/ -->
                    <section class="spacer">
                        <h4>An explaination of this preferences page</h4>
                        <p v-html="intro"></p>
                    </section>


                    <section class="spacer">
                        <h5>Change the contrast of the site.</h5>
                        <!-- THIS BUTTON WILL ADD A CLASS TO THE APP -->
                        <ToggleContrast v-on:toggle-contrast="emitToggleContrast" />
                    </section>
                    <section class="spacer">
                        <h5>Increase and decrease text size.</h5>
                        <p>The buttons below will allow you to increase or decrease your text size just for this website.</p>
                        <div class="btn-group">
                            <button type="button" class="btn btn-secondary" @click="fontSize++">Increase font size</button>
                            <button type="button" class="btn btn-secondary" @click="fontSize--">Decrease font size</button>
                        </div>
                        <p :style="{ fontSize: fontSize + 'px' }">Font size is: {{ fontSize }}</p>
                    </section>
                    <section class="spacer">
                        <p>You can also use the options below within your browser to adjust your text size:</p>
                        <div class="spacer" tabindex="-1">
                            <p><strong>Internet Explorer – Windows 98 / ME / 2000 / XP</strong></p>
                            <ul>
                                <li>Go to the ‘View’ pull-down menu.</li>
                                <li>Go to ‘Text Size’.</li>
                                <li>A pop-up menu should appear showing you five different text sizes. Select ‘Larger’ or ‘Largest’ to make the text larger. This will also increase the size on many other Internet sites.</li>
                            </ul>
                        </div>
                        <div class="spacer" tabindex="-1">
                            <p><strong>Internet Explorer – Windows Vista / 7 / 8 / 10</strong></p>
                            <ul>
                                <li>Hold down the CTRL key on your keyboard.</li>
                                <li>Press the ‘+’ key to make the text bigger or the ‘-‘ key to make the text smaller.</li>
                                <li>Keep repeating step 2 until the text is at a suitable size.</li>
                            </ul>
                        </div>
                        <div class="spacer" tabindex="-1">
                            <p><strong>Safari &mp; Chrome – Mac OS</strong></p>
                            <ul>
                                <li>Hold down the ‘Apple’ key and press the ‘+’ key.</li>
                                <li>Repeat until the text is at a suitable large.</li>
                            </ul>
                        </div>
                        <div class="spacer" tabindex="-1">
                            <p><strong>FireFox – all platforms</strong></p>
                            <ul>
                                <li>Hold down the CTRL key on your keyboard.</li>
                                <li>Press the ‘+’ key to make the text bigger or the ‘-‘ key to make the text smaller.</li>
                                <li>Keep repeating step 2 until the text is at a suitable size.</li>
                            </ul>
                        </div>
                    </section>
                <!-- <div class="col-12">
                    <div class="btn-group">
                        <button type="button" @click="fontSizeIncrease">Increase font size</button>
                        <button type="button" @click="fontSizeDecrease">Decrease font size</button>
                    </div>

                    <p v-bind:style="{ fontSize: fontSize + 'px' }">Font size is: {{ fontSize }}</p>

                </div> -->
                </article>
                <div class="col-4"></div>
            </div>
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
                fontSize: 10,
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
