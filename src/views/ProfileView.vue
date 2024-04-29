<script setup>
import { onMounted, ref, computed } from 'vue';
import { useAuthStore } from "@/stores/userStore.js";
import { useTaskStore } from "@/stores/taskStore.js";
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router'

const router = useRouter()

const userStore = useAuthStore();
const { currentUser } = storeToRefs(userStore);
const { seeCurrentUserStore } = useAuthStore();

const taskStore = useTaskStore();
const { tasks } = storeToRefs(taskStore);
const { fetchAllTasks } = taskStore;

const taskList = ref(tasks);

onMounted(async () => {
	await seeCurrentUserStore();
	await fetchAllTasks();
});

const completedTaskCount = computed(() => {
	return taskList.value.filter(task => task.is_complete).length;
})

const incompletedTaskCount = computed(() => {
	return taskList.value.filter(task => !task.is_complete).length;
});

const showDashboard = () => {
  router.push('/loggedin')
};

</script>

<template>
	<main class="profile-container">
		<div class="profile-header">
			<div class="incomplete-tasks">
				<p>
					<span>{{ incompletedTaskCount }}</span> <span>Incomplete Tasks</span>
				</p>
			</div>
			<div class="user-avatar-container">
				<img src="../components/icons/gamer.png" alt="user avatar image" class="user-avatar">
			</div>
			<div class="complete-tasks">
				<p>
					<span>{{ completedTaskCount }}</span> <span>Complete Tasks</span>
				</p>
			</div>
		</div>
		<div class="profile-info">
			<div class="name-container">
				<span>{{ currentUser === null ? "null user" : currentUser.user_metadata.first_name }}</span>
			</div>
			<div class="user-title-container">
				<span>Industrial Engineer</span>
			</div>
		</div>
		<div class="show-tasks-container">
			<button @click="showDashboard">Show all tasks</button>
		</div>
	</main>

</template>

<style scoped>
.profile-container {
	width: 100%;
	padding: 35px 20px;
	-webkit-box-shadow: 5px 5px 12px 0px rgba(0, 0, 0, 0.19);
	-moz-box-shadow: 5px 5px 12px 0px rgba(0, 0, 0, 0.19);
	box-shadow: 5px 5px 12px 0px rgba(0, 0, 0, 0.19);
	border-radius: 5px;
	justify-self: center;
	margin-top: 12%;
	display: flex;
	flex-direction: column;
	align-items: center;
}

.profile-header {
	display: flex;
	justify-content: center;
	align-items: center;
}

.profile-header span {
	display: block;
	text-align: center;
}

.profile-header div span:first-of-type {
	font-size: 2rem;
	font-weight: 600;
}

.profile-header div span:last-of-type {
	color: #44546F;
}

.user-avatar-container {
	margin: 0 23px;
}

.user-avatar {
	max-height: 75px;
	margin-right: 10px;
}

.profile-info {
	margin: 20px 0;
}

.profile-info .name-container {
	text-align: center;
}

.profile-info .name-container span{
	font-size: 3rem;
	font-weight: 700;
}

.profile-info .user-title-container {
	margin-top: 5px;
	padding: 8px 15px;
	border-radius: 7px;
	background-color: rgb(233, 233, 233);
	text-align: center;
}

.profile-info .user-title-container span {
	color: #44546F;
}

.show-tasks-container {
	margin: 40px 0;
	width: 80%
}

.show-tasks-container button {
	width: 100%;
}

/*  ------------------------------- MEDIA QUERIES ------------------------->>>>> */
/*  ------------------------------- MEDIA QUERIES ------------------------->>>>> */
/*  ------------------------------- MEDIA QUERIES ------------------------->>>>> */
@media screen and (min-width: 350px) {
	.profile-container {
		max-width: 345px;
	}
}

@media screen and (min-width: 575px) {}

@media screen and (min-width: 767px) {}

@media screen and (min-width: 991px) {}

@media screen and (min-width: 1115px) {}

@media screen and (min-width: 1400px) {}

@media screen and (min-width: 1440px) {}
</style>