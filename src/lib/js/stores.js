import { createLocalStore } from './create_local_store.js';

export const active_heading = createLocalStore('active_heading', {});

export const page_offset = createLocalStore('page_offset', {});

export const selectedSort = createLocalStore('selectedSort', 'Newest');

export const active_tracker = createLocalStore('active_tracker', false);

export const toggle_sticky = createLocalStore('toggle_sticky', false);