import { reactive } from 'vue'

const toggle = () => {
    console.log('toggle')
    if (darkMode.enabled) {
        window.localStorage.setItem('darkMode', 'false')
    } else {
        window.localStorage.setItem('darkMode', 'true')
    }
    checkDarkMode()

}

const darkMode = reactive({ enabled: false, toggle })

const systemChange = () => {
    window.localStorage.removeItem('darkMode')
    darkMode.enabled = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
}

const checkDarkMode = () => {
    let storedValue = window.localStorage.getItem('darkMode')
    let enabledLocally = storedValue != null
    let localBoolean = storedValue == 'true' ? true : false
    let systemPreference = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
    darkMode.enabled = enabledLocally ? localBoolean : systemPreference
}

const useDarkMode = () => {

    checkDarkMode()
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', systemChange)

    return { darkMode }

}

export default useDarkMode
