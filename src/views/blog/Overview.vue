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
                    <article role="article" tabindex="-1" v-for="article in filteredBlogs" :key="article.id" class="article">
                        <router-link :to="'/library/' + article.id">
                            <div class="featured-img">
                                <time class="event-date">{{ article.date }}</time>
                                <figure>
                                    <img :src="article.imgSrc" :alt="article.imgAlt">
                                </figure>
                            </div>
                        </router-link>
                        <header>
                            <router-link :to="'/articles/' + article.id" class="article-title">{{ article.title }}</router-link>
                            <h3 class="author">By: {{ article.author }} | Posted on {{ article.date }}</h3>
                        </header>

                        <p class="intro">{{ article.intro }}</p>
                        <p>{{ article.content }}</p>
                        <button type="button" name="button" class="btn btn-primary">Read More</button>

                    </article>
                </section>
                <aside class="items-sidebar" tabindex="-1">
                    <form class="form-inline">
                        <label for="searchBlogs" class="sr-only">Search blogs</label>
                        <input type="text" class="form-control" id="searchBlogs" placeholder="Search article library" v-model="search">
                        <button type="submit" class="btn btn-primary">Search</button>
                    </form>
                    <h3>Featured Articles</h3>
                    <ul class="list-unordered">
                        <li v-for="item in featuredArticles" :key="item.id">
                            <router-link :to="'/articles/' + item.id">{{ item.title }}</router-link>
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
                        id: 0,
                        title: 'This is the blog title',
                        author: 'Ernest Hemmingway',
                        date: 'Friday, 12th March 2019',
                        intro: 'This is the intro',
                        content: 'This is the content',
                        imgSrc: 'https://placekitten.com/1000/1000',
                        imgAlt: 'This is  the alternative image text.',
                        featured: true,
                    },
                    {
                        id: 1,
                        title: 'This is another blog article',
                        author: 'Ernest Hemmingway',
                        date: 'Friday, 15th March 2019',
                        intro: 'This is the intro',
                        content: 'This is the content',
                        imgSrc: 'https://placekitten.com/1000/1000',
                        imgAlt: 'This is  the alternative image text.',
                        featured: true,
                    }
                ],
                search: '',
                featuredArticles: [
                    {
                        id: 0,
                        title: 'A stakeholder interview checklist',
                    },
                    {
                        id: 1,
                        title: 'Competitive analysis: Understanding the market context',
                    },
                    {
                        id: 2,
                        title: 'Arriving somewhere, but not here',
                    }
                ]
            }
        },
        created() {
            this.$http.get('https://jsonplaceholder.typicode.com/posts').then(function(data) {
                this.blogs = data.body.slice(0,4);
            })
        },
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
    }
    .author {
        font-size: $font-size-base*1.2;
    }
    .item-wrapper {
        margin-top: -4rem;
    }
</style>
