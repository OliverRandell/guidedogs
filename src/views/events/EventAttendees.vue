<template lang="html">
    <LayoutMaster>
        <Hero>
            <template slot="title">
                {{ title }}
            </template>
        </Hero>
        <div class="container">
            <div class="pg-content">

                <div class="col-8">
                    <h2>{{ event.title }}</h2>
                    <h4>Guests attending:</h4>
                    <ul>
                        <li v-for="guest in eventAttendees">
                            <router-link :to="guest.route">{{ guest.name }}</router-link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>

    </LayoutMaster>

</template>

<script>
    import LayoutMaster from '../../components/common/layouts/layout-master.vue';
    import Hero from '../../components/common/global/hero.vue';
    export default {
        name: 'IdeaManagement',
        components: {
            LayoutMaster,
            Hero,
        },
        data() {
            return {
                title: 'Attendees list',
            }
        }
    }
</script>

<style lang="css">
</style>
