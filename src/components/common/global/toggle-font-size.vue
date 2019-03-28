<template>
    <div>
        <div class="btn-group spacer">
            <button class="btn btn-secondary" type="button" @click="increaseSize">Increase font size</button>
            <button class="btn btn-secondary" type="button" @click="decreaseSize">Decrease font size</button>
        </div>
        <p class="spacer">Font size set to: {{ fontSize }}px</p>
        <button class="btn btn-outline-primary" type="button" @click="resetSize">Reset font size</button>
    </div>
</template>

<script>
    export default {
        name: 'ToggleFontSize',

        data() {
            return {
                fontSize: '16'
            }
        },

        methods: {
            increaseSize: function () {
                this.fontSize++;
                const setFontSize = window.localStorage.setItem('fontSize', this.fontSize);
                document.getElementsByTagName('html')[0].style.fontSize = `${this.fontSize}px`;
                this.emitFontSizeChange();
            },

            decreaseSize: function () {
                this.fontSize--;
                const setFontSize = window.localStorage.setItem('fontSize', this.fontSize);
                document.getElementsByTagName('html')[0].style.fontSize = `${this.fontSize}px`;
                this.emitFontSizeChange();
            },

            resetSize: function() {
                window.localStorage.removeItem('fontSize');
                document.getElementsByTagName('html')[0].style.fontSize = '';
                this.fontSize = '16';
            },

            emitFontSizeChange: function() {
                this.$emit('font-size-change', this.fontSize);
            },

            getFontSize: function() {
                const fontSize = window.localStorage.getItem('fontSize');
                return fontSize !== null ? fontSize : '16';
            },
        },

        created() {
            const fontSize = this.getFontSize();
            this.fontSize = fontSize;
            document.getElementsByTagName('html')[0].style.fontSize = `${this.fontSize}px`;
            this.emitFontSizeChange();
        },
    }
</script>

<style lang="scss" scoped>
    @import './src/assets/scss/app.scss';
</style>
