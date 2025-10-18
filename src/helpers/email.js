import Swal from "sweetalert2"
import axios from "axios"

function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email.trim()).toLowerCase());
}

async function subscribeToMailChimp({ email, list, source, alert }) {

    let lists = {
        master: '816047355d',
        devotional: '5fbac827f8'
    }

    let listId = lists[list]

    if (!listId) return console.error(`"${list}" is not a valid email list`)
    if (!source) return console.error(`You must provide a subscription source`)

    if (!validateEmail(email)) {
        new Swal('Invalid Email', `"${email}" is not a valid email address`, 'warning')
        return console.error(`"${email}" is not a valid email address`)
    }

    try {
        await axios.post(`https://churchandfamilylife.us2.list-manage.com/subscribe/post?u=12eae89c5f8969e490844c75a&id=${listId}`, { EMAIL: email, MMERGE3: source })
            .then(response => { if (alert) new Swal('Subscribed!', 'Thank you for subscribing.', 'success') })
            // MC apparently doesn't give a proper error message we can read at the time of writing this...
            .catch(response => { if (alert) new Swal('Subscribed!', 'Thank you for subscribing.', 'success') })
    } catch (e) {
        console.log(e)
    }
}

export { subscribeToMailChimp, validateEmail }
