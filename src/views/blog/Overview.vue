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

            <div class="pg-content blog-overview" role="article" tabindex="-1">
                <section class="item-wrapper">
                        <!-- <router-link :to="'/library/' + article.id">
                            <div class="featured-img">
                                <time class="event-date">{{ article.date }}</time>
                                <figure>
                                    <img :src="article.imgSrc" :alt="article.imgAlt">
                                </figure>
                            </div>
                        </router-link> -->

                    <RecentArticles>
                        <template slot="btn-title">Read More</template>
                    </RecentArticles>

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
    import RecentArticles from '../../components/common/blog/recent-articles.vue';
    export default {
        name: 'Information',
        components : {
            LayoutMaster,
            Hero,
            RecentArticles
        },
        data () {
            return {
                title: 'Library',
                tagline: 'Find articles and information for the community here',
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
    }
</script>

<style lang="scss" scoped>
    @import './src/assets/scss/app.scss';
    .item-wrapper {
        margin-top: -4rem;
    }

</style>
