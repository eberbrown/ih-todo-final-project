<script setup>
import { onMounted, ref, computed } from 'vue';
import { useAuthStore } from "@/stores/userStore.js";
import { useTaskStore } from "@/stores/taskStore.js";

const { currentUser, seeCurrentUser } = useAuthStore();
const { tasks, fetchAllTasks, insertTask, updateTask, updateComplete, deleteTask } = useTaskStore();

const user = ref(currentUser);
const taskName = ref("");
const taskList = ref(tasks);

onMounted(async () => {
	user.value = await seeCurrentUser();
	taskList.value = await fetchAllTasks(user.value.id);
});

async function addTask() {
	await insertTask(user.value.id, taskName.value);
	taskList.value = await fetchAllTasks(user.value.id);
	taskName.value = "";
}

async function editTask(taskID) {
	await updateTask(taskName.value, taskID);
	taskList.value = await fetchAllTasks(user.value.id);
	taskName.value = "";
}

async function markTask(complete, taskID) {
	let completeUpdate = !complete;
	await updateComplete(completeUpdate, taskID);
	taskList.value = await fetchAllTasks(user.value.id);
}

const sortTasks = computed(() => {
	const sortedTasks = [...taskList.value];

	sortedTasks.sort((x, y) => {
		return x.is_complete - y.is_complete
	});

	return sortedTasks.sort((x, y) => {
		return x.inserted_at - y.inserted_at
	})
});

async function removeTask(taskID) {
	await deleteTask(taskID);
	taskList.value = await fetchAllTasks(user.value.id);
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
						<span>{{ task.inserted_at }}</span>
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