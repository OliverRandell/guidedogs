<template>
    <div class="pg-hero" tabIndex="-1">
        <div class="container" tabIndex="-1">
            <div class="row">
                <section class="hero-wrapper">
                    <h1>
                        <slot name="title"></slot>
                    </h1>
                    <h2>
                        <slot name="description"></slot>
                    </h2>
                </section>
            </div>
        </div>
    </div>
</template>

<script>
export default {
}
</script>

<style lang="scss" scoped>
    @import './src/assets/scss/vue.scss';
    .pg-hero {
        background-color: $secondary;
        padding-top: 4rem;
        padding-bottom: 4rem;
        text-align: center;
        .highContrast & {
            background-color: $black;

        }
        @include media-breakpoint-up(sm) {
            padding-top: 6rem;
            padding-bottom: 6rem;
        }
        @include media-breakpoint-up(lg) {
            padding-top: 8rem;
            padding-bottom: 12rem;
        }
    }
    .hero-wrapper {
        @include make-col-ready();
        @include make-col(12);
        @include media-breakpoint-up(lg) {
            @include make-col(8);
            @include make-col-offset(2);
        }
    }
    h1 {
        font-weight: $font-weight-bold;
    }
    h2 {
        font-size: $font-size-base * 1.75;
    }
</style>
