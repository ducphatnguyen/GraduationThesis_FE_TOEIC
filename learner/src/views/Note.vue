<template>
    <div class="row d-flex justify-content-start">
        <div class="col-lg-2 col-md-2 col-sm-2 m-3" v-for="note in notes" :key="note.noteId">
            <Form @submit="createNote" :validation-schema="noteFormSchema" enctype="multipart/form-data">
                <div class="card mb-3 border border-3 border-success">
                    <div class="card-header text-bg-light fw-bolder">
                        <template v-if="!note.editMode"><i class="fa-solid fa-user-pen me-2 text-warning"></i>{{ note.title
                        }}</template>
                        <template v-else>
                            <Field name="title" v-model="noteLocal.title" class="form-control" placeholder="Enter title" />
                            <ErrorMessage name="title" class="error-feedback" />
                        </template>
                    </div>
                    <div class="card-body">
                        <template v-if="!note.editMode">{{ note.content }}</template>
                        <template v-else>
                            <Field name="content" v-model="noteLocal.content" as="textarea" class="form-control" rows="3"
                                placeholder="Enter content" />
                            <ErrorMessage name="content" class="error-feedback" />
                        </template>
                    </div>

                    <div class="card-footer text-end">
                        <button v-if="!note.editMode" type="button" class="btn btn-white border-0"
                            @click="toggleEditMode(note)">
                            <i class="fas fa-edit" style="color: rgb(192, 129, 13)"></i>
                        </button>
                        <template v-else>
                            <button type="button" class="btn btn-white border-0 me-2" @click="toggleEditMode(note)">
                                <i class="fas fa-times" style="color: red"></i> Cancel
                            </button>
                            <button type="button" class="btn btn-white border-0" @click="updateNote(note)">
                                <i class="fas fa-save" style="color: rgb(13, 192, 58)"></i> Save
                            </button>
                        </template>
                    </div>
                </div>
            </Form>
        </div>
    </div>
</template>
  

<script>
import { defineComponent, ref, onMounted, reactive } from "vue";

import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css'
import VueJwtDecode from "vue-jwt-decode";
import NoteService from "@/services/note.service";

import * as yup from "yup";
import { Form, Field, ErrorMessage } from "vee-validate";

export default defineComponent({
    components: {
        Form,
        Field,
        ErrorMessage,
    },
    setup() {
        const userId = ref(null);
        const getUserId = async () => {
            try {
                const learnerToken = localStorage.getItem("learnerToken");
                const decoded = VueJwtDecode.decode(learnerToken);
                userId.value = decoded.id;
                console.log(userId.value);
            } catch (error) {
                console.log(error);
            }
        };

        const noteFormSchema = yup.object().shape({
            title: yup.string().required("Tiêu đề phải có giá trị."),
            content: yup.string().required("Nội dung phải có giá trị."),
        });

        const noteLocal = reactive({});

        const notes = ref([]);
        const getAllNotesByUserId = async () => {
            try {
                notes.value = await NoteService.getAllNotesByUserId(userId.value);
                console.log(notes.value);
            } catch (error) {
                console.log(error);
            }
        };

        const toggleEditMode = (note) => {
            note.editMode = !note.editMode;
            if (note.editMode) {
                noteLocal.title = note.title;
                noteLocal.content = note.content;
                noteLocal.noteId = note.noteId;
            }
        };

        const cancelEdit = (note) => {
            note.editMode = false;
            noteLocal.title = "";
            noteLocal.content = "";
        };

        const updateNote = async (note) => {
            try {
                const data = {
                    title: noteLocal.title,
                    content: noteLocal.content,
                };
                console.log(noteLocal.noteId)

                await NoteService.update(noteLocal.noteId, data);

                noteLocal.title = "";
                noteLocal.content = "";

                getAllNotesByUserId();

                toast.success('Cập nhật thành công', {
                    autoClose: 1000,
                });
            } catch (error) {
                console.log(error);
                toast.error('Cập nhật thất bại', {
                    autoClose: 1000,
                });
            }
        };

        onMounted(async () => {
            await getUserId();
            getAllNotesByUserId();
        });

        return {
            noteLocal,
            noteFormSchema,
            notes,
            toggleEditMode,
            cancelEdit,
            updateNote
        };
    },
});
</script>

<style>
label {
    font-weight: 600;
    font-size: 14px;
    color: rgb(44, 44, 44);
}

.error-feedback {
    color: red;
    font-size: 13px;
}

.required-field {
    color: red;
    font-size: 14px;
    margin-left: 4px;
}

#bottom-left-button {
    position: fixed;
    bottom: 0;
    left: 0;
    margin: 10px;
}
</style>