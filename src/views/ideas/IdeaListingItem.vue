<template>
    <div>
        <router-link v-if="idea.userIsHost && hosting" :to="'/manage-idea/' + idea.eventId">
            <h4 class="title">{{ idea.title }}</h4>
        </router-link>
        <router-link v-if="!hosting" :to="'/ideas/' + idea.eventId">
            <h4 class="title">{{ idea.title }}</h4>
        </router-link>
        <p class="host"><span>Host:</span> {{ idea.eventHostNickName }}</p>
        <p>{{ idea.eventDetails | truncate }}</p>

        <router-link v-if="idea.userIsHost && hosting" :to="'/manage-idea/' + idea.eventId" class="btn btn-primary">Details</router-link>
        <router-link v-if="!hosting" :to="'/ideas/' + idea.eventId" class="btn btn-primary">Read more</router-link>
    </div>
</template>

<script>
    export default {
        name: 'IdeaListingItem',

        props: ['idea', 'hosting'],

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
        @include font-size($h5-font-size);
        color: $black;
        .highContrast & {
            color: $white;
        }
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
