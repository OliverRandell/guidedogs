<template lang="html">
    <layout-master>
        <main class="eoi">
            <h1>{{ title }}</h1>
        </main>
    </layout-master>
</template>

<script>
    import LayoutMaster from '../components/common/layouts/layout-master.vue';
    export default {
        name: 'ExpressionsOfInterest',
        components : {
            LayoutMaster
        },
        data () {
            return {
                title: 'Events'
            }
        }
    }
</script>

<style lang="css">
</style>
