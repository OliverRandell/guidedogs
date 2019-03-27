<template>
    <button class="btn btn-primary" type="button" @click="toggleContrast">Toggle Contrast</button>
</template>

<script>
    export default {
        name: 'ToggleContrast',

        data() {
            return {
                highContrast: false
            }
        },

        methods: {
            toggleContrast: function () {
                this.highContrast = !this.highContrast;
                const contrastSet = window.localStorage.setItem('highContrast', this.highContrast);
                this.emitContrast();
            },

            emitContrast: function() {
                this.$emit('toggle-contrast', this.highContrast);
            },
            
            getContrast: function() {
                const contrastSet = window.localStorage.getItem('highContrast');
                return contrastSet === 'true' ? true : false;
            },
        },

        created() {
            const highContrast = this.getContrast();
            this.highContrast = highContrast;
            this.$emit('toggle-contrast', this.highContrast);
        },
    }
</script>

<style lang="css">
</style>
