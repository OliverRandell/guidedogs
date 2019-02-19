<template lang="html">
    <nav class="primary-nav">
        <router-link v-for="item in navItems" :to="item.route" :key="item.id">{{ item.title }}</router-link>
    </nav>
</template>

<script>
    export default {
        data () {
            return {
                navItems: [
                    {
                        id: 0,
                        title: 'Home',
                        route: '/'
                    },
                    {
                        id: 1,
                        title: 'Events',
                        route: 'events'
                    },
                    {
                        id: 2,
                        title: 'Expressions of Interest',
                        route: 'expressions-of-interest'
                    },
                    {
                        id: 3,
                        title: 'Contact Us',
                        route: 'contact'
                    }
                ]
            }
        }
    }
</script>

<style lang="css">
</style>
