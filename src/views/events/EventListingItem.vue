<template>
  <div>
    <router-link :to="'/events/' + eventItem.eventId">
      <figure class="event-thumbnail">
        <h5 class="event-privacy">
          <template v-if="eventItem.eventOpen === 'true'">Public</template>
          <template v-else>Private</template>
        </h5>
        <img v-if="eventItem.image" :src="eventItem.image.url" :alt="eventItem.image.altText">
      </figure>
    </router-link>

    <section class="event-content" tabindex="-1">
      <time class="event-date">
        <span class="month">{{ eventItem.eventDate | moment("MMM") }}</span>
        <span class="day">{{ eventItem.eventDate | moment("D") }}</span>
      </time>
      <dl class="event-summary">
        <h4 class="event-title">{{ eventItem.title }}</h4>

        <dt>Host:</dt>
        <dd>{{ eventItem.eventHostNickName }}</dd>

        <!-- <div v-if="userIsHost">
            <p>Is user host</p>
        </div>

        <div v-else>
            <p>Is not user host</p>
        </div> -->

        <dt>When:</dt>
        <dd>
            <time>
                {{ eventItem.eventDate | moment("dddd Do MMMM") }}
                <br>
                <!-- TODO: specify start and end times from model -->
                {{ eventItem.eventDate | moment("h:mm a") }}
            </time>
        </dd>

        <dt>Where:</dt>
        <dd>{{ eventItem.location }}</dd>

        <router-link :to="'/events/' + eventItem.eventId" class="btn btn-primary">Read more</router-link>
      </dl>
    </section>
  </div>
</template>

<script>
export default {
  name: "EventListingItem",
  props: ["eventItem", "ItemsPerPage"]
};
</script>

<style lang="scss" scoped>
    @import "./src/assets/scss/vue.scss";
    .event-thumbnail {
        width: 100%;
        margin: 0;
        overflow: hidden;
        position: relative;
        img {
            width: 100%;
        }
    }
    .event-content {
        padding: 1.5rem;
        border-radius: 0 0 0.5rem 0.5rem;
        border-top: 0;
        display: flex;
        position: relative;
    }
    .event-title {
        font-size: $h5-font-size;
        font-weight: $font-weight-normal;
        > a {
            color: $black;
        }
    }
    .event-date {
        margin-right: 1rem;
    }
    .event-privacy {
        position: absolute;
        bottom: 0;
        right: 0;
        background-color: $secondary;
        color: $black;
        padding: 0.75rem;
        font-size: $font-size-base;
        margin-bottom: 0;
    }
    .event-details p {
        font-size: 1rem;
        margin-bottom: 0.5rem;
        span {
            font-weight: $font-weight-bold;
            color: $primary;
            text-transform: uppercase;
            font-size: $font-size-base * .65;
        }
    }
    .event-summary {
        .event-title {
            display: block;
            margin-bottom: 1rem;
            line-height: 1;
        }
        dt {
            @include summaryHeading();
        }
        dd {
            font-size: 1rem;
        }
    }
</style>
