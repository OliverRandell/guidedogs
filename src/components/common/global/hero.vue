<template>
    <section class="pg-hero">
        <div class="wrapper container">
            <h1>
                <slot name="title"></slot>
            </h1>
            <h2>
                <slot name="description"></slot>
            </h2>
        </div>

    </section>
</template>

<script>
export default {
}
</script>

<style lang="scss" scoped>
    @import './src/assets/scss/vue.scss';
    .pg-hero {
        background-color: $secondary;
        color: $black;
        padding-top: 4rem;
        padding-bottom: 4rem;
        text-align: center;
        @include media-breakpoint-up(sm) {
            padding-top: 6rem;
            padding-bottom: 6rem;
        }
        @include media-breakpoint-up(lg) {
            padding-top: 8rem;
            padding-bottom: 12rem;
        }
    }
    .wrapper {
        @include make-container();
        width: 100%;
    }
</style>
