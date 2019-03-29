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
            <div class="pg-content" tabindex="-1" ref="formCreate">
                <div class="col-12 col-lg-8">
                    <form @submit.prevent="onSubmit" v-if="!submitted" class="form-create">

                        <p class="formErrors" v-if="formErrors.length" role="alert" aria-atomic="true">
                            <b>Please correct the following error(s):</b>
                            <ul>
                                <li v-for="(error, index) in formErrors" :key="index">{{ error }}</li>
                            </ul>
                        </p>

                        <div class="form-group">
                            <label for="title">Title of Idea</label>
                            <input type="text" id="title" required v-model="idea.title" class="form-control">
                        </div>

                        <div class="form-group">
                            <label for="summary">Idea summary:</label>
                            <small class="form-text text-muted">This short introduction will appear on the Ideas page</small>
                            <textarea id="summary" required v-on:input="checkSummaryCharacterLength" v-model="idea.eventSummary" class="form-control" rows="2" max-length="75"></textarea>
                            <p class="character-limit">{{ summaryCharacterLimitDisplay }}</p>
                        </div>

                        <fieldset class="form-group">
                            <div class="row">
                                <legend class="col-form-label col-sm-12 pt-0">Category</legend>
                                <div class="col-sm-8">
                                    <div class="custom-control custom-radio mb-2" v-for="category in allCategories" :key="category.categoryId">
                                        <input class="custom-control-input" type="radio" name="category" :id="category.title + category.categoryId" :value="category.categoryId" v-model="idea.category">
                                        <label class="custom-control-label" :for="category.title + category.categoryId">{{category.title}}</label>
                                    </div>
                                </div>
                            </div>
                        </fieldset>

                        <div class="form-group">
                            <label for="description">Idea Details</label>
                            <small class="form-text text-muted">Who should join, and what your idea will be about</small>
                            <textarea name="name" rows="8" v-on:input="checkDescriptionCharacterLength" v-model="idea.eventDetails" class="form-control" max-length="1000"></textarea>
                            <p class="character-limit">{{ descriptionCharacterLimitDisplay }}</p>
                        </div>

                        <h4>Important Information</h4>
                        <p v-html="importantInfo"></p>

                        <input type="submit" class="btn btn-primary" v-on:click.prevent="onSubmit" value="Create" />
                    </form>
                </div>

                <aside class="col-12 col-lg-4">
                    <router-link to="/ideas">&larr; Back to ideas</router-link>
                </aside>
            </div>

            <section v-if="submitted" class="msg-success">
                <h3>Congratulations! You have successfully created an idea.</h3>
                <router-link to="/ideas" class="btn btn-primary">Go back to ideas page</router-link>
            </section>

        </div>
    </LayoutMaster>
</template>

<script>
    import { mapActions, mapGetters } from 'vuex';
    import LayoutMaster from '../../components/common/layouts/layout-master.vue';
    import Hero from '../../components/common/global/hero.vue';
    export default {
        name: 'IdeaCreate',

        components: {
            LayoutMaster,
            Hero
        },

        filters: {
            capitalize: function (value) {
                if (!value) return ''
                value = value.toString()
                return value.charAt(0).toUpperCase() + value.slice(1)
            }
        },

        data() {
            return {
                formErrors: [],
                title: 'Create Ideas!',
                tagline: 'Share an expression of interest for the community',
                idea: {
                    category: '',
                    title: '',
                    eventCategories: [],
                    eventDetails: '',
                    eventSummary: '',
                    eventType: 'EOI',
                },
                submitted: false,
                importantInfo: `You can convert your Idea into an Event at any time. Further information will be required at that time. Ideas can be longstanding and do not have an expiry date.`,
                summaryCharacterLimitEntered: 0,
                summaryCharacterLimit: 75,
                descriptionCharacterLimitEntered: 0,
                descriptionCharacterLimit: 1000,
            }
        },

        computed: {
            ...mapGetters(['allCategories']),

            summaryCharacterLimitDisplay: function() {
                return `${this.summaryCharacterLimitEntered}/${this.summaryCharacterLimit}`;
            },

            descriptionCharacterLimitDisplay: function() {
                return `${this.descriptionCharacterLimitEntered}/${this.descriptionCharacterLimit}`;
            },

            topOffset: function() {
                const element = this.$refs.formCreate;
                const top = element.offsetTop;
                return top;
            },
        },

        created() {
            this.getCategories();
        },

        methods: {
            checkForm() {
                this.formErrors = [];

                if (!this.idea.title) { this.formErrors.push('Title is required') }
                if (!this.idea.category) { this.formErrors.push('A category is required') }
                if (!this.idea.eventSummary) { this.formErrors.push('Idea summary is required') }
                if (!this.idea.eventDetails) { this.formErrors.push('Idea details are required') }

                return this.formErrors.length > 0;
            },

            onSubmit() {
                const formHasErrors = this.checkForm();

                if ( formHasErrors ) {
                    window.scrollTo(0, this.topOffset);
                    this.setFocusToErrorListing();
                    return;
                }

                // destructure to only include relevant properties
                const { image, imageAlt, ...eventProps } = this.idea;

                const isDateInvalid = this.$moment(eventProps.eventDate).format('YYYY-MM-DD') === 'Invalid date';
                const formattedDate = isDateInvalid ? this.$moment(new Date()).format('YYYY-MM-DD') : this.$moment(eventProps.eventDate).format('YYYY-MM-DD');

                const eventFormData = {
                    ...eventProps,
                    eventDate: formattedDate,
                };

                // only handling one category at the moment (radio button form input)
                const category = {
                    "categoryId": this.idea.category,
                    "checkBoxTicked": true
                };

                this.createIdea({idea: eventFormData}).then((data) => {
                    // add category to event
                    const eventId = data.eventId;

                    this.putIdeaCategories({ id: eventId, categories: [category] });
                })
                .then(() => {
                    this.submitted = true;
                });
            },

            ...mapActions({
                'createIdea': 'createIdea',
                'getCategories': 'getCategories',
                'putIdeaCategories': 'putIdeaCategories',
            }),

            checkSummaryCharacterLength(e) {
                this.summaryCharacterLimitEntered = e.target.value.length;
            },

            checkDescriptionCharacterLength(e) {
                this.descriptionCharacterLimitEntered = e.target.value.length;
            },

            setFocusToErrorListing() {
                this.$refs.formCreate.focus();
            },
        }
    }
</script>

<style lang="scss" scoped>
    .character-limit {
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
