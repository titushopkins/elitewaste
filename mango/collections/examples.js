/*
    This is an example collection. It will inherit its name
    from the filename for the plural of this collection type
    (examples)

    The singular should be defined on the root of the export
    or it will be declared as `singularExamples` by default.

    There should also be a `fields` attribute on the root
    which contains all of the fields in the collection.
    Custom fields can be imported directly, and default fields
    can be imported from the CMS.
*/

import fields from '@fields'
let { Relationship, Image } = fields

export default {
    permissions: {
        public: ['create', 'read', 'update', 'delete'],
    },
    singular: 'example',
    fields: {
        someData: String,
        anotherField: 'Int',
        anArrayOfInts: ['Int'],
        image: Image({ width: 500 }),
        /* Relationships require that you specify the singular form
        of the collection that you're relating to */
        exampleRelationship: Relationship({ collection: 'example' }),
        /* This is an example of a `complexField`, just think of it
        as a nested object structured the same way as a collection
        with the `fields` attribute. */
        someLegitData: {
            fields: {
                coordinates: {
                    x: 'Int',
                    y: 'Int'
                }
            }
        },
        /* There are also some sweet things like computed fields.
        There are some cool caching options for computed fields you
        can lookup in the docs */
        productOfXY: {
            computed: doc => doc.someLegitData?.coordinates?.x * doc.someLegitData?.coordinates?.y
        },
        /* Sometimes you might want to store a different type of data
        than you're taking in. There are some cool field options to help
        with this */
        vimeo: {
            inputType: 'Int',
            fields: {
                id: 'Int',
                url: 'String'
            },
            translateInput: input => ({ id: input, url: `https://vimeo.com/${input}` })
        }
    }
}
