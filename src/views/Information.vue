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
            <!-- <input type="text" name="" value="" placeholder="Search articles"> -->
            <section class="pg-content" role="article" tabindex="-1">
                <article class="article item-wrapper" role="article" tabindex="-1" v-for="article in blog" :key="article.id">
                    <router-link :to="'/articles/' + article.id">
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
                <aside class="items-sidebar" tabindex="-1">
                    <h3>Featured Articles</h3>
                    <ul class="list-unordered">
                        <li v-for="item in featuredArticles" :key="item.id">
                            <router-link :to="'/articles/' + item.id">{{ item.title }}</router-link>
                        </li>
                    </ul>
                </aside>

            </section>
        </div>
    </layout-master>
</template>

<script>
    import LayoutMaster from '../components/common/layouts/layout-master.vue';
    import Hero from '../components/common/global/hero.vue';
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
                blog: [
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
                    }
                ],
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
        }
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
</style>
