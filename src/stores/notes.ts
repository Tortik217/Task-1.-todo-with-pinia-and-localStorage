import { defineStore } from 'pinia'
import type { INote } from '@/types/INote'

interface INotesStore {
    notes: INote[]
}

const STORE_ID = 'notesStore'

export const saveNotesInLocalStorage = (notes: INote[]) => {
    try {
        localStorage.setItem(STORE_ID, JSON.stringify(notes))
    } catch (e) {
        console.error('saveInLocalStorage', e)
    }
}

export const loadNotesFromLocalStorage = (): INote[] => {
    try {
        return JSON.parse(localStorage.getItem(STORE_ID)!) ?? []
    } catch (e) {
        console.error('loadFromLocalStorage', e)
        return []
    }
}

export const useNotesStore = defineStore(STORE_ID, {
    state(): INotesStore {
        return {
            notes: loadNotesFromLocalStorage() ?? []
        }
    },
    actions: {
        addNew(note: INote) {
            this.notes.push(note)
        },
        deleteNoteById(id: number) {
            const deletingIndex = this.notes.findIndex((n) => n.id === id)
            this.notes.splice(deletingIndex, 1)
        },
        updateNoteById(updatingId: number, note: INote) {
            const updatingIndex = this.notes.findIndex((n) => n.id === updatingId)
            this.notes[updatingIndex] = note
        }
    }
})
