<template>
    <LayoutMaster>
        <hero>
            <template slot="title">
                {{ post.title }}
            </template>
        </hero>
        <ArticleTemplate>
            {{ post.date }}
            <template slot="author">{{ post.author }}</template>
            <template slot="date">{{ post.date }}</template>
            <template slot="intro">{{ post.intro }}</template>
            <template slot="body">
                <p v-html="post.body"></p>
            </template>
        </ArticleTemplate>
    </LayoutMaster>
</template>

<script>
    import LayoutMaster from '../../components/common/layouts/layout-master.vue';
    import Hero from '../../components/common/global/hero.vue';
    import ArticleTemplate from '../../components/common/layouts/ArticleTemplate.vue';
    export default {
        name: 'AccessibilityEntitlements',
        components: {
            LayoutMaster,
            Hero,
            ArticleTemplate
        },
        data() {
            return {
                post: {
                    title: 'Accessibility Entitlements',
                    date: `Thursday, 31st January 2019`,
                    author: 'Guide Dogs Victoria',
                    intro: 'The Companion Card is issued to people with a significant, permanent disability',
                    body: `<h3>Companion Card</h3>
                    <p>The Companion Card is issued to people with a significant, permanent disability, who can demonstrate that they are unable
                    to access most community activities and venues without
                    attendant care support. Participating organisations will issue
                    the cardholder with a second ticket for their companion at no
                    charge. Examples of participating organisations are
                    entertainment companies and venues, sporting, theatres and
                    public transport.</p>
                    <p><strong>Phone: </strong>1800 650 611</p>
                    <p><strong>Website: </strong><a href="http://www.companioncard.org.au/">www.companioncard.org.au</a></p>
                    <h3>Australian Disabilty Parking Scheme</h3>
                    <p>Permit holders can park in parking spaces showing the
                    international symbol of access and can receive concessions in
                    most public parking spaces where the sign or meter shows
                    specific time limits. All enquiries about permit applications, cost,
                    eligibility and use should be directed to VicRoads.</p>
                    <p><strong>Website: </strong><a href="https://www.vicroads.vic.gov.au/safety-and-road-rules/road-rules/disability-parking">www.vicroads.vic.gov.au/safety-and-road-rules/road-rules/disability-parking</a></p>
                    <h3>Multi-Purpose Taxi Program</h3>
                    <p>The MPTP assists with the travel needs of people with severe and permanent disabilities by offering subsidized taxi fares of up to $60 per trip. The MPTP subsidy pays for 50% of your fare up to a maximum of $60 per trip. Your fare may include a $1 per trip levy. It may be charged as a separate item, or the Booking Service Provider may incorporate it into your fare. This
                    will be covered by your subsidy. You will need to pay for the cost of any road tolls, airport fee/s and Silver Service. They are
                    not included in the subsidy</p>
                    <p>As at January 2018, the NDIA and Victorian Government are finalising how transport support will be provided and it is recommended the website is visited for current information regarding this subsidy.</p>
                    <p><strong>Website: </strong><a href="https://cpv.vic.gov.au/passengers/mptp">cpv.vic.gov.au/passengers/mptp</a></p>`
                }
            }
        }
    }
</script>

<style lang="css">
</style>
