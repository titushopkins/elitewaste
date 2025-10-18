export default {
    test: {
        async get(req) {
            return `Mango is online! 🥭`
        }
    },
    contact: {
        admin: {
            async post(req) {
                return `You hit /contact/admin with a post request`
            }
        },
        editor: {
            async get(req) {
                return `You hit /contact/editor with a get request`
            }
        }
    },
}
