import { persisted } from 'svelte-local-storage-store'

// First param `eventsTodayStore` is the local storage key.
// Second param is the initial value.
export const allEventsStore = persisted('allEventsStore', [])
export const nowShowingStore = persisted('nowShowingStore', [])
