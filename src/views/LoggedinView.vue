<script setup>
import { onMounted, ref, computed } from 'vue';
import { useAuthStore } from "@/stores/userStore.js";
import { useTaskStore } from "@/stores/taskStore.js";
import { storeToRefs } from 'pinia';

const userStore = useAuthStore();
const { currentUser } = storeToRefs(userStore);
const { seeCurrentUser } = useAuthStore();

const taskStore = useTaskStore();
const { tasks } = storeToRefs(taskStore);
const { fetchAllTasks, insertTask, updateTask, updateComplete, deleteTask } = taskStore;

const user = ref(currentUser);
const taskName = ref("");
const taskList = ref(tasks);


onMounted(async () => {
	user.value = await seeCurrentUser();
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
	<main>
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
					<li v-for="task in sortTasks" :key="task.id">
						<span>{{ task.title }} </span>
						<input type="checkbox" :checked="task.is_complete" @change="markTask(task.is_complete, task.id)"
							:id="task.id">
						<span>{{ formatDate(task.inserted_at) }}</span>
						<button @click="editTask(task.id)">Edit</button>
						<button @click="removeTask(task.id)">Delete</button>
					</li>
				</ul>
			</div>
		</div>
	</main>
</template>

<style scoped>
p {
	margin: 10px 0;
}

.inputContainer label,
.inputContainer input,
.inputContainer button {
	margin: 0 10px;
}

.list-task {
	list-style: none;
	padding: 0;
	margin: 20px 0;
}

.list-task li {
	margin: 10px 0;
}
</style>