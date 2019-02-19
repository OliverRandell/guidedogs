<template lang="html">
    <form class="registration-form" action="index.html" method="post" id="register">
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
</template>

<script>
export default {
}
</script>

<style lang="css">
</style>
