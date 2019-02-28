<template lang="html">
    <div class="app-wrapper">
        <Header></Header>
        <main class="main" tabIndex="-1">

            <slot></slot>

        </main>
        
        <Footer></Footer>
    </div>
</template>

<script>
    import Header from '../header/header.vue';
    import Footer from '../footer.vue';
    export default {
        name: 'LayoutMaster',
        components: {
            Header,
            Footer
        }
    }
</script>

<style lang="css">
</style>
