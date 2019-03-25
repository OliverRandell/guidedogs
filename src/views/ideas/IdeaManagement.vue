<template>
    <LayoutMaster>
        <Hero>
            <template slot="title">
                {{ title }}
            </template>
            <!-- <template slot="description">
                <span>{{ tagline }}</span>
            </template> -->
        </Hero>
        <div class="container">
            <div class="pg-content">

                <div class="col-8">
                    <p>where am i?</p>

                    <h2>{{ idea.title }}</h2>
                    <h4>Important informtation!</h4>
                    <p v-html="importantInfo"></p>
                    <h4>interested total:</h4>
                    <h4>Idea details:</h4>
                    <form class="" action="index.html" method="post">
                        <div class="form-group">
                            <label for="title">Idea title:</label>
                            <input type="text" name="" value="" required v-model="idea.title" class="form-control">
                            <small class="form-text text-muted">Give your idea a title.</small>
                        </div>
                        <div class="form-group">
                            <label for="title">Idea summary:</label>
                            <input type="text" name="" value="" required v-model="idea.eventDetails" class="form-control" placeholder="Write a short summary that will appear on the Ideas page.">
                            <small class="form-text text-muted">Write a short summary that will appear on the Ideas page.</small>
                        </div>
                        <input type="submit" name="" value="Save changes" class="btn btn-primary">
                    </form>

                    <h4>Want to convert this idea into an Event?</h4>
                    <button type="button" name="button" class="btn btn-primary">Create event</button>
                    <button type="button" name="button" class="btn btn-secondary">Delete event</button>
                </div>
            </div>
        </div>

    </LayoutMaster>
</template>

<script>
    import LayoutMaster from '../../components/common/layouts/layout-master.vue';
    import Hero from '../../components/common/global/hero.vue';
    export default {
        name: 'IdeaManagement',
        components: {
            LayoutMaster,
            Hero,
        },
        data() {
            return {
                title: 'Idea Management',
                importantInfo: `You can convert your idea into an event at any time. Further informtation will be required at that time. Ideas can be longstanding and do not have an expiry date.`,
                interestedTotal: '',
                idea: {
                    title: 'This is the idea title',
                    eventDetails: '',
                    category: [
                        {
                            id: 1,
                            title: 'social',
                        },
                        {
                            id: 1,
                            title: 'Information',
                        },
                        {
                            id: 1,
                            title: 'Arts',
                        },
                        {
                            id: 1,
                            title: 'Sport & fitness',
                        }
                    ],

                }
            }
        }
    }
</script>

<style lang="css">
</style>
