<template lang="html">
    <LayoutAuth>
        <h1>{{ title }}</h1>
        <p>Welcome to Guide Dogs...</p>
        <form class="login-form" action="index.html" method="post" id="register">
            <label for="email">Your email address
                <strong class="red" aria-hidden="true">*</strong>
            </label>
            <input type="text" name="email" id="email" aria-required="true">
            <label for="username">Choose a username
                <strong class="red" aria-hidden="true">*</strong>
            </label>
            <input type="text" name="username" id="username" placeholder="eg: TheCatInTheHat99">
            <label for="password">Choose a password</label>
            <input type="password" name="password" id="password">
            <button type="submit">Submit</button>
        </form>
    </LayoutAuth>

</template>

<script>
    import LayoutAuth from '../../components/common/layouts/layout-auth.vue';
    export default {
        name: 'UserLogin',
        components: {
            LayoutAuth
        },
        data () {
            return {
                title: 'Login'
            }
        }
    }
</script>

<style lang="css">
</style>
