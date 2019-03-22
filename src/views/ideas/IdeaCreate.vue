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
                <div class="col-12 col-lg-8">
                    <form @submit.prevent="onSubmit" v-if="!submitted" class="form-create">
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

                        <!-- <div class="form-group">
                            <label for="author">Idea creator:</label>
                            <input type="text" required v-model="idea.author" class="form-control">
                        </div> -->
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
                        <!-- <div class="form-group">
                            <label for="category">Category:</label>
                            <select class="form-control" v-model="idea.category">
                                <option v-for="category in categories">{{ category | capitalize }}</option>
                            </select>
                        </div> -->
                        <div class="form-group">
                            <!-- PUT A CHARACTER LIMIT ON THIS DESCRIPTION -->
                            <label for="description">Idea description:</label>
                            <textarea name="name" rows="4" v-model="idea.eventDetails" class="form-control"></textarea>
                        </div>
                        <h4>Important Information</h4>
                        <p v-html="importantInfo"></p>
                        <input type="submit" class="btn btn-primary" v-on:click.prevent="onSubmit" value="Create idea"></input>
                    </form>
                </div>
                <div v-if="submitted" class="col-12">
                    <h3>Thanks for adding your idea</h3>
                </div>
                <aside class="col-12 col-lg-4">
                    <router-link to="/ideas">&larr; Back to ideas</router-link>
                    <dl class="object-details">
                        <dt>Idea title:</dt>
                        <dd>{{ idea.title }}</dd>
                        <dt>Idea summary:</dt>
                        <dd>{{ idea.eventDetails }}</dd>
                        <dt>Idea Category:</dt>
                        <dd>{{ idea.category }}</dd>
                        <dt>Idea description:</dt>
                        <dd>{{ idea.eventDetails }}</dd>
                    </dl>
                </aside>

            </div>
        </div>
    </LayoutMaster>
</template>

<script>
    import { mapState, mapActions, mapGetters } from 'vuex';
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
                },
                submitted: false,
                importantInfo: `You can convert your idea into an Event at any time. Further information will be required at that time. Ideas can be longstanding and do not have an expiry date.`,
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
                });;
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
