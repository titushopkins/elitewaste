import { readEntries, updateEntry } from "@cms/1. build/libraries/mongo"

export default {
    fields: {
        firstName: String,
        lastName: String,
    },
    families: {
        contributors: { singular: 'contributor' },
        editors: { singular: 'editor' },
    },
    hooks: {
        async created({ document }) {

            let members = await readEntries({ collection: 'members' })
            if (members.length == 1 && members[0].id == document.id) {

                document.roles = ['admin']
                document.authorId = document.id
                document.author = document.id

                await updateEntry({
                    collection: 'members',
                    document: {
                        roles: ['admin'],
                        author: [document.id],
                        authorId: document.id
                    },
                    search: { id: document.id }
                })
            }

        }
    }
}
