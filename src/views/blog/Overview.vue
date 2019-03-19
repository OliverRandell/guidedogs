<template>
    <layout-master>
        <hero>
            <template slot="title">
                {{ title }}
            </template>
            <template slot="description">
                {{ tagline }}
            </template>
        </hero>

        <div class="container">

            <div class="pg-content" role="article" tabindex="-1">
                <section class="item-wrapper">
                    <article role="article" tabindex="-1" class="article">
                        <!-- <router-link :to="'/library/' + article.id">
                            <div class="featured-img">
                                <time class="event-date">{{ article.date }}</time>
                                <figure>
                                    <img :src="article.imgSrc" :alt="article.imgAlt">
                                </figure>
                            </div>
                        </router-link> -->
                        <h4>Search blogs</h4>
                        <form class="form-inline form-search">
                            <label for="searchBlogs" class="sr-only">Search blogs</label>
                            <input type="text" class="form-control" id="searchBlogs" placeholder="Search article library" v-model="search">
                            <button type="submit" class="btn btn-primary">Search</button>
                        </form>
                        <h4>Articles</h4>
                        <div v-for="article in filteredBlogs" :key="article.id" class="post">

                            <header>
                                <router-link :to="'/articles/' + article.route">
                                    <h2 class="article-title">{{ article.title }}</h2>
                                </router-link>
                                <h3 class="author">Posted by: {{ article.author }}, on: {{ article.date }}</h3>
                            </header>

                            <p class="intro" v-html="intro">{{ article.intro }}</p>
                            <router-link :to="'/articles/' + article.route" class="btn btn-primary">Read More</router-link>
                        </div>

                    </article>
                </section>
                <aside class="items-sidebar" tabindex="-1">

                    <h3>Featured Articles</h3>
                    <ul class="list-unordered">
                        <li v-for="article in featuredArticles" :key="article.id">
                            <router-link :to="'/articles/' + article.route">{{ article.title }}</router-link>
                        </li>
                    </ul>
                </aside>

            </div>
        </div>
    </layout-master>
</template>

<script>
    import LayoutMaster from '../../components/common/layouts/layout-master.vue';
    import Hero from '../../components/common/global/hero.vue';
    export default {
        name: 'Information',
        components : {
            LayoutMaster,
            Hero
        },
        data () {
            return {
                title: 'Library',
                tagline: 'Find articles and information for the community here',
                blogs: [
                    {
                        route: 'accessibility-entitlements',
                        title: 'Accessibility Entitlements',
                        author: 'Guide Dogs Victoria',
                        date: 'Thursday, 31st January 2019',
                        intro: `The Companion Card is issued to people with a significant, permanent disability, who can demonstrate that they are unable to access most community activities and venues without attendant care support.`,
                        featured: true,
                    },
                    {
                        route: 'financial-entitlements',
                        title: 'Financial Entitlements',
                        author: 'Guide Dogs Victoria',
                        date: 'Friday, 15th March 2019',
                        intro: `People who are blind or have low vision may be eligible for a range of benefits.`,
                        featured: true,
                    },
                    {
                        route: 'insurance-scheme',
                        title: 'Becoming a participant of the National Disability Insurance Scheme.',
                        author: 'Guide Dogs Victoria',
                        date: 'Sunday, 17th March 2019',
                        intro: `Find out if you're elidgable for the National Disability Insurance Scheme...`,
                        featured: true
                    }
                ],
                search: '',
                featuredArticles: [
                    {
                        route: 'accessibility-entitlements',
                        title: 'Accessibility Entitlements',
                    },
                    {
                        route: 'financial-entitlements',
                        title: 'Financial Entitlements',
                    },
                    {
                        route: 'insurance-scheme',
                        title: 'Becoming a participant of the National Disability Insurance Scheme.',
                    }
                ]
            }
        },
        // created() {
        //     this.$http.get('https://jsonplaceholder.typicode.com/posts').then(function(data) {
        //         this.blogs = data.body.slice(0,4);
        //     })
        // },
        computed: {
            filteredBlogs: function() {
                return this.blogs.filter((article) => {
                    return article.title.match(this.search);
                });
            }
        },
    }
</script>

<style lang="scss" scoped>
    @import './src/assets/scss/app.scss';
    .article {
        @include spacer(1rem);
        padding-top: 2rem;
    }
    .author {
        font-size: $font-size-base;
    }
    .item-wrapper {
        margin-top: -4rem;
    }
    .form-search {
        width: 100%;
        @include spacer(1rem);
    }
    .post {
        @include spacer(1rem);
    }
    .article-title {
        font-size: $font-size-base*1.2;
    }
</style>
