<template>
    <LayoutMaster>
        <Hero>
            <template slot="title">
                {{ idea.title }}
            </template>
        </Hero>
        <div class="container">
            <section class="pg-content" tabindex="-1">


                <article class="item-wrapper" role="article" tabindex="-1" v-if="!submitted">
                    <router-link to="/ideas" class="link-back">&larr; Back to ideas</router-link>
                    <dl>
                        <dt>Host:</dt>
                        <!-- TODO: link to the hosts page -->
                        <dd>
                            <router-link to="/host-profile">{{ idea.eventHostNickName }}</router-link>
                        </dd>
                    </dl>
                    <dl>
                        <dt>Details:</dt>
                        <dd v-html="idea.eventDetails"></dd>
                    </dl>


                    <div class="row">
                        <div class="offset-4 col-8 btn-group">
                            <!-- NB: BOOLEAN INTERESTED OR NOT -->
                            <!-- TODO: call api to remove from rsvp -->
                            <button type="button" :class="['btn', isInterested ? 'btn-outline-primary' : 'btn-primary']" @click="registerInterest(idea)">
                                <template v-if="isInterested">Not </template>Interested
                            </button>
                            <!-- NB: NO TEMPLATE, ROUTE OR USER FLOW FOR THIS AT THE MOMENT -->
                            <router-link :to="`/contact-host/${idea.eventHostId}/${idea.eventId}/${idea.eventHostNickName}`" class="btn btn-primary">Contact host</router-link>
                        </div>
                    </div>

                </article>

                <section v-if="submitted" class="msg-success">
                    <h3>Thank you for interest in this idea!</h3>
                    <router-link to="/ideas" class="btn btn-primary">Back to ideas page</router-link>
                </section>
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
                id: this.$route.params.id,
                submitted: false,
                isInterested: false,
            }
        },

        computed: {
            ...mapGetters(['idea']),
        },

        created() {
            this.getIdea(this.id);
        },

        methods: {
            ...mapActions(['getIdea', 'rsvpIdea']),
            registerInterest(idea) {
                // TODO: if isInterested, call notInterested and return
                this.isInterested = !this.isInterested;
                idea.rsvpType = 'Interested';
                this.rsvpIdea(idea);
                this.submitted = true;
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
    .msg-success {
        position: fixed;
        background: rgba(0, 0, 0, 0.95);
        top: 0;
        bottom: 0;
        left: 0;
        height: 100%;
        width: 100%;
        z-index: 2;
        color: #fff;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
    }
</style>
