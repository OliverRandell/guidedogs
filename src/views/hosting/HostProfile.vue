<template>
    <LayoutMaster>
        <Hero>
            <template slot="title">
                {{ title }}
            </template>
        </Hero>
        <div class="container">
            <div class="pg-content">

                <div class="col-8">
                    <dl class="desc-list">
                        <dt>Username:</dt>
                        <dd>{{ host.username }}</dd>
                        <dt>Interests:</dt>
                        <dd>
                            <div v-for="interest in host.interests" :key="interest.id">{{ interest.title }}</div>
                        </dd>
                        <dt>Talk to me about:</dt>
                        <dd>{{ host.blurb }}</dd>
                        <dt></dt>
                        <dd>
                            <router-link to="/contact-host" class="btn btn-primary">Contact host</router-link>

                        </dd>
                    </dl>
                </div>
                <div class="col-4">
                    <router-link to="/events" class="link-back">&larr; Back</router-link>
                </div>
            </div>
        </div>
    </LayoutMaster>
</template>

<script>
    import LayoutMaster from '../../components/common/layouts/layout-master.vue';
    import Hero from '../../components/common/global/hero.vue';
    export default {
        name: 'eventAttendees',
        components: {
            LayoutMaster,
            Hero,
        },
        data() {
            return {
                title: 'Host profile view',
                host: {
                    username: 'Dorothy123',
                    interests: [
                        {
                            id: 1,
                            title: 'Arts',
                        },
                        {
                            id: 2,
                            title: 'Social'
                        }
                    ],
                    blurb: `My decade of experience with having Guide Dog's, love of classical music and mentoring other low vision women.`,
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    // @import './src/assets/scss/vue.scss';
    // .event-details {
    //     dd {
    //         @include summaryHeading();
    //         position: absolute;
    //     }
    //     dt {
    //         padding-left: 10rem;
    //     }
    // }
</style>
