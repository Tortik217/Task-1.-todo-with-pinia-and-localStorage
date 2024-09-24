<script setup lang="ts">
import { reactive, ref } from 'vue'
import type { INote } from '@/types/INote'
import NoteItem from '@/components/NoteItem.vue'
import { useNotesStore } from '@/stores/notes'

let newToDo = ref('')
const notesStore = useNotesStore()

function addNewItem() {
    if (newToDo.value !== '') {
        notesStore.addNew({
            id: Date.now(),
            text: newToDo.value,
            completed: false
        })
        newToDo.value = ''
    }
}

function removeNote(note: INote) {
    notesStore.deleteNoteById(note.id)
}

function editNote(note: INote) {
    notesStore.updateNoteById(note.id, note)
}
</script>

<template>
    <div class="container">
        <div class="container-inner">
            <div class="input-group mb-3">
                <input v-model="newToDo" @keyup.enter="addNewItem" type="text" class="form-control" placeholder="Write new task" />
                <button @click="addNewItem" class="btn btn-outline-secondary" type="button">Add</button>
            </div>
            <div class="list-item">
                <ul class="list-group" v-if="notesStore.notes.length !== 0">
                    <NoteItem v-for="note in notesStore.notes" :key="note.id" :note="note" @remove="removeNote" @edit="editNote" />
                </ul>
                <div class="alert alert-primary" role="alert" v-else>There are no tasks now!</div>
            </div>
        </div>
    </div>
</template>
