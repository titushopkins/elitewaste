const express = require('express');
const fs = require('fs')
const axios = require('axios')
const settings = require('../../config/config/settings.json')
const collections = require('../../config/config/.collections.json')

let port = 1337
let metaComment = '<!-- Inject Meta -->'
let appPlaceholder = '<!--SSR-->'

let serve = async function (req, res) {

    // Cookies
    let cookies
    const { headers: { cookie } } = req;
    if (cookie) {
        const values = cookie.split(';').reduce((res, item) => {
            const data = item.trim().split('=');
            return { ...res, [data[0]]: data[1] };
        }, {});
        cookies = values;
    }

    // User Data Injection
    let index = fs.readFileSync('./index.html', 'utf8')
    let authorization = cookies?.Authorization
    if (authorization) {

        let hash = authorization.split(':')[0]
        let userId = authorization.split(':')[1]
        let user = (await axios.get(`http://localhost:${settings.port}/members?search={"password.hash": "${hash}", "id": "${userId}"}`, { headers: { 'Authorization': authorization } }))
        user = user?.data?.response?.[0]
        if (user) index = index.replace('window.user = null;', `window.user = ${JSON.stringify(user)};`)

    }

    // Define the collection and ID
    let collection = req.path.split('/')[1]
    let id = req.path.split('/')[2] ? req.path.split('/')[2] : null

    console.log('collection', collection)
    console.log('id', id)

    let entry = (await axios.get(`http://localhost:${settings.port}/${collection}/${id}`))?.data?.response

    console.log('entry', entry)

    if (!entry) return res.send(index)

    // Main Content Injection
    try { index = index.replace('window.mainEntry = null;', `window.mainEntry = ${JSON.stringify(entry)};`) }
    catch (e) { console.log(e) }

    return res.send(index)

}

const app = express()

app.get(["/index.html", "/"], serve);
app.use(express.static('./'))
app.get('/*', serve)

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
