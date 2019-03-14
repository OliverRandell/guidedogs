<template>

    <LayoutMaster>
        <hero>
            <template slot="title">
                {{ title }}
            </template>
            <template slot="description">
                {{ tagline }}
            </template>
        </hero>
        <div class="container">
            <div class="pg-content">
                <section class="item-wrapper">
                    <article class="idea-pod" v-for="idea in eventIdeas" :key="idea.id">
                        <router-link :to="'/ideas/' + idea.id">
                            <h2 class="title">{{ idea.title }}</h2>
                        </router-link>

                        <p class="host"><span>Host:</span> {{ idea.hostName }}</p>
                        <p>{{ idea.text }}</p>
                        <!-- <button type="button" :class="{ interested: idea.interested === 'true' }" @click="idea.interested = !idea.interested">
                            <span>Interested</span>
                        </button> -->
                    </article>
                </section>
                <aside class="items-sidebar">
                    <p>Filter area</p>
                </aside>

                <article class="ideas-footer">
                    <p>Can't find what you're looking for? Create your own idea!</p>
                    <!-- <button type="button" >Create idea</button> -->
                    <router-link to="/create-idea" class="btn btn-primary">Create idea</router-link>
                </article>

            </div>
        </div>
    </LayoutMaster>
</template>

<script>
    import LayoutMaster from '../../components/common/layouts/layout-master.vue';
    import Hero from '../../components/common/global/hero.vue';
    export default {
        name: 'Ideas',
        components: {
            LayoutMaster,
            Hero
        },
        data() {
            return {
                title: 'Ideas!',
                tagline: 'Expressions of interest posted here',
                eventIdeas: [
                    {
                        id: 0,
                        title: 'The Divas',
                        hostId: '',
                        hostName: 'Dorothy123',
                        text: "Our motto is: 'Women getting on with life'",
                        interested: true,

                    },
                    {
                        id: 1,
                        title: 'Coffee chats in Kew',
                        hostId: '',
                        hostName: 'karen_007',
                        text: `I'm looking to socialise with like-minded coffee loving individuals`,
                        interested: false,
                    }
                ]
            }
        },
        // computed: {
        //     eventClasses: function() {
        //         return {
        //             interested: this.interested,
        //         }
        //     }
        // }
    }
</script>

<style lang="scss" scoped>
    @import './src/assets/scss/vue.scss';
    .idea-pod {
        @include spacer(1rem);
        .title {
            font-size: $font-size-base;
        }
        .host {
            font-size: $font-size-base*0.8;
            span {
                @include summaryHeading();
            }
        }
    }
    .ideas-footer {
        @include make-col-ready();
        @include make-col(12);
        text-align: center;
    }
    .interested {
        color: red;
    }
</style>
