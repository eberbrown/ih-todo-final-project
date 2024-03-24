<script setup>
import { ref } from 'vue';
/* import { seeCurrentUser } from '@/api/userApi'; */
import { useUserStore } from "@/stores/userStore";

const userStore = useUserStore();
const user = ref("");

async function getSession() {
	user.value = await userStore.currentUser;
}

getSession();
</script>

<template>
	<main>
		<h1>Logged In View!</h1>
		<p>User signed in: <samp>{{ user == "" ? "" : user.user.email }}</samp></p>
	</main>
</template>

<style scoped>
</style>