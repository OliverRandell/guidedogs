<template>
    <div>
        <router-link :to="'/ideas/' + idea.eventId">
            <h2 class="title">{{ idea.title }}</h2>
        </router-link>
        <p class="host"><span>Host:</span> {{ idea.eventHostNickname }}</p>
        <p>{{ idea.eventDetails | truncate }}</p>
        <router-link :to="'/ideas/' + idea.eventId" class="btn btn-primary">Read more</router-link>
    </div>
</template>

<script>
    export default {
        name: 'IdeaListingItem',

        props: ['idea'],

        filters: {
            truncate: function(value, limit) {
                if (value && value.length > 100) {
                    value = value.substring(0, 90) + '...';
                }
                return value;
            }
        },
    }
</script>

<style lang="scss" scoped>
    @import './src/assets/scss/vue.scss';
    .title {
        @include font-size($h2-font-size);
        color: $black;
        &:hover {
            text-decoration:none;
            color: darken($primary, 20%);
        }
    }
    .host {
        font-size: $font-size-base*0.8;
        span {
            color: $primary;
            text-transform: uppercase;
        }
    }
</style>
