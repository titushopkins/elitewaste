import { ref } from 'vue'
import { mango } from 'mango-cms'

const getUser = async (user) => {

    user = user || { value: {} }

    if (window.user?.id) {

        console.log('got it!')
        user.value = window.user

        /*
        Gotta clear this out so next time
        we try to call getUser we don't get
        stale data. ;)
        */
        window.user = null
        return user.value
    }

    let userId = window.localStorage.getItem('user')

    if (!userId) return {}

    user.value = await mango.member(userId, { depthLimit: 0 }).then(r => user.value = r)

    return user.value

}

const initUser = () => {

    const user = ref({})
    getUser(user)
    return user

}

export { initUser, getUser }
