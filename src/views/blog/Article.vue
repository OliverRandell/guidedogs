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
                    title: 'This is the title',
                    body: 'This is the body text'
                }
            }
        }
    }
</script>

<style lang="css">
</style>
