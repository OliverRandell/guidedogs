<template>
    <LayoutMaster>
        <Hero>
            <template slot="title">
                {{ title }}
            </template>
            <template slot="description">
                <span>{{ tagline }}</span>
            </template>
        </Hero>
        <div class="container">
            <div class="pg-content">

                <div class="col-8">
                    <h4>My Hosted events</h4>
                    <div class="row">

                        <article v-for="eventItem in hostedEvents" :key="eventItem.id" class="event-pod">
                            <!-- IMG GOES HERE -->
                            <router-link :to="'/events/' + eventItem.eventId"></router-link>
                            <section class="event-content" tabindex="-1">
                                <time class="event-date">
                                  <span class="month">{{ eventItem.eventDate | moment("MMM") }}</span>
                                  <span class="day">{{ eventItem.eventDate | moment("D") }}</span>
                                </time>

                                <h2>{{ eventItem.title }}</h2>
                                <router-link :to="'/events/' + eventItem.id" class="btn btn-primary">Edit event</router-link>
                            </section>



                        </article>
                    </div>

                    <h4>My Ideas</h4>
                    <div class="row">
                        <article class="idea-pod" v-for="idea in hostedIdeas" :key="idea.id">
                            <h3>{{ idea.title }}</h3>
                            <p>{{ idea.description }}</p>
                            <router-link :to="idea.route">Edit idea</router-link>
                        </article>
                    </div>

                </div>
                <div class="col-4">
                    <router-link to="/events" class="btn-link">&lt; Back to events</router-link>
                </div>
            </div>
        </div>
    </LayoutMaster>
</template>

<script>
    import LayoutMaster from '../../components/common/layouts/layout-master.vue';
    import Hero from '../../components/common/global/hero.vue';
    export default {
        name: 'HostingOverview',
        components: {
            LayoutMaster,
            Hero,
        },
        data() {
            return {
                title: 'My Events and Ideas!',
                tagline: `Review and edit your hosted activities here.`,
                hostedEvents: [
                    {
                        title: 'Event 1',
                        eventDate: '',
                    },
                    {
                        title: 'Event 2',
                        eventDate: '',
                    }
                ],
                hostedIdeas: [
                    {
                        id: 1,
                        title: 'Coffee chats in Kew',
                        description: `I'm looking to socialise with like-minded coffee loving indivduals`,
                        route: '/ideas/manage-idea',
                    },
                    {
                        id: 2,
                        title: 'Coffee chats in Kew',
                        description: `I'm looking to socialise with like-minded coffee loving indivduals`,
                        route: '/ideas/manage-idea',
                    }
                ],
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import './src/assets/scss/app.scss';
    .idea-pod {
        @include make-col-ready();
        @include make-col(12);
        @include media-breakpoint-up(lg) {
            @include make-col(6);
        }
    }
</style>
