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
                        title: 'Events',
                        route: 'https://www.google.com'
                    },
                    {
                        id: 1,
                        title: 'EOI',
                        route: 'https://www.google.com'
                    },
                    {
                        id: 2,
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
