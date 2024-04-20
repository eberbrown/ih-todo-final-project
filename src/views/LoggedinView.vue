<script setup>
import { onMounted, ref, computed } from 'vue';
import { useAuthStore } from "@/stores/userStore.js";
import { useTaskStore } from "@/stores/taskStore.js";
import { storeToRefs } from 'pinia';

const userStore = useAuthStore();
const { currentUser } = storeToRefs(userStore);
const { seeCurrentUserStore } = useAuthStore();

const taskStore = useTaskStore();
const { tasks } = storeToRefs(taskStore);
const { fetchAllTasks, insertTask, updateTask, updateComplete, deleteTask } = taskStore;

const taskName = ref("");
const taskList = ref(tasks);
const taskFilter = ref('all');

onMounted(async () => {
	await seeCurrentUserStore();
	await fetchAllTasks();
});

async function addTask() {
	await insertTask(currentUser.value.id, taskName.value);
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

const showCompleted = () => {
	taskFilter.value = "completed";
}

const showInProgress = () => {
	taskFilter.value = "inProgress";
}

const sortTasks = computed(() => {
	const sortedTasks = [...taskList.value];

	sortedTasks.sort((x, y) => {
		const dateX = new Date(x.inserted_at);
		const dateY = new Date(y.inserted_at);
		return dateY - dateX;
	});

	if (taskFilter.value === 'completed') {
		return sortedTasks.filter(task => task.is_complete);
	} else if (taskFilter.value === 'inProgress') {
		return sortedTasks.filter(task => !task.is_complete);
	} else {
		return sortedTasks.sort((x, y) => {
			return x.is_complete - y.is_complete
		});
	}
});

const completedTaskCount = computed(() => {
	return taskList.value.filter(task => task.is_complete).length;
})

const incompletedTaskCount = computed(() => {
	return taskList.value.filter(task => !task.is_complete).length;
})

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
		<div class="user-info-container">
			<div class="user-info-sub-container">
				<div class="user-avatar-container">
					<img src="../components/icons/gamer.png" alt="user avatar image" class="user-avatar">
				</div>
				<div class="user-name-container">
					<p>Hi, <span>{{ currentUser === null ? "null user" : currentUser.user_metadata.first_name }}</span>
						<span>&#128075;</span>
					</p>
					<p>Your day starts here!</p>
				</div>
			</div>
			<div class="user-tasks-overview-container">
				<p>
					<img src="../components/icons/in-progress-svgrepo-com-2.svg" alt="icon for incomplete tasks"
						style='max-height:15px;'>: <span>{{ incompletedTaskCount }}</span>
				</p>
				<p>
					<img src="../components/icons/complete-svgrepo-com-2.svg" alt="icon for complete tasks"
						style='max-height:15px;'>: <span>{{ completedTaskCount }}</span>
				</p>
			</div>
		</div>
		<div class="inputContainer">
			<input type="string" id="taskName" v-model="taskName" @keydown.enter="addTask" placeholder="Add New Task">
			<button class="add-task-btn" @click="addTask">
				<img src="../components/icons/icons8-plus-240.svg" alt="">
			</button>
		</div>
		<div class="toggle-list-btns-container">
			<button @click="showInProgress" class="toggle-list-btn-inprogress">
				<img src="../components/icons/in-progress-svgrepo-com-1.svg" alt="icon for incomplete tasks">
				<span>In
					Progress</span>
			</button>
			<button @click="showCompleted" class="toggle-list-btn-completed">
				<img src="../components/icons/complete-svgrepo-com.svg" alt="icon for complete tasks">
				<span>Completed</span>
			</button>
		</div>
		<div class="task-list-container">
			<ul class="list-task">
				<li v-for="task in sortTasks" :key="task.id" class="individual-task">
					<div class="task-header">
						<div class="task-title-container">
							<span :class="['task-title', task.is_complete ? 'strike-through' : '']">{{ task.title }}
							</span>
						</div>
						<input type="checkbox" :checked="task.is_complete" @change="markTask(task.is_complete, task.id)"
							:id="task.id" class="styled-checkbox">
					</div>
					<div class="task-footer">
						<div class="task-date-container"><span class="task-date">{{ formatDate(task.inserted_at)
								}}</span></div>
						<div class="task-buttons-container"><button @click="editTask(task.id)" class="task-edit-btn">
								<img src="../components/icons/icons8-edit-1.svg" alt=""></button>
							<button @click="removeTask(task.id)" class="task-delete-btn"><img
									src="../components/icons/icons8-delete-1.svg" alt=""></button>
						</div>
					</div>
				</li>
			</ul>
		</div>
	</main>

	<!-- <a href="https://www.flaticon.com/free-icons/girl" title="girl icons">Girl icons created by Freepik - Flaticon</a> -->
</template>

<style scoped>
.loggedin-view-container {
	width: 100%;
	/* border: 1px solid red; */
}

.user-info-container {
	display: flex;
	align-items: center;
	justify-content: space-between;
	margin: 10px 0px;
}

.user-info-sub-container {
	display: flex;
	/* align-items: center; */
}

.user-avatar {
	max-height: 60px;
	margin-right: 10px;
}

.user-name-container p:first-child,
.user-name-container p:first-child span {
	font-weight: bold;
	font-size: 2.2rem;
}

.user-name-container p:last-child {
	font-size: 1.05rem;
	color: #44546F;
}

.user-tasks-overview-container {
	display: flex;
	padding: 15px 15px;
	border-radius: 7px;
	background-color: rgb(233, 233, 233);
}

.user-tasks-overview-container p {
	font-size: 1.3rem;
	display: flex;
	align-items: center;
	justify-content: center;
	/* border: 1px solid red; */
}

.user-tasks-overview-container p:first-child {
	margin-right: 10px;
}

.user-tasks-overview-container p span {
	font-size: 1.3rem;
	margin-left: 2px;
}

.inputContainer {
	display: flex;
	width: 100%;
	/* border: 1px solid blue; */
}

.inputContainer button {
	margin-left: 10px;
}

#taskName {
	width: 100%;
	border-radius: 3px;
}

.add-task-btn {
	padding: 0px 10px;
	margin-right: 0;
}

.add-task-btn img {
	max-height: 30px;
}

.toggle-list-btns-container {
	display: flex;
	width: 100%;
	margin-top: 20px;
	/* border: 1px solid red; */
}

.toggle-list-btns-container button {
	padding: 20px 20px;
	border-radius: 15px;
}

.toggle-list-btn-inprogress,
.toggle-list-btn-completed {
	display: flex;
	align-items: center;
	width: 50%;
}

.toggle-list-btns-container span {
	font-size: 1.3rem;
	font-weight: 600;
	letter-spacing: 0.2px;
}

.toggle-list-btn-completed {
	background-color: #47C96F;
}

.toggle-list-btn-inprogress img {
	height: 30px;
	margin-right: 10px;
}

.toggle-list-btn-completed img {
	height: 26px;
	margin-top: 2px;
	margin-right: 10px;
}

.list-task {
	list-style: none;
	padding: 0;
	margin: 20px 0;
	/* border: 1px solid green; */
}

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
	background-color: var(--background-color);
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