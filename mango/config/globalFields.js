import fields from '@cms/1. build/fields'
let { PlainText, Select, Timestamp, Relationship } = fields

export default {

    title: PlainText({ required: true }),
    author: Relationship({ collection: 'member', single: true, computed: (doc, req) => [req?.member?.id] || [] }),
    editId: { computed: (doc, req) => req?.member?.id || null },
    created: { computed: doc => doc.created || new Date, type: 'Float' },
    updated: { computed: doc => doc.updated ? new Date : doc.created, type: 'Float' },
    slug: { computed: doc => doc?.title?.toLowerCase()?.trim()?.replace(/[^a-zA-Z0-9\s]/g, '')?.replace(/\s/g, '-') },
    startDate: Timestamp(),
    endDate: Timestamp(),

}
