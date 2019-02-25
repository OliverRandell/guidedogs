<template lang="html">
    <form class="login" @submit.prevent="handleSubmit" id="login">
        <div class="form-group">
            <label for="username">Choose a username
                <strong class="red" aria-hidden="true">*</strong>
            </label>
            <input type="text" :class="['form-control', { 'is-invalid': submitted && !username }]" name="username" id="username" placeholder="eg: TheCatInTheHat99" required v-model="username" aria-describedby="userName">
            <!-- <input type="text" class="form-control" name="username" id="username" placeholder="eg: TheCatInTheHat99" required v-model="username" aria-describedby="userName"> -->
            <div v-show="submitted && !username" class="invalid-feedback">Username is required</div>
        </div>

        <div class="form-group">
            <label htmlFor="password">Enter password
                <strong class="red" aria-hidden="true">*</strong>
            </label>
            <input :class="['form-control', { 'is-invalid': submitted && !password }]" type="password" name="password" id="password" required v-model="password">
            <div class="invalid-feedback" v-show="submitted && !password">Password is required</div>
            <router-link to="/forgot-password" class="link-forgotpassword">Forgot password?</router-link>
        </div>

        <button type="submit" class="btn btn-primary" :disabled="status.loggingIn">Login</button>

    </form>
</template>

<script>
    import { mapState, mapActions } from 'vuex';

    export default {
        name: 'FormLogin',
        data () {
            return {
                username: '',
                password: '',
                submitted: false
            }
        },
        computed: {
            ...mapState('account', ['status'])
        },
        created () {
            // RESET LOGIN STATUS
            this.logout();
        },
        methods: {
            // login: function () {
            //     const { username, password } = this
            //     // VUEX ACTIONS RETURNING PROMISES
            //     this.$store.dispatch(AUTH_REQUEST, { username, password }).then(() => {
            //         this.$router.push('/')
            //     })
            // }
            ...mapActions('account', ['login', 'logout']),
            handleSubmit (e) {
                this.submitted = true;
                const { username, password } = this;
                if (username && password) {
                    this.login({ username, password })
                }
            }
        }
    }
</script>

<style lang="css">
    /* .login {
        ma
    } */
    .link-forgotpassword {
        /* display: block;
        float: right; */
        /* text-align: right; */
        display: flex;
        align-self: flex-end;
    }
</style>
