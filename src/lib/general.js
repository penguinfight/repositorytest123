import { writable } from "svelte/store";

export const activeCountry = writable(null);
export const activeRiver = writable(null);
export const activeCity = writable(null);
export const next_r = writable("");
export const next_c = writable("");
export const next_ct = writable("");
export const activeMap = writable(null);
export const next = writable(null);
