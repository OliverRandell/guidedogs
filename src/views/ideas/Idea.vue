<template>
    <LayoutMaster>
        <hero>
            <template slot="title">
                {{ idea.title }}
            </template>
        </hero>
        <div class="container">
            <section class="pg-content" tabindex="-1">


                <article class="item-wrapper" role="article" tabindex="-1">
                    <router-link to="/ideas" class="link-back">&larr; Back to ideas</router-link>
                    <dl>
                        <dt>Host:</dt>
                        <dd>{{ idea.eventHostNickName }}</dd>
                    </dl>
                    <dl>
                        <dt>Contact:</dt>
                        <dd><a :href="'mailto:' + idea.eventHostContactEmail">{{ idea.eventHostContactEmail }}</a></dd>
                    </dl>
                    <dl>
                        <dt>Details:</dt>
                        <dd v-html="idea.eventDetails"></dd>
                    </dl>


                    <div class="row">
                        <div class="offset-4 col-8 btn-group">
                            <!-- NB: BOOLEAN INTERESTED OR NOT -->
                            <button type="button" :class="['btn-filter', {'filled': idea.interested === true }]" v-model="idea.interested" @click="toggleInterested">Interested</button>
                            <!-- NB: NO TEMPLATE, ROUTE OR USER FLOW FOR THIS AT THE MOMENT -->
                            <button type="button" class="btn btn-secondary">Contact host</button>
                        </div>
                    </div>

                </article>
            </section>
        </div>
    </LayoutMaster>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex';
    import LayoutMaster from '../../components/common/layouts/layout-master.vue';
    import Hero from '../../components/common/global/hero.vue';
    export default {
        name: 'Idea',

        components: {
            LayoutMaster,
            Hero
        },

        data() {
            return {
                id: this.$route.params.id
            }
        },

        computed: {
            ...mapGetters(['idea'])
        },

        created() {
            this.getIdea(this.id);
        },

        methods: {
            ...mapActions(['getIdea']),
            toggleInterested() {
                this.idea.interested = !this.idea.interested;
            },
        },
    }
</script>

<style lang="scss" scoped>
    @import './src/assets/scss/vue.scss';
    dl {
        @include make-row();
    }
    dt {
        @include make-col-ready();
        @include make-col(4);
        //@include summaryHeading();
        font-weight: $font-weight-bold;
        color: $primary;
        text-transform: uppercase;
        font-size: $font-size-base * .75;
    }
    dd {
        @include make-col-ready();
        @include make-col(8);
    }
    .link-back {
        //float: right;
        display: block;
        // position: absolute;
        // top: 0;
        // right: 0;
        text-align: right;
    }
</style>
