<script setup>
import { onMounted, ref } from 'vue';
import { useAuthStore } from "@/stores/userStore.js";
import { useTaskStore } from "@/stores/taskStore.js";

const {currentUser} = useAuthStore();
const {tasks, fetchAllTasks} = useTaskStore();

const user = ref(currentUser);
const taskName = ref("");
const taskList = ref(tasks);

onMounted(async () => {
	if (user.value !== null) {
		console.log(user.value);
		taskList.value = await fetchAllTasks(user.value.id);
	}
});

</script>

<template>
	<main>
		<h1>Logged In View!</h1>
		<p>User signed in: <samp>{{ user === null ? "null user" : user.id }}</samp></p>
		<div class="task-input">
			<div class="inputContainer">
				<label for="taskName"> New Task </label>
				<input type="string" id="taskName" v-model="taskName" @keydown.enter="addTask">
				<input type="checkbox">
				<button>Delete</button>
			</div>
			<div class="task-list-container">
				<ul class="list-task">
					<li v-for="(task, index) in taskList" :key="index">{{ task.title }} <input type="checkbox"
							:checked="task.is_complete"> <span>{{ task.inserted_at }}</span></li>
				</ul>
			</div>
		</div>
	</main>
</template>

<style scoped>
p {
	margin: 10px 0;
}
.inputContainer label, .inputContainer input, .inputContainer button {
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