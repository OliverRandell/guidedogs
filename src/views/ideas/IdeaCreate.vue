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
                        </div>
                        <div class="form-group">
                            <label for="author">Idea creator:</label>
                            <input type="text" required v-model="idea.author" class="form-control">
                        </div>
                        <div class="form-group">
                            <label for="category">Category:</label>
                            <select class="form-control" v-model="idea.category">
                                <option v-for="category in categories">{{ category | capitalize }}</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <!-- PUT A CHARACTER LIMIT ON THIS DESCRIPTION -->
                            <label for="description">Idea description:</label>
                            <textarea name="name" rows="4" v-model="idea.desc" class="form-control"></textarea>
                        </div>
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
                        <dt>Idea author:</dt>
                        <dd>{{ idea.author }}</dd>
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
                    desc: '',
                    category: '',
                    author: '',
                },
                categories: [
                    'Sports', 'Cat 2', 'etc',
                ],
                submitted: false,
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
