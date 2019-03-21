<template lang="html">
    <LayoutMaster>
        <hero>
            <template slot="title">
                {{ title }}
            </template>
            <template slot="description">
                {{ tagline }}
            </template>
        </hero>
        <div class="container">
            <div class="pg-content">
                <div class="col-12 col-lg-8">
                    <form @submit.prevent="createIdea" v-if="!submitted" class="form-create">
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
                                    <div class="form-check">
                                        <div class="form-check">
                                            <input class="form-check-input" type="radio" name="categorySocial" id="social" value="social" v-model="idea.category">
                                            <label class="form-check-label" for="social">Social</label>
                                        </div>
                                    </div>
                                    <div class="form-check">
                                        <div class="form-check">
                                            <input class="form-check-input" type="radio" name="categoryInformation" id="information" value="information" v-model="idea.category">
                                            <label class="form-check-label" for="information">Information</label>
                                        </div>
                                    </div>
                                    <div class="form-check">
                                        <div class="form-check">
                                            <input class="form-check-input" type="radio" name="categoryArts" id="arts" value="arts" v-model="idea.category">
                                            <label class="form-check-label" for="arts">Arts</label>
                                        </div>
                                    </div>
                                    <div class="form-check">
                                        <div class="form-check">
                                            <input class="form-check-input" type="radio" name="categorySports" id="sports" value="sports" v-model="idea.category">
                                            <label class="form-check-label" for="sports">Sports and fitness</label>
                                        </div>
                                    </div>
                                    <div class="form-check">
                                        <div class="form-check">
                                            <input class="form-check-input" type="radio" name="categoryNone" id="none" value="none" v-model="idea.category">
                                            <label class="form-check-label" for="none">Other</label>
                                        </div>
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
                            <textarea name="name" rows="4" v-model="idea.desc" class="form-control"></textarea>
                        </div>
                        <h4>Important Information</h4>
                        <p v-html="importantInfo"></p>
                        <input type="submit" class="btn btn-primary" @click.prevent="post" value="Create idea"></input>
                    </form>
                </div>
                <div v-if="submitted" class="col-12">
                    <h3>Thanks for adding your post</h3>
                </div>
                <aside class="col-12 col-lg-4">
                    <router-link to="/ideas">Back to ideas</router-link>
                    <dl class="object-details">
                        <dt>Idea title:</dt>
                        <dd>{{ idea.title }}</dd>
                        <dt>Idea summary:</dt>
                        <dd>{{ idea.eventDetails }}</dd>
                        <dt>Idea Category:</dt>
                        <dd>{{ idea.category }}</dd>
                        <dt>Idea description:</dt>
                        <dd>{{ idea.desc }}</dd>
                    </dl>
                </aside>

            </div>
        </div>
    </LayoutMaster>
</template>

<script>
    import LayoutMaster from '../../components/common/layouts/layout-master.vue';
    import Hero from '../../components/common/global/hero.vue';
    export default {
        name: 'IdeaCreate',
        components: {
            LayoutMaster,
            Hero
        },
        data() {
            return {
                title: 'Create ideas',
                tagline: 'This is the tagline',
                idea: {
                    title: '',
                    //desc: '',
                    eventDetails: '',
                    category: '',
                    eventDetails: ''
                },
                categories: [
                    'Sports', 'Cat 2', 'etc',
                ],
                submitted: false,
                importantInfo: `You can convert your idea into an Event at any time. Further information will be required at that time. Ideas can be longstanding and do not have an expiry date.`
            }
        },
        methods: {
            post: function() {
                this.$http.post('https://jsonplaceholder.typicode.com/posts', {
                    title: this.idea.title,
                    desc: this.idea.content,
                    hostId: 1,
                }).then(function(data) {
                    console.log(data);
                    this.submitted = true;
                });
            }
        }
    }
</script>

<style lang="css">
</style>
