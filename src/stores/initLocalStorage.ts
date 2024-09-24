import { useNotesStore, saveNotesInLocalStorage } from '@/stores/notes'

export const InitLocalStorageForPinia = () => {
    useNotesStore().$subscribe((_mutation, state) => {
        saveNotesInLocalStorage(state.notes)
    })
}
