<template lang="html">
    <a :href="`mailto:${email}`">{{ email }}</a>
</template>

<script>
export default {
    data() {
        return {
            email: 'info@guidedogsvictoria.com.au'
        }
    }
}
</script>

<style lang="css">
</style>
