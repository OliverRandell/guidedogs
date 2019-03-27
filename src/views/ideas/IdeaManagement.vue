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

                    <h2>{{ idea.title }}</h2>
                    <section class="spacer">
                        <h4>Important information!</h4>
                        <p v-html="importantInfo"></p>
                    </section>

                    <section class="spacer">
                        <h4>Number of people interested:</h4>
                        <p><strong>Total: </strong>5</p>
                        <router-link to="/event-attendees" class="btn btn-primary">View people interested</router-link>

                    </section>

                    <section class="spacer">
                        <h4>Idea details:</h4>
                        <form class="form-create" @submit.prevent="onSubmit" v-if="!submitted">
                            <p v-if="formErrors.length" role="alert" aria-atomic="true">
                                <b>Please correct the following error(s):</b>
                                <ul>
                                    <li v-for="(error, index) in formErrors" :key="index">{{ error }}</li>
                                </ul>
                            </p>
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
                            <fieldset class="form-group">

                                <div class="row">
                                    <legend class="col-form-label col-sm-12 pt-0">Choose category:</legend>
                                    <div class="col-sm-8">
                                        <div class="custom-control custom-radio mb-2" v-for="category in allCategories" :key="category.categoryId">
                                            <input class="custom-control-input" type="radio" name="category" :id="category.title + category.categoryId" :value="category.title" v-model="idea.category">
                                            <label class="custom-control-label" :for="category.title + category.categoryId">{{category.title}}</label>
                                        </div>
                                    </div>
                                </div>
                            </fieldset>

                            <div class="form-group">
                                <!-- PUT A CHARACTER LIMIT ON THIS DESCRIPTION -->
                                <label for="description">Idea description:</label>
                                <textarea name="name" rows="4" v-model="idea.eventDetails" class="form-control"></textarea>
                            </div>
                            <div class="btn-wrapper">
                                <input type="submit" name="" value="Save changes" class="btn btn-primary">
                            </div>

                        </form>
                    </section>

                    <section class="spacer">
                        <h4>Want to convert this idea into an Event?</h4>
                        <div class="btn-group">
                            <button type="button" name="button" class="btn btn-secondary">Delete idea</button>
                            <button type="button" name="button" class="btn btn-primary">Create event</button>
                        </div>
                    </section>


                </div>
                <div class="col-4">
                    <router-link to="/my-hosting">&larr; Back to my events and ideas</router-link>
                </div>
            </div>
        </div>

    </LayoutMaster>
</template>

<script>
    import { mapState, mapActions, mapGetters } from 'vuex';
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
                formErrors: [],
                title: 'Idea Management!',
                importantInfo: `You can convert your idea into an event at any time. Further informtation will be required at that time. Ideas can be longstanding and do not have an expiry date.`,
                interestedTotal: '',
                idea: {
                    title: 'This is the idea title',
                    category: '',
                    eventCategories: [],
                    eventDetails: '',
                    // category: [
                    //     {
                    //         id: 1,
                    //         title: 'social',
                    //     },
                    //     {
                    //         id: 1,
                    //         title: 'Information',
                    //     },
                    //     {
                    //         id: 1,
                    //         title: 'Arts',
                    //     },
                    //     {
                    //         id: 1,
                    //         title: 'Sport & fitness',
                    //     }
                    // ],
                },
                submitted: false,
            }
        },
        computed: {
            ...mapGetters(['allCategories'])
        },
        created() {
            this.getCategories();
        },
        methods: {
            checkForm() {
                this.formErrors = [];

                if (!this.idea.title) { this.formErrors.push('Title is required') }
                if (!this.idea.eventCategories) { this.formErrors.push('A category is required') }
                if (!this.idea.eventDetails) { this.formErrors.push('Event details are required') }

                return this.formErrors.length > 0;
            },
            onSubmit() {
                const formHasErrors = this.checkForm();

                if ( formHasErrors ) return;

                // destructure to only include relevant properties
                const { image, imageAlt, ...eventProps } = this.idea;

                const isDateInvalid = this.$moment(eventProps.eventDate).format('YYYY-MM-DD') === 'Invalid date';
                const formattedDate = isDateInvalid ? this.$moment(new Date()).format('YYYY-MM-DD') : this.$moment(eventProps.eventDate).format('YYYY-MM-DD');

                const eventFormData = {
                    ...eventProps,
                    eventDate: formattedDate,
                };

                this.createIdea({idea: eventFormData}).then(data => {
                    this.submitted = true;
                });
            },
            ...mapActions({
                'createIdea': 'createIdea',
                'getCategories': 'getCategories'
            })
        }
    }
</script>

<style lang="css">
</style>
