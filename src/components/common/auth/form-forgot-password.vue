<template>
    <div aria-live="polite">
        <form class="forgot-password" @submit.prevent="resetPassword" v-if="!successful">
            <div class="form-group">
                <label for="email">Email address
                    <strong class="red" aria-hidden="true">*</strong>
                </label>
                <input type="text" class="form-control" name="email" id="email" placeholder="Enter your email" required v-model="email" aria-describedby="email" aria-required="true">
            </div>

            <button type="submit" class="btn btn-primary">Send my new password</button>
            <loader v-if="loading" style="display: inline;" />
        </form>


        <section class="form-success success" aria-label="Success" v-else>
            You're password has been sent to your email.
        </section>

        <section class="error" v-if="error">
            <p>Sorry, something went wrong.</p>
            <p class="error-msg">Error: {{ errorMsg }}</p>
        </section>
    </div>
</template>

<script>
    import axios from 'axios';
    import { authHeader } from '@/utils/auth-header';
    import { apiUrl } from '@/utils/api';
    import loader from '../global/loading'

    export default {
        data () {
            return {
                email: '',
                successful: false,
                loading: false,
                error: false,
                errorMsg: ''
            }
        },

        components: {
            loader
        },

        methods: {
            resetPassword () {
                this.loading = true
                this.error = false
                this.errorMsg = ''

                axios.post(`${apiUrl}/authentication/forgotpassword`, { email: this.email })
                .then(() => { 
                    this.successful = true
                    this.loading = false
                })
                .catch(err => {
                    this.loading = false
                    this.error = true
                    this.errorMsg = err
                })
            }
        }
    }
</script>

<style lang="css">
.error-msg {
    font-size: 14px;
    color: darkred;
}

.form-success{
    border: 1px solid green;
    color: green;
    padding: 1em;
}
</style>
