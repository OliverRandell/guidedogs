<template lang="html">
    <div class="app-wrapper">
        <Header></Header>
        <main id="content" class="main" tabIndex="-1" role="main">

            <slot></slot>

        </main>
        <Feedback></Feedback>
        <Footer></Footer>
    </div>
</template>

<script>
    import Header from '../header/header.vue';
    import Feedback from '../global/feedback.vue';
    import Footer from '../footer.vue';
    export default {
        name: 'LayoutMaster',
        components: {
            Header,
            Feedback,
            Footer
        }
    }
</script>

<style lang="css">
</style>
