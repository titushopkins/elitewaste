<template>
    <div class="w-full p-8 flex items-center">
        <slot
            :logout="logout"
            :login="login"
            :createAccount="createAccount"
            :sendRecoveryEmail="sendRecoveryEmail"
            :resetPassword="resetPassword"
        >
            <form @submit.stop.prevent class="rounded-lg flex flex-col space-y-4 w-full">

                <template v-if="creatingAccount">
                    <div class="text-2xl">Create an Account</div>
                    <div class="text-sm text-gray-500">The first account you create is automatically made an admin account.</div>

                    <div class="flex gap-4 w-full">
                        <input type="text" v-model.trim="user.firstName" placeholder="First Name" />
                        <input type="text" v-model.trim="user.lastName" placeholder="Last Name" />
                    </div>

                    <input type="email" v-model.trim="user.email" placeholder="Email" />
                    <input type="password" v-model.trim="user.password" placeholder="Password" autocomplete="new-password" />

                    <!-- <div><input type="text" v-model="user.address.address" placeholder="Address" /></div>
                    <div class="space-x-4 flex">
                        <input type="text" v-model="user.address.zip" placeholder="Zip Code" @input="extractZip" />
                    </div>
                    <div class="space-x-4 flex">
                        <input type="text" v-model="user.address.city" placeholder="City" />
                        <input type="text" v-model="user.address.state" placeholder="State" />
                    </div> -->
                </template>

                <template v-else>
                    <div class="text-2xl">Mango Login</div>
                    <input type="email" v-model.trim="user.email" placeholder="Email" />
                    <input type="password" v-model.trim="user.password" placeholder="Password" autocomplete="current-password" />
                </template>

                <button @click="action" class="px-3 py-2 bg-orange-500 dark:bg-orange-500/80 dark:text-white/75 text-white rounded flex justify-center">
                    <template v-if="!processing">{{ buttonText }}</template>
                    <Spinner v-else class="border-t-family-at-church-orange w-4 h-4 my-1" :small="true" color="border-t-white/50" />
                </button>

                <button v-if="store.user?.member?.id" @click="logout" class="text-xs text-gray-400 hover:underline">Logout</button>

                <div class="text-center select-none" >
                    <button v-if="!creatingAccount"     @click="creatingAccount = true; guest = false; forgotPassword = false" class="text-xs text-gray-400 hover:underline">Create Account</button>
                    <button v-if="creatingAccount || resettingPassword"      @click="creatingAccount = false; guest = false; forgotPassword = false" class="text-xs text-gray-400 hover:underline" :class="{'ml-2 pl-2 border-l dark:border-gray-500': resettingPassword}">{{ resettingPassword || (allowGuest && !guest) ? 'Login' : 'Have an account? Login instead.' }}</button>
                    <button v-if="allowGuest && !guest" @click="creatingAccount = true; guest = true; forgotPassword = false" class="text-xs text-gray-400 hover:underline ml-2 pl-2 border-l dark:border-gray-500">Continue as Guest</button>
                    <button v-if="!creatingAccount && !resettingPassword"     @click="creatingAccount = false; guest = false; forgotPassword = true" class="text-xs text-gray-400 hover:underline ml-2 pl-2 border-l dark:border-gray-500">Forgot Password?</button>
                </div>
            </form>
        </slot>
    </div>
</template>

<script>
import Swal from 'sweetalert2'
import { validateEmail } from '../../helpers/email'
import { getUser } from '../../helpers/user'

// Function for setting cookies
let setCookie = function (cname, cvalue) {
    var d = new Date();
    d.setTime(d.getTime() + (365 * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

export default {
    inject: ['store','axios'],
    data() {
        return {
            user: {
                email: null,
                password: null,
                firstName: null,
                lastName: null,
                // address: {
                //     name: null,
                //     address: null,
                //     city: null,
                //     state: null,
                //     zip: null,
                // },
            },
            processing: false,
            creatingAccount: true,
            guest: false,
            forgotPassword: false,
        }
    },
    watch: {
        loggedIn() {
            this.$emit('hide')
        }
    },
    methods: {
        validateEmail,
        async login() {
            this.processing = true
            let member = (await this.$mango.login({ email: this.user.email, password: this.user.password }))

            if (member?.memberId) {
                if (member.roles?.includes('admin')) member.admin = true

                window.localStorage.setItem('user', member.memberId)
                window.localStorage.setItem('token', member.token)
                window.localStorage.setItem('email', this.user.email)

                setCookie(`Authorization`, `${member.token}`)
                this.axios.defaults.headers.common['Authorization'] = `${member.token}`

                const user = await getUser()
                this.store.user = user
                if (user?.company?.id) this.store.theme = user.company

                this.$emit('loggedIn')

                let restrictedPath = this.store?.login?.next || '/'
                if (restrictedPath) this.$router.push(restrictedPath)

                this.$emit('hide')
            } else if (member?.invalidFields) {
                Swal.fire({ title: `Invalid ${member.invalidFields.join(', ')}`, icon: 'error' })
            }

            this.processing = false
        },
        logout() {
            this.store.user = {}
            window.user = null
            window.localStorage.removeItem('user')
            setCookie(`Authorization`, ``)
            delete this.axios.defaults.headers.common['Authorization']
            this.$emit('loggedOut')
            this.$emit('hide')
            this.$router.push('/login')
        },
		async createAccount() {
			if (!this.validateEmail(this.user.email)) return Swal.fire('Email must be a valid email.')
			if (this.user.password.length < 6 && !this.guest) return Swal.fire('Password must be at least 6 characters.')
			this.processing = true

			var data = {
				...this.user,
                title: `${this.user.firstName} ${this.user.lastName || ''}`.trim()
			}

			let response = await this.$mango.members.save(data)
            if (!response.id) {
                Swal.fire('Account Exists', response, 'info')
            } else {
                await this.login()
            }
            this.$emit('accountCreated')
            this.$emit('hide')
            this.processing = false
        },
		async sendRecoveryEmail () {
			this.processing = true
			let response = await this.axios.post(`${this.store.api}/controllers/account/sendResetInstructions`, {email: this.user.email, forgot: true})
            if (response.data.success) Swal.fire('Success!', `Recovery instructions sent to: ${this.user.email}`, 'success')
            else Swal.fire('Invalid Email!', `The following user does not exist: ${this.user.email}`, 'warning')
            this.$emit('emailSent')
            this.$emit('hide')
            this.processing = false
		},
		async resetPassword () {
            if (this.user.password.length < 6) return Swal.fire('Password must be at least 6 characters.')
			this.processing = true

            let data = {
                email: this.$route.query.email,
                salt: this.$route.query.salt,
                password: this.user.password,
            }

			let response = await this.axios.post(`${this.store.api}/controllers/account/resetPassword`, data)
            if (response.data.success) {
                this.user.email = this.$route.query.email
                await this.login()
                this.$router.push({query: null})
                swal('Success!', 'Your password has been reset.', 'success')
            } else {
                swal('Invalid Link!', `The link you're using is invalid.`, 'error')
            }

            this.processing = false
            this.$emit('passwordReset')
            this.$emit('hide')
		},
    },
    computed: {
        guestPassword() { return Math.random().toString(36).substr(2)+Math.random().toString(36).substr(2) },
        labelText() { return this.resettingPassword ? 'Reset Password' : this.forgotPassword ? 'Recover Password' : this.creatingAccount ? this.guest ? 'Continue as Guest' : 'Create Account' : 'Login' },
        buttonText() { return this.resettingPassword ? 'Update Password' : this.forgotPassword ? 'Send Recovery Email' : this.creatingAccount ? this.guest ? 'Continue' : 'Create' : 'Login' },
        action() { return this.resettingPassword ? this.resetPassword : this.forgotPassword ? this.sendRecoveryEmail : this.creatingAccount ? this.createAccount : this.login },
        resettingPassword() { return !!this.$route.query?.salt },
        loggedIn() { return !!this.store.user?.id }
    }
}
</script>


<style lang="postcss" scoped>
input {
    @apply border rounded outline-blue-400 px-3 py-2 w-full dark:bg-transparent dark:border-gray-600 dark:placeholder-gray-600
}
</style>
