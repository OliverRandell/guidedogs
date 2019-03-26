<template>
    <div>
        <h3>Filter by:</h3>
        <p>Category</p>
        <button type="button" :class="['btn-filter', { active: currentFilter === 'all' }]" @click="$emit('filter-events', 'all')">All</button>

        <button
            v-for="category in allCategories" :key="category.categoryId"
            type="button"
            :class="['btn-filter', { active: currentFilter === category.categoryId.toString() }]"
            @click="$emit('filter-events', category.categoryId.toString())">{{category.title}}</button>

        <p>My Event RSVP's</p>
        <button type="button" :class="['btn-filter', { active: currentFilter === 'attending' }]" @click="$emit('filter-events', 'attending')">Attending</button>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
    name: 'EventListingFilter',
    props: ['currentFilter'],
    methods: {
        ...mapActions(['getCategories'])
    },
    computed: {
        ...mapGetters(['allCategories'])
    },
    created() {
        this.getCategories()
    }
}
</script>

<style lang="scss" scoped>
    @import './src/assets/scss/vue.scss';
    .btn-filter {
        display: block;
        margin-bottom: 0.5rem;
        width: 100%;
        border: 2px solid $primary;
        background-color: $white;
        border-radius: 0.25rem;
        color: $primary;
        transition: all 300ms;
        padding: 0.75rem 1.4rem;
        &.active,
        &:hover {
            background-color: $primary;
            border-color: $primary;
            color: $white;
        }
    }
</style>
