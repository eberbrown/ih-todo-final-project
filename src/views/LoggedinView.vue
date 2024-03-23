<script setup>
import { ref } from 'vue';
import { seeCurrentUser } from '@/api/userApi';

const account = ref("");

async function getSession() {
	account.value = await seeCurrentUser();
}

getSession();
</script>

<template>
	<main>
		<h1>Logged In View!</h1>
		<p>User signed in: <samp>{{ account == "" ? "" : account.user.email }}</samp></p>
	</main>
</template>

<style scoped>
</style>