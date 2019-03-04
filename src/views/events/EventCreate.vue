<template lang="html">
    <LayoutMaster>
        <Hero>
            <template slot="title">
                Create a new Event
            </template>
            <template slot="description">
                This is the area to create a new event...
            </template>
        </Hero>
        <div class="container">
            <article class="pg-content" tabindex="0" role="article" v-if="!submitted">

                <form class="form-create-event col-8" action="index.html" method="post" v-if>
                    <div class="form-group">
                        <label for="title">Event title:</label>
                        <input type="text" name="" value="" required v-model="event.title" class="form-control">
                    </div>
                    <div class="form-group">
                        <label for="content">Event Content:</label>
                        <textarea name="name" rows="8" cols="80" v-model="event.content" class="form-control"></textarea>
                    </div>
                    <div class="form-check form-check-inline">
                        <input class="form-check-input" type="checkbox" v-model="event.categories" value="information" />
                        <label class="form-check-label" for="information">Information</label>
                    </div>
                    <div class="form-check form-check-inline">
                        <input class="form-check-input" type="checkbox" v-model="event.categories" value="social" />
                        <label class="form-check-label" for="social">Social</label>
                    </div>
                    <div class="form-check form-check-inline">
                        <input class="form-check-input" type="checkbox" v-model="event.categories" value="sports" />
                        <label class="form-check-label" for="sports">Sports &amp; Fitness</label>
                    </div>
                    <div class="form-check form-check-inline">
                        <input class="form-check-input" type="checkbox" v-model="event.categories" value="arts" />
                        <label class="form-check-label" for="arts">Arts &amp; crafts</label>
                    </div>
                    <div class="form-group">
                        <label for="host">Host:</label>
                        <select class="form-control" v-model="event.host">
                            <option v-for="host in eventHosts">{{ host }}</option>
                        </select>
                    </div>
                    <button type="button" v-on:click.prevent="post" class="btn btn-primary">Add Event</button>
                </form>

                <section class="event-preview col-4" tabindex="0" aria-labelledby="eventPreview">
                    <h4>Preview Event</h4>
                    <p>Event title: {{ event.title }}</p>
                    <p>Event content:</p>
                    <p>{{ event.content }}</p>
                    <p>Event Category:</p>
                    <ul>
                        <li v-for="category in event.categories">{{ category }}</li>
                    </ul>
                    <p>Host:</p>
                    <p>{{ event.host }}</p>
                </section>

            </article>
            <section v-if="submitted" class="msg-success">
                <h3>Congratulations! You have successfully created an event.</h3>
            </section>
        </div>

    </LayoutMaster>

</template>

<script>
    import LayoutMaster from '../../components/common/layouts/layout-master.vue';
    import Hero from '../../components/common/global/hero.vue';
    export default {
        name: 'EventCreate',
        components: {
            LayoutMaster,
            Hero
        },
        data () {
            return {
                event: {
                    id: 0,
                    title: '',
                    content: '',
                    categories: [],
                    host: '',
                },
                eventHosts: ['Gatsby', 'Elton John'],
                submitted: false
            }
        },
        methods: {
            post: function() {
                this.$http.post('http://jsonplaceholder.typicode.com/posts', {
                    title: this.event.title,
                    body: this.event.content,
                    userId: 1
                }).then(function(data) {
                    console.log(data);
                    this.submitted = true;
                });
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import './src/assets/scss/vue.scss';
    .event-preview {
        @include make-col-ready();
        @include media-breakpoint-up(lg) {
            @include make-col(4);
        }
    }
    // .msg-success {
    //     position: fixed;
    //     background: #000;
    //     top: 0;
    //     bottom: 0;
    //     left: 0;
    //     height: 100%;
    //     width: 100%;
    //     z-index: 2;
    //     color: #fff;
    //     display: flex;
    //     align-items: center;
    //     justify-content: center;
    // }
</style>
