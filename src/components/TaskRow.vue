<script setup>
import { ref } from 'vue';
import { useTaskStore } from "@/stores/taskStore.js";

const props = defineProps({
    task: Object
});

const taskStore = useTaskStore();
const { updateTask, updateComplete, deleteTask } = taskStore;

const taskEditText = ref("");
const taskEditing = ref(false);

const startEditing = (task) => {
    taskEditing.value = true;
    taskEditText.value = task;
};

const finishEditing = async (taskID) => {
    try {
        if (taskEditText.value.trim() !== '' && taskEditText.value !== props.task.title) {
            await updateTask(taskEditText.value, taskID);
        }
        cancelEditing()
    } catch (err) {
        console.error(err)
    }
};

const cancelEditing = () => {
    taskEditing.value = false;
};

async function markTask(complete, taskID) {
    let completeUpdate = !complete;
    await updateComplete(completeUpdate, taskID);
}

async function removeTask(taskID) {
    await deleteTask(taskID);
}

function formatDate(timestamp) {
    const date = new Date(timestamp);

    const year = date.getFullYear();
    const month = date.getMonth() + 1; // Months are zero-based, so adding 1
    const day = date.getDate();

    const formattedDate = `${day.toString().padStart(2, '0')}-${month.toString().padStart(2, '0')}-${year}`;

    return formattedDate;
}

</script>

<template>
    <li class="individual-task">
        <div class="task-header">
            <div class="task-title-container">
                <template v-if="!taskEditing">
                    <span :class="['task-title', task.is_complete ? 'strike-through' : '']">{{ task.title
                        }}</span>
                </template>
                <template v-else>
                    <input type="text" v-model="taskEditText" @keydown.enter="finishEditing(task.id)">
                </template>
            </div>
            <input type="checkbox" :checked="task.is_complete" @change="markTask(task.is_complete, task.id)"
                :id="task.id" class="styled-checkbox">
        </div>
        <div class="task-footer">
            <div class="task-date-container">
                <span class="task-date">{{ formatDate(task.inserted_at)
                    }}</span>
            </div>
            <div class="task-buttons-container">
                <template v-if="!taskEditing">
                    <button @click="startEditing(task.title)" class="task-edit-btn">
                        <img src="../components/icons/icons8-edit-1.svg" alt="">
                    </button>
                </template>
                <template v-else>
                    <button @click="cancelEditing" class="task-edit-btn task-cancel-edit-btn">
                        <img src="../components/icons/close-svgrepo-com.svg" alt="">
                    </button>
                    <button @click="finishEditing(task.id)" class="task-edit-btn task-finish-edit-btn">
                        <img src="../components/icons/icons8-done.svg" alt="">
                    </button>
                </template>
                <button @click="removeTask(task.id)" class="task-delete-btn"><img
                        src="../components/icons/icons8-delete-1.svg" alt="">
                </button>
            </div>
        </div>
    </li>
</template>


<style scoped>
.individual-task {
    min-height: 120px;
    margin: 15px 0;
    padding-bottom: 10px;
    width: 100%;
    border-radius: 20px;
    /* box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px; */
    border: 2px solid #44546f;
    box-shadow: 2px 6px 0px 0px rgba(0, 0, 0, 0.68);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

.task-header {
    min-height: 45px;
    /* border: 1px solid red; */
    border-radius: 20px 20px 0 0;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
}

.task-title-container {
    margin: 15px 10px 15px 12px;
    max-width: 80%;
}

.task-title {
    font-size: 1.5rem;
}

.strike-through {
    text-decoration: line-through;
}

.styled-checkbox {
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    width: 2rem;
    height: 2rem;
    border: 2px solid #44546F;
    border-radius: 3px;
    /* background-color: #1D6BF5; */
    transition: border-color 0.5s;
    vertical-align: middle;
    padding: 0;
    cursor: pointer;
    align-self: center;
    margin-right: 15px;
}

.styled-checkbox:checked::after {
    content: '\2713';
    position: absolute;
    left: 4px;
    top: 0px;
    font-size: 2rem;
    color: #47c96f;
    transition: border 0.8s ease-in;
}

.styled-checkbox:checked {
    border-color: #47c96f;
    background-color: #47c96f;
}

.styled-checkbox:hover {
    border-color: white;
}


.task-footer {
    display: flex;
    justify-content: space-between;
    align-items: end;
    margin: 0 8px 0 15px;
    /* border: 1px solid blue; */
}

.task-date-container {
    justify-self: start;
}

.task-edit-btn,
.task-delete-btn {
    /* background-color: var(--background-color); */
    background-color: inherit;
    border-bottom: var(--background-color) 2px solid;
    border-radius: 0;
    transition: border 0.8s ease-in;
    padding: 5px 5px 3px 5px;
}

.task-edit-btn:hover,
.task-delete-btn:hover {
    border-bottom: #1D6BF5 2px solid
}

.task-edit-btn img {
    height: 2.5rem;
}

.task-delete-btn img {
    height: 2.5rem;
}
</style>