import {writable} from 'svelte/store'
import { localStorageStore } from '@skeletonlabs/skeleton';

export const active_heading = writable({})

export const selectedSort = localStorageStore('selectedSort', 'Newest');