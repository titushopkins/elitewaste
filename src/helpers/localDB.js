import axios from "axios"
import Mango from "./mango"
import Swal from "sweetalert2"

// Function for setting cookies
let setCookie = function (cname, cvalue) {
    var d = new Date();
    d.setTime(d.getTime() + (365 * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function timeout(ms) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            reject(new Error(`Timeout after ${ms} ms`));
        }, ms);
    });
}

async function runWithTimeout(callback, ms) {
    try {
        let response = await Promise.race([
            callback(),
            timeout(ms)
        ]);
        console.log('timeout', response)
        return response;
    } catch (error) {
        console.error(error.message);
    }
}

export default class LocalDB {

    constructor(collection, api) {

        this.collection = collection

        this.getDb()

        this.ready = false
        this.db = null
        this.loading = false
        this.saving = false
        this.deleting = false
        this.entry = null
        this.entries = null

        this.api = api

    }

    async getDb() {

        let request = window.indexedDB.open(this.collection, 1);

        request.onerror = e => {
            this.ready = false
            console.error('Error opening db', e);
        };

        request.onsuccess = e => {
            this.db = e.target.result
            this.ready = true
        };

        request.onupgradeneeded = e => {
            console.log('onupgradeneeded');
            this.db = e.target.result;
            let objectStore = this.db.createObjectStore(this.collection, { autoIncrement: true, keyPath: 'id' });
        };

    }

    async save(entry, syncing) {

        if (!this.ready) return

        this.saving = true;

        let entryExists = !!entry.id
        let onlyLocal = !isNaN(entry?.id) || !entryExists

        let existingEntry

        if (onlyLocal && entryExists) {
            entry.id = Number(entry.id)
            existingEntry = await this.get(entry.id)
        } else if (entryExists) {
            try {
                existingEntry = await this.get(entry.id)
            } catch {
                // console.log('must just be in cloud')
            }
        }

        return await new Promise(async (resolve, reject) => {

            let trans = this.db.transaction([this.collection], 'readwrite');
            let store = trans.objectStore(this.collection);

            if (existingEntry) entry = { ...existingEntry, ...entry }

            // Remove Vue Proxy stuff so indexedDB is happy
            let savedImage = entry.image
            delete entry.image
            entry = JSON.parse(JSON.stringify(entry))
            if (!syncing) entry.updatedLocally = new Date()

            // Format Address for offline
            // if (!entry.address?.id && entry.address?.formatted) entry.address = entry.address.formatted

            // Handle images
            if (savedImage?.type?.includes?.('image')) entry.image = savedImage
            if (savedImage?.includes?.('http')) entry.image = savedImage


            let method = entryExists ? 'put' : 'add'
            let request = store[method](entry)

            request.onsuccess = async () => {
                this.saving = false
                let localId = request.result

                if (window?.offlineMode) return resolve({ ...entry, id: localId })

                // If it only exists in the localDB, remove the ID for Mango
                if (onlyLocal) delete entry.id

                try {

                    // Try to upload the image
                    if (entry?.image?.type?.includes?.('image')) {
                        await runWithTimeout(async () => {
                            console.log('upload')
                            const formData = new FormData()
                            formData.append('file', entry.image)
                            const response = await axios.post(`${this.api}/upload`, formData)
                            console.log('upload response:', response)
                            const path = response?.data?.paths?.[0]
                            const url = `${this.api}${path}`
                            entry.image = url
                        }, 10 * 1000)
                    }

                    // Save to the cloud - this will throw if offline)

                    // If the entry is over a day old...
                    let olderThanOneDay = new Date(entry?.updatedLocally || '1/1/2024') < new Date(new Date().getTime() - 24 * 60 * 60 * 1000)
                    if (onlyLocal && olderThanOneDay) await this.delete(localId)

                    delete entry.updatedLocally

                    // Save to Mango (timeout if already created, else no timeout)
                    let response
                    if (onlyLocal) {
                        let { response: mangoResponse, warnings } = await Mango[this.collection].save(entry, null, true)
                        if (warnings?.length) Swal.fire('WARNING:', warnings?.join(', '), 'warning')
                        console.log('mangoResponse', mangoResponse)
                        response = mangoResponse
                    }
                    else response = await runWithTimeout(async () => await Mango[this.collection].save(entry), 5000)

                    // If successfull, delete from local queue
                    if (response?.id) {
                        await this.delete(localId)
                        resolve(response);
                    } else {
                        console.log('response', response)

                        // Unauthorized
                        if (typeof response == 'string' && response?.includes?.('not have permission')) {
                            // Logout if credentials are bad
                            window.localStorage.removeItem('user')
                            window.localStorage.removeItem('token')
                            window.localStorage.removeItem('email')
                            window.localStorage.removeItem('auth')
                            setCookie(`Authorization`, ``)
                            window.location.reload()
                        }

                        console.log(response, onlyLocal);
                        resolve({ ...entry, id: localId });
                    }

                } catch (e) {
                    console.log(e.message)
                    resolve({ ...entry, id: localId });
                }
            };

            request.onerror = (e) => {
                this.saving = false
                reject(e);
            };

        });

    }

    async get(id) {

        if (!this.ready) return

        this.loading = true;

        return await new Promise((resolve, reject) => {
            let trans = this.db.transaction([this.collection], 'readonly');
            let store = trans.objectStore(this.collection);
            let request = store.get(id);

            request.onsuccess = () => {
                this.loading = false;
                resolve(request.result);
            };

            request.onerror = (e) => {
                this.loading = false;
                reject(e);
            };
        });

    }

    async getEntries({ pageIndex = 0, pageSize = 1000 } = {}) {

        if (!this.ready) return []

        this.loading = true;

        let response = await new Promise((resolve, reject) => {
            let trans = this.db.transaction([this.collection], 'readonly');
            let store = trans.objectStore(this.collection);
            let cursorRequest = store.openCursor();

            let entries = [];
            let skippedEntries = pageIndex * pageSize;

            cursorRequest.onsuccess = (e) => {
                let cursor = e.target.result;
                if (cursor) {
                    if (skippedEntries > 0) {
                        // Skip the entries before the current page
                        cursor.advance(skippedEntries);
                        skippedEntries = 0;
                    } else {
                        entries.push(cursor.value);
                        if (entries.length < pageSize) {
                            cursor.continue();
                        } else {
                            resolve(entries);
                        }
                    }
                } else {
                    // No more entries to read; resolve with what we have
                    resolve(entries);
                }
            };

            cursorRequest.onerror = (e) => {
                reject(e);
            };
        });

        // console.log('response', response);
        this.loading = false;
        return response;
    }

    async delete(id) {

        this.deleting = true;

        return new Promise((resolve, reject) => {

            let trans = this.db.transaction([this.collection], 'readwrite');
            let store = trans.objectStore(this.collection);
            let request = store.delete(id);

            request.onsuccess = () => {
                this.deleting = false
                resolve(request.result);
            };

            request.onerror = (e) => {
                this.deleting = false
                reject(e);
            };

        });
    }

}
