<template lang="html">
    <form @submit.prevent="handleSubmit">
        <div class="form-group">
            <label for="email">Email</label>
            <input type="text" v-model="email" name="email" class="form-control" :class="{ 'is-invalid': submitted && !email }" v-validate="'required'" aria-required="true" />
            <div v-show="submitted && !email" class="invalid-feedback">Email is required</div>
        </div>
        <div class="form-group">
            <label htmlFor="password">Password</label>
            <input type="password" v-model="password" name="password" class="form-control" :class="{ 'is-invalid': submitted && !password }" v-validate="'required|confirmed:password'" aria-required="true" />
            <!-- <div v-show="submitted && !password" class="invalid-feedback">Password is required</div> -->
            <div v-if="submitted && errors.has('password')" class="invalid-feedback">{{ errors.first('password') }}</div>
        </div>

        <div class="form-group">
            <button class="btn btn-primary" :disabled="status.loggingIn">Login</button>
            <img v-show="status.loggingIn" src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
            <router-link to="/register" class="btn btn-link">Register</router-link>
        </div>


    </form>
</template>

<script>
    import { mapState, mapActions } from 'vuex';

    export default {
        name: 'FormLogin',
        data () {
            return {
                email: '',
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
            //     const { email, password } = this
            //     // VUEX ACTIONS RETURNING PROMISES
            //     this.$store.dispatch(AUTH_REQUEST, { email, password }).then(() => {
            //         this.$router.push('/')
            //     })
            // }
            ...mapActions('account', ['login', 'logout']),
            handleSubmit() {
                this.submitted = true;
                const { email, password } = this;
                if (email && password) {
                    // console.log('un', email)
                    this.login({ email, password })
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
