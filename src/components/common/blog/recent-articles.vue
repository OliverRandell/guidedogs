<template>
    <article role="article" tabindex="-1" class="article">


        <!-- <form class="form-inline form-search">
            <h4>Search blogs</h4>
            <label for="searchBlogs" class="sr-only">Search blogs</label>
            <input type="text" class="form-control" id="searchBlogs" placeholder="Search article library" v-model="search">
            <button type="submit" class="btn btn-primary">Search</button>
        </form> -->
        <h4>Latest Articles</h4>
        <div v-for="article in blogs" :key="article.id" class="post">

            <header>
                <router-link :to="'/articles/' + article.route">
                    <h2 class="article-title">{{ article.title }}</h2>
                </router-link>
                <h4 class="article-author">Posted by: <span>{{ article.author }}, on {{ article.date }}</span></h4>
            </header>

            <!-- <p class="intro" v-html="article.intro"></p> -->
            <router-link :to="'/articles/' + article.route" class="btn btn-primary">
                <slot name="btn-title"></slot>
            </router-link>
        </div>

    </article>
</template>

<script>

    export default {
        data() {
            return {
                search: '',
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
            }
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
        padding-top: 2rem;
    }
    .article-title {
        font-size: $font-size-base*1.2;
    }
    .form-search {
        width: 100%;
        @include spacer(1rem);
    }
    .post {
        @include spacer(1rem);
        .btn {
            //text-align: right;
            // float: right;
            //display: block;
        }
    }
    .article-date,
    .article-author {
        font-size: $font-size-base;
        > span {
            font-weight: $font-weight-normal;
        }
    }
</style>
