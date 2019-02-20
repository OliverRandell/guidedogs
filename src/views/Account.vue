<template lang="html">
    <LayoutMaster>
        <div class="">
            <p v-if="profile.name">
                <strong>Welcome:</strong>
                <span>{{ profile.title }} {{ profile.name }}</span>
            </p>
        </div>
    </LayoutMaster>
</template>

<script>
    import LayoutMaster from '../components/common/layouts/layout-master.vue';
    import { mapState } from 'vuex';

    export default {
        name: 'Account',
        components: {
            LayoutMaster
        },
        computed: mapState({ profile: state => state.user.profile })
    }
</script>

<style lang="scss" scoped>
    //@import './assets/scss/app.scss';
</style>
