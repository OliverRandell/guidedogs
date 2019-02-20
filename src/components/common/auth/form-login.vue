<template lang="html">
    <form class="login" @submit.prevent="login" id="login">
        <div class="form-group">
            <label for="username">Choose a username
                <strong class="red" aria-hidden="true">*</strong>
            </label>
            <input type="text" class="form-control" name="username" id="username" placeholder="eg: TheCatInTheHat99" required v-model="username" aria-describedby="userName">
        </div>

        <div class="form-group">
            <label for="password">Enter password
                <strong class="red" aria-hidden="true">*</strong>
            </label>
            <input class="form-control" type="password" name="password" id="password" required v-model="password">
        </div>

        <button type="submit" class="btn btn-primary">Login</button>

    </form>
</template>

<script>
    import { AUTH_REQUEST } from '../../../store/actions/auth'

    export default {
        name: 'FormLogin',
        data () {
            return {
                username: 'Droopy',
                password: 'droopy',
            }
        },
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
