import { localStorageStore } from 'fractils'
import { writable } from 'svelte/store'

//system
export const tutorial_done = localStorageStore('tutorial_done', false)
export const segments = localStorageStore('segments', [])

//study
export const study_id = localStorageStore('study_id', 0)
export const current_order = localStorageStore('current_order', 0)
export const study_order = localStorageStore('study_order', [])

export const card_front = localStorageStore('card_front', "")
export const card_back = localStorageStore('card_back', [])
export const card_color = localStorageStore('card_color', "")
export const card_image = writable("")

export const card_evidence = localStorageStore('card_evidence', "")
export const card_citation = localStorageStore('card_citation', "")

export const segment = localStorageStore('segment', "")

export const fileDir = localStorageStore('file_dir', "")

export const customization_input_who = localStorageStore('customization_input_who', "")
export const customization_input_what = localStorageStore('customization_input_what', "")

export const card_title = localStorageStore('card_title', "")
export const card_description = localStorageStore('card_description', "")
export const card_summary = localStorageStore('card_summary', [])

export const card_third = localStorageStore('card_third', [])

export const tooltip_data = localStorageStore('tooltip_data', {})
export const disclaimer_open = localStorageStore('disclaimer_open', false)

//save

export const basic = localStorageStore('basic', [])

export const custom = localStorageStore('custom', [])
export const custom_who = localStorageStore('custom_who', [])
export const custom_what = localStorageStore('custom_what', [])
export const custom_tooltip_data = localStorageStore('custom_tooltip_data', [])
export const custom_design_stage = localStorageStore('custom_design_stage', [])
