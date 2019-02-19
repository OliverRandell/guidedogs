<template lang="html">
    <form class="login" @submit.prevent="login" id="login">
        <label for="username">Choose a username
            <strong class="red" aria-hidden="true">*</strong>
        </label>
        <input type="text" name="username" id="username" placeholder="eg: TheCatInTheHat99" required v-model="username">
        <label for="password">Enter password
            <strong class="red" aria-hidden="true">*</strong>
        </label>
        <input type="password" name="password" id="password" required v-model="password">
        <button type="submit">Login</button>
    </form>
</template>

<script>
    export default {
        name: 'FormLogin',
        methods: {
            login: function () {
                const { username, password } = this
                // VUEX ACTIONS RETURNING PROMISES
                this.$store.dispatch(AUTH_REQUEST, { username, password }).then(() => {
                    this.$router.push('/')
                })
            }
        }
    }
</script>

<style lang="css">
</style>
