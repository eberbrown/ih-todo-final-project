<script setup>
import { onMounted, ref, computed } from 'vue';
import { useAuthStore } from "@/stores/userStore.js";
import { useTaskStore } from "@/stores/taskStore.js";
import { storeToRefs } from 'pinia';
import TaskRow from "@/components/TaskRow.vue";
import { useRouter } from 'vue-router'

const router = useRouter()

const userStore = useAuthStore();
const { currentUser } = storeToRefs(userStore);
const { seeCurrentUserStore } = useAuthStore();

const taskStore = useTaskStore();
const { tasks } = storeToRefs(taskStore);
const { fetchAllTasks, insertTask } = taskStore;

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

const showCompleted = () => {
	taskFilter.value = "completed";
}

const showInProgress = () => {
	taskFilter.value = "inprogress";
}

const showBacklog = () => {
	taskFilter.value = "backlog";
}

const showAllTasks = () => {
	taskFilter.value = "all";
}

const sortTasks = computed(() => {
	const sortedTasks = [...taskList.value];

	sortedTasks.sort((x, y) => {
		const dateX = new Date(x.inserted_at);
		const dateY = new Date(y.inserted_at);
		return dateY - dateX;
	});

	if (taskFilter.value === 'completed') {
		return sortedTasks.filter(task => task.status === "completed");
	} else if (taskFilter.value === 'inprogress') {
		return sortedTasks.filter(task => task.status === "inprogress");
	} else if (taskFilter.value === 'backlog') {
		return sortedTasks.filter(task => task.status === "backlog");
	} else {
		return sortedTasks.sort((task1, task2) => {
			const statusOrder = { "backlog": 1, "inprogress": 2, "completed": 3 };
			const statusOrderTask1 = statusOrder[task1.status];
			const statusOrderTask2 = statusOrder[task2.status];

			if (statusOrderTask1 !== statusOrderTask2) {
				return statusOrderTask1 - statusOrderTask2;
			} else {
				const dateX = new Date(task1.inserted_at);
				const dateY = new Date(task2.inserted_at);
				return dateY - dateX;
			}
		});
	}
});

const completedTaskCount = computed(() => {
	return taskList.value.filter(task => task.status === "completed").length;
})

const inprogressTaskCount = computed(() => {
	return taskList.value.filter(task => task.status === "inprogress").length;
});

const backlogTaskCount = computed(() => {
	return taskList.value.filter(task => task.status === "backlog").length;
});

const showProfile = () => {
	router.push('/profile')
};

</script>

<template>
	<main class="loggedin-view-container">
		<div class="user-info-container">
			<div class="user-info-sub-container" @click="showProfile">
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
					<img src="../components/icons/backlog-svgrepo-com-2.svg" alt="icon for incomplete tasks"
						style='max-height:15px;'>: <span>{{ backlogTaskCount }}</span>
				</p>
				<p>
					<img src="../components/icons/in-progress-svgrepo-com-2.svg" alt="icon for incomplete tasks"
						style='max-height:15px;'>: <span>{{ inprogressTaskCount }}</span>
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
			<button @click="showBacklog" class="toggle-list-btn-backlog">
				<img src="../components/icons/backlog-svgrepo-com.svg" alt="icon for incomplete tasks">
				<span>Backlog</span>
			</button>
			<button @click="showInProgress" class="toggle-list-btn-inprogress">
				<img src="../components/icons/in-progress-svgrepo-com-1.svg" alt="icon for incomplete tasks">
				<span>In Progress</span>
			</button>
			<button @click="showCompleted" class="toggle-list-btn-completed">
				<img src="../components/icons/complete-svgrepo-com.svg" alt="icon for complete tasks">
				<span>Completed</span>
			</button>
		</div>
		<div class="task-list-container">
			<ul class="list-task">
				<TaskRow v-for="task in sortTasks" :key="task.id" :task="task">
				</TaskRow>
			</ul>
			<button @click="showAllTasks" class="show-all-tasks-btn">Show all tasks</button>
		</div>
	</main>

	<!-- <a href="https://www.flaticon.com/free-icons/girl" title="girl icons">Girl icons created by Freepik - Flaticon</a> -->
</template>

<style scoped>
.loggedin-view-container {
	width: 100%;
	margin-top: 20px;
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
}

.user-avatar {
	max-height: 60px;
	margin-right: 10px;
	cursor: pointer;
}

.user-name-container p:first-child,
.user-name-container p:first-child span {
	font-weight: bold;
	font-size: 2.2rem;
	cursor: pointer;
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

.user-tasks-overview-container p:last-child {
	margin-left: 10px;
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
.toggle-list-btn-completed,
.toggle-list-btn-backlog {
	display: flex;
	align-items: center;
	justify-content: center;
	width: 33.33%;
}

.toggle-list-btns-container span {
	font-size: 1.3rem;
	font-weight: 600;
	letter-spacing: 0.2px;
}

.toggle-list-btn-backlog {
	background-color: #F5C81D;
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

.toggle-list-btn-backlog img {
	height: 26px;
	margin-top: 2px;
	margin-right: 10px;
}

.task-list-container {
	display: flex;
	flex-direction: column;
}

.list-task {
	list-style: none;
	padding: 0;
	margin: 5px 0 0 0;
	justify-content: center;
}

.show-all-tasks-btn {
	text-align: right;
	align-self: flex-end;
	background-color: inherit;
	color: #1d6bf5;
	padding: 0;
	font-weight: 400;
}

/*  ------------------------------- MEDIA QUERIES ------------------------->>>>> */
/*  ------------------------------- MEDIA QUERIES ------------------------->>>>> */
/*  ------------------------------- MEDIA QUERIES ------------------------->>>>> */
@media screen and (max-width: 350px) {
	.toggle-list-btns-container span {
		display: none;
	}

	.toggle-list-btn-inprogress img {
		margin-right: 0px;
	}

	.toggle-list-btn-completed img {
		margin-right: 0px;
	}

	.toggle-list-btn-backlog img {
		margin-right: 0px;
	}

	/* -------------- */
	.user-tasks-overview-container {
	padding: 10px 10px;
}

.user-tasks-overview-container p {
	font-size: 1rem;
}

.user-tasks-overview-container p:first-child {
	margin-right: 5px;
}

.user-tasks-overview-container p:last-child {
	margin-left: 5px;
}

.user-tasks-overview-container p span {
	font-size: 1.2rem;
	margin-left: 2px;
}

.user-name-container span:last-child {
	display: none;
}
	/* -------------- */
}

@media screen and (min-width: 350px) {

	.toggle-list-btns-container span {
		display: none;
	}

	.toggle-list-btn-inprogress img {
		margin-right: 0px;
	}

	.toggle-list-btn-completed img {
		margin-right: 0px;
	}

	.toggle-list-btn-backlog img {
		margin-right: 0px;
	}

}

@media screen and (min-width: 575px) {}

@media screen and (min-width: 767px) {

	.toggle-list-btns-container img {
		margin-right: 10px;
	}

	.toggle-list-btns-container span {
		display: inline-block;
	}
}

@media screen and (min-width: 991px) {}

@media screen and (min-width: 1115px) {
}

@media screen and (min-width: 1400px) {}

@media screen and (min-width: 1440px) {}
</style>