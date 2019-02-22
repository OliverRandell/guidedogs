<template lang="html">
    <!-- <form class="registration-form" @submit.prevent="handleSubmit" id="register"> -->
    <form class="registration-form" id="register">
        <div class="form-group">
            <label for="username">Enter your full name
                <strong class="red" aria-hidden="true">*</strong>
            </label>
            <input type="text" name="fullname" id="fullname" placeholder="Snoopy" class="form-control" v-model="user.fullname">
        </div>
        <div class="form-group">
            <label for="username">Choose a username
                <strong class="red" aria-hidden="true">*</strong>
            </label>
            <input type="text" name="username" id="username" placeholder="eg: TheCatInTheHat99" :class="['form-control', { 'is-invalid': submitted && errors.has('username') }]" v-model="user.username">
        </div>
        <div class="form-group">
            <label for="email">Your email address
                <strong class="red" aria-hidden="true">*</strong>
            </label>
            <input type="text" name="email" id="email" aria-required="true" class="form-control" v-model="user.email">
        </div>
        <div class="form-group">
            <label for="password">Choose a password</label>
            <input type="password" name="password" id="password" :class="['form-control', { 'is-invalid': submitted && errors.has('password') }]" v-model="user.password">
        </div>
        <button type="submit" class="btn btn-primary">Submit</button>
    </form>
</template>

<script>
    export default {
        data () {
            return {
                user: {
                    fullname: '',
                    username: '',
                    email: '',
                    password: ''
                }
            }
        }
    }
</script>

<style lang="css">
</style>
