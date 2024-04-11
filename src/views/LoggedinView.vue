<script setup>
import { onMounted, ref, computed } from 'vue';
import { useAuthStore } from "@/stores/userStore.js";
import { useTaskStore } from "@/stores/taskStore.js";
import { storeToRefs } from 'pinia';

const userStore = useAuthStore();
const { currentUser } = storeToRefs(userStore);
//const { seeCurrentUserStore } = useAuthStore();

const taskStore = useTaskStore();
const { tasks } = storeToRefs(taskStore);
const { fetchAllTasks, insertTask, updateTask, updateComplete, deleteTask } = taskStore;

const user = ref(currentUser);
const taskName = ref("");
const taskList = ref(tasks);

onMounted(async () => {
	//user.value = await seeCurrentUserStore();
	await fetchAllTasks();
});

async function addTask() {
	await insertTask(user.value.id, taskName.value);
	taskName.value = "";
}

async function editTask(taskID) {
	await updateTask(taskName.value, taskID);
	taskName.value = "";
}

async function markTask(complete, taskID) {
	let completeUpdate = !complete;
	await updateComplete(completeUpdate, taskID);
}

async function removeTask(taskID) {
	await deleteTask(taskID);
}

const sortTasks = computed(() => {
	const sortedTasks = [...taskList.value];

	sortedTasks.sort((x, y) => {
		return x.is_complete - y.is_complete
	});

	return sortedTasks.sort((x, y) => {
		return new Date(x.inserted_at) - Date(y.inserted_at)
	})
});

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
	<main class="loggedin-view-container">
		<h1>Logged In View!</h1>
		<p>User signed in: <samp>{{ user === null ? "null user" : user.email }}</samp></p>
		<div class="task-input">
			<div class="inputContainer">
				<label for="taskName"> New Task </label>
				<input type="string" id="taskName" v-model="taskName" @keydown.enter="addTask">
				<input type="checkbox">
			</div>
			<div class="task-list-container">
				<ul class="list-task">
					<li v-for="task in sortTasks" :key="task.id" class="individual-task">
						<div class="task-header">
							<input type="checkbox" :checked="task.is_complete" @change="markTask(task.is_complete, task.id)"
							:id="task.id" class="task-complete-input styled-checkbox">
						</div>
						<div class="task-title-container"><span class="task-title">{{ task.title }} </span></div>

						<div class="task-footer">
							<!-- <input type="checkbox" :checked="task.is_complete" @change="markTask(task.is_complete, task.id)"
							:id="task.id" class="task-complete-input styled-checkbox"> -->

						<span class="task-date">{{ formatDate(task.inserted_at) }}</span>
						<button @click="editTask(task.id)" class="task-edit-btn">Edit</button>
						<button @click="removeTask(task.id)" class="task-delete-btn">Delete</button>
						</div>
						
					</li>
				</ul>
			</div>

		</div>
	</main>
</template>

<style scoped>
.loggedin-view-container {
	width: 100%;
	border: 1px solid red;
}

p {
	margin: 10px 0;
}

.inputContainer label,
.inputContainer input,
.inputContainer button {
	margin: 0 10px;
}

.task-input {
	width: 100%;
	/* display: inline; */
	border: 1px solid blue;
}

.list-task {
	list-style: none;
	padding: 0;
	margin: 20px 0;
	border: 1px solid green;
}

.individual-task {
	min-height: 150px;
	margin: 10px 0;
	width: 100%;
	border: 1px solid violet;
	border-radius: 20px;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
}

.task-header {
	min-height: 35px;
	background-color: #47c96f;
	border-radius: 20px 20px 0 0;
	display: flex;
	justify-content: end;
}

.styled-checkbox {
    appearance: none; 
    -webkit-appearance: none; 
    -moz-appearance: none; 
    width: 2rem; 
    height: 2rem;
    border: 2px solid #ccc; 
    border-radius: 3px; 
	background-color: #ccc;
    transition: border-color 0.3s; 
	vertical-align: middle;
	padding: 0;
	cursor: pointer;
	align-self: center;
	margin-right: 10px;
}

.styled-checkbox:checked::after {
    content: '\2713'; 
    position: absolute;
    left: 4px;
    top: 0px;
    font-size: 2rem;
    color: #47c96f; 
}

.styled-checkbox:checked {
    border-color: #47c96f;
	background-color: #1DF564;
}

.styled-checkbox:hover {
	border-color: #1DF564;
}

.task-title-container {
	/* margin: 5px 0 5px 5px; */
	margin: 0px 0 0px 5px;
}

.task-title {
	font-size: 1.5rem;
}

.task-footer {
	display: flex;
	justify-content: end;
	align-items: end;
	margin: 0 0 0 5px;
}

.task-date {
	justify-self: start;
}


</style>