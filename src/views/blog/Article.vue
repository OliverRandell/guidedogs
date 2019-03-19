<template lang="html">
    <LayoutMaster>
        <hero>
            <template slot="title">
                {{ post.title }}
            </template>
            <template slot="description">
                {{ tagline }}
            </template>
        </hero>
        <div class="container">

            <div class="pg-content" role="article" tabindex="-1">
                <section class="item-wrapper">
                    <article class="col-12">
                        <p><strong>Author:</strong>{{ post.author }}</p>
                        <time><strong>Date published:</strong>{{ post.date }}</time>
                        <div class="text-container intro" v-html="post.intro" />
                        <div class="text-container" v-html="post.body" />
                    </article>
                </section>
            </div>
        </div>
    </LayoutMaster>
</template>

<script>
    import LayoutMaster from '../../components/common/layouts/layout-master.vue';
    import Hero from '../../components/common/global/hero.vue';
    export default {
        name: 'Information',
        components : {
            LayoutMaster,
            Hero
        },
        data () {
            return {
                post: {
                    //title: 'This is the title',
                    id: this.$route.params.id,
                    title: 'Financial Entitlements',
                    intro: `People who are blind or have low vision may be eligible for a range of
benefits.`,
                    body: `<h3>Disability Support Pension (Blind)</h3>
                    <p>The Disability Support Pension (Blind) is a payment issued by Centrelink to
                    men aged 16 to 65 years and women aged 16 to 60 – 65 years (depending
                    on birthdate) who are legally blind. This pension is free of income and
                    asset testing and is not taxable. In some circumstances pensioners who
                    are blind or have low vision continue to receive this payment beyond 65
                    years of age.</p>
                    <h3>Age Pension (Blind)</h3>
                    <p>The Age Pension (Blind) is a payment issued by Centrelink to men and
                    women of pensionable age who are legally blind. This pension is free of
                    income and asset testing, but may be subject to taxation.</p>
                    <h3>Mobility Allowance</h3>
                    <p>The Mobility Allowance is a payment issued by Centrelink to people over
                    16 years of age, who spend at least eight hours per week in employment
                    (paid or voluntary), vocational training, secondary education or job seeking
                    and who cannot use public transport without substantial assistance. This
                    payment is not means tested.</p>
                    <h3>Carer Payment and Carer Allowance</h3>
                    <p>Carer Payment and Carer Allowance payments are made by Centrelink to
                    people who provide a high level of personal care and supervision. These
                    payments may be made to carers of both adults and children.</p>
                    <h3>Department of Veterans' Affairs - Card Holders</h3>
                    <p>Following assessment, the Department of Veterans’ Affairs may be able to
                    assist its clients with the purchase of adaptive equipment or low vision aids.
                    Gold Card Holders are generally eligible for assistance, while White Card
                    Holders may be eligible if vision loss is acknowledged by the Department
                    as a war caused disability.</p>
                    <h3>Pensioner Education Supplement</h3>
                    <p>This fortnightly Centrelink supplement helps students, who are already
                    receiving a Centrelink payment, with additional ongoing study costs. To be
                    eligible, a person must be enrolled in an approved secondary or tertiary
                    course, and undertaking at least 25% of the course’s normal full time study
                    load. A lump sum Education Entry payment is also provided upon
                    commencement of an approved course.</p>`,
                }
            }
        },
        created() {
            this.$http.get('https://jsonplaceholder.typicode.com/posts/' + this.id).then(function(data) {
                console.log(data);
                this.blog = data.body;
            });
        }
    }
</script>

<style lang="scss" scoped>
</style>
