<template>
    <div class="container">
        <div class="pg-content" role="article" tabindex="-1">
            <section class="item-wrapper">
                <article class="col-12">
                    <p class="text-container">
                        <strong class="text-primary">Author: </strong>
                        <slot name="author"></slot>
                    </p>
                    <time class="text-container">
                        <strong class="text-primary">Date published: </strong>
                        <slot name="date"></slot>
                    </time>
                    <div class="text-container intro">
                        <slot name="intro"></slot>
                    </div>
                    <div class="text-container">
                        <slot name="body"></slot>
                    </div>

                    <!-- <slot name="intro"></slot>
                    <slot name="body"></slot> -->
                </article>
            </section>
        </div>
    </div>
</template>

<script>
export default {
}
</script>

<style lang="css">
</style>
