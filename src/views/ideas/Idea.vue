<template>
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
            <section class="pg-content" role="article" tabindex="-1">
                <h1>{{ idea.title }}</h1>
            </section>
        </div>
    </LayoutMaster>
</template>

<script>
    import LayoutMaster from '../../components/common/layouts/layout-master.vue';
    import Hero from '../../components/common/global/hero.vue';
    export default {
        name: 'Idea',
        components: {
            LayoutMaster,
            Hero
        },
        data() {
            return {
                id: this.$route.params.id,
                ideas: {}
            }
        },
        created() {
            this.$http.get('https://jsonplaceholder.typicode.com/posts/' + this.id).then(function(data) {
                console.log(data);
                this.ideas = data.body;
            })
        }
    }
</script>

<style lang="css">
</style>
