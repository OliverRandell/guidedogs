<template>
    <layout-master>
        <main class="container pg-content">
            <div class="row">
                <div class="col-12">
                    <h1>{{ title }}</h1>
                </div>
            </div>
        </main>
    </layout-master>
</template>

<script>
    import LayoutMaster from '../components/common/layouts/layout-master.vue';
    export default {
        name: 'Information',
        components: {
            LayoutMaster
        },
        data () {
            return {
                title: 'Information'
            }
        }
    }
</script>

<style lang="css">
</style>
