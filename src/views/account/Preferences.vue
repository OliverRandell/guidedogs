<template lang="html">
    <LayoutMaster>
        <div class="container pg-content ">
            <div class="row">
                <div class="col-12">
                    <h1>My preferences</h1>
                </div>
            </div>

        </div>
    </LayoutMaster>
</template>

<script>
    import LayoutMaster from '../../components/common/layouts/layout-master.vue';
    import { mapState } from 'vuex';
    export default {
        name: 'Preferences',
        components: {
            LayoutMaster
        }
    }
</script>

<style lang="css">
</style>
