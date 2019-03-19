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
                    title: 'Becoming a participant of the National Disability Insurance Scheme.',
                    date: `Sunday, 17th March 2019`,
                    author: 'Guide Dogs Victoria',
                    intro: `Find out if you're elidgable for the National Disability Insurance Scheme...`,
                    body: `<h3>Am I Eligible?</h3>
                    <p>To become a participant of the National Disability Insurance Scheme, you must meet the following eligibility criteria:</p>
                    <ul><li>Have a permanent impairment that significantly affects your ability to take part in everyday activities, or have a develpmental delay;</li>
                    <li>Be aged less than 65 when you first apply to enter the NDIS and meet additional age requirements if you live in SA or TAS;</li>
                    <li>Live in Australia in an NDIS area on a specified date;</li>
                    <li>Be an Australian citizen or hold a permanent visa or a Protected Special Category visa.</li></ul>
                    <h3>What constitutes Blindness for the purposes of the NDIS?</h3>
                    <p>According to the National Disability Insurance Agency, for someone to be considered eligible for the scheme based on vision loss they must be permanently blind in both eyes. This must be diagnosed and assessed by an ophthalmologist as follows:</p>
                    <ul><li>Corrected visual acuity (extent to which an object can be brought into focus) on the Snellen Scale must be less than or equal to 6/60 in both eyes; or</li>
                    <li>Constriction to within 10 degrees or less of arc of central fixation in the better eye, irrespective of corrected visual acuity (i.e. visual fields are reduced to a measured arc of 10 degrees or less); or</li>
                    <li>A combination of visual defects resulting in the same degree of vision impairment as that occurring in the above points. (An optometrist report is not sufficient for NDIS purposes).</li></ul>
                    <p>To be considered eligible based on Deaf blindness, the diagnosis must be confirmed by ophthalmologist and audiologist and assessed as resulting in permanent and severe to total impairment of visual function and hearing.</p>
                    <h3>Becoming a participant</h3>
                    <p>If you meet the above criteria, you can contact the National Disability Insurance Agency and request an Access Request Form (ARF). They can post you a paper copy or you can pick one up from your local office.</p>
                    <p>If you are already receiving state government funded services, such as assistance with cleaning and grocery shopping, you may automatically transition into the National Disability Insurance Scheme when it becomes available in your area. If this is the case, you will receive a letter from the National Disability Insurance Agency if this is going to happen and you will not be required to complete the Access Request Form. In some cases, however, you may be asked to provide additional proof of blindness or vision impairment. You can do this by obtaining a report from your Ophthalmologist, or by completing the form the National Disability Insurance Agency will send you.</p>
                    <h3>Completing the Access Request Form</h3>
                    <p>The Access Request Form asks a series of questions about you, your personal details and your disability. You can complete most of the form yourself or ask a trusted person to assist you. If you do not have someone who can assist you, you can contact your Local Area Coordinator and they will be able to provide support to complete the form. You will need to provide evidence of your vision impairment and any other disabilities in the form of medical reports or, by having your medical specialist complete section F of the Access Request Form. Once complete, you can return the form via post or by handing it in at your local office. If you are sending medical reports, ensure these are copies as they will not be returned to you.</p>
                    <h3>Now What?</h3>
                    <p>The National Access Team for the National Disability Insurance Agency will review your Access Request Form, if you are made eligible for the scheme a Local Area Coordinator or Planner will contact you directly to arrange a planning meeting. This process may take several weeks.</p>
                    <h3>What if I’m not considered eligible</h3>
                    <p>If you are not made eligible to the scheme but think you should be, you can ask for this decision to be reviewed by the National Disability Insurance Agency. To do this, you can</p>
                    <ul><li>Complete a Request for a Review of an Internal Decision form (See our fact sheet on this topic for further instructions)</li>
                    <li>Call the National Disability Insurance agency on 1800 800 110 and make the request over the phone</li>
                    <li>Send an email to <a href="mailto:enquiries@ndis.gov.au">enquiries@ndis.gov.au</a>, stating you would like the decision to be reviewed</li>
                    <li>Send a letter to the National Disability Insurance Agency GPO Box 700 Canberra 2601 stating you would like the decision to be reviewed</li></ul>
                    <p>You will need to explain why you believe you meet the eligibility criteria listed above and may need to provide additional or more recent medical evidence.</p>
                    <p>A staff member from the National Disability Insurance Agency who was not involved in making the original decision about your eligibility will review your request, they will consider any information you have already provided and any additional information.</p>
                    <p>If you do not meet the eligibility criteria for the National Disability Insurance Scheme you can contact St Vincent De Paul’s Ability Links and they may be able to assist you to locate suitable supports within your local community.</p>`,
                }
            }
        }
    }
</script>
