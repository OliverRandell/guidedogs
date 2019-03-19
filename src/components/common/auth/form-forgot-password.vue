<template>
    <form class="forgot-password">
        <div class="form-group">
            <label for="email">Email address
                <strong class="red" aria-hidden="true">*</strong>
            </label>
            <input type="text" class="form-control" name="email" id="email" placeholder="forgot@password.com" required v-model="email" aria-describedby="email">
        </div>

        <button type="submit" class="btn btn-primary">Send my new password</button>

    </form>
</template>

<script>
    export default {
        data () {
            return {
                email: 'oliver.randell@workingthree.com'
            }
        }
    }
</script>

<style lang="css">
</style>
