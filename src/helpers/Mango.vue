<template>
	<div v-infinite-scroll="loadMore">
		<slot :data="data" :loading="loading" :loadingPage="loadingPage" :totalResults="totalResults" :save="save" :saving="saving" />
	</div>
</template>

<script setup>
import Mango from './mango'
import { siteName } from '@mango/config/settings.json'
import { ref, watch, computed, nextTick, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'

const props = defineProps({
    collection: {type: String},
    algoliaSearch: {type: String},
    algoliaFilters: {type: String},
    id: {type: String},
    query: {type: Object},
    graphql: {type: String},
    debounce: {type: Number, default: 500},
    infinite: {type: Boolean, default: false},
    suspend: {type: Boolean, default: false},
    disabled: {type: Boolean, default: false},
    main: {type: Boolean, default: false},
    globalSearch: {type: Boolean, default: false},
    subscribe: {type: Boolean, default: false},
})

/*
    If I comment this out, some things are fixed and others are broken...
*/
// onBeforeRouteLeave((to, from) => {
//     console.log('to, from', to.matched?.[0]?.components?.default?.name, from.matched?.[0]?.components?.default?.name)
//     let sameComponent = to.matched?.[0]?.components?.default?.name == from.matched?.[0]?.components?.default?.name
//     console.log('sameComponent', sameComponent)
//     if (!sameComponent) active.value = false
//     else active.value = true
// })

const emit = defineEmits(['update:data','update:loading'])

let webSocket

// const router = useRouter()
const route = useRoute()

let active = ref(true)
let autoPage = ref(null)
let loadingPage = ref(false)
let noneRemain = ref(false)
let saving = ref(false)
let inferedCollection = ref(props.collection || props.query?.collection || route.path.split('/')?.[1] || null)

let loading = ref(false)
let data = ref(null)
let error = ref(null)
let totalResults = ref(null)
let oldQuery = JSON.stringify(props.query || {})

let inferedId = computed(() => props.id !== undefined ? props.id : props.query?.id || route?.params?.id || null )
let searchingAlgolia = computed(() => !!props.algoliaSearch || !!props.algoliaFilters )

let debounceInit = computed(() => {
    let timer;
    return (...args) => {
        if (active.value === false || props.disabled) return
        loading.value = true
        clearTimeout(timer);
        timer = setTimeout(() => { init.apply(this, args); }, props.debounce);
    };
})

watch(() => props.query, (n, o) => {
    let newQuery = JSON.stringify(n)
    if (oldQuery != newQuery) defer(newQuery, oldQuery, 'query')
}, { deep: true })

watch(inferedId, (n, o) => defer(null, null, 'id'))
watch(() => props.collection, (n, o) => defer(null, null, 'collection'))
watch(() => props.algoliaSearch, (n, o) => searchingAlgolia.value ? debounceInit.value() : init())
watch(() => props.algoliaFilters, (n, o) => searchingAlgolia.value ? debounceInit.value() : init())
watch(loading, (n, o) => emit('update:loading', loading.value))
watch(data, () => {
    if (data?.value?.length && props.query?.limit && data?.value?.length < props.query?.limit) noneRemain.value = true
    if (data?.value) emit('update:data', data.value)
})


function defer(n,o,origin) {
    console.log('n,o,origin', n,o,origin)
    if (n == o && origin == 'query') return console.log(`they're the same...`)
    if (origin == 'query') oldQuery = n
    nextTick(() => debounceInit.value())
}

async function loadMore() {

    // console.log('loadMore')

    if (!props.infinite || !data?.value?.length || loadingPage.value || noneRemain.value || props.disabled) return
    loadingPage.value = true
    emit('update:loadingPage', true)
    let query = props.query ? JSON.parse(JSON.stringify(props.query)) : {}
    if (query.search && !query.search?.wordSearch) delete query.search.wordSearch
    autoPage.value ++
    query.page = autoPage.value
    if (searchingAlgolia.value) {
        var nextPage = (await Mango[inferedCollection.value].search(props.algoliaSearch, query, props.algoliaFilters))?.hits
    } else if (inferedCollection.value?.includes('/')) {
        var nextPage = await Mango.relationRequest({...query, path: inferedCollection.value})
    } else {
        var nextPage = await Mango[inferedCollection.value](query)
    }
    if (nextPage.length) data.value = data.value.concat(nextPage)
    if (!nextPage.length || (query.limit && nextPage.length < query.limit)) noneRemain.value = true
    loadingPage.value = false
    emit('update:loadingPage', false)

}

async function init() {

    console.log('init')

    // If the main entry is provided in ssr
    if (props.main && window.mainEntry?.id == inferedId.value) {
        data.value = window.mainEntry
        window.mainEntry = null
        emit('update:data', data.value)
        return
    }

    if (active.value === false || props.disabled) return

    console.log('active', active.value)

    loading.value = true
    data.value = null
    noneRemain.value = false
    autoPage.value = props.query?.page || 0

    // Using the computed here won't work because it hasn't been computed yet
    let searchingAlgolia = !!props.algoliaSearch || !!props.algoliaFilters

    if (props.graphql){
        data.value = await Mango.graphql(props.graphql)
        emit('update:data', data.value)
        loading.value = false
        return
    }

    let collection = inferedCollection.value
    let validatedCollection = Mango.collections.find(c => c.name == collection)
    let id = props.id || props.query?.id || route?.params?.id || null
    if (props.id !== undefined) id = props.id // So you can pass null to id and get a list

    let query = props.query ? JSON.parse(JSON.stringify(props.query)) : {}
    if (query.search && !query.search?.wordSearch) delete query.search.wordSearch // So empty search still returns something

    if (inferedCollection.value?.includes('/')) {
        data.value = await Mango.relationRequest({...query, path: inferedCollection.value})
        emit('update:data', data.value)
        loading.value = false
        return
    }

    // Global Algolia Search
    if (props.globalSearch) {
        data.value = await Mango.search(props.algoliaSearch, query, props.algoliaFilters)
        emit('update:data', data.value)
        loading.value = false
        return
    }

    if (!validatedCollection) return console.error(`🥭 ${collection} is not a valid collection.`)
    if (id && !searchingAlgolia) collection = validatedCollection.singular
    // if (id) query = id

    console.log('collection, id:', collection, id)
    // console.log('collection', collection)

    if (searchingAlgolia) {
        console.log('collection', collection)
        let algoliaResponse = await Mango[collection].search(props.algoliaSearch, query, props.algoliaFilters)
        data.value = algoliaResponse.hits
        totalResults.value = algoliaResponse.nbHits
        emit('update:data', data.value)
        loading.value = false
    } else {
        if (id) data.value = await Mango[collection](id, query)
        else data.value = await Mango[collection](query)

        emit('update:data', data.value)
        loading.value = false

        if (id && props.main) document.title = data.value?.title || siteName
        else document.title = siteName

        if (props.subscribe) {

            let sub = function() {
                let subscribeCollection = `${validatedCollection.singular}Change`
                console.log('subscribeCollection', subscribeCollection)
                subscribe(subscribeCollection, id)
            }

            sub()

            let hidden;
            let visibilityChange;
            if (typeof document.hidden !== "undefined") { // Opera 12.10 and Firefox 18 and later support
                hidden = "hidden";
                visibilityChange = "visibilitychange";
            } else if (typeof document.msHidden !== "undefined") {
                hidden = "msHidden";
                visibilityChange = "msvisibilitychange";
            } else if (typeof document.webkitHidden !== "undefined") {
                hidden = "webkitHidden";
                visibilityChange = "webkitvisibilitychange";
            }

            document.addEventListener(visibilityChange, () => {
                if (!document[hidden]) {
                    // Ensure connectivity
                    console.log('ensure connectivity')
                    init()
                }

                // else {
                //     if (webSocket?.send) {
                //         webSocket.send(JSON.stringify({
                //             type: GQL.CONNECTION_TERMINATE
                //         }))
                //     }
                //     webSocket = null
                // }
            }, false)

        }


        return
    }

}

// init()
// await init()

if (props.suspend) {
    await init()
} else {
    init()
}
</script>

<script>
export default {
    directives: {
        infiniteScroll: {
            mounted(element, binding) {
                const getScrollParent = (node) => {
                    while (node && node !== document.body) {
                        const overflowY = window.getComputedStyle(node).overflowY;
                        if (overflowY === 'auto' || overflowY === 'scroll') {
                            return node;
                        }
                        node = node.parentElement;
                    }
                    return window; // Default to window if no scrollable parent is found
                };

                const scrollParent = getScrollParent(element);

                const handleScroll = () => {
                    const rect = element.getBoundingClientRect();
                    if (rect.bottom - 100 <= window.innerHeight) {
                        binding.value();
                    }
                };

                element._infiniteScrollHandler = handleScroll;
                element._scrollParent = scrollParent;

                scrollParent.addEventListener("scroll", handleScroll);
                window.addEventListener("resize", handleScroll); // Handle viewport resize
            },
            unmounted(element) {
                if (element._scrollParent) {
                    element._scrollParent.removeEventListener("scroll", element._infiniteScrollHandler);
                }
                window.removeEventListener("resize", element._infiniteScrollHandler);
                delete element._infiniteScrollHandler;
                delete element._scrollParent;
            }
        }
    },
	watch: {
        // id: 'defer',
        // inferedId: 'oldDefer',
        // collection: 'oldDefer',
		// query: {
		// 	handler(n, o) {
        //         let oldQuery = JSON.stringify(o)
        //         let newQuery = JSON.stringify(n)
        //         if (oldQuery != newQuery) console.log(`but they're not the same!`)
        //         this.defer(newQuery, oldQuery, 'query')
        //     },
		// 	deep: true,
		// },
		// algoliaSearch() {
		// 	if (this.searchingAlgolia) this.debounceInit()
		// 	else this.init()
		// },
		// data() {
		// 	if (this.data?.length && this.query?.limit && this.data?.length < this.query?.limit) {
		// 		this.noneRemain = true
		// 	}
        //     if (this.data) this.$emit('update:data', this.data)
		// }
	},
	computed: {
		// searchingAlgolia() {return !!this.algoliaSearch},
		// inferedId() { return this.id !== undefined ? this.id : this.query?.id || this.$route.params?.id || null },
		// debounceInit() {
		// 	let timer;
		// 	return (...args) => {
		// 		this.loading = true
		// 		clearTimeout(timer);
		// 		timer = setTimeout(() => { this.init.apply(this, args); }, this.debounce);
		// 	};
		// }
	},
	methods: {
		// async loadMore() {

        //     console.log('loadMore')

		// 	if (!this.infinite || !this.data?.length || this.loadingPage || this.noneRemain) return
		// 	this.loadingPage = true
		// 	let query = this.query ? JSON.parse(JSON.stringify(this.query)) : {}
        //     if (query.search && !query.search?.wordSearch) delete query.search.wordSearch
		// 	this.autoPage ++
		// 	query.page = this.autoPage
		// 	if (this.searchingAlgolia) {
		// 		var nextPage = await Mango[this.inferedCollection].search(this.algoliaSearch, query)
		// 	} else {
		// 		var nextPage = await Mango[this.inferedCollection](query)
		// 	}
		// 	if (nextPage.length) this.data = this.data.concat(nextPage)
		// 	if (!nextPage.length || (query.limit && nextPage.length < query.limit)) this.noneRemain = true
		// 	this.loadingPage = false

		// },
        // oldDefer(n,o,origin) {
        //     console.log('n,o,origin', n,o,origin)
        //     if (n == o) { console.log(`they're the same...`); return }
        //     this.$nextTick(() => this.init())
        // },
        async save(data) {
            data = data || this.data
            if (Array.isArray(data)) {
                console.log('You can only call save after querying for an individual document.')
                return
            } else {
                if (this.saving) return
                this.saving = true
                let response = await Mango[this.inferedCollection].save(data)
                this.saving = false
                // if (response?.id) return Swal.fire({ title: 'Success!', icon: 'success', confirmButtonText: 'Awesome!' })
                // return Swal.fire({ title: 'Error 😬', icon: 'error' })
            }
        }
	},
    activated() { this.active = true },
    beforeRouteUpdate() {
        console.log('beforeRouteUpdate')
        this.active = false
    },
    deactivated() { this.active = false },
}
</script>
