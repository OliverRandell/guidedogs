<template lang="html">
    <LayoutMaster>
        <div class="pg-content container">
            <div class="row">
                <div class="col-6">
                    <h1>Hi {{ account.user.firstName }}!</h1>
                    <em v-if="users.loading">Loading users...</em>
                    <span v-if="users.error" class="text-danger">ERROR: {{users.error}}</span>
                    <ul v-if="users.items">
                        <li v-for="user in users.items" :key="user.id">
                            {{user.firstName + ' ' + user.lastName}}
                            <span v-if="user.deleting"><em> - Deleting...</em></span>
                            <span v-else-if="user.deleteError" class="text-danger"> - ERROR: {{user.deleteError}}</span>
                            <span v-else> - <button @click="deleteUser(user.id)" class="btn btn-secondary text-danger">Delete</button>
                            </span>
                        </li>
                    </ul>
                    <!-- <p v-if="profile.name">Hello <span>{{ profile.title }} {{ profile.name }}</span> this is your profile area. Feel free to add as many details as you can to this area. It increases your experiences with this app.</p>
                    <section class="profile-pod">
                        <img src="../../assets/imgs/profile-pic.jpg" :alt="['Profile picture for', profile.name]">
                        <p v-if="profile.name">
                            <strong>Name: </strong>
                            <span>{{ profile.title }} {{ profile.name }}</span> -->
                        <!-- </p>
                        <p>Email</p>
                        <p>username</p>
                        <p>update password form</p>
                        <p>Interests</p>
                        <p>Talk to me about...</p>
                    </section> -->
                    <p>
                        <router-link to="/login">Logout</router-link>
                    </p>
                </div>
            </div>
        </div>
    </LayoutMaster>
</template>

<script>
    import LayoutMaster from '../../components/common/layouts/layout-master.vue';
    import { mapState, mapActions } from 'vuex';

    export default {
        name: 'Account',
        components: {
            LayoutMaster
        },
        computed: {
            ...mapState({
                account: state => state.account,
                users: state => state.users.all
            })
        },
        created () {
            this.getAllUsers();
        },
        methods: {
            ...mapActions('users', {
                getAllUsers: 'getAll',
                deleteUser: 'delete'
            })
        }
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
