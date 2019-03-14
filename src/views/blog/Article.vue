<template lang="html">
    <LayoutMaster>
        <article class="col-8">
            <h1>{{ post.title }}</h1>
            <p>{{ post.body }}</p>
        </article>
    </LayoutMaster>
</template>

<script>
    export default {
        data () {
            return {
                post: {
                    //title: 'This is the title',
                    id: this.$route.params.id,
                    body: {}
                }
            }
        },
        created() {
            this.$http.get('https://jsonplaceholder.typicode.com/posts/' + this.id).then(function(data) {
                console.log(data);
                this.blog = data.body;
            });
        }
    }
</script>

<style lang="css">
</style>
