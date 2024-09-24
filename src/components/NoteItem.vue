<script setup lang="ts">
import { ref, watch } from 'vue'
import type { INote } from '@/types/INote'

const { note } = defineProps<{
    note: INote
}>()

const emit = defineEmits<{
    (e: 'remove', note: INote): void
    (e: 'edit', note: INote): void
}>()

let editableText = ref<string>(note.text)
let isCompleted = ref<boolean>(note.completed)
let isEditing = ref<boolean>(false)

function startEditingHandler() {
    isEditing.value = true
}

function cancelEditingHandler() {
    isEditing.value = false
    editableText.value = note.text
}

function removeHandler() {
    emit('remove', note)
}

function editHandler() {
    emit('edit', {
        id: note.id,
        text: editableText.value,
        completed: isCompleted.value
    })
    isEditing.value = false
}

watch(isCompleted, () => {
    editHandler()
})
</script>

<template>
    <li class="list-group-item">
        <input type="checkbox" v-model="isCompleted" />
        <input v-if="isEditing" v-model="editableText" @keyup.enter="editHandler" class="edit-input" type="text" />
        <span v-else :class="{ done: note.completed, value: true }">{{ editableText }}</span>
        <div class="icons" v-if="isEditing">
            <button class="icons-item btn danger" @click="editHandler">
                <i class="fi fi-ss-check"></i>
            </button>
            <button class="icons-item btn danger" @click="cancelEditingHandler">
                <i class="fi fi-rr-cross-circle"></i>
            </button>
        </div>
        <div class="icons" v-else>
            <button class="icons-item btn danger" @click="startEditingHandler">
                <i class="fi fi-ss-pencil"></i>
            </button>
            <button class="icons-item btn danger" @click="removeHandler">
                <i class="fi fi-br-cross"></i>
            </button>
        </div>
    </li>
</template>

<style scoped></style>
