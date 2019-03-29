<template>
    <div>
        <section class="spacer">
            <h3>Filter by:</h3>
            <button type="button" :class="['btn-filter', { active: categoryId === '' }]" @click="$emit('filter', '')">All</button>

            <button
                v-for="category in allCategories" :key="category.categoryId"
                type="button"
                :class="['btn-filter', { active: categoryId === category.categoryId.toString() }]"
                @click="$emit('filter', category.categoryId.toString())">{{category.title}}</button>

            <div v-if="subType === 'event'">
                <p>My Event RSVP's</p>
                <button type="button" :class="['btn-filter', { active: categoryId === 'attending' }]" @click="$emit('filter', 'attending')">Attending</button>
            </div>
        </section>
        <section class="spacer">
            <div v-if="subType === 'idea'">
                <p>Ideas you're interested in.</p>
                <button type="button" :class="['btn-filter', { active: categoryId === 'attending' }]" @click="$emit('filter', 'attending')">Interested</button>
            </div>
        </section>

    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
    name: 'CategoryListingFilter',

    props: {
        categoryId: {
            type: String,
            default: ''
        },
        subType: {
            type: String,
            default: 'event'
        },
    },

    methods: {
        ...mapActions(['getCategories'])
    },

    computed: {
        ...mapGetters(['allCategories'])
    },

    created() {
        this.getCategories();
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
