import { writable } from 'svelte/store';
//import { persisted } from 'svelte-local-storage-store'
// First param `eventsTodayStore` is the local storage key.
// Second param is the initial value.
//export const allEventsStore = persisted('allEventsStore', [])
//export const nowShowingStore = persisted('nowShowingStore', [])
export const allEventsStore = writable([])
export const nowShowingStore = writable([])
export const showFeedback = writable(false)
export const emergencyData = writable({})
export const emergencyStatus = writable([])
