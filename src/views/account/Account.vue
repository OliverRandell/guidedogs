<template lang="html">
    <LayoutMaster>
        <div class="pg-content container">
            <div class="row">
                <div class="col-6">
                    <h1>Your Profile</h1>
                    <p v-if="profile.name">Hello <span>{{ profile.title }} {{ profile.name }}</span> this is your profile area. Feel free to add as many details as you can to this area. It increases your experiences with this app.</p>
                    <section class="profile-pod">
                        <img src="../../assets/imgs/profile-pic.jpg" :alt="['Profile picture for', profile.name]">
                        <p v-if="profile.name">
                            <strong>Name: </strong>
                            <span>{{ profile.title }} {{ profile.name }}</span>
                        </p>
                    </section>
                </div>
            </div>
        </div>
    </LayoutMaster>
</template>

<script>
    import LayoutMaster from '../../components/common/layouts/layout-master.vue';
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
    @import './src/assets/scss/app.scss';
    .profile-pod {
        display: flex;
        margin-top: 2rem;
        img {
            width: 120px;
            height: 120px;
            border-radius: 50%;
            border: 1px solid $gray-400;
            margin-right: 1rem;
        }
    }
</style>
